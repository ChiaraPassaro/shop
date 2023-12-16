<script setup lang="ts">
	import { ref, type PropType, computed, onMounted, onUnmounted, watch } from "vue"
	import type { Option } from "@/types/ComboBox"
	import ArrowDown from "~/icons/ArrowDown.vue"

	const emit = defineEmits<{
		"update:modelValue": [value: Option]
		"update:open": [value: boolean]
	}>()

	const props = defineProps({
		label: {
			type: String,
			required: true,
		},
		resetValue: {
			type: Object as PropType<Option>,
		},
		id: {
			type: String,
			required: true,
		},
		options: {
			type: Array as PropType<Option[]>,
			required: true,
		},
		modelValue: {
			type: Object as PropType<Option>,
			default: () => ({}),
		},
		showLabel: {
			type: Boolean,
		},
		open: {
			type: Boolean,
		},
		borderless: {
			type: Boolean,
		},
	})

	const isOpen = ref(props.open ?? false)
	const listbox = ref<HTMLElement[]>([])

	const model = computed({
		get: () => props.modelValue,
		set: (value) => emit("update:modelValue", value),
	})

	const handleScroll = () => {
		if (isOpen.value) {
			const scrollbarWidth = window.innerWidth - document.body.offsetWidth

			document.body.style.overflow = "hidden"
			document.body.style.paddingRight = `${scrollbarWidth}px`
		}
		if (!isOpen.value) {
			document.body.style.overflow = "auto"
			document.body.style.paddingRight = ""
		}
	}

	const handleOpen = async () => {
		isOpen.value = !isOpen.value
		handleScroll()
		emit("update:open", isOpen.value)
	}

	const handleSelect = ({ label, value }: Option) => {
		handleOpen()

		props.resetValue && emit("update:modelValue", value === "reset" ? props.resetValue : { label, value })
		emit("update:open", isOpen.value)
	}

	const selected = ref(model.value ? props.options.findIndex(({ value }) => value === model.value.value) : 1)

	watch(selected, async () => {
		if (!isOpen.value) return
		await listbox.value[selected.value].scrollIntoView({ block: "end", inline: "nearest" })
	})

	const handleClickOutside = (event: MouseEvent) => {
		if (!isOpen.value) return
		const target = event.target as HTMLElement
		if (!target.closest(`#selector-${props.id} .combo-input`)) {
			isOpen.value = false
			handleScroll()
		}
	}

	const options = computed(() => {
		return props.resetValue ? [{ label: "Reset", value: "reset" }, ...props.options] : props.options
	})

	watch(
		() => props.modelValue,
		() => {
			selected.value = options.value.findIndex(({ value }) => value === model.value.value)
		},
	)

	onMounted(() => {
		document.addEventListener("click", handleClickOutside)
	})

	onUnmounted(() => {
		document.removeEventListener("click", handleClickOutside)
	})
</script>

<template>
	<div
		:id="`selector-${id}`"
		class="selector"
		:class="{ 'selector--open': isOpen, 'selector--borderless': borderless }"
	>
		<label :id="`combo-label-${id}`" :class="{ 'sr-only': !showLabel }">{{ label }}</label>

		<div
			id="combo1"
			class="combo-input"
			:class="{
				'combo-input--open': isOpen,
				'combo-input--selected': model.value,
			}"
			:aria-labelledby="`combo-label-${id}`"
			:aria-controls="`listbox-${id}`"
			aria-expanded="false"
			aria-haspopup="listbox"
			role="combobox"
			tabindex="0"
			@keydown.arrow-down="selected < options.length - 1 && selected++"
			@keydown.arrow-up="selected > 0 && selected--"
			@keydown.space="!isOpen && handleOpen()"
			@keydown.escape="isOpen && handleOpen()"
			@keydown.enter="isOpen && handleSelect(options[selected])"
			@keydown.tab="isOpen && handleOpen()"
			@click="handleOpen"
		>
			<span class="combo-input__selected-value">{{ model?.label || resetValue?.label || "Select Value" }}</span>
			<ArrowDown
				class="combo-input__icon"
				:class="{ 'combo-input__icon--rotate': isOpen }"
				:color="isOpen ? '#e42313' : undefined"
			/>
		</div>
		<ul
			:id="`listbox-${id}`"
			class="combo-menu"
			:class="{
				'combo-menu--open': isOpen,
				'combo-menu--closed': !isOpen,
				'combo-menu--selected': model.label,
			}"
			:aria-labelledby="`combo-label-${id}`"
			role="listbox"
			tabindex="-1"
		>
			<li
				ref="listbox"
				v-for="({ label, value }, i) in options"
				class="combo-menu__item"
				:class="{ 'combo-menu__item--current': selected === i }"
				:key="`option-${value}`"
				role="option"
				:aria-selected="model?.label === label"
				@click="handleSelect({ label, value })"
			>
				{{ label }}
			</li>
		</ul>
	</div>
</template>

<style scoped lang="scss">
	.selector {
		--selected: var(--veryLightGrey);
		--lineHeight: 1.5rem;
		--padding: 0.625rem 0.9375rem;

		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background: white;
		transition: all 0.1s;

		.combo-input {
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;
			gap: 1.25rem;
			width: 100%;
			padding: var(--padding);
			border: 2px solid transparent;
			font-weight: 900;
			line-height: var(--lineHeight);

			&--open {
				border: 2px solid var(--veryLightGrey);
				border-radius: 0;
				border-bottom-color: transparent;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
			&__selected-value {
				white-space: nowrap;
			}
			&__icon {
				transition: transform 0.1s;
				&--rotate {
					transform: rotate(-180deg);
				}
			}
			&:focus {
				outline: none;
			}
		}

		&:not(.selector--borderless) .combo-input {
			border: 2px solid var(--veryLightGrey);
			border-radius: 0.3125rem;

			&--selected {
				border-color: var(--primary);
			}
			&--open {
				border-bottom: 0;
				border-bottom-left-radius: 0;
				border-bottom-right-radius: 0;
			}
		}
		.combo-menu {
			position: absolute;
			z-index: 1;
			top: 100%;
			left: 0;
			display: flex;
			flex-direction: column;
			align-items: stretch;
			overflow-y: auto;

			width: 100%;
			max-height: 12rem;
			border-color: var(--selected);
			background: var(--white);
			list-style: none;
			transition: all 0.5s;

			&--selected {
				border-color: var(--primary);
			}

			&__item {
				width: 100%;
				padding: 0.5rem 1rem;
				background: transparent;
				border: none;
				text-align: left;
				&[aria-selected="true"] {
					color: var(--primary);
				}
				&--current {
					background: var(--selected);
				}
			}
			&--open {
				animation-name: slide-down;
				animation-duration: 0.2s;
				animation-fill-mode: forwards;
			}
			&--closed {
				max-height: 0;
			}
		}

		@keyframes slide-down {
			0% {
				transform: translateY(0rem);
			}
			50% {
				transform: translateY(0.25rem);
			}
			100% {
				transform: translateY(0);
				border-style: solid;
				border-width: 2px;
				border-top-width: 0;
				border-bottom-left-radius: 0.3125rem;
				border-bottom-right-radius: 0.3125rem;
			}
		}
	}
</style>

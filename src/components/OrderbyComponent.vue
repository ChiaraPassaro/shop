<script setup lang="ts">
	import { ref, type PropType, onMounted, computed } from "vue"
	import type { Option } from "@/types/ComboBox"
	import ComboBox from "./ComboBox.vue"

	const props = defineProps({
		title: {
			type: String,
			required: true,
		},
		options: {
			type: Object as PropType<Record<string, Option>>,
			required: true,
		},
	})

	const windowWidth = ref(window.innerWidth)

	const windowSize = computed(() => {
		if (windowWidth.value < 996) return "mobile"
		return "desktop"
	})

	const optionsCombo = computed<Option[]>(() => {
		return windowSize.value === "mobile" ? Object.values(props.options) : []
	})

	onMounted(() => {
		window.addEventListener("resize", () => {
			windowWidth.value = window.innerWidth
		})
	})
</script>

<template>
	<div class="order-by">
		<h2 class="order-by__title">{{ title }}</h2>
		<ul v-if="windowSize === 'desktop'" class="order-by__menu list-inline">
			<li
				v-for="({ label }, key, idx) in options"
				:key="`${key}-${label}`"
				class="list-inline__item"
				:class="{ active: idx === 0 }"
			>
				<button class="btn">{{ label }}</button>
			</li>
		</ul>
		<ComboBox
			v-if="windowSize === 'mobile'"
			class="order-by__menu-combo-box"
			id="order-by"
			label="order by"
			:options="optionsCombo"
			:resetValue="optionsCombo[0]"
			borderless
		/>
	</div>
</template>

<style scoped lang="scss">
	.order-by {
		display: flex;
		align-items: center;
		gap: 1.8rem;
		border-bottom: 1px solid var(--lightGrey);

		&__title,
		&__menu button {
			padding-bottom: 0.3rem;
			font-size: var(--text-sm);
			text-transform: uppercase;
			text-wrap: nowrap;
		}
		&__menu {
			&-combo-box {
				border-bottom: 3px solid var(--primary);
			}
			.list-inline__item {
				height: 100%;
				border-bottom: 3px solid transparent;
				&.active,
				&:hover {
					height: 100%;
					border-bottom: 3px solid var(--primary);
				}
			}
		}
	}
</style>

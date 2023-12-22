<script setup lang="ts">
	defineEmits<{ change: [value: boolean] }>()

	defineProps({
		label: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		checked: {
			type: Boolean,
		},
		labelHidden: {
			type: Boolean,
		},
	})
</script>
<template>
	<div class="checkbox">
		<label :for="`checkbox-${id}`" :class="{ 'sr-only': labelHidden }">{{ label }}</label>
		<div class="checkbox__wrapper">
			<input
				class="checkbox__input"
				type="checkbox"
				id="`checkbox-${id}`"
				:name="name"
				:checked="checked"
				@change="$emit('change', ($event?.target as HTMLInputElement)?.checked)"
			/>

			<div class="checkbox__icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
					<path
						d="M10.6889 17.5414C11.141 17.5414 11.4962 17.3671 11.7417 17.0054L17.7546 7.84069C17.929 7.57589 18 7.324 18 7.0915C18 6.46502 17.5221 6 16.8762 6C16.437 6 16.1593 6.16146 15.8881 6.58127L10.6631 14.8224L8.01507 11.5737C7.76964 11.2766 7.49839 11.1475 7.12379 11.1475C6.47147 11.1475 6 11.6125 6 12.2454C6 12.5296 6.08396 12.775 6.32939 13.0527L9.662 17.0571C9.93972 17.3864 10.2626 17.5414 10.6889 17.5414Z"
						fill="#E32119"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.checkbox {
		display: flex;
		align-items: center;
		gap: 0.62rem;

		&__wrapper {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 1.5rem;
			height: 1.5rem;
			background-color: white;
			border-radius: 0.25rem;
			border: 1px solid var(--lightGrey);
		}
		&__input {
			display: block;
			position: absolute;
			inset: 0;
			z-index: 1;
			opacity: 0;
			width: 100%;
			height: 100%;
			&:checked + .checkbox__icon {
				display: block;
			}
		}

		&__icon {
			display: none;
			width: 100%;
			height: 100%;
		}
	}
</style>

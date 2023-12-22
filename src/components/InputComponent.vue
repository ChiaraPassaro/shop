<script setup lang="ts">
	defineEmits<{ "update:modelValue": [value: Event] }>()

	defineProps({
		label: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: true,
		},
		labelHidden: {
			type: Boolean,
		},
		placeholder: {
			type: String,
			default: "",
		},
	})

	//TODO: add search icon
</script>
<template>
	<div class="input">
		<label :class="{ 'sr-only': labelHidden }" :for="`${id}-input`">{{ label }}</label>
		<input
			class="input__input"
			:id="`${id}-input`"
			:placeholder="placeholder"
			type="text"
			@input="$emit('update:modelValue', $event)"
		/>
		<slot />
	</div>
</template>

<style scoped lang="scss">
	.input {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 0.5rem;
		border: 1px solid var(--lightGrey);
		border-radius: 0.3125rem;
		padding: 0.5rem;
		font-size: 1rem;
		&:focus {
			outline: none;
			border-color: var(--primary);
		}
		&__input {
			all: unset;
			display: flex;
			align-items: center;

			&:focus {
				outline: none;
			}
		}
		@media (max-width: 768px) {
			flex-direction: row-reverse;
			justify-content: flex-end;
		}
	}
</style>

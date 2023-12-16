<script setup lang="ts">
	import CloseIcon from "~/icons/CloseIcon.vue"

	defineEmits(["delete"])

	defineProps({
		label: {
			type: String,
			required: true,
		},
	})
</script>
<template>
	<div class="label">
		<span class="label__text">{{ label }}</span>
		<button class="label__icon" @click="$emit('delete')">
			<CloseIcon />
		</button>
	</div>
</template>

<style scoped lang="scss">
	.label {
		display: flex;
		padding: 0.3125rem 0.625rem;
		align-items: center;
		gap: 0.625rem;
		border-radius: 0.3125rem;
		background: black;
		color: white;
		&__icon {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 1.25rem;
			height: 1.25rem;
			background: transparent;
			border: none;
			outline: none;
		}
	}
</style>

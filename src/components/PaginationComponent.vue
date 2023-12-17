<script setup lang="ts">
	import NextPrev from "~/icons/NextPrev.vue"

	defineEmits<{
		"update:currentPage": [value: number]
	}>()

	defineProps({
		currentPage: {
			type: Number,
			required: true,
		},
		totalPages: {
			type: Number,
			required: true,
		},
	})
</script>
<template>
	<div class="pagination">
		<button
			:disabled="currentPage === 1"
			@click="currentPage > 1 && $emit('update:currentPage', -1)"
			class="btn btn--primary-borderless"
		>
			<NextPrev flip />
		</button>
		<span>{{ currentPage }} of {{ totalPages }}</span>
		<button
			:disabled="currentPage === totalPages"
			@click="currentPage < totalPages && $emit('update:currentPage', 1)"
			class="btn btn--primary-borderless"
		>
			<NextPrev />
		</button>
	</div>
</template>

<style scoped lang="scss">
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin: 1.56rem 0;
	}
</style>

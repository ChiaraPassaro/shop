<script setup lang="ts">
	defineProps({
		flip: {
			type: Boolean,
		},
	})
</script>
<template>
	<svg
		:class="{ 'arrow--left': flip }"
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="24"
		viewBox="0 0 14 24"
		fill="none"
	>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M3.60207 23.2902L0.499998 20.5063L8.45222 12L0.499998 3.49361L3.60207 0.709747L13.4077 12.116C13.3798 12.5912 3.60207 23.2902 3.60207 23.2902Z"
			fill="currentColor"
		/>
	</svg>
</template>
<style scoped>
	.arrow--left {
		transform: rotate(180deg);
	}
</style>

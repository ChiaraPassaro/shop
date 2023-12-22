<script setup lang="ts">
	import { useRoute } from "vue-router"

	defineProps({
		currentPage: {
			type: String,
		},
	})

	const route = useRoute()
</script>

<template>
	<div class="breadcrumbs">
		<span v-for="({ path, name }, idx) in route.matched" :key="`route-${idx}`">
			<RouterLink :to="path">
				{{ name }}
			</RouterLink>
			<span v-if="idx !== Object.keys(route.matched).length - 1"> / </span>
			<template v-if="idx === Object.keys(route.matched).length - 1">
				<span v-if="currentPage"> / </span>
				<span>{{ currentPage }}</span>
			</template>
		</span>
	</div>
</template>

<style scoped lang="scss">
	a {
		color: black;
		text-decoration: none;
		&:hover,
		&:active,
		&:focus {
			color: var(--primary);
		}
	}
</style>

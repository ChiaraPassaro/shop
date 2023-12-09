<script setup lang="ts">
	import { onMounted } from "vue"
	import { useProducts } from "@/stores/products"

	import FilterRow from "@/components/FilterRow.vue"

	const { getProducts, getCategories } = useProducts()

	onMounted(async () => {
		await getCategories()
		await getProducts()
	})
</script>

<template>
	<main>
		<FilterRow />
	</main>
</template>

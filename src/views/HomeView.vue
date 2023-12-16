<script setup lang="ts">
	import { ref, onMounted } from "vue"
	import { useProducts } from "@/stores/products"
	import { storeToRefs } from "pinia"
	import ProductCard from "@/components/ProductCard.vue"
	import FilterRow from "@/components/FilterRow.vue"

	const { getProducts, getCategories } = useProducts()

	const { products } = storeToRefs(useProducts())

	const appliedFilters = ref<Record<string, string>[]>([])

	onMounted(async () => {
		await getCategories()
		await getProducts()
	})
</script>

<template>
	<main>
		<header class="main-header">
			<FilterRow @update:filters="appliedFilters = $event" />
			<div class="applied-filters">
				<h2 class="applied-filter__title">Hai scelto:</h2>
				<div class="applied-filter__list">
					<span class="applied-filter__item" v-for="filter in appliedFilters" :key="filter.value">
						{{ filter.label }}: {{ filter.value }}
					</span>
				</div>
			</div>
		</header>
		<div class="products">
			<ProductCard v-for="product in products" :key="product.id" v-bind="product" />
		</div>
	</main>
</template>

<style scoped lang="scss">
	main {
		padding: 0 6.5rem;

		.products {
			--gap: 1.5625rem;
			display: grid;
			grid-template-columns: repeat(4, minmax(calc(100% / 4 - var(--gap)), 1fr));
			gap: var(--gap);
			@media (max-width: 1200px) {
				grid-template-columns: repeat(3, minmax(calc(100% / 3 - var(--gap)), 1fr));
			}
			@media (max-width: 900px) {
				grid-template-columns: repeat(2, minmax(calc(100% / 2 - var(--gap)), 1fr));
			}
			@media (max-width: 600px) {
				grid-template-columns: repeat(1, minmax(calc(100% / 1 - var(--gap)), 1fr));
			}
		}
		.main-header {
			display: flex;
			flex-direction: column;
			gap: 1.25rem;
		}
	}
</style>

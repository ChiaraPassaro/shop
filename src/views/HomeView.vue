<script setup lang="ts">
	import { onMounted } from "vue"
	import { storeToRefs } from "pinia"
	import type { Filter } from "@/types/Product"
	import type { Option } from "@/types/ComboBox"

	import { useProducts } from "@/stores/products"

	import ProductCard from "@/components/ProductCard.vue"
	import FilterRow from "@/components/FilterRow.vue"
	import LabelComponent from "@/components/LabelComponent.vue"

	const { getProducts, getCategories } = useProducts()

	const { products, getAppliedFilters } = storeToRefs(useProducts())

	const handleDelete = (filter: Filter, value: Option) => {
		useProducts().setFilter(filter, value)
	}

	onMounted(async () => {
		await getCategories()
		await getProducts()
	})
</script>

<template>
	<main>
		<header class="main-header">
			<FilterRow />
			<div class="applied-filters">
				<h2 class="applied-filters__title">Hai scelto:</h2>
				<div v-if="Object.keys(getAppliedFilters).length" class="applied-filters__list">
					<LabelComponent
						v-for="({ label, value }, filter) in getAppliedFilters"
						:key="value"
						class="applied-filters__item"
						:label="`${label}: ${value}`"
						@delete="handleDelete(filter as Filter, { label, value: '' })"
					/>
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
			margin-bottom: 1.875rem;

			.applied-filters {
				display: flex;
				align-items: center;
				gap: 0.625rem;
				&__list {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 0.625rem;
				}
			}
		}
	}
</style>

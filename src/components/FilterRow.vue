<script setup lang="ts">
	import { computed } from "vue"
	import { storeToRefs } from "pinia"
	import { useProducts, defaultFiltersPrice } from "@/stores/products"

	import type { CategoryName, Filter } from "@/types/Product"
	import type { Option } from "@/types/ComboBox"

	import ComboBox from "./ComboBox.vue"

	const { setSelectedCategory, setFilter, getProducts } = useProducts()
	const { categories, getSelectedCategory, filters } = storeToRefs(useProducts())

	const categoriesOptions = computed(() => categories.value.map(({ name, id }) => ({ label: name, value: id })))

	const handleChangeCategory = (label: CategoryName) => {
		setSelectedCategory(label)
		getProducts()
	}
	const handleChangeFilter = (filter: Filter, { label, value }: Option) => {
		setFilter(filter, { label, value })
		getProducts()
	}
</script>

<template>
	<div class="filter-row">
		<ComboBox
			v-if="categoriesOptions.length && getSelectedCategory"
			id="category-filter"
			label="Filter by"
			:resetValue="categoriesOptions[0]"
			:options="categoriesOptions"
			:modelValue="getSelectedCategory"
			@update:modelValue="({ label }) => handleChangeCategory(label as CategoryName)"
		/>

		<ComboBox
			v-if="defaultFiltersPrice.length && getSelectedCategory"
			id="minprice-filter"
			label="Filter by min price"
			:resetValue="{ label: 'Prezzo Minimo', value: '' }"
			:options="defaultFiltersPrice"
			:modelValue="filters.priceMin"
			@update:modelValue="(option) => handleChangeFilter('priceMin', option)"
		/>
	</div>
</template>

<style scoped lang="scss">
	.filter-row {
		display: flex;
		align-items: center;
		padding: 1rem;
	}
</style>

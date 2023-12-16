<script setup lang="ts">
	import { computed } from "vue"
	import { storeToRefs } from "pinia"
	import { useProducts, defaultFiltersPrice } from "@/stores/products"

	import type { CategoryName, Filter } from "@/types/Product"
	import type { Option } from "@/types/ComboBox"

	import ComboBox from "./ComboBox.vue"
	import CheckBox from "./CheckBox.vue"
	const { setSelectedCategory, setFilter, getProducts } = useProducts()
	const { categories, getSelectedCategory, filters } = storeToRefs(useProducts())

	const categoriesOptions = computed(() => categories.value.map(({ name, id }) => ({ label: name, value: id })))

	const handleChangeCategory = (label: CategoryName) => {
		setSelectedCategory(label)
		getProducts()
	}
	const handleChangeFilter = (filter: Filter, { label, value }: Option) => {
		if (filter === "price_min" && value) {
			setFilter("price_max", defaultFiltersPrice[defaultFiltersPrice.length - 1])
		}
		setFilter(filter, { label, value })
		getProducts()
	}
</script>

<template>
	<div class="filter-row">
		<div class="filter-row__combo-boxes">
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
				:modelValue="filters.price_min"
				@update:modelValue="(option) => handleChangeFilter('price_min', option)"
			/>

			<ComboBox
				v-if="defaultFiltersPrice.length && getSelectedCategory"
				id="maxprice-filter"
				label="Filter by max price"
				:resetValue="
					filters.price_min.value
						? defaultFiltersPrice[defaultFiltersPrice.length - 1]
						: { label: 'Prezzo Massimo', value: '' }
				"
				:options="defaultFiltersPrice"
				:modelValue="filters.price_max"
				@update:modelValue="(option) => handleChangeFilter('price_max', option)"
			/>
		</div>

		<div class="filter-row__only-available">
			<!-- there isn't a filter for this in the API
			but it could be implemented with an extra query param
			
			@change="handleChangeFilter('only_available', $event)"
			-->
			<CheckBox label="Solo disponibili" id="only-available" />
		</div>
	</div>
</template>

<style scoped lang="scss">
	.filter-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		&__combo-boxes {
			display: flex;
			align-items: center;
			gap: 1rem;
			height: 4rem;
		}
	}
</style>

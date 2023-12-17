<script setup lang="ts">
	import { computed, ref } from "vue"
	import { storeToRefs } from "pinia"
	import { useProducts, defaultFiltersPrice } from "@/stores/useProducts"

	import type { CategoryName, Filter } from "@/types/Product"
	import type { Option } from "@/types/ComboBox"

	import ComboBox from "~/ComboBox.vue"
	import CheckBox from "~/CheckBox.vue"
	import FilterIcon from "~/icons/FilterIcon.vue"
	import CloseIcon from "~/icons/CloseIcon.vue"

	const { setSelectedCategory, setFilter, getProducts } = useProducts()
	const { categories, getSelectedCategory, filters } = storeToRefs(useProducts())

	const categoriesOptions = computed(() => categories.value.map(({ name, id }) => ({ label: name, value: id })))

	const handleChangeCategory = (label: CategoryName) => {
		setSelectedCategory(label)
		getProducts()
	}
	const handleChangeFilter = async (filter: Filter, { label, value }: Option) => {
		if (filter === "price_min" && value) {
			setFilter("price_max", defaultFiltersPrice[defaultFiltersPrice.length - 1])
		}
		setFilter(filter, { label, value })

		await getProducts()
	}

	const open = ref(false)
	const handleOpen = () => {
		open.value = !open.value
	}
</script>

<template>
	<div class="filter-row">
		<h2 class="filter-row__title">Filters</h2>
		<button class="btn filter-row__icon-btn filter-row__icon-btn--filters" @click="handleOpen">
			<FilterIcon />
		</button>

		<div class="filter-row__filters" :class="{ 'filter-row__filters--mobile-open': open }">
			<div class="filter-row__combo-boxes">
				<button class="btn filter-row__icon-btn filter-row__icon-btn--close" @click="handleOpen">
					<CloseIcon />
				</button>

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

			<button class="filter-row__btn-close btn btn--primary" @click="handleOpen">Visualizza i risultati</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.filter-row {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: 1rem;

		&__filters {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-grow: 1;
		}

		&__combo-boxes {
			display: flex;
			align-items: center;
			gap: 1rem;
			height: 4rem;
		}

		&__icon-btn--close {
			display: none;
			align-self: flex-end;
			width: 2rem;
			height: 2rem;
			justify-content: center;
			align-items: center;
			border: 1px soli var(--veryLightGrey);
			border-radius: 50%;
			background-color: var(--veryLightGrey);
			&:hover {
				background-color: var(--lightGrey);
				transition: all 0.2s ease-in-out;
			}
		}

		&__btn-close {
			display: none;
		}

		&__icon-btn:hover {
			color: var(--primary);
		}

		&__icon-btn--filters {
			display: none;
		}

		@media (max-width: 960px) {
			& {
				justify-content: center;
				padding: 0.375rem 0rem;
				border: 1px solid var(--lightGrey);
			}
			&__title {
				font-size: 1rem;
				font-weight: 500;
			}
			&__title,
			&__icon,
			&__icon-btn--filters {
				display: block;
			}
			&__filters {
				display: none;

				&--mobile-open {
					display: block;
					position: fixed;
					z-index: 1;
					inset: 0;
					display: flex;
					flex-direction: column;
					justify-content: flex-start;
					align-items: stretch;
					gap: 1.5rem;
					width: 100%;
					height: 100%;
					padding: 1rem;
					background: white;

					.filter-row__combo-boxes {
						flex-direction: column;
						align-items: stretch;
						gap: 1.5rem;
						height: auto;
					}
					.filter-row__icon-btn--close {
						display: flex;
					}

					.filter-row__btn-close {
						display: block;
						align-self: center;
					}
				}
			}
		}
	}
</style>

import type { Category, Product, CategoryName, Filter } from "@/types/Product"
import type { Option } from "@/types/ComboBox"

import { defineStore } from "pinia"
import axios from "@/utils/axios"

const availableCategories = ["Clothes", "Shoes", "Fashion Clothes"]

export const defaultFiltersPrice = [
	{ label: "50 €", value: 50 },
	{ label: "100 €", value: 100 },
	{ label: "200 €", value: 200 },
	{ label: "300 €", value: 300 },
	{ label: "400 €", value: 400 },
	{ label: "500 €", value: 500 },
]

export const useProducts = defineStore("products", {
	state: () => {
		return {
			products: [] as Product[],
			categories: [] as Category[],
			selectedCategory: "Shoes" as CategoryName,
			offset: 0,
			limit: 10,
			filters: {
				priceMin: {} as Option,
				priceMax: {} as Option,
			},
		}
	},
	getters: {
		getSelectedCategory(): Option {
			const category = this.categories.find(({ name }) => name === this.selectedCategory)

			return category ? { label: category.name, value: category.id } : { label: "", value: "" }
		},
	},
	actions: {
		setProducts(products: Product[]) {
			this.products = products
		},
		setCategories(categories: Category[]) {
			this.categories = categories
		},
		setSelectedCategory(category: CategoryName) {
			this.selectedCategory = category
		},
		setFilter(filter: Filter, { label, value }: Option) {
			this.filters[filter] && (this.filters[filter] = { label, value })
		},
		async getProducts() {
			let path = `/products/?limit=${this.limit}&offset=${this.offset}`

			Object.entries(this.filters).forEach(([key, value]) => {
				if (value.value || value.value === 0) path += `&${key}=${value.value}`
			})

			const { id } = this.categories.find(({ name }) => name === this.selectedCategory) || {}

			id && (path += `&categoryId=${id}`)

			const { data } = await axios.get(path)

			this.setProducts(data)
		},
		async getCategories() {
			const path = `/categories`

			const { data } = await axios.get(path)

			const filteredCategories = data.filter(({ name }: Category) => availableCategories.includes(name))

			this.setCategories(filteredCategories)
		},
		async getProductById(id: number) {
			const path = `/products/${id}`

			const { data } = await axios.get(path)

			return data
		},
	},
})

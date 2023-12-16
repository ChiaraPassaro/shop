import type { Category, Product, CategoryName, Filter } from "@/types/Product"
import type { Option } from "@/types/ComboBox"

import { defineStore } from "pinia"
import axios from "@/utils/axios"

const availableCategories = ["Clothes", "Shoes", "Fashion Clothes"]

const availableFiltersMap: Record<string, string> = {
	price_min: "Prezzo minimo",
	price_max: "Prezzo massimo",
}
const getSevenDaysAgo = () => new Date(new Date().setDate(new Date().getDate() - 7))

export const defaultFiltersPrice = [
	{ label: "10 €", value: 10 },
	{ label: "20 €", value: 20 },
	{ label: "50 €", value: 50 },
	{ label: "100 €", value: 100 },
	{ label: "200 €", value: 200 },
	{ label: "300 €", value: 300 },
	{ label: "400 €", value: 400 },
	{ label: "500 €", value: 500 },
	{ label: "600 €", value: 600 },
	{ label: "800 €", value: 800 },
	{ label: "1000 €", value: 1000 },
	{ label: "10000 €", value: 10000 },
	{ label: "500000 €", value: 500000 },
]

export const currency = "€"

export const useProducts = defineStore("products", {
	state: () => {
		return {
			products: [] as Product[],
			categories: [] as Category[],
			selectedCategory: "Clothes" as CategoryName,
			offset: 0,
			limit: 10,
			filters: {
				price_min: {} as Option,
				price_max: {} as Option,
				only_available: {} as Option, //there ins't a filter for this in the API
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

			let { data } = await axios.get(path)
			//this map is to change the images of the products that are broken in the api

			data = data.map((product: Product) => {
				return {
					...product,
					discount: Math.floor(Math.random() * 48),
					colorsLength: Math.floor(Math.random() * 5 + 1),
					isNew: new Date(product.creationAt) > getSevenDaysAgo(),
					images: product.images.map((image: string) => {
						if (image.includes("https://placeimg.com")) {
							return `https://picsum.photos/200/300?&random=${Math.floor(Math.random() * 100)}`
						}
						return image
					}),
				}
			})

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
		getAppliedFilters(): Record<string, string>[] | [] {
			const filters: Record<string, string>[] = Object.entries(this.filters)
				.filter(([key, value]) => {
					if (value.value || value.value === 0) {
						return { [key]: value.label }
					}
				})
				.map(([key, value]) => ({ label: availableFiltersMap[key], value: value.label }))

			return filters || []
		},
	},
})

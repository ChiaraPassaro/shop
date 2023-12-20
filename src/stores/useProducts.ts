import { defineStore } from "pinia"

import type { Category, Product, CategoryName, Filter } from "@/types/Product"
import type { Option } from "@/types/ComboBox"

import axios from "@/utils/axios"
import { useLoader } from "@/stores/useLoader"

const getSevenDaysAgo = () => new Date(new Date().setDate(new Date().getDate() - 7))

const availableCategories = ["Clothes", "Shoes"]

const availableFiltersMap: Record<Filter, string> = {
	price_min: "Prezzo minimo",
	price_max: "Prezzo massimo",
	only_available: "Solo disponibili",
}

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
			page: 1,
			totalPages: 0,
			products: [] as Product[],
			categories: [] as Category[],
			selectedCategory: "Clothes" as CategoryName,
			offset: 0,
			limit: 8,
			filters: {
				price_min: {} as Option,
				price_max: {} as Option,
				only_available: {} as Option, //there ins't a filter for this in the API
			} as Record<Filter, Option>,
		}
	},
	getters: {
		getSelectedCategory(): Option {
			const category = this.categories.find(({ name }) => name === this.selectedCategory)

			return category ? { label: category.name, value: category.id } : { label: "", value: "" }
		},
		getAppliedFilters(): Record<Filter, Option> {
			const filters: Record<Filter, Option> = Object.entries(this.filters)
				.filter(([key, value]) => {
					if (value.value || value.value === 0) {
						return { [key]: value.label }
					}
				})
				.reduce(
					(acc, [key, value]) => {
						const filterKey = key as Filter
						acc[filterKey] = { label: availableFiltersMap[filterKey], value: value.label }
						return acc
					},
					{} as Record<Filter, Option>,
				)

			return filters || {}
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
			this.page = 1
			this.offset = 0
			this.filters[filter] && (this.filters[filter] = { label, value })
		},
		async getProducts() {
			const loaderStore = useLoader()
			loaderStore.loading = true

			let path = `/products/?`

			const { id } = this.categories.find(({ name }) => name === this.selectedCategory) || {}

			id && (path += `&categoryId=${id}`)

			Object.entries(this.filters).forEach(([key, value]) => {
				if (value.value || value.value === 0) path += `&${key}=${value.value}`
			})

			//this is to mock the total pages
			const { data } = await axios.get(path)

			this.totalPages = Math.ceil(data.length / this.limit)

			path += `&limit=${this.limit}&offset=${this.offset}`

			let { data: completeData } = await axios.get(path)

			completeData = completeData.map((product: Product) => {
				return {
					...product,
					discount: Math.floor(Math.random() * 48),
					colorsLength: Math.floor(Math.random() * 5 + 1),
					isNew: new Date(product.creationAt) > getSevenDaysAgo(),
					// images: product.images.map(() => "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"),
				}
			})

			this.setProducts(completeData)

			loaderStore.loading = false
		},
		async getCategories() {
			const path = `/categories`

			const { data } = await axios.get(path)

			const filteredCategories = data.filter(({ name }: Category) => availableCategories.includes(name))

			this.setCategories(filteredCategories)
		},
		async getProductById(id: string): Promise<Product> {
			const path = `/products/${id}`

			const { data } = await axios.get(path)

			//mock data
			data.discount = Math.floor(Math.random() * 48)
			data.colorsLength = Math.floor(Math.random() * 5 + 1)
			data.isNew = new Date(data.creationAt) > getSevenDaysAgo()
			data.guarantee = Math.floor(Math.random() * 12 + 1)
			data.strengths = ["Lorem ipsum dolor sit amet.", "Quisquam, voluptatum.", "Amet consectetur adipisicing elit. "]
			data.images.length < 2 && (data.images = [data.images[0], data.images[0], data.images[0]])

			return data
		},
		async getPage(value: number) {
			this.page = value < 0 ? this.page - 1 : this.page + 1
			this.offset = value < 0 ? this.offset - this.limit : this.offset + this.limit

			await this.getProducts()
		},
	},
})

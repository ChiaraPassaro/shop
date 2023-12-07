import type { Category, Product, CategoryName } from "@/types/Product"

import { defineStore } from "pinia"
import axios from "@/utils/axios"

const availableCategories = ["Clothes", "Shoes", "Fashion Clothes"]

export const useProducts = defineStore("products", {
	state: () => {
		return {
			offset: 0,
			limit: 10,
			products: [] as Product[],
			categories: [] as Category[],
			selectedCategory: "Shoes" as CategoryName,
		}
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
		async getProducts() {
			let path = `/products/?offset=${this.offset}&limit=${this.limit}`

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

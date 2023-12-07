<script setup lang="ts">
	import { onMounted } from "vue"
	import { useProducts } from "@/stores/products"
	import type { CategoryName } from "@/types/Product"

	import { storeToRefs } from "pinia"

	const { getProducts, getCategories, setSelectedCategory } = useProducts()
	const { products, categories, selectedCategory } = storeToRefs(useProducts())

	onMounted(async () => {
		await getCategories()
		await getProducts()
	})

	const handleChange = (event) => {
		setSelectedCategory(event.target.value as CategoryName)
		getProducts()
	}
</script>

<template>
	<main>
		<select @change="handleChange">
			<option v-for="{ name, id } in categories" :key="id" :value="name" :selected="name === selectedCategory">
				{{ name }}
			</option>
		</select>
		<ul v-if="products.length">
			<li v-for="product in products" :key="`item-${product.id}`">
				{{ product.id }}
				{{ product.title || "Product" }}
			</li>
		</ul>
	</main>
</template>

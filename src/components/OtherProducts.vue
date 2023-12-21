<script setup lang="ts">
	import type { Product } from "@/types/Product"
	import type { PropType } from "vue"
	import { useRouter } from "vue-router"

	import ProductCard from "~/ProductCard.vue"
	import NextPrev from "~/icons/NextPrev.vue"

	const emit = defineEmits<{
		changePage: [page: number, step: number]
	}>()

	defineProps({
		pages: {
			type: Number,
			required: true,
		},
		limit: {
			type: Number,
			required: true,
		},
		offset: {
			type: Number,
			required: true,
		},
		currentPage: {
			type: Number,
			required: true,
		},
		products: {
			type: Array as PropType<Product[]>,
			required: true,
		},
	})

	const router = useRouter()

	const changeRoute = (id: number) => {
		router.push({ name: `Product`, params: { id: id.toString() } })
	}
	const changePage = (page: number, step: number) => {
		emit("changePage", page, step)
	}
</script>

<template>
	<section class="product__other">
		<h3 class="product__other-title">Guarda Anche</h3>
		<div class="product__other-slider">
			<button
				class="btn product__other-prev"
				:disabled="currentPage === 1"
				:class="{ 'btn--disabled': currentPage === 1 }"
				@click="changePage(currentPage, -1)"
			>
				<NextPrev flip />
			</button>

			<ul v-if="products.length" class="product__other-list">
				<ProductCard v-for="product in products" :key="product.id" v-bind="product" @click="changeRoute(product.id)" />
			</ul>
			<button
				class="btn product__other-next"
				:disabled="currentPage === pages"
				:class="{ 'btn--disabled': currentPage === pages }"
				@click="changePage(currentPage, 1)"
			>
				<NextPrev />
			</button>
		</div>
		<ul class="product__other-slider-stepper">
			<li
				v-for="i in 3"
				:key="`stepper-${i}`"
				class="product__other-slider-stepper-item"
				:class="{
					'product__other-slider-stepper-item--active': i === currentPage,
				}"
			>
				<span class="sr-only">Page {{ i }}</span>
			</li>
		</ul>
	</section>
</template>

<style scoped lang="scss">
	.product__other {
		display: flex;
		flex-direction: column;
		gap: 3.75rem;
		position: relative;
		padding: 0 4.2rem;
		margin: 3.75rem 0;
		&-title {
			color: #000;
			font-size: 1.9rem;
			font-weight: 800;
		}
		&-slider {
			display: flex;
			justify-content: space-between;
			justify-content: center;
			gap: 1.56rem;
		}
		&-list {
			flex-grow: 1;
			display: flex;
			justify-content: center;
			gap: 1.56rem;
			.product-card {
				width: calc(100% / 4);
			}
		}
		&-slider-stepper {
			display: flex;
			justify-content: center;
			gap: 1.56rem;
			&-item {
				width: 0.8rem;
				height: 0.8rem;
				border-radius: 50%;
				list-style: none;
				background-color: var(--lightGrey);
				&--active {
					background-color: var(--primary);
				}
			}
		}
	}
</style>

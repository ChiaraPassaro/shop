<script setup lang="ts">
	import type { Product } from "@/types/Product"
	import { onMounted, ref, type PropType } from "vue"
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
			<li v-for="i in pages" :key="`stepper-${i}`" class="product__other-slider-stepper-item">
				<button
					class="btn btn--primary-borderless product__other-slider-stepper-item-btn"
					:class="{
						'product__other-slider-stepper-item-btn--active': i === currentPage,
					}"
					@click="changePage(i, 0)"
				>
					<span class="sr-only">Page {{ i }}</span>
				</button>
			</li>
		</ul>
	</section>
</template>

<style scoped lang="scss">
	.product__other {
		display: flex;
		flex-direction: column;
		gap: 1.75rem;
		position: relative;
		padding: 0 4.2rem;
		margin: 3.75rem 0;
		&-title {
			padding: 0 2.1rem;
			color: #000;
			font-size: 1.9rem;
			font-weight: 800;
			@media (max-width: 1100px) {
				padding: 0;
			}
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
				display: flex;
				justify-content: center;
				align-items: center;
				width: 0.8rem;
				height: 0.8rem;

				list-style: none;
				padding: 0;

				&-btn {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background-color: var(--lightGrey);

					&:hover {
						background-color: var(--primary);
					}
					&--active {
						background-color: var(--primary);
					}
				}
			}
		}

		@media (max-width: 1100px) {
			width: 100%;
			padding: 0 0 0 1.25rem;

			&-slider {
				width: 100%;
				overflow-x: hidden;
			}

			&-list {
				justify-content: flex-start;
				width: 300%;
				padding-bottom: 0.6rem;
				overflow-x: auto;
				scrollbar-width: none;
				scroll-snap-type: x mandatory;

				&::-webkit-scrollbar {
					display: none;
				}
				.product-card {
					scroll-snap-align: start;
				}
			}

			&-prev,
			&-next {
				display: none;
			}
		}
	}
</style>

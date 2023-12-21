<script setup lang="ts">
	import { computed, onMounted, ref, watch } from "vue"
	import type { ImageMapped, Product } from "@/types/Product"

	import { useProducts } from "@/stores/useProducts"
	import { getImage } from "@/utils/commons"

	import BreadCrumbs from "~/BreadCrumbs.vue"
	import OtherProducts from "~/OtherProducts.vue"

	const props = defineProps({
		id: {
			type: String,
			required: true,
		},
	})

	const { getProductById, getOtherProducts } = useProducts()
	const product = ref<Product>()

	const imagesMapped = ref<ImageMapped[]>()

	const otherProducts = ref<Product[]>([])

	const pages = 3
	const limitSlider = 4
	const offsetSlider = ref(0)
	const currentSliderPage = ref(1)

	const getOtherProductsPaginated = computed(() =>
		otherProducts.value.slice(offsetSlider.value, offsetSlider.value + limitSlider),
	)

	const changeSliderPage = (page: number, step: number) => {
		currentSliderPage.value = page + step
		offsetSlider.value = (currentSliderPage.value - 1) * limitSlider
	}

	watch(
		() => product.value?.images,
		() => {
			imagesMapped.value = product.value?.images?.map((image) => ({
				src: getImage(image).src,
				completed: false,
			}))
		},
		{ immediate: true, deep: true },
	)

	onMounted(async () => {
		product.value = await getProductById(props.id)
		otherProducts.value = await getOtherProducts(product.value.category.id, product.value.id)
	})
</script>

<template>
	<main v-if="product" :id="`product-${product.id}`" class="product">
		<header class="product__header">
			<div class="product__header-images" v-if="imagesMapped?.length">
				<div
					v-for="(image, idx) in imagesMapped"
					:key="`image-${idx}`"
					class="product__header-images-image"
					:class="{ 'product__header-images-image--skeleton': !image.completed }"
				>
					<img :src="image.src" :alt="product.title" @load="imagesMapped[idx].completed = true" />
				</div>
			</div>

			<div class="product__header-info">
				<BreadCrumbs :currentPage="`${product.brand} ${product.title}`" />

				<small class="product__brand">{{ product.brand }}</small>
				<h2 class="product__title">{{ product.title }}</h2>

				<div class="product__info">
					<div class="product__code">{{ product.code }}</div>
					<div class="product__guaranteed">Garanzia: {{ product.guarantee }}</div>
					<div class="product__price">{{ product.price }}</div>
					<div class="product__availability">{{ product.available }}</div>
				</div>

				<div class="product__actions"></div>

				<ul v-if="product.strengths?.length" class="product__strengths">
					<li v-for="(strength, idx) in product.strengths" :key="`strength-${idx}`" class="product__strengths-item">
						{{ strength }}
					</li>
				</ul>
			</div>
		</header>

		<div class="product__description">
			{{ product.description }}
		</div>
	</main>
	<OtherProducts
		v-if="otherProducts.length"
		:pages="pages"
		:limit="limitSlider"
		:offset="offsetSlider"
		:currentPage="currentSliderPage"
		:products="getOtherProductsPaginated"
		@changePage="changeSliderPage"
	/>
</template>

<style lang="scss">
	.product {
		&__header {
			display: grid;
			grid-template-columns: 1.5fr 1fr;
			gap: 1.56rem;
			padding: 0 6.5rem;
		}
		&__header-images {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: 2fr, 1fr;
			gap: 1.56rem;

			&-image {
				border: 1px solid var(--lightGrey);
				img {
					display: block;
					width: 100%;
					height: 100%;
					object-fit: cover;
					aspect-ratio: 1 / 1.2;
				}

				&--skeleton {
					background-color: var(--lightGrey);
					aspect-ratio: 1 / 1.2;
					img {
						display: none;
					}
				}

				&:nth-child(1) {
					grid-column: 1 / 3;
					grid-row: 1 / 1;
				}

				&:nth-child(1).product__header-images-image--skeleton,
				&:nth-child(1) img {
					aspect-ratio: 1 / 1;
				}
			}
		}
		&__description {
			padding: 0 6.5rem;
		}
		&__other {
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
	}
</style>

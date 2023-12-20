<script setup lang="ts">
	import { onMounted, ref, watch } from "vue"
	import type { Product } from "@/types/Product"

	import { useProducts } from "@/stores/useProducts"
	import { getImage } from "@/utils/commons"

	import BreadCrumbs from "~/BreadCrumbs.vue"

	type ImageMapped = {
		src: string
		completed: boolean
	}

	const props = defineProps({
		id: {
			type: String,
			required: true,
		},
	})

	const { getProductById } = useProducts()
	const product = ref<Product>()

	const imagesMapped = ref<ImageMapped[]>()

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

		<footer>
			<div class="products__others">
				<h3 class="products__others-title"></h3>
				<ul class="products__others-list slider">
					<li class="products__others-item"></li>
				</ul>
			</div>
		</footer>
	</main>
</template>

<style lang="scss">
	.product {
		padding: 0 6.5rem;

		&__header {
			display: grid;
			grid-template-columns: 1.5fr 1fr;
			gap: 1.56rem;
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
	}
</style>

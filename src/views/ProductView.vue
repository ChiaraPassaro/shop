<script setup lang="ts">
	import { computed, onMounted, ref, watch } from "vue"
	import type { ImageMapped, Product } from "@/types/Product"
	import type { Option } from "@/types/ComboBox"

	import { useProducts } from "@/stores/useProducts"
	import { getImage } from "@/utils/commons"

	import BreadCrumbs from "~/BreadCrumbs.vue"
	import OtherProducts from "~/OtherProducts.vue"
	import ProductPrice from "~/ProductPrice.vue"
	import PackIcon from "~/icons/PackIcon.vue"
	import ComboBox from "~/ComboBox.vue"

	const props = defineProps({
		id: {
			type: String,
			required: true,
		},
	})

	const { getProductById, getOtherProducts } = useProducts()
	const product = ref<Product>()
	const sizesOptions = computed(() => {
		if (!product.value?.sizes) return
		return product.value.sizes.map((size) => ({
			value: size,
			label: size,
		}))
	})

	const imagesMapped = ref<ImageMapped[]>()

	const otherProducts = ref<Product[]>([])
	const selectedSize = ref<Option>({})

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

	const warranty = computed(() => {
		if (!product.value) return
		return `${product.value?.guarantee} mes${product?.value?.guarantee && product?.value?.guarantee > 1 ? "i" : "e"}`
	})

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

				<dl class="product__info">
					<div>
						<dd class="product__code">Codice:</dd>
						<dt class="product__code-value">{{ product.code }}</dt>
					</div>
					<div>
						<dd class="product__guaranteed">Garanzia:</dd>
						<dt class="product__guaranteed-value">{{ warranty }}</dt>
					</div>
					<div>
						<dd class="product__price sr-only">Prezzo:</dd>
						<dt class="product__price-value">
							<ProductPrice :price="product.price" :discount="product.discount" singleRow />
						</dt>
					</div>
					<div>
						<dd class="product__availability sr-only">Disponibilità:</dd>
						<dt
							class="product__availability-value"
							:class="{
								'product__availability-value--available': product.available,
								'product__availability-value--not-available': !product.available,
							}"
						>
							<PackIcon /><span>{{ product.available ? "Disponibile" : "Non disponibile" }}</span>
						</dt>
					</div>
					<div class="product__actions">
						<div v-if="sizesOptions?.length">
							<dd class="product__sizes">Misura:</dd>
							<dt class="product__sizes-value">
								<ComboBox
									label="misura"
									id="sizes"
									:options="sizesOptions"
									v-model="selectedSize"
									:resetValue="sizesOptions[0]"
								/>
							</dt>
						</div>
						<div class="product__add-to-cart">
							<button class="btn btn--black">Aggiungi al Carrello</button>
						</div>
					</div>
				</dl>

				<div class="product__strengths">
					<h3 class="product__strengths-title">Punti di forza</h3>
					<ul v-if="product.strengths?.length" class="product__strengths-list">
						<li
							v-for="(strength, idx) in product.strengths"
							:key="`strength-${idx}`"
							class="product__strengths-list-item"
						>
							{{ strength }}
						</li>
					</ul>
				</div>
			</div>
		</header>

		<div class="product__description">
			<h2 class="product__description-title">Descrizione</h2>
			<div>{{ product.description }}</div>
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
		--gap: 1.56rem;

		display: flex;
		flex-direction: column;
		gap: var(--gap);

		&__header {
			--grid-template-columns: 1.5fr 1fr;
			--padding-inline: 6.5rem;

			display: grid;
			grid-template-columns: var(--grid-template-columns);
			gap: var(--gap);
			padding: 0 var(--padding-inline);

			@media (max-width: 768px) {
				--grid-template-columns: 1fr;
				--padding-inline: 1.25rem;

				grid-template-rows: auto;
			}
		}
		&__strengths {
			&-title {
				font-size: var(--text-sm);
				text-transform: uppercase;
			}
			&-list {
				display: flex;
				padding: var(--gap) var(--gap) 0;
				margin-top: 0.4rem;
				flex-direction: column;
				align-items: stretch;
				gap: var(--gap);
				background-color: var(--veryLightGrey);
				list-style: none;

				&-item {
					display: flex;
					align-items: center;
					padding-bottom: var(--gap);
					&:not(:last-child) {
						border-bottom: 1px solid var(--lightGrey);
					}
					&::before {
						content: url("~/icons/WarrantyIcon.svg");
						display: flex;
						align-items: center;
						justify-content: center;
						width: 0.8rem;
						height: 0.8rem;
						margin-right: 1.88rem;
					}
				}
			}
		}
		&__header-images {
			--template-columns: repeat(2, 1fr);
			--template-rows: 2fr, 1fr;

			display: grid;
			grid-template-columns: var(--template-columns);
			grid-template-rows: var(--template-rows);
			gap: var(--gap);

			&-image {
				--width: 100%;
				--height: 100%;
				--aspect-ratio: 1 / 1.2;

				border: 1px solid var(--lightGrey);
				img {
					display: block;
					width: var(--width);
					height: var(--height);
					object-fit: cover;
					aspect-ratio: var(--aspect-ratio);
				}

				&--skeleton {
					background-color: var(--lightGrey);
					aspect-ratio: 1 / 1.2;
					img {
						display: none;
					}
				}

				&:nth-child(1) {
					--grid-column: 1 / 3;
					--grid-row: 1 / 1;

					grid-column: var(--grid-column);
					grid-row: var(--grid-row);
				}

				&:nth-child(1).product__header-images-image--skeleton,
				&:nth-child(1) img {
					aspect-ratio: 1 / 1;
				}

				@media (max-width: 768px) {
					&:nth-child(1) {
						--grid-column: auto;
						--grid-row: auto;
					}
				}
			}

			@media (max-width: 768px) {
				--template-columns: repeat(3, 20.625rem);
				--template-rows: 1fr;
				--gap: 0.75rem;

				width: 100%;
				overflow-x: auto;
				scrollbar-width: none;
				scroll-snap-type: x mandatory;
				&::-webkit-scrollbar {
					display: none;
				}

				img {
					--width: 20.625rem;
					--height: 20.625rem;
					--aspect-ratio: 1 / 1;
					scroll-snap-align: start;
				}
			}
		}
		&__header-info {
			display: flex;
			flex-direction: column;
			gap: 0.75rem;
			p {
				display: block;
				font-size: var(--text-sm);
			}
		}
		&__title {
			font-size: 2.375rem;
			line-height: 100%;
		}
		&__brand {
			font-size: var(--text-title);
			line-height: 1.5rem;
		}
		&__info {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 0.75rem;
			div,
			div > * {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
		}
		&__availability-value {
			--border: 1px solid var(--veryLightGrey);
			display: flex;
			gap: 1.25rem;
			width: 100%;
			padding: 0.69rem 0;
			border-top: var(--border);
			border-bottom: var(--border);
			color: var(--warning);

			&--available {
				color: var(--secondary);
			}
		}
		&__price-value {
			width: 100%;
		}

		&__actions {
			--direction: row;
			--justify-content: flex-end;
			--align-items: stretch;
			--height: 3rem;
			--margin-bottom: 1.25rem;

			display: flex;
			flex-direction: var(--direction);
			justify-content: var(--justify-content);
			align-items: var(--align-items);
			height: var(--height);
			margin-bottom: var(--margin-bottom);

			.product__add-to-cart {
				--justify-content: flex-end;

				display: flex;
				justify-content: var(--justify-content);
				flex-grow: 1;
			}

			@media (max-width: 768px) {
				--direction: column;
				--justify-content: flex-start;
				--align-items: flex-start;
				--height: auto;
				--margin-bottom: 2.5rem;

				.product__add-to-cart {
					--justify-content: flex-start;
					margin-top: 1rem;
				}
			}
		}
		&__description {
			--padding-inline: 6.5rem;

			padding: 0 var(--padding-inline);
			&-title {
				margin-bottom: 2.5rem;
				font-size: 2.25rem;
				line-height: 100%;
			}
			@media (max-width: 768px) {
				--padding-inline: 1.25rem;
			}
		}
	}
</style>

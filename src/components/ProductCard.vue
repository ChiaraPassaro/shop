<script setup lang="ts">
	import { computed, ref, type PropType } from "vue"
	import type { Category } from "@/types/Product"

	import { getImage } from "@/utils/commons"

	import HeartIcon from "~/icons/HeartIcon.vue"
	import ProductPrice from "~/ProductPrice.vue"

	const props = defineProps({
		id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			default: "Product title",
		},
		price: {
			type: Number,
			required: true,
		},
		discount: {
			type: Number,
		},
		brand: {
			type: String,
			default: "Brand",
		},
		description: {
			type: String,
		},
		colorsLength: {
			type: Number,
			default: 0,
		},
		category: {
			type: Object as PropType<Category>,
		},
		images: {
			type: Array as PropType<string[]>,
		},
		isNew: {
			type: Boolean,
		},
	})

	const imageComplete = ref(false)

	const colors = computed(() => `${props.colorsLength} color${props.colorsLength > 1 ? "i" : "e"}`)
</script>
<template>
	<button class="product-card">
		<div class="product-card__header">
			<div class="product-card__image" :class="{ 'product-card__image--skeleton': !imageComplete }">
				<img
					v-if="images?.length"
					class="product-card__image"
					:src="getImage(images[0]).src"
					:alt="title"
					@load="imageComplete = true"
				/>
			</div>
			<div class="product-card__add-to-preferred">
				<button class="btn btn--primary-borderless"><HeartIcon /></button>
			</div>
			<div v-if="isNew" class="product-card__badge">New</div>
		</div>

		<div class="product-card__info">
			<span class="product-card__brand">{{ brand }}</span>
			<h2 class="product-card__title">{{ title }}</h2>
			<span class="product-card__colors">{{ colors }}</span>
		</div>

		<ProductPrice :price="price" :discount="discount" />
	</button>
</template>

<style scoped lang="scss">
	.product-card {
		--heartBgHover: var(--veryLightGrey);
		--heartFillHover: #9f2c2c;
		--colors-color: var(--darkGrey);
		--space: 0.31rem;
		--padding-block: 0.62rem;
		--max-hight-img: 13.75rem;

		all: unset;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: 100%;
		min-width: 15.625rem;
		padding-bottom: 1.25rem;
		box-shadow: var(--boxShadow);
		text-align: center;
		cursor: pointer;

		&__header {
			position: relative;
		}
		&__add-to-preferred {
			position: absolute;
			top: var(--space);
			right: var(--space);
			display: flex;
			justify-content: center;
			align-items: center;
			width: 2.25rem;
			height: 2.25rem;
			background-color: white;
			border-radius: 50%;
			transition: all 0.3s ease-in-out;
			&:hover {
				color: var(--heartFillHover);
				background-color: var(--heartBgHover);
				cursor: pointer;
			}
		}
		&__image {
			img,
			&--skeleton {
				display: block;
				width: 100%;
				max-height: var(--max-hight-img);
				aspect-ratio: 1.5/ 1;
				object-fit: cover;
			}
			&--skeleton {
				background-color: var(--lightGrey);
				img {
					display: none;
				}
			}
		}
		&__badge {
			position: absolute;
			bottom: var(--space);
			left: var(--space);
			padding: 0.25rem var(--padding-block);
			background-color: white;
		}
		&__info {
			padding: 0 var(--padding-block);
		}
		&__title {
			margin: var(--space) 0;
			font-size: var(--text-title);
		}
		&__brand {
			font-size: var(--text-sm);
		}
		&__colors {
			text-align: center;
			color: var(--colors-color);
		}
	}
</style>

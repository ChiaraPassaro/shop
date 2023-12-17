<script setup lang="ts">
	import type { Category } from "@/types/Product"
	import { computed, type PropType } from "vue"

	import HeartIcon from "@/components/icons/HeartIcon.vue"
	import { currency } from "@/stores/useProducts"

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

	const discountedPrice = computed(() => {
		if (props.discount) {
			return (props.price - (props.price * props.discount) / 100).toFixed(2)
		}
		return props.price
	})

	const colors = computed(() => `${props.colorsLength} color${props.colorsLength > 1 ? "i" : "e"}`)
</script>
<template>
	<section class="product-card">
		<header class="product-card__header">
			<img class="product-card__image" v-if="images?.length" :src="images[0]" :alt="title" />
			<div class="product-card__add-to-preferred">
				<button class="btn btn--primary-borderless"><HeartIcon /></button>
			</div>
			<div v-if="isNew" class="product-card__badge">New</div>
		</header>

		<div class="product-card__info">
			<span class="product-card__brand">{{ brand }}</span>
			<h2 class="product-card__title">{{ title }}</h2>
			<span class="product-card__colors">{{ colors }}</span>
		</div>

		<div class="product-card__price">
			<p class="product-card__price-current">
				<template v-if="discount">{{ discountedPrice }}{{ currency }}</template>
				<template v-else>{{ price }}{{ currency }}</template>
			</p>
			<div class="product-card__price-discount" v-if="discount">
				<span class="product-card__price-origin">{{ price }}{{ currency }}</span>
				<span class="product-card__price-discount-badge">{{ discount }}%</span>
			</div>
		</div>
	</section>
</template>

<style scoped lang="scss">
	.product-card {
		--heartBgHover: var(--veryLightGrey);
		--heartFillHover: #9f2c2c;
		--colors-color: var(--darkGrey);

		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		width: 100%;
		padding-bottom: 1.25rem;
		box-shadow: var(--boxShadow);
		text-align: center;

		&__header {
			position: relative;
		}
		&__add-to-preferred {
			position: absolute;
			top: 0.31rem;
			right: 0.31rem;
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
			display: block;
			width: 100%;
			max-height: 13.75rem;
			aspect-ratio: 1.5/ 1;
			object-fit: cover;
		}
		&__badge {
			position: absolute;
			bottom: 0.31rem;
			left: 0.31rem;
			padding: 0.25rem 0.62rem;
			background-color: white;
		}
		&__info,
		&__price {
			padding: 0 0.62rem;
		}
		&__title {
			margin: 0.31rem 0;
			font-size: 1.125rem;
		}
		&__brand {
			font-size: 0.875rem;
		}
		&__colors {
			color: var(--colors-color);
		}
		&__price-current {
			font-size: 1.25rem;
			color: var(--primary);
		}
		&__price-origin {
			text-decoration: line-through;
		}
		&__price-discount {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.25rem;
			margin-top: 0.31rem;
			font-size: 1rem;
		}
		&__price-discount-badge {
			padding: 0.3rem 0.69rem;
			border-radius: 0.3125rem;
			background: var(--secondary);
			font-size: 0.875rem;
			font-weight: 800;
			text-align: center;
			color: white;
		}
	}
</style>

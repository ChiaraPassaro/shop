<script setup lang="ts">
	import { computed } from "vue"
	import { currency } from "@/stores/useProducts"

	const props = defineProps({
		price: {
			type: Number,
			required: true,
		},
		discount: {
			type: Number,
		},
		singleRow: {
			type: Boolean,
		},
	})

	const discountedPrice = computed(() => {
		if (props.discount) {
			return (props.price - (props.price * props.discount) / 100).toFixed(2)
		}
		return props.price
	})
</script>

<template>
	<div class="product-price" :class="{ 'product-price--single-row': singleRow }">
		<p class="product-price__current">
			<template v-if="discount"> {{ discountedPrice }}{{ currency }}</template>
			<template v-else>{{ price }}{{ currency }}</template>
		</p>
		<div class="product-price__discount" v-if="discount">
			<span class="product-price__origin">{{ price }}{{ currency }}</span>
			<span class="product-price__discount-badge">{{ discount }}%</span>
		</div>
	</div>
</template>

<style scoped lang="scss">
	.product-price {
		&--single-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		&__current {
			font-size: 1.25rem;
			color: var(--primary);
		}
		&__origin {
			text-decoration: line-through;
		}
		&__discount {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 0.25rem;
			font-size: 1rem;
		}
		&:not(&--single-row) .product-price__discount {
			margin-top: 0.31rem;
		}
		&__discount-badge {
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

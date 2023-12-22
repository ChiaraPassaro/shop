import { createRouter, createWebHistory } from "vue-router"
import ProductWrapper from "@/views/ProductWrapper.vue"

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: ProductWrapper,
			children: [
				{
					path: "",
					name: "Donna",
					props: true,
					component: () => import("@/views/ProductsView.vue"),
					children: [
						{
							path: "donna/product/:id",
							name: "Product",
							props: true,
							component: () => import("@/views/ProductView.vue"),
						},
					],
				},
			],
		},
	],
})

export default router

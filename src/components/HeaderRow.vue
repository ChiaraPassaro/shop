<script setup lang="ts">
	import { RouterLink } from "vue-router"

	import ComboBox from "~/ComboBox.vue"
	import InputComponent from "~/InputComponent.vue"
	import AccountIcon from "~/icons/AccountIcon.vue"
	import HeartIcon from "~/icons/HeartIcon.vue"
	import CartIcon from "~/icons/CartIcon.vue"
	import MenuIcon from "~/icons/MenuIcon.vue"
	import { onMounted, ref } from "vue"
	import { storeToRefs } from "pinia"

	import { useLanguage } from "@/stores/useLanguage"
	import SearchIcon from "~/icons/SearchIcon.vue"

	const topMenuItems = [
		{ path: "", name: "Chi siamo" },
		{ path: "", name: "Comunity" },
		{ path: "", name: "Brands" },
	]
	//mock links
	const mainMenuItems = [
		{ path: "/", name: "Donna" },
		{ path: "", name: "Uomo" },
		{ path: "", name: "Bambini" },
		{ path: "", name: "Tutti gli articoli" },
	]

	const isMenuActive = ref(false)
	const { selectedLang, languages } = storeToRefs(useLanguage())

	onMounted(() => {
		window.addEventListener("resize", () => {
			if (window.innerWidth > 960) {
				isMenuActive.value = false
			}
		})
	})
</script>

<template>
	<header>
		<nav class="header__top-nav">
			<ul class="header__top-menu list-inline">
				<li v-for="{ name } in topMenuItems" :key="name" class="list-inline-item">
					<!-- to show fake links -->
					<span class="router-link">{{ name }}</span>
				</li>
			</ul>

			<ComboBox
				id="language"
				class="header__top-language"
				:modelValue="selectedLang"
				:options="languages"
				label="language"
				borderless
			/>
		</nav>

		<div class="header__main">
			<button class="header__main-menu-btn btn btn--primary-borderless" @click="isMenuActive = !isMenuActive">
				<MenuIcon />
				<span>Menu</span>
			</button>

			<RouterLink class="header__main-logo" to="/">
				<img src="@/assets/logo.svg" alt="logo" />
			</RouterLink>

			<InputComponent
				class="header__search-input"
				id="search"
				label="search"
				placeholder="Cerca un prodotto"
				labelHidden
			>
				<SearchIcon />
			</InputComponent>

			<ul class="header__main-actions list-inline">
				<li class="list-inline__item">
					<button class="btn btn--primary-borderless"><AccountIcon /></button>
				</li>
				<li class="list-inline__item">
					<button class="btn btn--primary-borderless"><HeartIcon /></button>
				</li>
				<li class="list-inline__item">
					<button class="btn btn--primary-borderless cart-button">
						<span class="cart-button__product-quantity">3</span>
						<CartIcon />
					</button>
				</li>
			</ul>
		</div>

		<nav class="header__main-nav">
			<ul class="header__main-menu list-inline" :class="{ 'header__main-menu--active': isMenuActive }">
				<li v-for="{ path, name } in mainMenuItems" :key="name" class="list-inline-item">
					<RouterLink v-if="path" class="router-link" :to="path">{{ name }}</RouterLink>
					<!-- to show fake links -->
					<span class="router-link" v-else>{{ name }}</span>
				</li>
			</ul>
		</nav>
	</header>
</template>

<style scoped lang="scss">
	.header {
		&__top-nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 6.5rem;
			border-bottom: 1px solid;
			border-color: var(--lightGrey);
			@media (max-width: 960px) {
				& {
					display: none;
				}
			}
		}
		&__top-language {
			margin: 0.4rem 0;
			--lineHeight: 1rem;
			--padding: 0.2rem 0.4rem;
		}
		&__top-menu {
			justify-content: flex-start;
		}

		&__main {
			padding: 1.88rem 6.5rem;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;

			@media (max-width: 960px) {
				& {
					grid-template-columns: 4rem 1fr;
					grid-template-rows: auto;

					gap: 1.3125rem;
					padding: 0.65rem;
				}
			}

			&-actions {
				gap: 1.26rem;
				justify-content: flex-end;

				@media (max-width: 960px) {
					& {
						order: 0;
					}
				}

				li {
					margin: 0;
				}
				.cart-button {
					position: relative;
					&__product-quantity {
						position: absolute;
						top: -50%;
						right: -50%;
						background-color: var(--primary);
						color: var(--white);
						border-radius: 50%;
						width: 1.25rem;
						height: 1.25rem;
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 0.75rem;
					}
				}
			}
		}

		&__search-input {
			width: 100%;
			max-width: 25rem;
			@media (max-width: 960px) {
				& {
					order: 1;
					max-width: 100%;
				}
			}
		}

		&__main-menu {
			justify-content: flex-start;
			padding: 0 6.5rem;
			border-bottom: 1px solid;
			border-top: 1px solid;
			border-color: var(--lightGrey);
			margin-bottom: 3.75rem;
			&-btn {
				display: none;
				order: 1;
			}
			@media (max-width: 960px) {
				&-btn {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 0.8125rem;
					text-transform: uppercase;
				}

				& {
					display: none;
					&--active {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: stretch;
						font-size: 0.8125rem;
						text-transform: uppercase;
						padding: 0 1.25rem;
					}
				}
			}

			.router-link {
				display: block;
				text-decoration: none;
				padding: 0.8rem 0;
				height: 100%;
				border-bottom: 3px solid transparent;
				font-weight: 800;
				text-transform: uppercase;

				&:hover,
				&-active,
				&-exact-active {
					border-bottom: 3px solid var(--primary);
					color: var(--primary);
					cursor: pointer;
				}
			}
		}
	}
</style>

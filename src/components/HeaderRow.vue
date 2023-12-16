<script setup lang="ts">
	import { ref } from "vue"
	import { RouterLink } from "vue-router"
	import ComboBox from "~/ComboBox.vue"

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

	const selectedLang = ref({ label: "Ita", value: "it-IT" })
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
				:options="[{ label: 'Ita', value: 'it-IT' }]"
				label="language"
				borderless
			/>
		</nav>

		<div class="header__main">
			<RouterLink to="/">
				<img src="@/assets/logo.svg" alt="logo" />
			</RouterLink>
		</div>

		<nav class="header__main-nav">
			<ul class="header__main-menu list-inline">
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
		}

		&__main-menu {
			justify-content: flex-start;
			padding: 0 6.5rem;
			border-bottom: 1px solid;
			border-top: 1px solid;
			border-color: var(--lightGrey);
			margin-bottom: 3.75rem;

			.router-link {
				display: block;
				text-decoration: none;
				padding: 0.8rem 0;
				height: 100%;
				border-bottom: 3px solid transparent;
				font-weight: 800;
				text-transform: uppercase;

				&:hover,
				&-exact-active {
					border-bottom: 3px solid var(--primary);
					color: var(--primary);
					cursor: pointer;
				}
			}
		}
	}
</style>

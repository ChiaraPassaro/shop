<script setup lang="ts">
	import { storeToRefs } from "pinia"
	import { useLanguage } from "@/stores/useLanguage"

	import { getImage } from "@/utils/commons"

	import { RouterLink } from "vue-router"
	import InputComponent from "~/InputComponent.vue"
	import CheckBox from "~/CheckBox.vue"
	import ComboBox from "./ComboBox.vue"

	const payments = [
		{ logo: "./logos/american.png", alt: "American Express" },
		{ logo: "./logos/cartasi.png", alt: "Carta Si" },
		{ logo: "./logos/maestro.png", alt: "Maestro" },
		{ logo: "./logos/paypal.png", alt: "Paypal" },
		{ logo: "./logos/postepay.png", alt: "Poste Pay" },
		{ logo: "./logos/visa.png", alt: "Visa" },
	]

	const links = [
		[
			{ name: "Home", path: "" },
			{ name: "Chi siamo", path: "" },
			{ name: "Contatti", path: "" },
			{ name: "Lavora con noi", path: "" },
		],

		[
			{ name: "Condizioni di vendita", path: "" },
			{ name: "Pagamenti", path: "" },
			{ name: "Certificazioni", path: "" },
			{ name: "Sitemap", path: "" },
		],
		[
			{ name: "Privacy policy", path: "" },
			{ name: "Cookie policy", path: "" },
			{ name: "Credits", path: "" },
		],
	]

	const { selectedLang, languages } = storeToRefs(useLanguage())
</script>

<template>
	<div class="footer">
		<div class="footer__top">
			<h3 class="footer__top-title">
				Iscriviti alla <br />
				newsletter
			</h3>
			<form class="footer__top-newsletter" @submit.prevent action="#">
				<InputComponent
					class="footer__top-input"
					id="newsletter"
					label="newsletter"
					placeholder="Indirizzo E-mail"
					labelHidden
				/>
				<button class="btn btn--black">Iscriviti</button>
				<div class="footer__top-privacy">
					<CheckBox labelHidden label="Privacy Policy" id="privacy-policy" name="privacy-policy" />
					<p>Letta la Privacy Policy, accetto di ricevere la newsletter ai sensi del Regolamento UE 2016/679 (GDPR)</p>
				</div>
			</form>
		</div>
		<div class="footer__middle">
			<div class="footer__middle-logo">
				<RouterLink class="header__main-logo" to="/">
					<img src="@/assets/logo.svg" alt="logo" />
				</RouterLink>
			</div>

			<div class="footer__middle-links">
				<ul v-for="(list, listIdx) in links" :key="`list-${listIdx}`" class="footer__middle-links-list list-none">
					<li v-for="({ path, name }, idx) in list" :key="`link-${idx}`">
						<RouterLink :to="path">{{ name }}</RouterLink>
					</li>
				</ul>
			</div>
		</div>
		<div class="footer__bottom">
			<ul class="footer__bottom-payments list-none">
				<li v-for="({ logo, alt }, i) in payments" :key="`payment-${i}`" class="footer__bottom-payments-item">
					<img :src="getImage(logo).src" :alt="alt" />
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
		</div>
		<div class="footer__copy">
			© 2023 Logo – Via delle Albere 13, 36045 Vicenza P.IVA 00589040245 – Registro Imprese di Vicenza: n. 00589040245
			– Rea vi: 139951 Capitale sociale: € 10.000.000 i.v.
		</div>
	</div>
</template>

<style scoped lang="scss">
	.footer {
		&__top {
			background-color: var(--lightGrey);
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 1rem;
			padding: 3.75rem 6.5rem;
			&-title {
				flex-shrink: 0;
			}
			&-newsletter {
				display: flex;
				gap: 1rem;
				align-items: center;
				& > * {
					width: calc(100% / 3);
				}
			}
			&-privacy {
				display: flex;
				align-items: flex-start;
				gap: 0.62rem;
				font-size: 0.85rem;
			}

			@media (max-width: 896px) {
				flex-direction: column;
				align-items: flex-start;
				gap: 1rem;
				padding: 1.5rem;
				&-title {
					font-size: 1.875rem;
				}
				&-newsletter {
					flex-direction: column;
					width: 100%;
					& > * {
						width: 100%;
					}
				}
			}
		}
		&__middle {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 2.69rem 6.5rem;
			background-color: var(--veryLightGrey);
			gap: 1.5rem;

			@media (max-width: 896px) {
				flex-direction: column;
				align-items: flex-start;
				padding: 2.69rem 1.5rem;
			}

			&-links {
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 3.75rem;
				@media (max-width: 896px) {
					grid-template-columns: 1fr;
					gap: 1.75rem;
				}

				li {
					text-align: right;
					a {
						color: var(--black);
						text-decoration: none;
						&:hover {
							color: var(--primary);
						}
					}
					@media (max-width: 896px) {
						width: 100%;
						text-align: left;
					}
				}
			}
		}
		&__bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 2.69rem 6.5rem;
			@media (max-width: 896px) {
				flex-direction: column;
				&-item {
					height: 1.25rem;
				}
			}
			&-payments {
				display: flex;
				align-items: center;
				gap: 1.5rem;
				&-item {
					height: 1.75rem;
					img {
						width: 100%;
					}
				}
			}
		}
		&__copy {
			padding: 1.5rem 6.5rem;
			font-size: 0.75rem;
			text-align: center;
			border-top: 1px solid var(--veryLightGrey);
		}
	}
</style>

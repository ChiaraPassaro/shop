<script setup lang="ts">
	import InputComponent from "~/InputComponent.vue"
	import CheckBox from "~/CheckBox.vue"
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
		<div class="footer__middle"></div>
		<div class="footer__bottom"></div>
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
			}
			&-privacy {
				display: flex;
				align-items: center;
				gap: 0.62rem;
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
	}
</style>

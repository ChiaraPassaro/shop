<template>
	<div class="loader">
		<svg class="circular" viewBox="25 25 50 50">
			<circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="4" stroke-miterlimit="10" />
			<circle
				style="animation-delay: 0.8s"
				class="inner-path"
				cx="50"
				cy="50"
				r="20"
				fill="none"
				stroke-width="4"
				stroke-miterlimit="10"
			/>
		</svg>
	</div>
</template>

<style scoped lang="scss">
	.loader {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 20%;
		margin: 0 auto;
		aspect-ratio: 1/1;

		.circular {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			margin: auto;
			transform-origin: center center;
			transform: rotate(-90deg);
		}

		.inner-path {
			animation:
				dash 1s linear infinite,
				color 1s linear infinite;
			stroke-dasharray: 0, 240;
			stroke-dashoffset: 0;
			stroke-linecap: round;
		}

		.path {
			stroke: gray;
		}

		.inner-path {
			stroke: #4fa2f7;
		}
	}
	@keyframes dash {
		50% {
			stroke-dasharray: 250, 250;
		}
		100% {
			stroke-dasharray: 10, 250;
		}
	}

	@keyframes color {
		0% {
			color: #fff;
			stroke: #4fa2f7;
		}

		66% {
			color: #d84eaf;
			stroke: #d84eaf;
		}

		100% {
			color: #fff;
			stroke: #4fa2f7;
		}
	}
</style>

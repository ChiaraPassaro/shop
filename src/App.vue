<script setup lang="ts">
	import { RouterView } from "vue-router"
	import HeaderRow from "~/HeaderRow.vue"
	import FooterRow from "~/FooterRow.vue"
</script>

<template>
	<HeaderRow />
	<RouterView />
	<FooterRow />
</template>

<style scoped></style>

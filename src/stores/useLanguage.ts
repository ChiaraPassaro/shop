import { defineStore } from "pinia"

export const useLanguage = defineStore("loader", {
	state: () => {
		return {
			selectedLang: { label: "Ita", value: "it-IT" },
			languages: [{ label: "Ita", value: "it-IT" }],
		}
	},
})

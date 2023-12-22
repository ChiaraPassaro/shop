export type CategoryName =
	| "Clothes"
	| "Shoes"
	| "Fashion Clothes"
	| "Electronics"
	| "Furniture"
	| "Miscellaneous"
	| "Artwork"
	| "Camera"
	| "Books"

export type Category = {
	id: string
	name: CategoryName
	image: string
}

export type Product = {
	id: number
	title: string
	price: number
	description: string
	category: Category
	creationAt: string
	images: string[]
	code: string
	brand?: string
	discount?: number
	colorsLength?: number
	isNew?: boolean
	guarantee?: number
	available?: boolean
	strengths?: string[]
	sizes?: string[]
}

export type Filter = "price_min" | "price_max" | "only_available"

export type ImageMapped = {
	src: string
	completed: boolean
}

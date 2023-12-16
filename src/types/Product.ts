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
	id: number
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
	brand?: string
	discount?: number
	colorsLength?: number
	isNew?: boolean
}

export type Filter = "price_min" | "price_max" | "only_available"

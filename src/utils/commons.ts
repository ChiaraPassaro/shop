export const getImage = (src: string) => {
	const img = new Image()
	img.src = src
	return img
}

export const getRandom = (min: number, max: number) => {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getSevenDaysAgo = () => new Date(new Date().setDate(new Date().getDate() - 7))

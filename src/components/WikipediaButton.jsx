import { useState } from "react"

export default function WikipediaButton({ handleLoading }) {
	const [wikiText, setWikiText] = useState("")

	const fetchRandomPage = async (event) => {
		handleLoading(true)
		let response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
		let data = await response.json()

		const title = data["titles"]["canonical"]
		response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${title}&rvslots=*&rvprop=content&formatversion=2&format=json&origin=*`)
		data = await response.json()
		const wikiText = data["query"]["pages"][0]["revisions"][0]["slots"]["main"]["content"]
		setWikiText(wikiText)
		handleLoading(false)
	}

	return (
		<button type="button" onClick={fetchRandomPage} className="btn-ui">Surprise me</button>
	)
}
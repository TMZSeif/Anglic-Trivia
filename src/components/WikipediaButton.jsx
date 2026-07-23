import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DOMPurify from 'dompurify'

export default function WikipediaButton({ handleLoading }) {
	const navigate = useNavigate()

	const fetchRandomPage = async (event) => {
		handleLoading(true)
		let response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary")
		let data = await response.json()

		const title = data["titles"]["canonical"]
		response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=${title}&rvslots=*&rvprop=content&formatversion=2&format=json&origin=*`)
		data = await response.json()
		console.log(data)
		const wikitext = data["query"]["pages"][0]["revisions"][0]["slots"]["main"]["content"]

		response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&title=${title}&contentmodel=wikitext&disableeditsection=true&disablelimitreport=true&format=json&origin=*`, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			body: new URLSearchParams({
				text: wikitext
			})
		})
		data = await response.json()
		let htmltext = data["parse"]["text"]["*"].replaceAll('\\"', "'")
		htmltext = DOMPurify.sanitize(htmltext)

		handleLoading(false)
		navigate("/wikipedia", { state: { htmltext: htmltext, title: title } })
	}

	return (
		<button type="button" onClick={fetchRandomPage} className="btn-ui">Surprise me</button>
	)
}
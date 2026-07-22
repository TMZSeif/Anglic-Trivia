import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

export default function WikipediaPage() {
	const location = useLocation()
	const wikitext = location.state?.wikitext
	const title = location.state?.title
	const [htmltext, setHtmltext] = useState("")

	useEffect(() => {
		async function parseText() {
			console.log(wikitext)
			const response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&title=${title}&contentmodel=wikitext&disablelimitreport=true&format=json&origin=*`, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: new URLSearchParams({
					text: wikitext
				})
			})
			const data = await response.json()
			let htmltext = data["parse"]["text"]["*"].replaceAll('\\"', "'")
			htmltext = DOMPurify.sanitize(htmltext)
			setHtmltext(htmltext)
			console.log(htmltext)
		}
		parseText()
	}, [])


	return (
		<div dangerouslySetInnerHTML={{ __html: htmltext}}>
		</div>
	)
}
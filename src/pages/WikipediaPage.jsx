import { useLocation } from 'react-router-dom'
import style from '../wikipedia.module.css'
import { useEffect, useState } from 'react'

export default function WikipediaPage() {
	const location = useLocation()
	const wikitext = location.state?.wikitext
	const title = location.state?.title
	const [htmltext, setHtmltext] = useState("")

	useEffect(() => {
		async function parseText() {
			console.log(wikitext)
			const response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&page=${title}&format=json&origin=*`)
			const data = await response.json()
			console.log(data)
		}
		parseText()
	}, [])


	return (
		<div></div>
	)
}
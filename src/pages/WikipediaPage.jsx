import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

export default function WikipediaPage() {
	const location = useLocation()
	const wikitext = location.state?.wikitext
	const titleLink = location.state?.title
	const [htmltext, setHtmltext] = useState("")
	const [title, setTitle] = useState(titleLink)

	useEffect(() => {
		async function parseText() {
			console.log(wikitext)
			const response = await fetch(`https://en.wikipedia.org/w/api.php?action=parse&title=${titleLink}&contentmodel=wikitext&disableeditsection=true&disablelimitreport=true&format=json&origin=*`, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				body: new URLSearchParams({
					text: wikitext
				})
			})
			const data = await response.json()
			console.log(data)
			let htmltext = data["parse"]["text"]["*"].replaceAll('\\"', "'")
			htmltext = DOMPurify.sanitize(htmltext)
			setHtmltext(htmltext)
		}
		parseText()
	}, [])


	return (
		<div className='mw-page-container'>
			<div className='my-content-container'>
				<main id='content' className='mw-body'>
					<header className='mw-body-header vector-page-titlebar no-font-mode-scale'>
						<h1 id='firstHeading' className='firstHeading mw-first-heading'>
							<span lang='en' dir='ltr'>
								<span className='mw-page-title-main'>{title.replace("_", " ")}</span>
							</span>
						</h1>
					</header>
					<div id='bodyContent' className='vector-body ve-init-mw-desktopArticleTarget-targetContainer' aria-labelledby='firstHeading' data-me-ve-target-container>
						<div className='vector-body-before-content'>
							<div id='siteSub' className='noprint'>From Wikipedia, the free encyclopedia</div>
						</div>
						<div id='mw-content-text' className='mw-body-content'>
							<div dangerouslySetInnerHTML={{__html: htmltext}}></div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
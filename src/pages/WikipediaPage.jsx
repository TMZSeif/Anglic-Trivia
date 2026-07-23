import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'

export default function WikipediaPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const wikitext = location.state?.wikitext
	const titleLink = location.state?.title
	const [htmltext, setHtmltext] = useState("")
	const [title, setTitle] = useState(titleLink)

	useEffect(() => {
		async function parseText() {
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
			let htmltext = data["parse"]["text"]["*"].replaceAll('\\"', "'")
			htmltext = DOMPurify.sanitize(htmltext)
			setHtmltext(htmltext)

			const parser = new DOMParser()
			const doc = parser.parseFromString(htmltext, 'text/html')
			const walker = document.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT, (node) => {
				if (node.parentElement.tagName === "STYLE") {
					return NodeFilter.FILTER_REJECT
				}
				else {
					return NodeFilter.FILTER_ACCEPT
				}
			})

			while (walker.nextNode()) {
				console.log(walker.currentNode.data)
			}
		}
		parseText()
	}, [])

	const goBack = (event) => {
		navigate("/")
	}


	return (
		<div className='mw-page-container'>
			<div className='my-content-container'>
				<main id='content' className='mw-body'>
					<header className='mw-body-header vector-page-titlebar no-font-mode-scale'>
						<button type='button' onClick={goBack} role='button' className='btn btn-dark'>&larr;</button>
						<h1 id='firstHeading' className='firstHeading mw-first-heading'>
							<span lang='en' dir='ltr'>
								<span className='mw-page-title-main'>{title.replaceAll("_", " ")}</span>
							</span>
						</h1>
					</header>
					<div id='bodyContent' className='vector-body ve-init-mw-desktopArticleTarget-targetContainer' aria-labelledby='firstHeading' data-me-ve-target-container>
						<div className='vector-body-before-content'>
							<div id='siteSub' className='noprint'>From Wikipedia, the free allkennbook</div>
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
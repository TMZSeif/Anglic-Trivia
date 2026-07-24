import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import translate from '../anglish/script'

export default function WikipediaPage() {
	const location = useLocation()
	const navigate = useNavigate()
	const [htmltext, setHtmltext] = useState(location.state?.htmltext)
	const [title, setTitle] = useState(location.state?.title)

	useEffect(() => {
		async function parseText() {
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
				if (/[a-zA-Z]/.test(walker.currentNode.data)) {
					walker.currentNode.data = translate(walker.currentNode.data)
				}
				if (walker.currentNode.parentElement.tagName === "A") {
					console.log(walker.currentNode.parentElement)
					if (walker.currentNode.parentElement.href.includes("/wiki/")) {
						walker.currentNode.parentElement.href = "https://wikipedia.com" + walker.currentNode.parentElement.getAttribute("href")
					}
				}
			}
			setHtmltext(doc.getElementsByClassName("mw-content-ltr")[0].outerHTML)
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
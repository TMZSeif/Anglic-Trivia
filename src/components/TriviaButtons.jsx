import WikipediaButton from "./WikipediaButton"

export default function TriviaButtons() {
	return (
		<div className="d-flex flex-column button-layout">
			<WikipediaButton />
			<button type="button" className="btn-ui">Give me a word</button>
			<button type="button" className="btn-ui">Atrocities</button>
		</div>
	)
}
import { useState } from "react"
import WikipediaButton from "./WikipediaButton"

export default function TriviaButtons() {
	const [loading, setLoading] = useState(false)

	const handleLoading = (pressed) => {
		setLoading(pressed)
	}

	return (
		<div className="d-flex flex-column button-layout">
			{loading ? <div class="spinner-border spinner text-info" role="status">
				<span class="visually-hidden">Loading...</span>
			</div> : <>
				<WikipediaButton handleLoading={handleLoading} />
				<button type="button" className="btn-ui">Give me a word</button>
				<button type="button" className="btn-ui">Atrocities</button></>
			}
		</div>
	)
}
import { useState } from "react"
import WikipediaButton from "./WikipediaButton"
import MariamWebsterButton from "./MariamWebsterButton"

export default function TriviaButtons() {
	const [loading, setLoading] = useState(false)

	const handleLoading = (pressed) => {
		setLoading(pressed)
	}

	return (
		<div className="d-flex flex-column button-layout">
			{loading ? <div className="spinner-border spinner text-info" role="status">
				<span className="visually-hidden">Loading...</span>
			</div> : <>
				<WikipediaButton handleLoading={handleLoading} /></>
			}
		</div>
	)
}
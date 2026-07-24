import TriviaButtons from "../components/TriviaButtons"

export default function HomePage() {
	return (
		<div className="home">
			<h1 className="title">Anglicized Trivia</h1>
			<div className="d-flex justify-content-center align-items-center btn-container">
				<TriviaButtons />
			</div>
		</div>
	)
}
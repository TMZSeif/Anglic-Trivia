import TriviaButtons from "../components/TriviaButtons"

export default function HomePage() {
	return (
		<div className="home">
			<h1 className="title">Anglicized Trivia</h1>
			<h5 className="title">Press this button and get a random Wikipedia page in Anglish!</h5>
			<div className="d-flex justify-content-center align-items-center btn-container">
				<TriviaButtons />
			</div>
		</div>
	)
}
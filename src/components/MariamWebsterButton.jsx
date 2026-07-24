import { useState } from "react"
import { useNavigate } from "react-router-dom"
import DOMPurify from 'dompurify'

export default function MariamWebsterButton({ handleLoading }) {
	const navigate = useNavigate()

	const fetchRandomPage = async (event) => {
		handleLoading(true)
		let response = await fetch("https://random-word-api.herokuapp.com/word")
		const word = await response.json()

		response = await fetch(`https://xjv9c1jji3.execute-api.us-east-1.amazonaws.com/deploy/mariam_webster_proxy?word=${word}`)
		const data = await response.json()
		console.log(data)
		console.log("word:", word)

		handleLoading(false)
	}

	return (
		<button type="button" onClick={fetchRandomPage} className="btn-ui">Give me a word</button>
	)
}
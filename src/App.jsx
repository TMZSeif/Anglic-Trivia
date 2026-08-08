import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WikipediaPage from './pages/WikipediaPage'

function App() {

	return (
		<BrowserRouter basename='/Anglic-Trivia'>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/wikipedia' element={<WikipediaPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App

import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WikipediaPage from './pages/WikipediaPage'

function App() {

	return (
		<>
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/wikipedia' element={<WikipediaPage />} />
			</Routes>
		</>
	)
}

export default App

import { v4 as uuidv4 } from 'uuid'
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom'
import { useState } from 'react'
import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'
import AboutPage from './pages/AboutPage'
import AboutIconLink from './components/AboutIconLink'

function App() {
	const [feedback, setFeedback] = useState(FeedbackData)
	const deleteFeedback = (id) => {
		//console.log('App', id)
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}

	const addFeedback = (newItem) => {
		newItem.id = uuidv4()
		setFeedback([newItem, ...feedback])
	}

	return (
		<Router>
			<Header></Header>
			<div className='container'>
				<Routes>
					<Route
						exact
						path='/'
						element={
							<>
								<FeedbackForm handleAdd={addFeedback} />
								<FeedbackStats feedback={feedback} />
								<FeedbackList
									feedback={feedback}
									// handleDelete={(id) => console.log(id)}
									handleDelete={deleteFeedback}
								/>
							</>
						}
					></Route>
					<Route path='/about' element={<AboutPage />}>
						This is the about route
					</Route>
				</Routes>
				<AboutIconLink />
			</div>
		</Router>
	)
}

export default App

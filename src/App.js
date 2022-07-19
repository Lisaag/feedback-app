import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import Header from './components/Header'
import FeedbackData from './data/FeedbackData'
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import FeedbackForm from './components/FeedbackForm'

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
		<>
			<Header></Header>
			<div className='container'>
				<FeedbackForm handleAdd={addFeedback} />
				<FeedbackStats feedback={feedback} />
				<FeedbackList
					feedback={feedback}
					// handleDelete={(id) => console.log(id)}
					handleDelete={deleteFeedback}
				/>
			</div>
		</>
	)
}

export default App

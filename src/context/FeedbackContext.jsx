import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'
import FeedbackData from '../data/FeedbackData'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState(FeedbackData)

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	//Add feedback item
	const addFeedback = (newItem) => {
		newItem.id = uuidv4()
		setFeedback([newItem, ...feedback])
	}

	//Delete feedback item
	const deleteFeedback = (id) => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter((item) => item.id !== id))
		}
	}

	//Update feedback item
	const updateFeedback = (id, updItem) => {
		setFeedback(
			feedback.map((item) =>
				item.id === id ? { ...item, ...updItem } : item
			)
		)
		setFeedbackEdit({
			item: {},
			edit: false,
		})
	}

	//Set item to be updated
	const editFeedback = (item) => {
		setFeedbackEdit({
			item,
			edit: true,
		})
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback: feedback,
				deleteFeedback: deleteFeedback,
				addFeedback: addFeedback,
				editFeedback: editFeedback,
				feedbackEdit: feedbackEdit,
				updateFeedback: updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext

import { useState, useContext, useEffect } from 'react'
import RatingSelect from './RatingSelect'
import Card from './shared/Card'
import Button from './shared/Button'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
	const { addFeedback, feedbackEdit, updateFeedback } =
		useContext(FeedbackContext)

	useEffect(() => {
		if (feedbackEdit.edit === true) {
			setBtnDisabled(false)
			setText(feedbackEdit.item.text)
			setRating(feedbackEdit.item.rating)
		}
	}, [feedbackEdit])

	const [text, setText] = useState('')
	const [rating, setRating] = useState(10)
	const [btnDisabled, setBtnDisabled] = useState(true)
	const [message, setMessage] = useState('')

	const handleTextChange = (e) => {
		let newText = e.currentTarget.value
		if (newText === '') {
			setBtnDisabled(true)
			setMessage(null)
		} else if (newText !== '' && newText.trim().length < 10) {
			setBtnDisabled(true)
			setMessage('Text must be at least 10 characters')
		} else {
			setBtnDisabled(false)
			setMessage(null)
		}
		setText(e.target.value)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (!btnDisabled) {
			const newFeedback = {
				rating: rating,
				text: text,
			}

			if (feedbackEdit.edit === true) {
				updateFeedback(feedbackEdit.item.id, newFeedback)
			} else {
				addFeedback(newFeedback)
			}
			console.log(newFeedback)

			setText('')
		}
	}

	return (
		<Card>
			<form onSubmit={handleSubmit}>
				<h2>How would you rate your service with us?</h2>
				<RatingSelect select={(rating) => setRating(rating)} />
				<div className='input-group'>
					<input
						onChange={handleTextChange}
						type='text'
						placeholder='Write a review'
						value={text}
					></input>
					<Button type='submit' isDisabled={btnDisabled}>
						Send
					</Button>
				</div>

				{message && <div className='message'>{message}</div>}
			</form>
		</Card>
	)
}

export default FeedbackForm

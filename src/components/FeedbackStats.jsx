import PropTypes from 'prop-types'

function FeedbackStats({ feedback }) {
	//Calculate ratings avg
	let average =
		feedback.reduce((acc, cur) => {
			return acc + cur.rating
		}, 0) / feedback.length

	average = average.toFixed(1).replace(/[.,]0$/, '') //regular expression

	return (
		<div className='feedback-stats'>
			<h4>{feedback.length} Reviews</h4>
			<h4>Avarage Rating: {isNaN(average) ? 0 : average}</h4>
		</div>
	)
}

FeedbackStats.propTypes = {
	feedback: PropTypes.array.isRequired,
}

export default FeedbackStats

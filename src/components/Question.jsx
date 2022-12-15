import React from 'react'

export default function Question(props) {
  
  const shuffledAnswers = props.answers.map(answer =>{
    const styles = {
      backgroundColor: (props.finish && props.correct_answer === answer.answer && answer.isSelected) ? "#94D7A2" : 
      (props.finish && props.correct_answer !== answer.answer && answer.isSelected) ? "#F8BCBC" :
      (answer.isSelected) ? "#D6DBF0" : "",
      border: answer.isSelected ? 'none' : '',
      pointerEvents: props.finish ? 'none' : ''
    }
    return(
      <div 
        key={answer.answerId}
        id={answer.answerId}
        style={styles}
        onClick={() => props.answerSelected(answer.answerId, props.id)}
        className="answer"
      >{answer.answer}</div>)});


  return(
    <div className="question">
      <h3>{props.question}</h3>
      <div className="answers">
        {shuffledAnswers}
      </div>
    </div>
  )
}
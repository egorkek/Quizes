import React from 'react'
import classes from './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'
const ActiveQuiz = (props)=>{

    return(
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
                <span>
                    <strong>{props.answerNumber} </strong>
                    {props.question}
                </span>
                <small> {props.answerNumber} of {props.quizLength} </small>
            </p>

            <AnswersList
            answers={ props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
            onRetry={props.onRetry}

            />
        </div>
    )

};

export default ActiveQuiz
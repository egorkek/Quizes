import React from 'react'
import classes from './AnswersList.css'
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = (props) =>{

    return(
        <ul className={classes.AnswerList}>
            {props.answers.map((answer, index) =>{
                return(
                    <AnswerItem
                    answer={answer}
                    key={index}
                    onAnswerClick={props.onAnswerClick}
                        state={props.state ? props.state[answer.id] : null}

                    />
                )

            })}
        </ul>
    )
};

export default AnswerList
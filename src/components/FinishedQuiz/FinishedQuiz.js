import React from 'react'
import classes from './FinishedQuiz.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'

const FinishedQuiz = props => {
    let Counter = ()=>{
        let count = 0;
        for (let item in props.results){
            if(props.results[item] === 'success')
                count++;

        }
      return count;

    };


    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    let cls =['fa', props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check', classes[props.results[quizItem.id]]];
                    return(
                    <li
                    key={index}> <strong>{index+1}. </strong>
                        {quizItem.question}
                        <i className={cls.join(' ')}/>

                    </li>

                    );

                })}
            </ul>

            <p>Правильно {Counter()} из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type='primary'>Повторить</Button>
                <Link to='/'><Button type='success'>Перейти в список тестов</Button></Link>
            </div>
        </div>
    )
};

export default FinishedQuiz
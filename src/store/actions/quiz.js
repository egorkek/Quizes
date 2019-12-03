import axios from '../../axios/axios-quiz'
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS, IS_QUIZ_FINISHED,
  NEXT_QUESTION, QUIZ_SET_STATE, RETRY_HANDLER
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {

    dispatch(fetcQuizesStart());
    try {
      const response = await axios.get('quizes.json');
      const quizes = [];
      Object.keys(response.data).forEach((key, index)=>{
        quizes.push({id: key, name:`Тест №${index+1}`})
      });
      dispatch(fetcQuizesSuccess(quizes))
    }
    catch (e) {
      fetcQuizesError(e)
    }
  }
}

export function fetcQuizesStart() {
  return {
    type:FETCH_QUIZES_START
  }
};

export function fetcQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes: quizes
  }
};

export function fetcQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
};

export function fetchQuizById(quizID) {
  return async dispatch => {
    dispatch(fetcQuizesStart());
    try {
      const response = await axios.get(`quizes/${quizID}.json`);
      const quiz = response.data;
      dispatch(fetchQuizSuccess(quiz))
    }catch (e) {
      dispatch(fetcQuizesError(e))
    }
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz: quiz
  }
}

export function quizSetState(results, answerState) {
  return {
    type:QUIZ_SET_STATE,
    answerState, results
  }
}
export function isQuizFuinished() {
  return {
    type:IS_QUIZ_FINISHED,
  }
}

export function nextQuestion(number) {
  return {
    type:NEXT_QUESTION,
    number
  }
}

function isQuizFinished(state) {
  return state.activeQuestion+1 === state.quiz.length
}

export function quizAnswerClick(AnswerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if(state.answerState) {
      let key = Object.keys(state.answerState)[0];
      if (key === 'success'){
        return
      }
    }
    const results = state.results;
    const question = state.quiz[state.activeQuestion];
    if (question.rightAnswerId === AnswerId) {
      if(!results[question.id]) results[question.id ] = 'success';
      dispatch(quizSetState(results,{[AnswerId]: 'success'}));
      const timeout = window.setTimeout(()=> {
        if (isQuizFinished(state)) {
          dispatch(isQuizFuinished())
        }
        else {
          // this.setState({
          //     activeQuestion: state.activeQuestion + 1,
          //     answerState: null
          // });
          dispatch(nextQuestion(state.activeQuestion +1))
        }
        clearTimeout(timeout);
      },500);
    }
    else {
      results[question.id] = 'error';
      dispatch(quizSetState(results, {[AnswerId]: 'error'}))
    }
  }
}

export function retryHandler() {
  return {
    type:RETRY_HANDLER,
  }
}
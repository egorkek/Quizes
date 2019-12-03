import {CREATE_QUIZ_QUESTION, RESERT_QUIZ} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
  // return (dispatch, getState)=>{
  //     const state = getState().create.quiz;
  //     state.push(item);
  //     dispatch(addQuestion(state));
  //
  // }
  return {
    type:CREATE_QUIZ_QUESTION,
    item
  }
};

function resertQuiz() {
  return {
    type: RESERT_QUIZ
  }
}

export function finishCreateQuiz() {
  return async (dispatch,getState)=>{
    await axios.post('quizes.json', getState().create.quiz);
    dispatch(resertQuiz())
  }
}
import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  IS_QUIZ_FINISHED, NEXT_QUESTION, QUIZ_SET_STATE, RETRY_HANDLER
} from "../actions/actionTypes";

const initialState = {
  quizes: [],
  error: null,
  isFinished: false,
  results: {},
  activeQuestion:0,
  answerState: null,
  quiz: null,
  loading: true
};

export default function quizReducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return{
        ...state, loading: true
      };
    case FETCH_QUIZES_SUCCESS:
      return{
        ...state, quizes: action.quizes, loading: false
      };
    case FETCH_QUIZES_ERROR:
      return{
        ...state, loading: false, error: action.error
      };
    case FETCH_QUIZ_SUCCESS:
      return{
        ...state, loading: false, quiz:action.quiz
      };
    case IS_QUIZ_FINISHED:
      return{
        ...state, isFinished: true
      };
    case QUIZ_SET_STATE:
      return{
        ...state, answerState: action.answerState, results: action.results
      };
    case NEXT_QUESTION:
      return{
        ...state, activeQuestion: action.number, answerState: null
      };
    case RETRY_HANDLER:
      return{
        ...state,
        isFinished: false,
        results: {},
        activeQuestion:0,
        answerState: null,
      };
    default:
      return state
  }
}
import axios from '../../axios/azios-quiz';
import {
    FETCH_QUIZES_START, 
    FETCH_QUIZES_SUCCESS, 
    FETCH_QUIZES_ERROR, 
    FETCH_QUIZ__SUCCESS,
    QUIZ_SET_STATE, 
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY
} from './actionTypes';
export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json');

            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Tecn №${index + 1}`
                })
            });
            dispatch(fetchQuizesSuccess(quizes));
        } catch (e) {
            dispatch(fetchQuizesError(e));
        }
    }
}
export function fetchQuizById(quizId) {
    return async dispatch => {
        dispatch(fetchQuizesStart()) 
        try {
            const response = await axios.get(`/quizes/${quizId}.json`);
            const quiz = response.data;

            dispatch(fetchQuizSuccess(quiz))
        } catch (error) {
            dispatch(fetchQuizesError(error))
        }
    }
}
export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizSuccess (quiz) {
    return {
        type: FETCH_QUIZ__SUCCESS,
        quiz
    }
}

export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}
export function quizeNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}
export function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length;
}
export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        const changeQuestion = () => {
            const timeout = window.setTimeout(() => {
                if (isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizeNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout);
            }, 1000);
        }
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') return;
        }
        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success';
            }
            dispatch(quizSetState({[answerId]: 'success'}, results));
            changeQuestion();
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
            changeQuestion();
        }
    }
}
export function retryQuiz () {
    return {
        type: QUIZ_RETRY,
    }
}
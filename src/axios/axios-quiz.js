import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-d5bea.firebaseio.com/'
})
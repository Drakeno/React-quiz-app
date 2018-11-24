import Axios from 'axios'

export default Axios.create({
    baseURL: 'https://react-quiz-bfb49.firebaseio.com/'
})
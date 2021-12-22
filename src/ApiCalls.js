const axios = require('axios');

const createUser = (user) => {
    return axios.post('https://fedstation.herokuapp.com/createUser', user)
}

const getUserDetails = async (userId) => {

    return axios.get('http://fedstation.herokuapp.com/userDetails?userId=' + userId)

}

export {
    createUser,
    getUserDetails

};
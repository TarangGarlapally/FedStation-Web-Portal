const axios = require('axios');

const createUser = (user) => {
    return axios.post('https://fedstation.herokuapp.com/createUser', user)
}

const getUserDetails = async (userId) => {
    return axios.get('https://fedstation.herokuapp.com/userDetails?userId=' + userId)
}


const createProject = (project) => {
    console.log(project)
    return axios.post('https://fedstation.herokuapp.com/createProject', project)
}

const checkProjectIdExists = (projectId) => {
    return axios.get('https://fedstation.herokuapp.com/projectIdExists?projectId=' + projectId)
}

const getProjectDetails = (projectId) => {
    return axios.get("http://fedstation.herokuapp.com/getProject/" + projectId)
}

export {
    createUser,
    getUserDetails,
    createProject,
    checkProjectIdExists,
    getProjectDetails
};
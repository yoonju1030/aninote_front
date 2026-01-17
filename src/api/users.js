import common from "../utils/common";

async function checkDuplicatedId(params) {
    const value = await common.axiosCall("POST", "/users/check_id", params);
    return value.result
}

async function signUpUser(params) {
    const value = await common.axiosCall("POST", "/users/signup", params);
    console.log(value.message)
    return value.result
} 

async function logInUser(params) {
    const value = await common.axiosCall("POST", "/users/login", params);
    return value
}

async function logOutUser(params, token) {
    const value = await common.axiosCall("POST", '/users/logout', params, token)
    console.log(value)
}
export {
    checkDuplicatedId,
    signUpUser,
    logInUser,
    logOutUser
}
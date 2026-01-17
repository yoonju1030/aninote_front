import common from "../utils/common";

async function getAnimes() {
    const value = await common.axiosCall("GET", "/anime/get_anime");
    return value.message
}

async function postAnime(params) {
    const value = await common.axiosCall("POST", "/anime/get_info", params);
    return value.message
}

async function createCommentAPI(params, token) {
    const value = await common.axiosCall("POST", '/comments/create', params, token)
    console.log(value)
}

async function getComments(params) {
    const value = await common.axiosCall("POST", "/comments/get_comments", params)
    return value.result
}

async function getCommentsByUser(params, token) {
    const value = await common.axiosCall("POST", "/comments/get_comment_by_users", params, token)
    return value.result
}

export {
    getAnimes, 
    postAnime, 
    createCommentAPI,
    getComments,
    getCommentsByUser
}
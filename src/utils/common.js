import axios from 'axios';
import CryptoJS from "crypto-js";
import store from "../store";

const axiosService = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const axiosCall = async (method, url, params = {}, token = false, errorFunc=false) => {
    let axios = axiosService;
    let option = {}
    if (token !== false) {
        option['headers'] = {Authorization: `Bearer ${token.access_token}`}
    } else {
        option['withCredentials'] = true
    }
    let returnValue = {}
    switch (method) {
        case "GET":
            await axios
            .get(url,option)
            .then((res) => {
                returnValue = res.data
            })
            .catch((err) => {
                if (errorFunc) {
                    errorFunc(err)
                } else {
                    if (err.response && err.response.status == 401) {
                        store.commit("userStore/setLogout")
                        window.location.href = '/'
                    }
                    return err
                }
            })
            break;

        case "POST": 
            await axios
            .post(url,params,option)
            .then((res) => {
                returnValue = res.data
            })
            .catch((err) => {
                if (errorFunc) {
                    errorFunc(err)
                } else {
                    if (err.response && err.response.status == 401) {
                        store.commit("userStore/setLogout")
                        window.location.href = '/'
                    }
                    return err
                }
            })
    }
    return returnValue
}

const encryptData = async (data) => {
    let key = process.env.VUE_APP_CRYPTOJS_KEY;
    if (key.length < 16) {
      key = key.padEnd(16, '0');
    }
  
    let keyBytes = CryptoJS.enc.Utf8.parse(key);
    const messageBytes = CryptoJS.enc.Utf8.parse(data);
  
    const encrypted = CryptoJS.AES.encrypt(messageBytes, keyBytes, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    })
  
    return encrypted.toString();
  }

const commonObj = {
    axiosCall,
    encryptData
}

export default commonObj;
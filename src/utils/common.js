import axios from 'axios';

const axiosService = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

const axiosCall = async (method, url, params = {}, errorFunc=false) => {
    let axios = axiosService;
    let option = { withCredentials: true };
    switch (method) {
        case "GET":
            await axios
            .get(url,option)
            .then((res) => {
                return res
            })
            .catch((err) => {
                if (errorFunc) {
                    errorFunc(err)
                } else {
                    return err
                }
            })
            break;

        case "POST": 
            await axios
            .post(url,params,option)
            .then((res) => {
                return res
            })
            .catch((err) => {
                if (errorFunc) {
                    errorFunc(err)
                } else {
                    return err
                }
            })

    }
}

const commonObj = {
    axiosCall
}

export default commonObj;
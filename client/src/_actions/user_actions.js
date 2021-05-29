import Axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from './types';

export const registerUser = async(dataToSubmit) => {
    const registerResult = await Axios.post(`${process.env.REACT_APP_USER_SERVER}/register`, dataToSubmit);
    const registerData = registerResult.data;
    
    return {
        type: REGISTER_USER,
        payload: registerData
    }
}

export const loginUser = async(dataToSubmit) => {
    const loginResult = await Axios.post(`${process.env.REACT_APP_USER_SERVER}/login`, dataToSubmit);
    const loginData = loginResult.data;

    return {
        type: LOGIN_USER,
        payload: loginData
    }
}

export const auth = async() => {
    const authResult = await Axios.get(`${process.env.REACT_APP_USER_SERVER}/auth`);
    const authData = authResult.data;

    return {
        type: AUTH_USER,
        payload: authData
    }
}

export const logoutUser = async() => {
    const logoutRequest = await Axios.get(`${process.env.REACT_APP_USER_SERVER}/logout`);
    const logoutData = logoutRequest.data;

    return {
        type: LOGOUT_USER,
        payload: logoutData
    }
}


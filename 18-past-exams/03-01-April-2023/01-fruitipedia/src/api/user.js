import { setUserData, clearUserData } from "../util.js";
import { get, post } from "./api.js";

const userEndpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout'
}

export async function login(email, password) {
    const { _id, email: resultEmail, accessToken } = await post(userEndpoints.login, { email, password }); // '/users/login'

    setUserData({
        _id,
        email: resultEmail,
        accessToken
    });
}

export async function register(email, password) {
    const { _id, email: resultEmail, accessToken } = await post(userEndpoints.register, { email, password }); // '/users/register'

    setUserData({
        _id,
        email: resultEmail,
        accessToken
    });
}

export async function logout() {
    get(userEndpoints.logout); // '/users/logout'
    clearUserData();
}
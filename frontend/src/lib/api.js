import axios from 'axios';

const LOGIN_URL = "api/auth/login";
const REGISTER_URL = "api/auth/register";

export const login = async (id, pw) => await axios.post(LOGIN_URL, { userid: id, password: pw });

export const register = async (id, pw) => {
    try {
        const result = await axios.post(REGISTER_URL, { userid: id, password: pw });
        return result;
    } catch (error) {
        console.error(error);
    }

}
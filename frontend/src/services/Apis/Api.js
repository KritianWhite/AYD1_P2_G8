import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const parse = async(value) => {
    const {data} = await instance.post('/parse2', {peticion: value});
    return data;
}

export const ping = async() => {
    const {data} = await instance.get('/ping');
    return data;
}
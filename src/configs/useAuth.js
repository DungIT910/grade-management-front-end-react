import { useCookies } from 'react-cookie';
import { BASE_URL } from './APIs';
import axios from 'axios';

export const useAuth = () => {
    const [cookies, setCookies] = useCookies(['token']);

    const authApi = () => {
        return axios.create({
            baseURL: BASE_URL,
            headers: {
                'Authorization': `Bearer ${cookies.token}`
            }
        });
    };

    return authApi;
};

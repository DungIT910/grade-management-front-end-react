import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const useTokenManager = () => {
    const [cookies, setCookies, removeCookies] = useCookies(['token']);

    const getTokenExpiration = (token) => {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.exp;
    };

    useEffect(() => {
        const checkToken = () => {
            const token = cookies.token;
            if (token) {
                const expiration = getTokenExpiration(token);
                console.info(expiration)
                if (expiration < Math.floor(Date.now() / 1000)) {
                    removeCookies('token');
                }
            }
        };

        checkToken();

        const interval = setInterval(checkToken, 60000);

        return () => clearInterval(interval); 
    }, [cookies.token, removeCookies]);

    return null;
};

export default useTokenManager;

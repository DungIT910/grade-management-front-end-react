import { MyDispatchContext, MyUserContext } from "configs/Contexts";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useContext, memo } from "react";
import { useCookies } from "react-cookie";
import { Outlet, useNavigate } from "react-router-dom";

const TokenChecker = () => {
	const [cookies, removeCookies] = useCookies(["token"]);
	const navigate = useNavigate();
	const userDispatch = useContext(MyDispatchContext);
	const currentUser = useContext(MyUserContext);

	useEffect(() => {
		const checkToken = () => {
            console.log("token checking is running");
            const token = cookies.token;
            const storedUser = localStorage.getItem("currentUser");
        
            if (!isTokenValid(token)) {
                clearInformation(token);
                return;
            }
        
            if (!currentUser) {
                userDispatch({
                    type: "login",
                    payload: JSON.parse(storedUser),
                });
            }
        };
        
        const clearInformation = (token) => {
            let currentPath = window.location.pathname;
            localStorage.removeItem("currentUser");
            if (token && token !== "undefined")
                removeCookies("token");     
            userDispatch({ type: "logout" });
            if (currentPath !== "/login" && currentPath !== "/register") {
                navigate("/login");
            }
        };
        

		const isTokenValid = (token) => {
			try {
				if (!token || token === "undefined") {
                    console.log("token bang chuoi undefined")
					return false;
				}
				const decoded = jwtDecode(token); 
				const currentTime = Math.floor(Date.now() / 1000);
				return decoded.exp > currentTime; 
			} catch (error) {
				console.error("Token is invalid:");
				return false;
			}
		};

		checkToken();
		const interval = setInterval(checkToken, 5000);

		return () => clearInterval(interval);
	}, [cookies.token]);

	return (    
		<>
			<Outlet />
		</>
	);
};

export default TokenChecker;

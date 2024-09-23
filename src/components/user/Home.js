import React, { useContext, useEffect } from "react";
import AdminHome from "./admin/AdminHome";
import StudentHome from "./student/StudentHome";
import LecturerHome from "./lecturer/LecturerHome";
import { MyDispatchContext, MyUserContext } from "configs/Contexts";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { authAPIs } from "configs/APIs";
import { useAuth } from "configs/useAuth";
const Home = () => {
	const currentUser = useContext(MyUserContext);
	const [cookies, setCookies] = useCookies(["token"]);
	const dispatch = useContext(MyDispatchContext);
	const authApi = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			if (cookies.token) {
				try {
					let u = await authApi().get(authAPIs["current-user"]);
					dispatch({ type: "login", payload: u.data });
				} catch (error) {
					console.error("Failed to fetch user:", error);
				}
			} else {
				navigate("/login");
			}
		};

		if (currentUser === null) {
			fetchUser();
		}
	}, [cookies.token, currentUser]);

	if (currentUser !== null) {
		const role = currentUser.role;

		if (role === "admin") return <AdminHome />;
		if (role === "student") return <StudentHome />;
		if (role === "lecturer") return <LecturerHome />;
	}

	return <div>Unauthorized</div>;
};

export default Home;

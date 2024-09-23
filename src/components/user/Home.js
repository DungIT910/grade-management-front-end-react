import React, { useContext, useEffect } from "react";
import AdminHome from "./admin/AdminHome";
import StudentHome from "./student/StudentHome";
import LecturerHome from "./lecturer/LecturerHome";
import { MyUserContext } from "configs/Contexts";
import { useNavigate } from "react-router-dom";
const Home = () => {
	const currentUser = useContext(MyUserContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser === null) {
			navigate("/login");
		}
	}, [currentUser]);

	if (currentUser !== null) {
		const role = currentUser.role;

		if (role === "admin") return <AdminHome />;
		if (role === "student") return <StudentHome />;
		if (role === "lecturer") return <LecturerHome />;
	}

	return <div>Unauthorized</div>;
};

export default Home;

import React, { useReducer } from "react";
import "./App.css";
import Footer from "components/commons/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/user/Login";
import { MyDispatchContext, MyUserContext } from "configs/Contexts";
import { MyUserReducer } from "configs/Reducers";
import Register from "components/user/Register";
import AdminHome from "components/user/admin/AdminHome";
import StudentHome from "components/user/student/StudentHome";
import LecturerHome from "components/user/lecturer/LecturerHome";
import TokenChecker from "components/commons/TokenChecker";

function App() {
	const [user, userDispatch] = useReducer(MyUserReducer, null);

	return (
		<BrowserRouter>
			<MyUserContext.Provider value={user}>
				<MyDispatchContext.Provider value={userDispatch}>
					<Routes>
						<Route element={<TokenChecker />}>
							<Route path="/" element={<Login />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/admin" element={<AdminHome />} />
							<Route path="/student" element={<StudentHome />} />
							<Route path="/lecturer" element={<LecturerHome />}>
							</Route>
						</Route>
					</Routes>
					<Footer />
				</MyDispatchContext.Provider>
			</MyUserContext.Provider>
		</BrowserRouter>
	);
}

export default App;

import React, { useReducer, useState } from "react";
import "./App.css";
import Footer from "components/commons/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/user/Login";
import { MyDispatchContext, MyUserContext } from "configs/Contexts";
import Home from "components/user/Home";
import { MyUserReducer } from "configs/Reducers";
import useTokenManager from "components/commons/useTokenManager";
import Register from "components/user/Register";

function App() {
	const [user, userDispatch] = useReducer(MyUserReducer, null)
	useTokenManager()	

	return (
		<>
			<BrowserRouter>
				<MyUserContext.Provider value={user}>
					<MyDispatchContext.Provider value={userDispatch}>
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/" element={<Home />} />
						</Routes>
						<Footer />
					</MyDispatchContext.Provider>
				</MyUserContext.Provider>
			</BrowserRouter>
		</>
	);
}

export default App;

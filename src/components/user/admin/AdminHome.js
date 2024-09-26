import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";

function AdminHome() {
	return (
		<>
			<AdminNavbar />
			<h1>ADMIN HOME</h1>
			<Outlet />
		</>
	);
}

export default AdminHome;

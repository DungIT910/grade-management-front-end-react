import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form, Alert, Nav } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useAuth } from "../../configs/useAuth";
import { MyDispatchContext, MyUserContext } from "configs/Contexts";
import APIs, { authAPIs } from "configs/APIs";
import { Roles } from "constants/role";

const Login = () => {
	const fields = [
		{ label: "Email đăng nhập", type: "text", field: "username" },
		{ label: "Mật khẩu", type: "password", field: "password" },
	];
	const [user, setUser] = useState({});
	const [errorMessage, setErrorMessage] = useState(null);
	const dispatch = useContext(MyDispatchContext);
	const currentUser = useContext(MyUserContext);
	const authApi = useAuth();
	const [cookies, setCookies] = useCookies(["token"]);
	const nav = useNavigate();

	const login = async (e) => {
		e.preventDefault();

		try {
			let res = await APIs.post(authAPIs["login"], { ...user });
			if (res.data) {
				setCookies("token", res.data.accessToken, { path: "/" });
				setErrorMessage(null);
			} else {
				setErrorMessage(
					"Đăng nhập không thành công. Vui lòng thử lại."
				);
			}
		} catch (ex) {
			setErrorMessage(
				"Đăng nhập không thành công. Vui lòng kiểm tra lại"
			);
			console.error(ex);
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			if (cookies.token) {
				try {
					if (!currentUser) {
						let u = await authApi().get(authAPIs["current-user"]);
						dispatch({ type: "login", payload: u.data });
						localStorage.setItem("currentUser", JSON.stringify(u.data));
						goToHome(u.data)
					} else {
						goToHome(currentUser)
					}
				} catch (error) {
					console.error("Failed to fetch user:", error);
				}
			}
		};

		fetchUser();
	}, [cookies.token, currentUser]);

	const goToHome = (user) => {
		switch (user.role) {
			case Roles.ADMIN:
				nav("/admin");
				break;
			case Roles.LECTURER:
				nav("/lecturer");
				break;
			case Roles.STUDENT:
				nav("/student");
				break;
			default:
				console.error("role is not found");
		}
	};

	const change = (event, field) => {
		setUser((current) => ({ ...current, [field]: event.target.value }));
	};

	const goToRegister = (event) => {
		event.preventDefault();
		console.info("navigate to register");
		nav("/register");
	};

	return (
		<>
			<Container className="d-flex justify-content-center align-items-center min-vh-100">
				<Form
					className="form-border w-50 text-center"
					onSubmit={login}
					style={{
						border: "1px solid #007bff",
						borderRadius: "8px",
						padding: "20px",
					}}
				>
					<h2 className="text-center text-info mb-5">
						ĐĂNG NHẬP NGƯỜI DÙNG
					</h2>

					{errorMessage && (
						<Alert variant="danger">{errorMessage}</Alert>
					)}

					{fields.map((f) => (
						<Form.Group
							key={f.field}
							className="mb-3"
							controlId={f.field}
						>
							<Form.Control
								onChange={(e) => change(e, f.field)}
								value={user[f.field] || ""}
								type={f.type}
								placeholder={f.label}
							/>
						</Form.Group>
					))}
					<Button
						variant="info"
						type="submit"
						style={{ width: "8rem" }}
						className="mb-1 mt-1"
					>
						Đăng nhập
					</Button>
					<Button
						variant="info"
						onClick={goToRegister}
						style={{ width: "10rem" }}
						className="mb-1 mt-1 ms-4"
					>
						Đăng ký sinh viên
					</Button>
				</Form>
			</Container>
		</>
	);
};

export default Login;

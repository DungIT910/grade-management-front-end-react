import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useAuth } from "../../configs/useAuth";
import { MyDispatchContext, MyUserContext } from "configs/Contexts";
import APIs, { authAPIs } from "configs/APIs";
import useTokenManager from "components/commons/useTokenManager";

const Login = () => {
	const fields = [
		{ label: "Email đăng nhập", type: "text", field: "username" },
		{ label: "Mật khẩu", type: "password", field: "password" },
	];
	const [user, setUser] = useState({});
	const dispatch = useContext(MyDispatchContext);
	const currentUser = useContext(MyUserContext);
	const authApi = useAuth();
	const [cookies, setCookies] = useCookies(["token"]);
	const nav = useNavigate();
	const useToken = useTokenManager();

	const login = async (e) => {
		e.preventDefault();

		try {
			let res = await APIs.post(authAPIs["login"], { ...user });
			if (res.data) {
				setCookies("token", res.data.accessToken);
			} else {
				console.error("Invalid login response:", res);
			}
		} catch (ex) {
			console.error(ex);
		}
	};

	useEffect(() => {
		const fetchUser = async () => {
			if (cookies.token) {
				try {
					let u = await authApi().get(authAPIs["current-user"]);
					dispatch({ type: "login", payload: u.data });
					nav("/");
				} catch (error) {
					console.error("Failed to fetch user:", error);
				}
			}
		};

		fetchUser();
	}, [cookies.token, currentUser]);

	const change = (event, field) => {
		setUser((current) => ({ ...current, [field]: event.target.value }));
	};

	if (currentUser !== null) return <Navigate to="/" />;

	const goToRegister = (event) => {
		event.preventDefault();
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

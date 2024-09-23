import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Cookies, useCookies } from "react-cookie";
import { useAuth } from "../../configs/useAuth";
import { MyDispatchContext, MyUserContext } from "configs/Contexts";
import APIs, { endpoints } from "configs/APIs";
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
	const useToken = useTokenManager()

    const login = async (e) => {
        e.preventDefault();

        try {
            let res = await APIs.post(endpoints["login"], { ...user });
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
                    let u = await authApi().get(endpoints["current-user"]);
                    dispatch({ type: "login", payload: u.data });
                    nav("/");
                } catch (error) {
                    console.error("Failed to fetch user:", error);
                }
            }
        };

        fetchUser();
    }, [cookies.token]); 

    const change = (event, field) => {
        setUser((current) => ({ ...current, [field]: event.target.value }));
    };

    if (currentUser !== null) return <Navigate to="/" />;

    return (
        <>
            <h1 className="text-center text-info">ĐĂNG NHẬP NGƯỜI DÙNG</h1>
            <Container>
                <Form className="w-100 text-center" onSubmit={login}>
                    {fields.map((f) => (
                        <Form.Group key={f.field} className="mb-3" controlId={f.field}>
                            <Form.Control
                                onChange={(e) => change(e, f.field)}
                                value={user[f.field] || ""}
                                type={f.type}
                                placeholder={f.label}
                            />
                        </Form.Group>
                    ))}
                    <Button variant="info" type="submit" className="mb-1 mt-1">
                        Đăng nhập
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default Login;
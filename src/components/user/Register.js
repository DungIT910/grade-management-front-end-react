import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import APIs, { studentAPIs } from "../../configs/APIs";
import { validateEmail, validateConfirmPassword } from "utils/validation"; 

const Register = () => {
    const fields = [
        { label: "Tên người dùng", type: "text", field: "firstName" },
        { label: "Họ và tên lót", type: "text", field: "lastName" },
        { label: "Email", type: "email", field: "email" },
        { label: "Mật khẩu", type: "password", field: "password" },
        { label: "Xác nhận mật khẩu", type: "password", field: "confirm" },
    ];

    const [user, setUser] = useState({});
    const [errors, setErrors] = useState({});
    const avatar = useRef();
    const nav = useNavigate();

    const validateField = (field, value) => {
        switch (field) {
            case "email":
                return validateEmail(value) ? "" : "Email phải kết thúc bằng @ou.edu.vn";
            case "confirm":
                return validateConfirmPassword(user.password, value) ? "" : "Mật khẩu và xác nhận mật khẩu không khớp";
            default:
                return "";
        }
    };

    const change = (event, field) => {
        const value = event.target.value;

        setUser((current) => {
            const updatedUser = { ...current, [field]: value };

            const error = validateField(field, value);
            setErrors((prevErrors) => ({ ...prevErrors, [field]: error }));

            return updatedUser;
        });
    };

    const register = async (e) => {
        e.preventDefault();

        const newErrors = {};
        fields.forEach(({ field }) => {
            const error = validateField(field, user[field]);
            if (error) newErrors[field] = error;
        });
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        let form = new FormData();
        
        const requestData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        };

        form.append("request", new Blob([JSON.stringify(requestData)], { type: "application/json" }));
        form.append("avatar", avatar.current.files[0]);

        try {
            let res = await APIs.post(studentAPIs["register"], form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.status === 200) {
                alert("Đăng ký thành công");
                nav("/login");
            }
        } catch (ex) {
            console.error(ex);
        }
    };

    return (
        <Container>
            <h1 className="text-center text-info">ĐĂNG KÝ SINH VIÊN</h1>
            <Form className="text-center" onSubmit={register}>
                {fields.map((f) => (
                    <Form.Group className="mb-3" controlId={f.field} key={f.field}>
                        <Form.Control
                            onChange={(e) => change(e, f.field)}
                            value={user[f.field] || ""}
                            type={f.type}
                            placeholder={f.label}
                        />
                        {errors[f.field] && (
                            <Form.Text className="text-danger">
                                {errors[f.field]}
                            </Form.Text>
                        )}
                    </Form.Group>
                ))}
                <Form.Group className="mb-3" controlId="avatar">
                    <Form.Control
                        type="file"
                        ref={avatar}
                        accept=".png,.jpg"
                        placeholder="Ảnh đại diện"
                    />
                </Form.Group>
                <Button
                    variant="info"
                    type="submit"
                    className="mb-1 my-5 w-25"
                >
                    Đăng ký
                </Button>
            </Form>
        </Container>
    );
};

export default Register;

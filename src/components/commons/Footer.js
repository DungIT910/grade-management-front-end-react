import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer bg-dark text-light py-4">
            <Container>
                <Row className="mb-3">
                    <Col md={6} className="mb-3">
                        <h5 className="text-uppercase">Thông tin liên hệ</h5>
                        <p className="footer-text">
                            Địa chỉ: 123 Đường XYZ, Thành phố ABC, Quốc gia
                        </p>
                        <p className="footer-text">
                            Email: <a href="mailto:info@example.com" className="text-light">info@example.com</a>
                        </p>
                        <p className="footer-text">Điện thoại: (012) 345-6789</p>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center">
                        <p className="footer-text">&copy; {new Date().getFullYear()} Công ty ABC. Tất cả các quyền được bảo lưu.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

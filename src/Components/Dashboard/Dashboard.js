import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UsersDashboard from './UsersDashboard';
import Products from './Products';
import Bills from './Bills';
import Category from "./Category";
import '../Dashboard/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate(); // Get the navigate function

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <UsersDashboard />
                    </Col>
                    <Col>
                        <Products />
                    </Col>
                    <Col>
                        <Category/>
                    </Col>
                    <Col>
                        <Bills />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Dashboard;

import React, { useState ,useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UsersDashboard from './UsersDashboard';
import Products from './Products';
import Bills from './Bills';
import Category from './Category';
import '../Dashboard/Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    const Notification = ({ id, message, type, onClose }) => {
        return (
            <div className={`notification ${type}`}>
                <p>{message}</p>
                <button onClick={() => onClose(id)}>Close</button>
            </div>
        );
    };
    const addNotification = (message, type) => {
        const newNotification = {
            id: new Date().getTime(), // Unique identifier for the notification
            message,
            type,
        };

        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };
    const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <>
            <div className="dashboard-background">
                <Container className="containerdashboard">
                    <h2 className="welcome-message">Welcome, Admin!</h2>
                    {/* Render the notifications */}
                    <div className="notifications-container">
                        {notifications.map((notification) => (
                            <Notification
                                key={notification.id}
                                id={notification.id}
                                message={notification.message}
                                type={notification.type}
                                onClose={removeNotification}
                            />
                        ))}
                    </div>
                    <Row className="rowdashboard">
                        <Col className="coldashboard">
                            <UsersDashboard />
                        </Col>
                        <Col className="coldashboard">
                            <Products />
                        </Col>
                        <Col className="coldashboard">
                            <Category />
                        </Col>
                        <Col className="coldashboard">
                            <Bills />
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Dashboard;

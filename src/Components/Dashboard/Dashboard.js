import React, { useState ,useEffect } from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UsersDashboard from './UsersDashboard';
import Products from './Products';
import Bills from './Bills';
import Category from './Category';
import '../Dashboard/Dashboard.css';
import Calendar from 'react-calendar';
import './Calendar.css';
// import Chart from 'chart.js/auto';




const Dashboard = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // const data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    //     datasets: [
    //         {
    //             label: 'Revenue',
    //             data: [1000, 1500, 1200, 1800, 2000, 1700],
    //             backgroundColor: 'rgba(75, 192, 192, 0.6)',
    //             borderColor: 'rgba(75, 192, 192, 1)',
    //             borderWidth: 1,
    //         },
    //     ],
    // };
    // React.useEffect(() => {
    //     const ctx = document.getElementById('myChart').getContext('2d');
    //     new Chart(ctx, {
    //         type: 'bar',
    //         data: data,
    //         options: {
    //             responsive: true,
    //             scales: {
    //                 y: {
    //                     beginAtZero: true,
    //                 },
    //             },
    //         },
    //     });
    // }, []);

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
                    <div className="calendar" style={{paddingBottom:"30px",marginBottom:"50px"}}>
                        <Calendar
                            onChange={setSelectedDate}
                            value={selectedDate}
                            onClickDay={(date) => addNotification(`Selected date: ${date.toDateString()}`, 'info')}
                        />
                        {/*<div className="chartDashboard">*/}
                        {/*    /!* Other dashboard content *!/*/}
                        {/*    <h2>Analytics Dashboard</h2>*/}
                        {/*    <canvas id="myChart" width="400" height="200"></canvas>*/}
                        {/*</div>*/}
                    </div>
                </Container>

            </div>
        </>

    );
};

export default Dashboard;

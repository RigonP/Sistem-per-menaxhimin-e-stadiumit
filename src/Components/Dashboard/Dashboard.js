import React, {useState, useEffect, useRef} from 'react';

import { Container, Row, Col } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import UsersDashboard from './UsersDashboard';
import Products from './Products';
import Bills from './Bills';
import Category from './Category';
import '../Dashboard/Dashboard.css';
import Calendar from 'react-calendar';
import './Calendar.css';
import Chart from 'chart.js/auto';
import './Chart.css';
import {MdOutlineStadium} from "react-icons/md"



const Dashboard = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const chartRef = useRef(null);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Revenue',
                data: [1000, 1500, 1200, 1800, 2000, 1700],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const data2 = {
        labels: ['Kits', 'Shoes', 'Hoodies', 'Trousers', 'Socks', 'Hats'],
        datasets: [
            {
                label: 'Colors',
                data: [12, 19, 15, 10, 1, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const revenueCtx = document.getElementById('revenueChart').getContext('2d');
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                datasets: [
                    {
                        label: 'Revenue',
                        data: [1000, 1500, 1200, 1800, 2000, 1700],
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        const topSellingProductsCtx = document.getElementById('topSellingProductsChart').getContext('2d');
        const topSellingProductsChart = new Chart(topSellingProductsCtx, {
            type: 'bar',
            data: {
                labels: ['Kits', 'Shoes', 'Hoodies', 'Trousers', 'Socks', 'Hats'],
                datasets: [
                    {
                        label: 'Number of Sales',
                        data: [12, 19, 15, 10, 1, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        chartRef.current = [revenueChart, topSellingProductsChart];
    }, []);




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
            <div className="header" style={{ position: 'fixed', margin: 'auto' }}>
                <div className="logoDiv">
                    <Link to="/" className="logo flex">
                        <h1>
                            <MdOutlineStadium className="icon" /> Kosovo Stadium.
                        </h1>
                    </Link>
                </div>
            </div>

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
                    <Row>
                            <Col>
                                <div className="chartDashboard">
                                    {/* Other dashboard content */}
                                    <h2>Products</h2>
                                    <canvas id="topSellingProductsChart" width="400" height="200"></canvas>
                                </div>
                            </Col>
                            <Col>
                                <div className="chartDashboard">
                                    {/* Other dashboard content */}
                                    <h2>Total Sales</h2>
                                    <canvas id="revenueChart" width="400" height="200"></canvas>
                                </div>
                            </Col>
                            <Col>
                                <div className="calendar" style={{ paddingBottom: "30px", marginBottom: "50px" }}>
                                    <Calendar
                                        onChange={setSelectedDate}
                                        value={selectedDate}
                                        onClickDay={(date) => addNotification(`Selected date: ${date.toDateString()}`, 'info')}
                                    />
                                </div>
                            </Col>
                        </Row>
                </Container>
            </div>
        </>

    );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaList } from 'react-icons/fa';
import api, { getAllUsers } from '../Utils/api';

function Dashboard() {
    const [data, setData] = useState({ user: [] });
    const [showUsers, setShowUsers] = useState(false);

    const updateUserStatus = (id, status) => {
        axios
            .put(`http://localhost:8080/user/update/${id}`, { status })
            .then(response => {
                const updatedUsers = data.user.map(user => {
                    if (user.id === id) {
                        return { ...user, status };
                    }
                    return user;
                });
                setData({ ...data, user: updatedUsers });
            })
            .catch(error => console.error(error));
    };

    const fetchAllUsers = () => {
        getAllUsers() // Use getAllUsers function from Utils/api
            .then(users => setData({ ...data, user: users }))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        api
            .get('/dashboard/details')
            .then(response => setData({ user: response.data.user }))
            .catch(error => console.error(error));
    }, []);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <FaUser /> Users
                                </Card.Title>
                                {!showUsers && (
                                    <Button onClick={fetchAllUsers}>Show All Users</Button>
                                )}
                                {showUsers && data.user && data.user.length > 0 && (
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Contact Number</th>
                                            <th>Email</th>
                                            <th>Name</th>
                                            <th>Password</th>
                                            <th>Role</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.user.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.contactNumber}</td>
                                                <td>{user.email}</td>
                                                <td>{user.name}</td>
                                                <td>{user.password}</td>
                                                <td>{user.role}</td>
                                                <td>{user.status.toString()}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <FaShoppingCart /> Products
                                </Card.Title>
                                <Card.Text>{data.products}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>
                                    <FaList /> Orders
                                </Card.Title>
                                <Card.Text>{data.orders}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;

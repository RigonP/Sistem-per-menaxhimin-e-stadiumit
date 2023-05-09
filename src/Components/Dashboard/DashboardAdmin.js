import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../Dashboard/Dashboard.css';



function Dashboard() {
    const [data, setData] = useState({ user: [], product: [], orders: 0 });
    const [showUsers, setShowUsers] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const navigate = useNavigate(); // Get the navigate function

    const updateUserStatus = (id, status) => {
        axios
            .post(`http://localhost:8080/user/update/${id}`, { status })
            .then(response => {
                const updatedUsers = data.user.map(user => {
                    if (user.id === id) {
                        return { ...user, status: response.data.status };
                    }
                    return user;
                });
                setData({ ...data, user: updatedUsers });
            })
            .catch(error => console.error(error));
    };


    const handleShowAllUsers = () => {
        axios
            .get("http://localhost:8080/user/get")
            .then(response => {
                setData({ ...data, user: response.data });
                setShowUsers(true);
            })
            .catch(error => console.error(error));
    };
    const handleShowAllProducts = () => {
        axios
            .get("http://localhost:8080/product/get")
            .then(response => {
                setData({ ...data, product: response.data });
                setShowProducts(true);
            })
            .catch(error => console.error(error));
    };


    useEffect(() => {
        // Check if user is authenticated and has admin role
        const isAdmin = localStorage.getItem('role') === 'admin';

        axios
            .get('/dashboard/details')
            .then(response => {
                setData({
                    user: response.data.user,
                    products: response.data.products.length,
                    orders: response.data.orders
                });
            })
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
                                    <Button onClick={handleShowAllUsers}>Show All Users</Button>
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
                                            <th>Update Status</th> {/* Add new table header */}
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
                                                <td>
                                                    <Button onClick={() => updateUserStatus(user.id, !user.status.toString())}>
                                                        {user.status ? 'Deactivate' : 'Activate'}
                                                    </Button>
                                                </td>
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
                                {!showProducts && (
                                    <Button onClick={handleShowAllProducts}>Show All Products</Button>
                                )}
                                {showProducts && data.product && data.product.length > 0 && (
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Category ID</th>
                                            <th>Category Name</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.product.map(product => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.description}</td>
                                                <td>{product.price}</td>
                                                <td>{product.status}</td>
                                                <td>{product.category.id}</td>
                                                <td>{product.category.name}</td>
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
                                    <FaList /> Orders
                                </Card.Title>
                                {data.showAllProducts ? (
                                    <table>
                                        {/* Display all orders */}
                                    </table>
                                ) : (
                                    <Button onClick={axios.get("http://localhost:8080/user/get")}>Show All Orders</Button>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Dashboard;

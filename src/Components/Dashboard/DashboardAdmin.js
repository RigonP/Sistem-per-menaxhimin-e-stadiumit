import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUser, FaShoppingCart, FaList } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../Dashboard/Dashboard.css';

function Dashboard() {

    const [data, setData] = useState({ user: [], product: [], orders: [] });
    const [showUsers, setShowUsers] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const navigate = useNavigate(); // Get the navigate function
    const [showBills, setShowBills] = useState(false);

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
    const handleShowAllBills = () => {
        axios
            .get("http://localhost:8080/bill/getBills")
            .then(response => {
                setData({ ...data, bill: response.data });
                setShowBills(true);
            })
            .catch(error => console.error(error));
    };


    useEffect(() => {
        const isAdmin = localStorage.getItem('role') === 'admin';
        axios
            .get('http://localhost:8080/dashboard/details')
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
                                                <td>{product.category ? product.category.id : ''}</td>
                                                <td>{product.category ? product.category.name : ''}</td>
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
                                {!showBills && (
                                    <Button onClick={handleShowAllBills}>Show All Bills</Button>
                                )}
                                {showBills && data.bill && data.bill.length > 0 && (
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Contact Number</th>
                                            <th>Payment Method</th>
                                            <th>Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.bill.map(bill => (
                                            <tr key={bill.id}>
                                                <td>{bill.id}</td>
                                                <td>{bill.name}</td>
                                                <td>{bill.email}</td>
                                                <td>{bill.contactNumber}</td>
                                                <td>{bill.paymentMethod}</td>
                                                <td>{bill.total}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
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

import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaUserTie } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';

const UsersDashboard = () => {
    const [data, setData] = useState([]);
    const [showUsers, setShowUsers] = useState(false);

    const updateUserStatus = (id, status) => {
        axios
            .post(`http://localhost:8080/user/update`, { id, status })
            .then(response => {
                const updatedStatus = response.data === 'true';
                const updatedUsers = data.map(user => {
                    if (user.id === id) {
                        return { ...user, status: updatedStatus };
                    }
                    return user;
                });
                setData(updatedUsers);
            })
            .catch(error => console.error(error));
    };

    const handleShowAllUsers = () => {
        axios
            .get("http://localhost:8080/user/get")
            .then(response => {
                setData(response.data);
                setShowUsers(true);
            })
            .catch(error => console.error(error));
    };

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <FaUserTie className="FaUserTie"/> Users
                </Card.Title>
                {showUsers && (
                    <Button className="buttondashboard" onClick={() => setShowUsers(false)}>Close</Button>
                )}
                {!showUsers && (
                    <Button className="buttondashboard" onClick={handleShowAllUsers}>Show All Users</Button>
                )}
                {showUsers && data && data.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.contactNumber}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.status.toString()}</td>
                                <td>
                                    <Button style={{ color: "darkblue" }} onClick={() => updateUserStatus(user.id, !user.status)}>
                                        {user.status ? 'Change Status' : 'Change Status'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </Card.Body>
        </Card>
    );
};

export default UsersDashboard;

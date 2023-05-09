import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaList } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';

const Bills = () => {
    const [data, setData] = useState([]);
    const [showBills, setShowBills] = useState(false);

    const handleShowAllBills = () => {
        axios
            .get("http://localhost:8080/bill/getBills")
            .then(response => {
                setData(response.data);
                setShowBills(true);
            })
            .catch(error => console.error(error));
    };

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <FaList className="FaList"/> Orders
                </Card.Title>
                {showBills && (
                    <Button className="buttondashboard"  onClick={() => setShowBills(false)}>Close</Button>
                )}
                {!showBills && (
                    <Button className="buttondashboard"  onClick={handleShowAllBills}>Show All Bills</Button>
                )}
                {showBills && data && data.length > 0 && (
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
                        {data.map(bill => (
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
    );
};

export default Bills;

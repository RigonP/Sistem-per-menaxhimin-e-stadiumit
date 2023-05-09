import React, { useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';
const Category = () => {
    const [data, setData] = useState([]);
    const [showCategorys, setShowCategorys] = useState(false);

    const handleShowAllCategorys = () => {
        axios
            .get("http://localhost:8080/category/get")
            .then(response => {
                setData(response.data);
                setShowCategorys(true);
            })
            .catch(error => console.error(error));
    };

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <FaShoppingCart /> Category
                </Card.Title>
                {showCategorys && (
                    <Button onClick={() => setShowCategorys(false)}>Close</Button>
                )}
                {!showCategorys && (
                    <Button onClick={handleShowAllCategorys}>Show All Category's</Button>
                )}
                {showCategorys && data && data.length > 0 && (
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </Card.Body>
        </Card>
    );
};

export default Category;
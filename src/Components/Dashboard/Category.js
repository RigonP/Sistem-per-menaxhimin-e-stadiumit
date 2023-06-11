import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaShopify } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const Category = () => {
    const [data, setData] = useState([]);
    const [showCategorys, setShowCategorys] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleEditCategory = (id) => {
        const categoryToEdit = data.find((category) => category.id === id);
        setEditedData(categoryToEdit);
    };

    const handleShowAllCategorys = () => {
        api
            .get('http://localhost:8080/category/get')
            .then((response) => {
                setData(response.data);
                setShowCategorys(true);
            })
            .catch((error) => console.error(error));
    };

    const updateCategory = (id, name) => {
        api
            .post('http://localhost:8080/category/update', {
                id: parseInt(id),
                name: name,
            })
            .then((response) => {
                console.log(response);
                handleShowAllCategorys(); // Refresh the category list after successful update
                setEditedData({}); // Clear the edited data
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const addCategory = () => {
        if (newCategoryName.trim() === '') {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/category/add', {
                name: newCategoryName,
            })
            .then((response) => {
                console.log(response);
                handleShowAllCategorys(); // Refresh the category list after successful addition
                setNewCategoryName(''); // Clear the input field
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        handleShowAllCategorys();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <FaShopify className="FaShopify" /> Category
                </Card.Title>
                {showCategorys && (
                    <Button className="buttondashboard" onClick={() => setShowCategorys(false)}>
                        Close
                    </Button>
                )}
                {!showCategorys && (
                    <Button className="buttondashboard" onClick={handleShowAllCategorys}>
                        Show All Category's
                    </Button>
                )}
                {showCategorys && data && data.length > 0 && (
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Update</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.id}</td>
                                    <td>
                                        {editedData.id === category.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.name}
                                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                            />
                                        ) : (
                                            category.name
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === category.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() => updateCategory(editedData.id, editedData.name)}
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button style={{ color: 'darkblue' }} onClick={() => handleEditCategory(category.id)}>
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                            <input
                                type="text"
                                placeholder="Name"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                            />
                            <div style={{ paddingLeft: '20px' }}>
                                <Button onClick={addCategory} style={{ borderColor: 'green', color: 'darkgreen' }}>
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Category;

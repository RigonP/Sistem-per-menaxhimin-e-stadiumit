import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { FaShopify } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const ACategory = () => {
    const [data, setData] = useState([]);
    const [showACategory, setShowACategory] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [newACategoryName, setNewACategoryName] = useState('');

    const handleEditACategory = (id) => {
        const acategoryToEdit = data.find((acategory) => acategory.id === id);
        setEditedData(acategoryToEdit);
    };

    const handleShowAllACategory = () => {
        api
            .get('http://localhost:8080/acategory/get')
            .then((response) => {
                setData(response.data);
                setShowACategory(true);
            })
            .catch((error) => {
                if (error.response) {
                  // The request was made, but the server responded with an error status
                  console.error(`HTTP Error ${error.response.status}: ${error.response.statusText}`);
                } else if (error.request) {
                  // The request was made, but no response was received
                  console.error('No response received from the server.');
                } else {
                  // Something happened in setting up the request
                  console.error('An error occurred while sending the request:', error.message);
                }
              });
    };

    const updateACategory = (id, name) => {
        api
            .post('http://localhost:8080/acategory/update', {
                id: parseInt(id),
                name: name,
            })
            .then((response) => {
                console.log(response);
                handleShowAllACategory(); // Refresh the category list after successful update
                setEditedData({}); // Clear the edited data
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const addACategory = () => {
        if (newACategoryName.trim() === '') {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/acategory/add', {
                name: newACategoryName,
            })
            .then((response) => {
                console.log(response);
                handleShowAllACategory(); // Refresh the category list after successful addition
                setNewACategoryName(''); // Clear the input field
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        handleShowAllACategory();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <FaShopify className="FaShopify" /> ACATEGORY
                </Card.Title>
                {showACategory && (
                    <Button className="buttondashboard" onClick={() => setShowACategory(false)}>
                        Mbylle
                    </Button>
                )}
                {!showACategory && (
                    <Button className="buttondashboard" onClick={handleShowAllACategory}>
                        Shfaq te gjithe titujt
                    </Button>
                )}
                {showACategory && data && data.length > 0 && (
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
                            {data.map((acategory) => (
                                <tr key={acategory.id}>
                                    <td>{acategory.id}</td>
                                    <td>
                                        {editedData.id === acategory.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.name}
                                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                            />
                                        ) : (
                                            acategory.name
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === acategory.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() => updateACategory(editedData.id, editedData.name)}
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button style={{ color: 'darkblue' }} onClick={() => handleEditACategory(acategory.id)}>
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
                                value={newACategoryName}
                                onChange={(e) => setNewACategoryName(e.target.value)}
                            />
                            <div style={{ paddingLeft: '20px' }}>
                                <Button onClick={addACategory} style={{ borderColor: 'green', color: 'darkgreen' }}>
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

export default ACategory;

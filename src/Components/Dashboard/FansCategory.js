import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { BiCategory } from 'react-icons/bi';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const FansCategory = () => {
    const [data, setData] = useState([]);
    const [showFansCategory, setShowFansCategory] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [newFansCategoryEmri, setNewFansCategoryEmri] = useState('');

    const handleEditFansCategory = (id) => {
        const fansCategoryToEdit = data.find((fansCategory) => fansCategory.id === id);
        setEditedData(fansCategoryToEdit);
    };

    const handleShowAllFansCategory = () => {
        api
            .get('http://localhost:8080/fansCategory/get')
            .then((response) => {
                setData(response.data);
                setShowFansCategory(true);
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

    const updateFansCategory = (id, emri) => {
        api
            .post('http://localhost:8080/fansCategory/update', {
                id: parseInt(id),
                emri: emri,
            })
            .then((response) => {
                console.log(response);
                handleShowAllFansCategory(); // Refresh the category list after successful update
                setEditedData({}); // Clear the edited data
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const addFansCategory = () => {
        if (newFansCategoryEmri.trim() === '') {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/fansCategory/add', {
                emri: newFansCategoryEmri,
            })
            .then((response) => {
                console.log(response);
                handleShowAllFansCategory(); // Refresh the category list after successful addition
                setNewFansCategoryEmri(''); // Clear the input field
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

    useEffect(() => {
        handleShowAllFansCategory();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <BiCategory className="BiCategory" /> Fans Category
                </Card.Title>
                {showFansCategory && (
                    <Button className="buttondashboard" onClick={() => setShowFansCategory(false)}>
                        Mbylle
                    </Button>
                )}
                {!showFansCategory && (
                    <Button className="buttondashboard" onClick={handleShowAllFansCategory}>
                        Shfaq te gjithe kategorite e fansave
                    </Button>
                )}
                {showFansCategory && data && data.length > 0 && (
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Emri</th>
                                <th>Update</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((fansCategory) => (
                                <tr key={fansCategory.id}>
                                    <td>{fansCategory.id}</td>
                                    <td>
                                        {editedData.id === fansCategory.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.emri}
                                                onChange={(e) => setEditedData({ ...editedData, emri: e.target.value })}
                                            />
                                        ) : (
                                            fansCategory.emri
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === fansCategory.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() => updateFansCategory(editedData.id, editedData.emri)}
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button style={{ color: 'darkblue' }} onClick={() => handleEditFansCategory(fansCategory.id)}>
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
                                placeholder="Emri"
                                value={newFansCategoryEmri}
                                onChange={(e) => setNewFansCategoryEmri(e.target.value)}
                            />
                            <div style={{ paddingLeft: '20px' }}>
                                <Button onClick={addFansCategory} style={{ borderColor: 'green', color: 'darkgreen' }}>
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

export default FansCategory;

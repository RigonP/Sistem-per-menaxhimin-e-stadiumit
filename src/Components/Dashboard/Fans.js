import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { MdCategory } from 'react-icons/md';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const Fans = () => {
    const [data, setData] = useState([]);
    const [showFans, setShowFans] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newFansCategoryId, setNewFansCategoryId] = useState('');
    const [newFansEmri, setNewFansEmri] = useState('');
    const [newFansMbiemri, setNewFansMbiemri] = useState('');
    const [newFansEmail, setNewFansEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [fansCategory, setFansCategory] = useState([]);
    useEffect(() => {
                    const fetchFansCategory = async () => {
                        try {
                            const response = await api.get('http://localhost:8080/fansCategory/get');
                            setFansCategory(response.data);
                        } catch (error) {
                            console.error(error);
                        }
                    };
                    fetchFansCategory();
                }, []);

    const handleEditFans = (id) => {
        const fansToEdit = data.find((fans) => fans.id === id);
        setEditedData(fansToEdit);
    };


    const updateFans = (fansCategoryId, emri, mbiemri, email, id) => {
        api
            .post('http://localhost:8080/fans/update', {
                fansCategoryId: parseInt(fansCategoryId),
                emri: emri,
                mbiemri: mbiemri,
                email: email,
                id: parseInt(id),
            })
            .then((response) => {
                console.log(response);
                handleShowAllFans(); // Refresh the product list after successful update
                setEditedData({}); // Clear the edited data
                setSuccessMessage('Fans updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update the fans.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const handleDeleteFans = (id) => {
        api
            .post(`http://localhost:8080/fans/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllFans(); // Refresh the product list after successful deletion
                setSuccessMessage('Fans deleted successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to delete the fans.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const addFans = () => {
        if (
            newFansEmri.trim() === '' ||
            newFansCategoryId.trim() === '' ||
            newFansMbiemri.trim() === '' ||
            newFansEmail.trim() === ''
        ) {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/fans/add', {
                fansCategoryId: parseInt(newFansCategoryId),
                emri: newFansEmri,
                mbiemri: newFansMbiemri,
                email: newFansEmail
            })
            .then((response) => {
                console.log(response);
                handleShowAllFans(); // Refresh the product list after successful addition
                setNewFansCategoryId(''); // Clear the input fields
                setNewFansEmri('');
                setNewFansMbiemri('');
                setNewFansEmail('');
                setShowAddForm(false); // Hide the add form
                setSuccessMessage('Fans added successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to add the fans.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const handleShowAllFans = () => {
        api
            .get('http://localhost:8080/fans/get')
            .then((response) => {
                setData(response.data);
                setShowFans(true);
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
        handleShowAllFans();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <MdCategory className="MdCategory" /> Fans
                </Card.Title>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {showFans && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowFans(false)}>
                        Mbylle
                    </Button>
                )}
                {!showFans && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllFans}>
                        Shfaq te gjithe fansat (membership)
                    </Button>
                )}
                {showFans && (
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Emri</th>
                                <th>Mbiemri</th>
                                <th>Email</th>
                                <th>Fans Category ID</th>
                                <th>Emri i kategorise</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((fans) => (
                                <tr key={fans.id}>
                                    <td>{fans.id}</td>
                                    <td>
                                        {editedData.id === fans.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.emri}
                                                onChange={(e) => setEditedData({ ...editedData, emri: e.target.value })}
                                            />
                                        ) : (
                                            fans.emri
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === fans.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.mbiemri}
                                                onChange={(e) => setEditedData({ ...editedData, mbiemri: e.target.value })}
                                            />
                                        ) : (
                                            fans.mbiemri
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === fans.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="number"
                                                value={editedData.email}
                                                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                            />
                                        ) : (
                                            fans.email
                                        )}
                                    </td>
                                     <td>
                                        {editedData.id === fans.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="number"
                                                value={editedData.fansCategoryId}
                                                onChange={(e) => setEditedData({ ...editedData, fansCategoryId: e.target.value })}
                                            />
                                        ) : (
                                            fans.fansCategoryId
                                        )}
                                     </td>
                                    <td>{fans.fansCategoryEmri}</td>

                                    <td>
                                        {editedData.id === fans.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() =>
                                                    updateFans(editedData.fansCategoryId, editedData.emri, editedData.mbiemri, editedData.email, editedData.id)
                                                }
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ color: 'darkblue' }}
                                                onClick={() => handleEditFans(fans.id)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkred' }}
                                            variant="danger"
                                            onClick={() => handleDeleteFans(fans.id)}
                                        >
                                            Fshij
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        {showAddForm && (
                            <div>
                                <select
                                    style={{ width: '180px', height: '50px' }}
                                    value={newFansCategoryId}
                                    onChange={(e) => setNewFansCategoryId(e.target.value)}
                                >
                                <option value="">Selekto kategorine:</option>
                                    {fansCategory.map((fansCategory) => (
                                    <option key={fansCategory.id} value={fansCategory.id}>
                                    {fansCategory.emri}
                                </option>
                                ))}
                                </select>
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Emri"
                                    value={newFansEmri}
                                    onChange={(e) => setNewFansEmri(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Mbiemri"
                                    value={newFansMbiemri}
                                    onChange={(e) => setNewFansMbiemri(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Email"
                                    value={newFansEmail}
                                    onChange={(e) => setNewFansEmail(e.target.value)}
                                />
                                <div style={{ paddingTop: '10px' }}>
                                    <Button
                                        style={{ borderColor: 'green', color: 'darkgreen' }}
                                        onClick={addFans}
                                    >
                                        Shto
                                    </Button>
                                </div>
                            </div>
                        )}
                        {!showAddForm && (
                            <Button
                                style={{ borderColor: 'green', color: 'darkgreen' }}
                                onClick={() => setShowAddForm(true)}
                            >
                                Shto Fans
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Fans;
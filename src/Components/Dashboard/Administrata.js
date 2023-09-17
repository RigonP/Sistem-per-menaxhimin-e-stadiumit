
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { IoMdContact } from 'react-icons/io';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const Administrata = () => {
    const [data, setData] = useState([]);
    const [showAdministrata, setShowAdministrata] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newAdministrataTelefoni, setNewAdministrataTelefoni] = useState('');
    const [newAdministrataFax, setNewAdministrataFax] = useState('');
    const [newAdministrataEmail, setNewAdministrataEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEditAdministrata = (id) => {
        const administrataToEdit = data.find((administrata) => administrata.id === id);
        setEditedData(administrataToEdit);
    };

    const updateAdministrata = (telefoni, fax, email, id) => {
        api
            .post('http://localhost:8080/administrata/update', {
                telefoni: telefoni,
                fax: fax,
                email: email,
                id: parseInt(id),
            })
            .then((response) => {
                console.log(response);
                handleShowAllAdministrata(); // Refresh the event list after successful update
                setEditedData({}); // Clear the edited data
                setSuccessMessage('Administrata updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update the administrata.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
        };

    const handleDeleteAdministrata= (id) => {
        api
            .post(`http://localhost:8080/administrata/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllAdministrata(); // Refresh the event list after successful deletion
                setSuccessMessage('Administrata deleted successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to delete the Administrata.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const addAdministrata = () => {
        if (
            newAdministrataTelefoni.trim() === '' ||
            newAdministrataFax.trim() === '' ||
            newAdministrataEmail.trim() === ''
        ) {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/administrata/add', {
                telefoni: newAdministrataTelefoni,
                fax: newAdministrataFax,
                email: newAdministrataEmail
            })
            .then((response) => {
                console.log(response);
                handleShowAllAdministrata(); // Refresh the event list after successful addition
                setNewAdministrataEmail('');
                setNewAdministrataFax('');
                setNewAdministrataTelefoni('');
                setShowAddForm(false); // Hide the add form
                setSuccessMessage('Administrata added successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to add the administrata.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const handleShowAllAdministrata = () => {
        api
            .get('http://localhost:8080/administrata/get')
            .then((response) => {
                setData(response.data);
                setShowAdministrata(true);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to fetch administrata.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    useEffect(() => {
        handleShowAllAdministrata();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <IoMdContact className="IoMdContact" /> Administrata
                </Card.Title>
                {/*{successMessage && <Alert variant="success">{successMessage}</Alert>}*/}
                {/*{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}*/}
                {showAdministrata && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowAdministrata(false)}>
                        Mbylle
                    </Button>
                )}
                {!showAdministrata && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllAdministrata}>
                        Shfaq administraten
                    </Button>
                )}
                {showAdministrata && (
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Telefoni</th>
                                <th>Fax</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((administrata) => (
                                <tr key={administrata.id}>
                                    <td>{administrata.id}</td>
                                    <td>
                                        {editedData.id === administrata.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.telefoni}
                                                onChange={(e) => setEditedData({ ...editedData, telefoni: e.target.value })}
                                            />
                                        ) : (
                                            administrata.telefoni
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === administrata.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px', fontSize: '12px' }}
                                                type="text"
                                                value={editedData.fax}
                                                onChange={(e) => setEditedData({ ...editedData, fax: e.target.value })}
                                            />
                                        ) : (
                                            administrata.fax
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === administrata.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.email}
                                                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                            />
                                        ) : (
                                            administrata.email
                                        )}
                                    </td>

                                    <td>
                                        {editedData.id === administrata.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() =>
                                                    updateAdministrata(editedData.telefoni, editedData.fax, editedData.email, editedData.id)
                                                }
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ color: 'darkblue' }}
                                                onClick={() => handleEditAdministrata(administrata.id)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkred' }}
                                            variant="danger"
                                            onClick={() => handleDeleteAdministrata(administrata.id)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        {showAddForm && (
                            <div>

                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Telefoni"
                                    value={newAdministrataTelefoni}
                                    onChange={(e) => setNewAdministrataTelefoni(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Fax"
                                    value={newAdministrataFax}
                                    onChange={(e) => setNewAdministrataFax(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Email"
                                    value={newAdministrataEmail}
                                    onChange={(e) => setNewAdministrataEmail(e.target.value)}
                                />
                                <div style={{ paddingTop: '10px' }}>
                                    <Button
                                        style={{ borderColor: 'green', color: 'darkgreen' }}
                                        onClick={addAdministrata}
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
                                Shto administrata
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Administrata;


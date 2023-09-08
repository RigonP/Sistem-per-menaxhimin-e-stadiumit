
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { IoMdContact } from 'react-icons/io';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const Contact = () => {
    const [data, setData] = useState([]);
    const [showContact, setShowContact] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newContactEmri, setNewContactEmri] = useState('');
    const [newContactMbiemri, setNewContactMbiemri] = useState('');
    const [newContactEmail, setNewContactEmail] = useState('');
    const [newContactMesazhi, setNewContactMesazhi] = useState('');
    const [newContactNumriTel, setNewContactNumriTel] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEditContact = (id) => {
        const contactToEdit = data.find((contact) => contact.id === id);
        setEditedData(contactToEdit);
    };

    const updateContactStatus = (id, status) => {
        api
            .post(`http://localhost:8080/contact/updateStatus`, { id, status })
            .then((response) => {
                const updatedStatus = response.data === 'true';
                const updatedStatusContact = data.map((contact) => {
                    if (contact.id === id) {
                        return { ...contact, status: updatedStatus };
                    }
                    return contact;
                });
                setData(updatedStatusContact);
                setSuccessMessage('Contact status updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update contact status.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const updateContact = (email, emri, mbiemri, mesazhi, numriTel, id) => {
        api
            .post('http://localhost:8080/contact/update', {
                email: email,
                emri: emri,
                mbiemri: mbiemri,
                mesazhi: mesazhi,
                numriTel: numriTel,
                id: parseInt(id),
            })
            .then((response) => {
                console.log(response);
                handleShowAllContact(); // Refresh the event list after successful update
                setEditedData({}); // Clear the edited data
                setSuccessMessage('Contact updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update the contact.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
        };

    const handleDeleteContact = (id) => {
        api
            .post(`http://localhost:8080/contact/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllContact(); // Refresh the event list after successful deletion
                setSuccessMessage('Contact deleted successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to delete the contact.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const addContact = () => {
        if (
            newContactEmri.trim() === '' ||
            newContactEmail.trim() === '' ||
            newContactMbiemri.trim() === '' ||
            newContactNumriTel.trim() === '' ||
            newContactMesazhi.trim() === ''
        ) {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/contact/add', {
                emri: newContactEmri,
                mbiemri: newContactMbiemri,
                email: newContactEmail,
                numriTel: newContactNumriTel,
                mesazhi: newContactMesazhi,
            })
            .then((response) => {
                console.log(response);
                handleShowAllContact(); // Refresh the event list after successful addition
                //setNewCategoryId(''); // Clear the input fields
                setNewContactEmail('');
                setNewContactEmri('');
                setNewContactMbiemri('');
                setNewContactNumriTel('');
                setNewContactMesazhi('');
                setShowAddForm(false); // Hide the add form
                setSuccessMessage('Contact added successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to add the contact.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const handleShowAllContact = () => {
        api
            .get('http://localhost:8080/contact/get')
            .then((response) => {
                setData(response.data);
                setShowContact(true);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to fetch contact.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    useEffect(() => {
        handleShowAllContact();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <IoMdContact className="IoMdContact" /> Kontakti
                </Card.Title>
                {/*{successMessage && <Alert variant="success">{successMessage}</Alert>}*/}
                {/*{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}*/}
                {showContact && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowContact(false)}>
                        Close
                    </Button>
                )}
                {!showContact && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllContact}>
                        Show All Contact
                    </Button>
                )}
                {showContact && (
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Emri</th>
                                <th>Mbiemri</th>
                                <th>Mesazhi</th>
                                <th>Numri Tel</th>
                                <th>Status</th>
                                <th>Change Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((contact) => (
                                <tr key={contact.id}>
                                    <td>{contact.id}</td>
                                    <td>
                                        {editedData.id === contact.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.emri}
                                                onChange={(e) => setEditedData({ ...editedData, emri: e.target.value })}
                                            />
                                        ) : (
                                            contact.emri
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === contact.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px', fontSize: '12px' }}
                                                type="text"
                                                value={editedData.mbiemri}
                                                onChange={(e) => setEditedData({ ...editedData, mbiemri: e.target.value })}
                                            />
                                        ) : (
                                            contact.mbiemri
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === contact.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.email}
                                                onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                            />
                                        ) : (
                                            contact.email
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === contact.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.mesazhi}
                                                onChange={(e) => setEditedData({ ...editedData, mesazhi: e.target.value })}
                                            />
                                        ) : (
                                            contact.mesazhi
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === contact.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.numriTel}
                                                onChange={(e) => setEditedData({ ...editedData, numriTel: e.target.value })}
                                            />
                                        ) : (
                                            contact.numriTel
                                        )}
                                    </td>
                                    <td>{contact.status}</td>


                                    <td>
                                        <Button
                                            style={{ color: 'darkblue' }}
                                            onClick={() => updateContactStatus(contact.id,!contact.status)}
                                        >
                                            {contact.status ? 'Deactivate' : 'Activate'}
                                        </Button>
                                    </td>
                                    <td>
                                        {editedData.id === contact.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() =>
                                                    updateContact(editedData.email, editedData.emri, editedData.mbiemri ,editedData.mesazhi,editedData.numriTel,editedData.id)
                                                }
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ color: 'darkblue' }}
                                                onClick={() => handleEditContact(contact.id)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkred' }}
                                            variant="danger"
                                            onClick={() => handleDeleteContact(contact.id)}
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
                                    placeholder="Email"
                                    value={newContactEmail}
                                    onChange={(e) => setNewContactEmail(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Emri"
                                    value={newContactEmri}
                                    onChange={(e) => setNewContactEmri(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Mbiemri"
                                    value={newContactMbiemri}
                                    onChange={(e) => setNewContactMbiemri(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Mesazhi"
                                    value={newContactMesazhi}
                                    onChange={(e) => setNewContactMesazhi(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Telefoni"
                                    value={newContactNumriTel}
                                    onChange={(e) => setNewContactNumriTel(e.target.value)}
                                />
                                <div style={{ paddingTop: '10px' }}>
                                    <Button
                                        style={{ borderColor: 'green', color: 'darkgreen' }}
                                        onClick={addContact}
                                    >
                                        Add
                                    </Button>
                                </div>
                            </div>
                        )}
                        {!showAddForm && (
                            <Button
                                style={{ borderColor: 'green', color: 'darkgreen' }}
                                onClick={() => setShowAddForm(true)}
                            >
                                Add Contact
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Contact;
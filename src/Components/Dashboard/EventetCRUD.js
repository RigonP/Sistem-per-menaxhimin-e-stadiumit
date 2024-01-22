
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { MdOutlineEventAvailable } from 'react-icons/md';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const EventetCRUD = () => {
    const [data, setData] = useState([]);
    const [showREvents, setShowREvents] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newREventTitulli, setNewREventTitulli] = useState('');
    const [newREventLokacioni, setNewREventLokacioni] = useState('');
    const [newREventData, setNewREventData] = useState('');
    const [newREventOra, setNewREventOra] = useState('');
    const [newREventPershkrimi, setNewREventPershkrimi] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [categories, setCategories] = useState([]);


            useEffect(() => {
                const fetchCategories = async () => {
                    try {
                        const response = await api.get('http://localhost:8080/category/get');
                        setCategories(response.data);
                    } catch (error) {
                        console.error(error);
                    }
                };
                fetchCategories();
            }, []);

    const handleEditREvent = (id) => {
        const reventToEdit = data.find((revent) => revent.id === id);
        setEditedData(reventToEdit);
    };

    const updateREventStatus = (id, status) => {
        api
            .post(`http://localhost:8080/revents/updateStatus`, { id, status })
            .then((response) => {
                const updatedStatus = response.data === 'true';
                const updatedStatusREvents = data.map((revent) => {
                    if (revent.id === id) {
                        return { ...revent, status: updatedStatus };
                    }
                    return revent;
                });
                setData(updatedStatusREvents);
                setSuccessMessage('Event status updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update event status.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000);
            });
    };

    const updateREvent = (categoryId, titulli, lokacioni, data, ora, pershkrimi, id) => {
        api
            .post('http://localhost:8080/revents/update', {
                categoryId: parseInt(categoryId),
                titulli: titulli,
                lokacioni: lokacioni,
                data: data,
                ora: ora,
                pershkrimi: pershkrimi,
                id: parseInt(id),
            })
            .then((response) => {
                console.log(response);
                handleShowAllREvents(); // Refresh the event list after successful update
                setEditedData({}); // Clear the edited data
                setSuccessMessage('Event updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update the event.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
        };

    const handleDeleteREvent = (id) => {
        api
            .post(`http://localhost:8080/revents/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllREvents(); // Refresh the event list after successful deletion
                setSuccessMessage('Event deleted successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to delete the event.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const addREvent = () => {
        const eventData = {
            categoryId: parseInt(newCategoryId),
            titulli: newREventTitulli,
            lokacioni: newREventLokacioni,
            data: newREventData,
            ora: newREventOra,
            pershkrimi: newREventPershkrimi
        };
        // Log the eventData before sending it to the server
            console.log('Data to send to the server:', eventData);


        if (
            newREventTitulli.trim() === '' ||
            newCategoryId.trim() === '' ||
            newREventLokacioni.trim() === '' ||
            newREventData.trim() === '' ||
            newREventOra.trim() === '' ||
            newREventPershkrimi.trim() === ''
        ) {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/revents/add', {
                categoryId: parseInt(newCategoryId),
                titulli: newREventTitulli,
                lokacioni: newREventLokacioni,
                data: newREventData,
                ora: newREventOra,
                pershkrimi: newREventPershkrimi
            })
            .then((response) => {
                console.log(response);
                handleShowAllREvents(); // Refresh the event list after successful addition
                setNewCategoryId(''); // Clear the input fields
                setNewREventTitulli('');
                setNewREventLokacioni('');
                setNewREventData('');
                setNewREventOra('');
                setNewREventPershkrimi('');
                setShowAddForm(false); // Hide the add form
                setSuccessMessage('Event added successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to add the event.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
            // Log the "Lokacioni" value after saving
                console.log('Lokacioni value after saving:', eventData);
    };

    const handleShowAllREvents = () => {
        api
            .get('http://localhost:8080/revents/get')
            .then((response) => {
                setData(response.data);
                setShowREvents(true);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to fetch events.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    useEffect(() => {
        handleShowAllREvents();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <MdOutlineEventAvailable className="MdOutlineEventAvailable" /> Eventet
                </Card.Title>
                {showREvents && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowREvents(false)}>
                        Mbylle
                    </Button>
                )}
                {!showREvents && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllREvents}>
                        Shfaq te gjitha eventet
                    </Button>
                )}
                {showREvents && (
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Titulli</th>
                                <th>Lokacioni</th>
                                <th>Data</th>
                                <th>Ora</th>
                                <th>Pershkrimi</th>
                                <th>Statusi</th>
                                <th>Category ID</th>
                                <th>Category Name</th>
                                <th>Change Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((revent) => (
                                <tr key={revent.id}>
                                    <td>{revent.id}</td>
                                    <td>
                                        {editedData.id === revent.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.titulli}
                                                onChange={(e) => setEditedData({ ...editedData, titulli: e.target.value })}
                                            />
                                        ) : (
                                            revent.titulli
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === revent.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px', fontSize: '12px' }}
                                                type="text"
                                                value={editedData.lokacioni}
                                                onChange={(e) => setEditedData({ ...editedData, lokacioni: e.target.value })}
                                            />
                                        ) : (
                                            revent.lokacioni
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === revent.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.data}
                                                onChange={(e) => setEditedData({ ...editedData, data: e.target.value })}
                                            />
                                        ) : (
                                            revent.data
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === revent.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.ora}
                                                onChange={(e) => setEditedData({ ...editedData, ora: e.target.value })}
                                            />
                                        ) : (
                                            revent.ora
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === revent.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.pershkrimi}
                                                onChange={(e) => setEditedData({ ...editedData, pershkrimi: e.target.value })}
                                            />
                                        ) : (
                                            revent.pershkrimi
                                        )}
                                    </td>
                                    <td>{revent.status}</td>
                                    <td>
                                        {editedData.id === revent.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="number"
                                                value={editedData.categoryId}
                                                onChange={(e) => setEditedData({ ...editedData, categoryId: e.target.value })}
                                            />
                                        ) : (
                                            revent.categoryId
                                        )}
                                    </td>
                                    <td>{revent.categoryName}</td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkblue' }}
                                            onClick={() => updateREventStatus(revent.id,!revent.status)}
                                        >
                                            {revent.status ? 'Deactivate' : 'Activate'}
                                        </Button>
                                    </td>
                                    <td>
                                        {editedData.id === revent.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() =>
                                                    updateREvent(editedData.categoryId, editedData.titulli, editedData.pershkrimi, editedData.data ,editedData.lokacioni,editedData.ora,editedData.id)
                                                }
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ color: 'darkblue' }}
                                                onClick={() => handleEditREvent(revent.id)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkred' }}
                                            variant="danger"
                                            onClick={() => handleDeleteREvent(revent.id)}
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
                                                            value={newCategoryId}
                                                            onChange={(e) => setNewCategoryId(e.target.value)}
                                                        >
                                                            <option value="">Selekto kategorine</option>
                                                            {categories.map((category) => (
                                                                <option key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Titulli"
                                    value={newREventTitulli}
                                    onChange={(e) => setNewREventTitulli(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Lokacioni"
                                    value={newREventLokacioni}
                                    onChange={(r) => setNewREventLokacioni(r.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Data"
                                    value={newREventData}
                                    onChange={(e) => setNewREventData(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Ora"
                                    value={newREventOra}
                                    onChange={(e) => setNewREventOra(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Pershkrimi"
                                    value={newREventPershkrimi}
                                    onChange={(e) => setNewREventPershkrimi(e.target.value)}
                                />
                                <div style={{ paddingTop: '10px' }}>
                                    <Button
                                        style={{ borderColor: 'green', color: 'darkgreen' }}
                                        onClick={addREvent}
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
                                Shto event
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default EventetCRUD;

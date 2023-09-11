import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const REvents = () => {
    const [data, setData] = useState([]);
    const [showEvents, setShowEvents] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newEventTitulli, setNewEventTitulli] = useState('');
    const [newEventLokacioni, setNewEventLokacioni] = useState('');
    const [newEventData, setNewEventData] = useState('');
    const [newEventOra, setNewEventOra] = useState('');
    const [newEventPershkrimi, setNewEventPershkrimi] = useState('')
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEditEvent = (id) => {
        const eventToEdit = data.find((event) => event.id === id);
        setEditedData(eventToEdit);
    };

    const updateEventStatus = (id, status) => {
        api
            .post(`http://localhost:8080/revents/updateStatus`, { id, status })
            .then((response) => {
                const updatedStatus = response.data === 'true';
                const updatedStatusEvents = data.map((event) => {
                    if (event.id === id) {
                        return { ...event, status: updatedStatus };
                    }
                    return event;
                });
                setData(updatedStatusEvents);
                setSuccessMessage('Event status updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update event status.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const updateEvent = (categoryId, titulli, lokacioni, data,ora, pershkrimi, id) => {
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
                handleShowAllEvents(); // Refresh the event list after successful update
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

    const handleDeleteEvent = (id) => {
        api
            .post(`http://localhost:8080/revents/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllEvents(); // Refresh the event list after successful deletion
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

    const addEvent = () => {
        if (
            newEventTitulli.trim() === '' ||
            newCategoryId.trim() === '' ||
            newEventLokacioni.trim() === '' ||
            newEventData.trim() === '' ||
            newEventOra.trim() === '' ||
            newEventPershkrimi.trim() === ''
        ) {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/revents/add', {
                categoryId: parseInt(newCategoryId),
                titulli: newEventTitulli,
                lokacioni: newEventLokacioni,
                data: newEventData,
                ora: newEventOra,
                pershkrimi: newEventPershkrimi,
            })
            .then((response) => {
                console.log(response);
                handleShowAllEvents(); // Refresh the event list after successful addition
                setNewCategoryId(''); // Clear the input fields
                setNewEventTitulli('');
                setNewEventLokacioni('');
                setNewEventData('');
                setNewEventOra('');
                setNewEventPershkrimi('');
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
    };

    const handleShowAllEvents = () => {
        api
            .get('http://localhost:8080/revents/get')
            .then((response) => {
                setData(response.data);
                setShowEvents(true);
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
        handleShowAllEvents();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <FaShoppingCart className="FaShoppingCart" /> Events
                </Card.Title>
                {/*{successMessage && <Alert variant="success">{successMessage}</Alert>}*/}
                {/*{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}*/}
                {showEvents && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowEvents(false)}>
                        Mbylle
                    </Button>
                )}
                {!showEvents && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllEvents}>
                        Shfaq te gjithe eventet
                    </Button>
                )}
                {showEvents && (
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
                                <th>Status</th>
                                <th>Category ID</th>
                                <th>Category Name</th>
                                <th>Change Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((event) => (
                                <tr key={event.id}>
                                    <td>{event.id}</td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.titulli}
                                                onChange={(e) => setEditedData({ ...editedData, titulli: e.target.value })}
                                            />
                                        ) : (
                                            event.titulli
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px', fontSize: '12px' }}
                                                type="text"
                                                value={editedData.lokacioni}
                                                onChange={(e) => setEditedData({ ...editedData, lokacioni: e.target.value })}
                                            />
                                        ) : (
                                            event.lokacioni
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.data}
                                                onChange={(e) => setEditedData({ ...editedData, data: e.target.value })}
                                            />
                                        ) : (
                                            event.data
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.ora}
                                                onChange={(e) => setEditedData({ ...editedData, ora: e.target.value })}
                                            />
                                        ) : (
                                            event.ora
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.pershkrimi}
                                                onChange={(e) => setEditedData({ ...editedData, pershkrimi: e.target.value })}
                                            />
                                        ) : (
                                            event.pershkrimi
                                        )}
                                    </td>
                                    <td>{event.status}</td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="number"
                                                value={editedData.categoryId}
                                                onChange={(e) => setEditedData({ ...editedData, categoryId: e.target.value })}
                                            />
                                        ) : (
                                            event.categoryId
                                        )}
                                    </td>
                                    <td>{event.categoryName}</td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkblue' }}
                                            onClick={() => updateEventStatus(event.id,!event.status)}
                                        >
                                            {event.status ? 'Deactivate' : 'Activate'}
                                        </Button>
                                    </td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() =>
                                                    updateEvent(editedData.categoryId, editedData.titulli, editedData.lokacioni, editedData.data ,editedData.ora, editedData.pershkrimi, editedData.id)
                                                }
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ color: 'darkblue' }}
                                                onClick={() => handleEditEvent(event.id)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkred' }}
                                            variant="danger"
                                            onClick={() => handleDeleteEvent(event.id)}
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
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Category ID"
                                    value={newCategoryId}
                                    onChange={(e) => setNewCategoryId(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Titulli"
                                    value={newEventTitulli}
                                    onChange={(e) => setNewEventTitulli(e.target.value)}
                                />
                                <input
                                     style={{ width: '180px', height: '50px' }}
                                     type="text"
                                     placeholder="Lokacioni"
                                     value={newEventLokacioni}
                                     onChange={(e) => setNewEventLokacioni(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Data"
                                    value={newEventData}
                                    onChange={(e) => setNewEventData(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Ora"
                                    value={newEventOra}
                                    onChange={(e) => setNewEventOra(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Pershkrimi"
                                    value={newEventPershkrimi}
                                    onChange={(e) => setNewEventPershkrimi(e.target.value)}
                                />
                                <div style={{ paddingTop: '10px' }}>
                                    <Button
                                        style={{ borderColor: 'green', color: 'darkgreen' }}
                                        onClick={addEvent}
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

export default REvents;

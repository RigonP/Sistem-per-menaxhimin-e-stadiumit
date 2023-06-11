import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const Events = () => {
    const [data, setData] = useState([]);
    const [showEvents, setShowEvents] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newEventTitle, setNewEventTitle] = useState('');
    const [newEventDescription, setNewEventDescription] = useState('');
    const [newEventEventType, setNewEventEventType] = useState('');
    const [newEventDate, setNewEventDate] = useState('');
    const [newEventLocation, setNewEventLocation] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEditEvent = (id) => {
        const eventToEdit = data.find((event) => event.id === id);
        setEditedData(eventToEdit);
    };

    const updateEventStatus = (id, status) => {
        api
            .post(`http://localhost:8080/events/updateStatus`, { id, status })
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

    const updateEvent = (categoryId, titulli, description, location, date, eventType, id) => {
        api
            .post('http://localhost:8080/events/update', {
                categoryId: parseInt(categoryId),
                titulli: titulli,
                description: description,
                location: location,
                date: date,
                eventType: eventType,
                id: parseInt(id),
            })
            .then((response) => {
                console.log(response);
                setEditedData({}); // Clear the edited data
                setSuccessMessage('Event updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds

                // Fetch updated data after successful update
                api
                    .get('http://localhost:8080/events/get')
                    .then((response) => {
                        setData(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                        setErrorMessage('Failed to fetch events.');
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 3000); // Hide success message after 3 seconds
                    });
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update the event.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const handleDeleteEvent = (id) => {
        api
            .post(`http://localhost:8080/events/delete/${id}`)
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
            newEventTitle.trim() === '' ||
            newCategoryId.trim() === '' ||
            newEventDescription.trim() === '' ||
            newEventLocation.trim() === '' ||
            newEventEventType.trim() === '' ||
            newEventDate.trim() === ''
        ) {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/events/add', {
                categoryId: parseInt(newCategoryId),
                titulli: newEventTitle,
                description: newEventDescription,
                date: newEventDate,
                location: newEventLocation,
                eventType: newEventEventType,
            })
            .then((response) => {
                console.log(response);
                handleShowAllEvents(); // Refresh the event list after successful addition
                setNewCategoryId(''); // Clear the input fields
                setNewEventTitle('');
                setNewEventDescription('');
                setNewEventEventType('');
                setNewEventDate('');
                setNewEventLocation('');
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
            .get('http://localhost:8080/events/get')
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
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {showEvents && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowEvents(false)}>
                        Close
                    </Button>
                )}
                {!showEvents && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllEvents}>
                        Show All Events
                    </Button>
                )}
                {showEvents && (
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Event Type</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Location</th>
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
                                                value={editedData.description}
                                                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                                            />
                                        ) : (
                                            event.description
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.eventType}
                                                onChange={(e) => setEditedData({ ...editedData, eventType: e.target.value })}
                                            />
                                        ) : (
                                            event.eventType
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.date}
                                                onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
                                            />
                                        ) : (
                                            event.date
                                        )}
                                    </td>
                                    <td>{event.status}</td>
                                    <td>
                                        {editedData.id === event.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.location}
                                                onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                                            />
                                        ) : (
                                            event.location
                                        )}
                                    </td>

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
                                                    updateEvent(editedData.categoryId, editedData.titulli, editedData.description, editedData.eventType,editedData.date,editedData.location ,editedData.id)
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
                                    placeholder="Category ID"
                                    value={newCategoryId}
                                    onChange={(e) => setNewCategoryId(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Title"
                                    value={newEventTitle}
                                    onChange={(e) => setNewEventTitle(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Description"
                                    value={newEventDescription}
                                    onChange={(e) => setNewEventDescription(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Event Type"
                                    value={newEventEventType}
                                    onChange={(e) => setNewEventEventType(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Date"
                                    value={newEventDate}
                                    onChange={(e) => setNewEventDate(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Location"
                                    value={newEventLocation}
                                    onChange={(e) => setNewEventLocation(e.target.value)}
                                />
                                <div style={{ paddingTop: '10px' }}>
                                    <Button
                                        style={{ borderColor: 'green', color: 'darkgreen' }}
                                        onClick={addEvent}
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
                                Add Event
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Events;
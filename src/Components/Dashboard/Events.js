import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table } from 'react-bootstrap';
import { FaChair } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';

const Events = () => {
    const [data, setData] = useState([]);
    const [showEvents, setShowEvents] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [isEditing, setIsEditing] = useState(false);


    const handleEditEvent = (id) => {
        const eventToEdit = data.find((event) => event.id === id);
        setEditedData(eventToEdit);
        setIsEditing(true); // Enable editing mode
    };

    const updateEventsStatus = (id, status) => {
        axios
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
            })
            .catch((error) => console.error(error));
    };

    const updateEvents = (categoryId, titulli, description, location, date, eventType, id) => {
        axios
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
                handleShowAllEvents();
                setEditedData({});
                setIsEditing(false); // Disable editing mode after update
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleDeleteEvent = (id) => {
        axios
            .post(`http://localhost:8080/events/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllEvents();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleShowAllEvents = () => {
        axios
            .get('http://localhost:8080/events/get')
            .then((response) => {
                setData(response.data);
                setShowEvents(true);
                setIsEditing(false); // Reset the editing state
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        handleShowAllEvents();
    }, []);


    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <FaChair className="FaShoppingCart" /> Events
                </Card.Title>
                {showEvents ? (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowEvents(false)}>
                        Close
                    </Button>
                ) : (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllEvents}>
                        Show All Events
                    </Button>
                )}
                {showEvents && data && data.length > 0 && (
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
                                            style={{ width: "180px", height: "50px", fontSize: "13px" }}
                                            type="text"
                                            value={editedData.titulli}
                                            onChange={(e) => setEditedData({ ...editedData, titulli: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    ) : (
                                        event.titulli
                                    )}
                                </td>
                                <td>
                                    {editedData.id === event.id ? (
                                        <input
                                            style={{ width: "180px", height: "50px", fontSize: "13px" }}
                                            type="text"
                                            value={editedData.description}
                                            onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    ) : (
                                        event.description
                                    )}
                                </td>
                                <td>
                                    {editedData.id === event.id ? (
                                        <input
                                            style={{ paddingLeft: "13px", width: "90px", height: "50px" }}
                                            type="text"
                                            value={editedData.eventType}
                                            onChange={(e) => setEditedData({ ...editedData, eventType: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    ) : (
                                        event.eventType
                                    )}
                                </td>
                                <td>
                                    {editedData.id === event.id ? (
                                        <input
                                            style={{ paddingLeft: "13px", width: "130px", height: "50px" }}
                                            type="text"
                                            value={editedData.date}
                                            onChange={(e) => setEditedData({ ...editedData, date: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    ) : (
                                        event.date
                                    )}
                                </td>
                                <td>{event.status}</td>
                                <td>
                                    {editedData.id === event.id ? (
                                        <input
                                            style={{ paddingLeft: "13px", width: "90px", height: "50px" }}
                                            type="text"
                                            value={editedData.location}
                                            onChange={(e) => setEditedData({ ...editedData, location: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    ) : (
                                        event.location
                                    )}
                                </td>
                                <td>
                                    {editedData.id === event.id ? (
                                        <input
                                            style={{ paddingLeft: "20px", width: "50px", height: "50px" }}
                                            type="text"
                                            value={editedData.categoryId}
                                            onChange={(e) => setEditedData({ ...editedData, categoryId: e.target.value })}
                                            disabled={!isEditing}
                                        />
                                    ) : (
                                        event.categoryId
                                    )}
                                </td>
                                <td>{event.categoryName}</td>
                                <td>
                                    <Button
                                        style={{ color: "darkblue" }}
                                        onClick={() => updateEventsStatus(event.id,!event.status)}
                                    >
                                        Change Status
                                    </Button>
                                </td>
                                <td>
                                    {isEditing && editedData.id === event.id ? (
                                        <Button
                                            style={{ borderColor: "darkgreen", color: "darkgreen" }}
                                            onClick={() =>
                                                updateEvents(
                                                    editedData.categoryId,
                                                    editedData.titulli,
                                                    editedData.description,
                                                    editedData.location,
                                                    editedData.date,
                                                    editedData.eventType,
                                                    editedData.id
                                                )
                                            }
                                        >
                                            Update
                                        </Button>
                                    ) : (
                                        <Button
                                            style={{ color: "darkblue" }}
                                            onClick={() => handleEditEvent(event.id)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </td>
                                <td>
                                    <Button
                                        style={{ color: "darkred" }}
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
                )}
            </Card.Body>
        </Card>
    );
};

export default Events;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';

const Events = () => {
    const [data, setData] = useState([]);
    const [showEvents, setShowEvents] = useState(false);
    const [editedData, setEditedData] = useState({});



    const handleEditEvent = (id) => {
        const EventToEdit = data.find(product => product.id === id);
        setEditedData(EventToEdit);
    };

    const updateEventsStatus = (id, status) => {
        axios
            .post(`http://localhost:8080/events/updateStatus`, { id, status })
            .then(response => {
                const updatedStatus = response.data === 'true';
                const updatedStatusEvents = data.map(events => {
                    if (events.id === id) {
                        return { ...events, status: updatedStatus };
                    }
                    return events;
                });
                setData(updatedStatusEvents);
            })
            .catch(error => console.error(error));
    };

    const updateEvents = (categoryId, titulli, description, date,location,eventType, id) => {
        axios
            .post('http://localhost:8080/events/update', {
                categoryId: parseInt(categoryId),
                titulli: titulli,
                description: description,
                location:location,
                eventType : eventType,
                date: parseInt(date),
                id: parseInt(id)
            })
            .then(response => {
                // Handle the response if needed
                console.log(response);
                handleShowAllEvents(); // Refresh the product list after successful update
                setEditedData({}); // Clear the edited data
            })
            .catch(error => {
                // Handle errors if needed
                console.error(error);
            });
    };

    const handleDeleteEvent = (id) => {

        axios
            .post(`http://localhost:8080/events/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllEvents(); // Refresh the event list after successful deletion
            })
            .catch((error) => {
                console.error(error);
            });
    };

//     const updateProduct = (categoryId, name, description, price, id) => {
//         axios
//             .post('http://localhost:8080/product/update', {
//                 categoryId: categoryId,
//                 name: name,
//                 description: description,
//                 price: price,
//                 id: id
//             })
//             .then(response => {
//                 // Handle the response if needed
//                 console.log(response);
//             })
//             .catch(error => {
//                 // Handle errors if needed
//                 console.error(error);
//             });
//     };
// -

    const handleShowAllEvents = () => {
        axios
            .get("http://localhost:8080/events/get")
            .then(response => {
                setData(response.data);
                setShowEvents(true);
            })
            .catch(error => console.error(error));
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
                {showEvents && (
                    <Button className="buttondashboard"  variant="primary" onClick={() => setShowEvents(false)}>Close</Button>
                )}
                {!showEvents && (
                    <Button className="buttondashboard"  variant="primary" onClick={handleShowAllEvents}>Show All Events</Button>
                )}
                {showEvents && data && data.length > 0 && (
                    <Table striped bordered>
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
                        {data.map(events => (
                            <tr key={events.id}>
                                <td>{events.id}</td>
                                <td>
                                    <input style={{ width : "180px" , height : "50px",fontSize:"13px"}}
                                           type="text"
                                           value={editedData.id === events.id ? editedData.titulli : events.titulli}
                                           onChange={(e) => setEditedData({...editedData, titulli: e.target.value})}
                                    />
                                </td>
                                <td>
                                    <input style={{ width : "180px" , height : "50px",fontSize:"13px"}}
                                           type="text"
                                           value={editedData.id === events.id ? editedData.description : events.description}
                                           onChange={(e) => setEditedData({...editedData, description: e.target.value})}
                                    />
                                </td>
                                <td>
                                    <input style={{ paddingLeft : "13px",width : "90px" , height : "50px"}}
                                           type="text"
                                           value={editedData.id === events.id ? editedData.eventType : events.eventType}
                                           onChange={(e) => setEditedData({...editedData, eventType: e.target.value})}
                                    />
                                </td>
                                <td>
                                    <input style={{ paddingLeft : "13px",width : "130px" , height : "50px"}}
                                           type="text"
                                           value={editedData.id === events.id ? editedData.date : events.date}
                                           onChange={(e) => setEditedData({...editedData, date: e.target.value})}
                                    />
                                </td>
                                <td>{events.status}</td>

                                <td>
                                    <input style={{paddingLeft:"13px", width : "90px" , height : "50px"}}
                                           type="text"
                                           value={editedData.id === events.id ? editedData.location : events.location}
                                           onChange={(e) => setEditedData({...editedData, location: e.target.value})}
                                    />
                                </td>
                                <td>
                                    <input style={{ paddingLeft : "20px",width : "50px" , height : "50px"}}
                                           type="text"
                                           value={editedData.id === events.id ? editedData.categoryId : events.categoryId}
                                           onChange={(e) => setEditedData({...editedData, categoryId: e.target.value})}
                                    />
                                </td>
                                <td>{events.categoryName}</td>
                                <td>
                                    <Button onClick={() => updateEventsStatus(events.id, !events.status)}>
                                        {events.status ? 'Change Status' : 'Change Status'}
                                    </Button>
                                </td>
                                <td>
                                    {editedData.id === events.id ? (
                                        <Button onClick={() => updateEvents(editedData.categoryId, editedData.titulli, editedData.description, editedData.location,editedData.date,editedData.eventType, editedData.id)}>
                                            Update
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleEditEvent(events.id)}>
                                            Edit
                                        </Button>

                                    )}
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteEvent(events.id)}>
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

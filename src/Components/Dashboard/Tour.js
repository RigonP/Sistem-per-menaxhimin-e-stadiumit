
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { GiDetour } from 'react-icons/gi';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";
import TourDetail from './TourDetail'; // Import the TourDetail component

const Tour = () => {
    const [data, setData] = useState([]);
    const [showTour, setShowTour] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newTourEmri, setNewTourEmri] = useState('');
    const [newTourMbiemri, setNewTourMbiemri] = useState('');
    const [newTourStatusi, setNewTourStatusi] = useState(''); // Initialize with an empty string
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [searchTourName, setSearchTourName] = useState('');


    const [selectedTourId, setSelectedTourId] = useState(null);
    const [inputTourId, setInputTourId] = useState('');

      const handleShowTourDetail = (id) => {
        setSelectedTourId(id);
      };

    const handleRetrieveTour = () => {
        const idToRetrieve = parseInt(inputTourId);

        if (isNaN(idToRetrieve) || idToRetrieve === null) {
            // Show an error message for invalid or null ID
            setErrorMessage('Id e zbrazet ose invalide. Shkruani nje ID valide !.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000); // Hide error message after 3 seconds
            return;
        }

        const tourToRetrieve = data.find((tour) => tour.id === idToRetrieve);

        if (!tourToRetrieve) {
            // Show an error message for a non-existing ID
            setErrorMessage(`Tour me ID ${idToRetrieve} nuk ekziston !.`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000); // Hide error message after 3 seconds
            return;
        }

        setSelectedTourId(idToRetrieve);

        // Clear the input field
        setInputTourId('');
    };

    const handleRetrieveTourByName = () => {
        if (searchTourName.trim() === '') {
            // Show an error message for an empty search name
            setErrorMessage('Shkruani emrin e tour-it qe doni te gjeni.');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000); // Hide error message after 3 seconds
            return;
        }

        const tourToRetrieve = data.find((tour) =>
            tour.emri.toLowerCase() === searchTourName.toLowerCase()
        );

        if (!tourToRetrieve) {
            // Show an error message if no matching tour is found
            setErrorMessage(`Nuk u gjet tour me emrin: ${searchTourName}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000); // Hide error message after 3 seconds
            return;
        }

        setSelectedTourId(tourToRetrieve.id);

        // Clear the search input
        setSearchTourName('');
    };






    const handleEditTour = (id) => {
        const tourToEdit = data.find((tour) => tour.id === id);
        setEditedData(tourToEdit);
    };



    const updateTour = (emri, mbiemri, statusi, id) => {
        api
            .post('http://localhost:8080/tour/update', {
                emri: emri,
                mbiemri: mbiemri,
                statusi: statusi,
                id: parseInt(id),
            })
            .then((response) => {
                console.log(response);
                handleShowAllTour(); // Refresh the event list after successful update
                setEditedData({}); // Clear the edited data
                setSuccessMessage('Tour updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update the tour.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
        };

    const handleDeleteTour = (id) => {
        api
            .post(`http://localhost:8080/tour/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllTour(); // Refresh the event list after successful deletion
                setSuccessMessage('Tour deleted successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to delete the tour.');
                setTimeout(() => {
                    setErrorMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const addTour = () => {
        if (
            newTourEmri.trim() === '' ||
            newTourMbiemri.trim() === '' ||
            newTourStatusi.trim() === ''
        ) {
            // Input is empty, do not proceed
            return;
        }

        // Log the value of newTourStatusi
        console.log(`Adding new tour with statusi: ${newTourStatusi}`);

        api
            .post('http://localhost:8080/tour/add', {
                emri: newTourEmri,
                mbiemri: newTourMbiemri,
                statusi: newTourStatusi, // Use the updated statusi value from the state
            })
            .then((response) => {
                console.log(response);
                handleShowAllTour(); // Refresh the event list after successful addition
                setNewTourEmri('');
                setNewTourMbiemri('');
                setNewTourStatusi('');
                setShowAddForm(false); // Hide the add form
                setSuccessMessage('Tour added successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
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


    const handleShowAllTour = () => {
        api
            .get('http://localhost:8080/tour/get')
            .then((response) => {
                setData(response.data);
                setShowTour(true);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to fetch tour.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    useEffect(() => {
        handleShowAllTour();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <GiDetour className="GiDetour" /> Tour
                </Card.Title>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {showTour && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowTour(false)}>
                        Mbylle
                    </Button>
                )}
                {!showTour && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllTour}>
                        Shfaq te gjithe tour
                    </Button>
                )}
                {showTour && (
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Emri</th>
                                <th>Mbiemri</th>
                                <th>Statusi</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((tour) => (
                                <tr key={tour.id}>
                                    <td>{tour.id}</td>
                                    <td>
                                        {editedData.id === tour.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px', fontSize: '12px' }}
                                                type="text"
                                                value={editedData.emri}
                                                onChange={(e) => setEditedData({ ...editedData, emri: e.target.value })}
                                            />
                                        ) : (
                                            tour.emri
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === tour.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="text"
                                                value={editedData.mbiemri}
                                                onChange={(e) => setEditedData({ ...editedData, mbiemri: e.target.value })}
                                            />
                                        ) : (
                                            tour.mbiemri
                                        )}
                                    </td>
                                   <td>
                                       {editedData.id === tour.id ? (
                                           <select
                                               style={{ width: '180px', height: '50px' }}
                                               value={newTourStatusi}
                                               onChange={(e) => setNewTourStatusi(e.target.value)} // Bind to newTourStatusi
                                           >
                                               <option>Selekto opsionin</option>
                                               <option value="Konfirmuar">Konfirmuar</option>
                                               <option value="Anuluar">Anuluar</option>
                                           </select>

                                       ) : (
                                           tour.statusi
                                       )}
                                   </td>
                                    <td>
                                        {editedData.id === tour.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() =>
                                                    updateTour(editedData.emri, editedData.mbiemri ,editedData.statusi, editedData.id)
                                                }
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ color: 'darkblue' }}
                                                onClick={() => handleEditTour(tour.id)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkred' }}
                                            variant="danger"
                                            onClick={() => handleDeleteTour(tour.id)}
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
                                    placeholder="Emri"
                                    value={newTourEmri}
                                    onChange={(e) => setNewTourEmri(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Mbiemri"
                                    value={newTourMbiemri}
                                    onChange={(e) => setNewTourMbiemri(e.target.value)}
                                />

                                 <select
                                            style={{ width: '180px', height: '50px' }}
                                            value={newTourStatusi}
                                            onChange={(e) => setNewTourStatusi(e.target.value)} // Bind to newTourStatusi
                                        >
                                            <option>Selekto opsionin</option>
                                            <option value="Konfirmuar">Konfirmuar</option>
                                            <option value="Anuluar">Anuluar</option>
                                        </select>
                                <div style={{ paddingTop: '10px' }}>
                                    <Button
                                        style={{ borderColor: 'green', color: 'darkgreen' }}
                                        onClick={addTour}
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
                                Shto tour
                            </Button>
                        )}
                    </div>
                )}
                <div style={{ paddingTop: '20px' }}>
                        {showTour && (
                          <div>
                            <input
                              style={{ width: '180px', height: '50px' }}
                              type="text"
                              placeholder="Shkruani ID-ne"
                              value={inputTourId}
                              onChange={(e) => setInputTourId(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleRetrieveTour}>
                              Kerko
                            </Button>
                          </div>
                        )}
                        {showTour && (
                          <div style={{ paddingTop: '20px' }}>
                            <input
                                style={{ width: '180px', height: '50px' }}
                                type="text"
                                placeholder="Shkruani emrin e tour: "
                                value={searchTourName}
                                onChange={(e) => setSearchTourName(e.target.value)}
                            />
                            <Button variant="primary" onClick={handleRetrieveTourByName}>
                                Kerko me emer
                            </Button>
                          </div>
                        )}
                        {selectedTourId && (
                          <div style={{ paddingTop: '20px' }}>
                            <TourDetail tour={data.find((tour) => tour.id === selectedTourId)} />
                          </div>
                        )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Tour;


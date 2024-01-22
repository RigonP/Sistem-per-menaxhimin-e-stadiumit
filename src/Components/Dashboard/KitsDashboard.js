import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Card, Button, Table, Alert} from 'react-bootstrap';
import { FaTshirt } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const KitsDashboard = () => {

   const [data, setData] = useState([]);
   const [showKits, setShowKits] = useState(false);
   const [editedData, setEditedData] = useState({});
   const [showAddForm, setShowAddForm] = useState(false);
   const [newProductId, setNewProductId] = useState('');
   const [newKitsName, setNewKitsName] = useState('');
   const [newKitsDescription, setNewKitsDescription] = useState('');
   const [newKitsPrice, setNewKitsPrice] = useState('');
   const [newKitsPlayer, setNewKitsPlayer] = useState('');
   const [successMessage, setSuccessMessage] = useState('');
   const [errorMessage, setErrorMessage] = useState('');


    const handleEditKits = (id) => {
        const kitsToEdit = data.find((kits) => kits.id === id);
        setEditedData(kitsToEdit);
    }


    const updateKitsStatus = (id, status) => {
            api
                .post(`http://localhost:8080/kits/updateStatus`, { id, status })
                .then((response) => {
                    const updatedStatus = response.data === 'true';
                    const updatedStatusKits = data.map((kits) => {
                        if (kits.id === id) {
                            return { ...kits, status: updatedStatus };
                        }
                        return kits;
                    });
                    setData(updatedStatusKits);
                    setSuccessMessage('Kits status updated successfully.');
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000); // Hide success message after 3 seconds
                })
                .catch((error) => {
                    console.error(error);
                    setErrorMessage('Failed to update kits status.');
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000); // Hide success message after 3 seconds
                });
        };



            const updateKits = (productId, name, description, player, price, id) => {
                api
                    .post('http://localhost:8080/kits/update', {
                        productId: parseInt(productId),
                        name: name,
                        description: description,
                        player: player,
                        price: parseFloat(price),
                        id: parseInt(id),
                    })
                    .then((response) => {
                        console.log(response);
                        handleShowAllKits(); // Refresh the product list after successful update
                        setEditedData({}); // Clear the edited data
                        setSuccessMessage('Kit updated successfully.');
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 3000); // Hide success message after 3 seconds
                    })
                    .catch((error) => {
                        console.error(error);
                        setErrorMessage('Failed to update the kit.');
                        setTimeout(() => {
                            setSuccessMessage(null);
                        }, 3000); // Hide success message after 3 seconds
                    });
            };


            const handleDeleteKits = (id) => {
                    api
                        .post(`http://localhost:8080/kits/delete/${id}`)
                        .then((response) => {
                            console.log(response);
                            handleShowAllKits(); // Refresh the product list after successful deletion
                            setSuccessMessage('Kit deleted successfully.');
                            setTimeout(() => {
                                setSuccessMessage(null);
                            }, 3000); // Hide success message after 3 seconds
                        })
                        .catch((error) => {
                            console.error(error);
                            setErrorMessage('Failed to delete the kit.');
                            setTimeout(() => {
                                setSuccessMessage(null);
                            }, 3000); // Hide success message after 3 seconds
                        });
                };


                const addKits = () => {
                        if (
                            newKitsName.trim() === '' ||
                            newProductId.trim() === '' ||
                            newKitsDescription.trim() === '' ||
                            newKitsPlayer.trim()=== '' ||
                            newKitsPrice.trim() === ''
                        ) {
                            // Input is empty, do not proceed
                            return;
                        }
                        api
                            .post('http://localhost:8080/kits/add', {
                                productId: parseInt(newProductId),
                                name: newKitsName,
                                description: newKitsDescription,
                                player: newKitsPlayer,
                                price: parseFloat(newKitsPrice),
                            })
                            .then((response) => {
                                console.log(response);
                                handleShowAllKits(); // Refresh the product list after successful addition
                                setNewProductId(''); // Clear the input fields
                                setNewKitsName('');
                                setNewKitsDescription('');
                                setNewKitsPlayer('');
                                setNewKitsPrice('');
                                setShowAddForm(false); // Hide the add form
                                setSuccessMessage('Kit added successfully.');
                                setTimeout(() => {
                                    setSuccessMessage(null);
                                }, 3000); // Hide success message after 3 seconds
                            })
                            .catch((error) => {
                                console.error(error);
                                setErrorMessage('Failed to add the Kit.');
                                setTimeout(() => {
                                    setSuccessMessage(null);
                                }, 3000); // Hide success message after 3 seconds
                            });
                    };

                    const handleShowAllKits = () => {
                            api
                                .get('http://localhost:8080/kits/get')
                                .then((response) => {
                                    setData(response.data);
                                    setShowKits(true);
                                })
                                .catch((error) => {
                                    console.error(error);
                                    setErrorMessage('Failed to fetch kits.');
                                    setTimeout(() => {
                                        setErrorMessage(null);
                                    }, 3000); // Hide success message after 3 seconds
                                });
                        };

                     useEffect(() => {
                          handleShowAllKits();
                     }, []);


    return (
            <Card className="carddashboard">
                <Card.Body>
                    <Card.Title className="cardtitledashboard">
                        <FaTshirt className="FaShoppingCart" /> Kits
                    </Card.Title>
                    {successMessage && <Alert variant="success">{successMessage}</Alert>}
                    {/*{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}*/}
                    {showKits && (
                        <Button className="buttondashboard" variant="primary" onClick={() => setShowKits(false)}>
                            Close
                        </Button>
                    )}
                    {!showKits && (
                        <Button className="buttondashboard" variant="primary" onClick={handleShowAllKits}>
                            Show All Kits
                        </Button>
                    )}
                    {showKits && (
                        <div>
                            <Table>
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Player</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                    <th>Product ID</th>
                                    <th>Product Name</th>
                                    <th>Change Status</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data.map((kits) => (
                                    <tr key={kits.id}>
                                        <td>{kits.id}</td>
                                        <td>
                                            {editedData.id === kits.id ? (
                                                <input
                                                    style={{ width: '180px', height: '50px' }}
                                                    type="text"
                                                    value={editedData.name}
                                                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                                />
                                            ) : (
                                                kits.name
                                            )}
                                        </td>
                                        <td>
                                            {editedData.id === kits.id ? (
                                                <input
                                                    style={{ width: '180px', height: '50px', fontSize: '12px' }}
                                                    type="text"
                                                    value={editedData.description}
                                                    onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                                                />
                                            ) : (
                                                kits.description
                                            )}
                                        </td>
                                         <td>
                                             {editedData.id === kits.id ? (
                                               <input
                                                  style={{ width: '180px', height: '50px', fontSize: '12px' }}
                                                     type="text"
                                                    value={editedData.player}
                                                  onChange={(e) => setEditedData({ ...editedData, player: e.target.value })}
                                                    />
                                              ) : (
                                                kits.player
                                         )}
                                        </td>
                                        <td>
                                            {editedData.id === kits.id ? (
                                                <input
                                                    style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                    type="number"
                                                    value={editedData.price}
                                                    onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
                                                />
                                            ) : (
                                                kits.price
                                            )}
                                        </td>
                                        <td>{kits.status}</td>
                                        <td>
                                            {editedData.id === kits.id ? (
                                                <input
                                                    style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                    type="number"
                                                    value={editedData.productId}
                                                    onChange={(e) => setEditedData({ ...editedData, productId: e.target.value })}
                                                />
                                            ) : (
                                                kits.productId
                                            )}
                                        </td>
                                        <td>{kits.productName}</td>
                                        <td>
                                            <Button
                                                style={{ color: 'darkblue' }}
                                                onClick={() => updateKitsStatus(kits.id,!kits.status)}
                                            >
                                                {kits.status ? 'Deactivate' : 'Activate'}
                                            </Button>
                                        </td>
                                        <td>
                                            {editedData.id === kits.id ? (
                                                <Button
                                                    style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                    onClick={() =>
                                                        updateKits(editedData.productId, editedData.name, editedData.description,editedData.player , editedData.price, editedData.id)
                                                    }
                                                >
                                                    Update
                                                </Button>
                                            ) : (
                                                <Button
                                                    style={{ color: 'darkblue' }}
                                                    onClick={() => handleEditKits(kits.id)}
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                style={{ color: 'darkred' }}
                                                variant="danger"
                                                onClick={() => handleDeleteKits(kits.id)}
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
                                        placeholder="Product ID"
                                        value={newProductId}
                                        onChange={(e) => setNewProductId(e.target.value)}
                                    />
                                    <input
                                        style={{ width: '180px', height: '50px' }}
                                        type="text"
                                        placeholder="Name"
                                        value={newKitsName}
                                        onChange={(e) => setNewKitsName(e.target.value)}
                                    />
                                    <input
                                        style={{ width: '180px', height: '50px' }}
                                        type="text"
                                        placeholder="Description"
                                        value={newKitsDescription}
                                        onChange={(e) => setNewKitsDescription(e.target.value)}
                                    />
                                    <input
                                       style={{ width: '180px', height: '50px' }}
                                       type="text"
                                       placeholder="Player"
                                       value={newKitsPlayer}
                                       onChange={(e) => setNewKitsPlayer(e.target.value)}
                                       />
                                    <input
                                        style={{ width: '180px', height: '50px' }}
                                        type="text"
                                        placeholder="Price"
                                        value={newKitsPrice}
                                        onChange={(e) => setNewKitsPrice(e.target.value)}
                                    />
                                    <div style={{ paddingTop: '10px' }}>
                                        <Button
                                            style={{ borderColor: 'green', color: 'darkgreen' }}
                                            onClick={addKits}
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
                                    Add Kit
                                </Button>
                            )}
                        </div>
                    )}
                </Card.Body>
            </Card>
        );
}

export default KitsDashboard;

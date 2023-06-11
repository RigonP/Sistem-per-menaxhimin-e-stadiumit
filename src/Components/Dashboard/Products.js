import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table, Alert } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';
import api from "../Utils/api";

const Products = () => {
    const [data, setData] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleEditProduct = (id) => {
        const productToEdit = data.find((product) => product.id === id);
        setEditedData(productToEdit);
    };

    const updateProductStatus = (id, status) => {
        api
            .post(`http://localhost:8080/product/updateStatus`, { id, status })
            .then((response) => {
                const updatedStatus = response.data === 'true';
                const updatedStatusProducts = data.map((product) => {
                    if (product.id === id) {
                        return { ...product, status: updatedStatus };
                    }
                    return product;
                });
                setData(updatedStatusProducts);
                setSuccessMessage('Product status updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update product status.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const updateProduct = (categoryId, name, description, price, id) => {
        api
            .post('http://localhost:8080/product/update', {
                categoryId: parseInt(categoryId),
                name: name,
                description: description,
                price: parseFloat(price),
                id: parseInt(id),
            })
            .then((response) => {
                console.log(response);
                handleShowAllProducts(); // Refresh the product list after successful update
                setEditedData({}); // Clear the edited data
                setSuccessMessage('Product updated successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to update the product.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const handleDeleteProduct = (id) => {
        api
            .post(`http://localhost:8080/product/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllProducts(); // Refresh the product list after successful deletion
                setSuccessMessage('Product deleted successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to delete the product.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const addProduct = () => {
        if (
            newProductName.trim() === '' ||
            newCategoryId.trim() === '' ||
            newProductDescription.trim() === '' ||
            newProductPrice.trim() === ''
        ) {
            // Input is empty, do not proceed
            return;
        }
        api
            .post('http://localhost:8080/product/add', {
                categoryId: parseInt(newCategoryId),
                name: newProductName,
                description: newProductDescription,
                price: parseFloat(newProductPrice),
            })
            .then((response) => {
                console.log(response);
                handleShowAllProducts(); // Refresh the product list after successful addition
                setNewCategoryId(''); // Clear the input fields
                setNewProductName('');
                setNewProductDescription('');
                setNewProductPrice('');
                setShowAddForm(false); // Hide the add form
                setSuccessMessage('Product added successfully.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to add the product.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    const handleShowAllProducts = () => {
        api
            .get('http://localhost:8080/product/get')
            .then((response) => {
                setData(response.data);
                setShowProducts(true);
            })
            .catch((error) => {
                console.error(error);
                setErrorMessage('Failed to fetch products.');
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 3000); // Hide success message after 3 seconds
            });
    };

    useEffect(() => {
        handleShowAllProducts();
    }, []);

    return (
        <Card className="carddashboard">
            <Card.Body>
                <Card.Title className="cardtitledashboard">
                    <FaShoppingCart className="FaShoppingCart" /> Products
                </Card.Title>
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                {showProducts && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowProducts(false)}>
                        Close
                    </Button>
                )}
                {!showProducts && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllProducts}>
                        Show All Products
                    </Button>
                )}
                {showProducts && (
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Category ID</th>
                                <th>Category Name</th>
                                <th>Change Status</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>
                                        {editedData.id === product.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px' }}
                                                type="text"
                                                value={editedData.name}
                                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                            />
                                        ) : (
                                            product.name
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === product.id ? (
                                            <input
                                                style={{ width: '180px', height: '50px', fontSize: '12px' }}
                                                type="text"
                                                value={editedData.description}
                                                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                                            />
                                        ) : (
                                            product.description
                                        )}
                                    </td>
                                    <td>
                                        {editedData.id === product.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="number"
                                                value={editedData.price}
                                                onChange={(e) => setEditedData({ ...editedData, price: e.target.value })}
                                            />
                                        ) : (
                                            product.price
                                        )}
                                    </td>
                                    <td>{product.status}</td>
                                    <td>
                                        {editedData.id === product.id ? (
                                            <input
                                                style={{ paddingLeft: '10px', width: '50px', height: '50px' }}
                                                type="number"
                                                value={editedData.categoryId}
                                                onChange={(e) => setEditedData({ ...editedData, categoryId: e.target.value })}
                                            />
                                        ) : (
                                            product.categoryId
                                        )}
                                    </td>
                                    <td>{product.categoryName}</td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkblue' }}
                                            onClick={() => updateProductStatus(product.id,!product.status)}
                                        >
                                            {product.status ? 'Deactivate' : 'Activate'}
                                        </Button>
                                    </td>
                                    <td>
                                        {editedData.id === product.id ? (
                                            <Button
                                                style={{ borderColor: 'darkgreen', color: 'darkgreen' }}
                                                onClick={() =>
                                                    updateProduct(editedData.categoryId, editedData.name, editedData.description, editedData.price, editedData.id)
                                                }
                                            >
                                                Update
                                            </Button>
                                        ) : (
                                            <Button
                                                style={{ color: 'darkblue' }}
                                                onClick={() => handleEditProduct(product.id)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            style={{ color: 'darkred' }}
                                            variant="danger"
                                            onClick={() => handleDeleteProduct(product.id)}
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
                                    placeholder="Name"
                                    value={newProductName}
                                    onChange={(e) => setNewProductName(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Description"
                                    value={newProductDescription}
                                    onChange={(e) => setNewProductDescription(e.target.value)}
                                />
                                <input
                                    style={{ width: '180px', height: '50px' }}
                                    type="text"
                                    placeholder="Price"
                                    value={newProductPrice}
                                    onChange={(e) => setNewProductPrice(e.target.value)}
                                />
                                <div style={{ paddingTop: '10px' }}>
                                    <Button
                                        style={{ borderColor: 'green', color: 'darkgreen' }}
                                        onClick={addProduct}
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
                                Add Product
                            </Button>
                        )}
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default Products;
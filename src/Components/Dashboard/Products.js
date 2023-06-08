import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';

const Products = () => {
    const [data, setData] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [editedData, setEditedData] = useState({});

    const handleEditProduct = (id) => {
        const productToEdit = data.find(product => product.id === id);
        setEditedData(productToEdit);
    };

    const updateProductStatus = (id, status) => {
        axios
            .post(`http://localhost:8080/product/updateStatus`, { id, status })
            .then(response => {
                const updatedStatus = response.data === 'true';
                const updatedStatusProducts = data.map(product => {
                    if (product.id === id) {
                        return { ...product, status: updatedStatus };
                    }
                    return product;
                });
                setData(updatedStatusProducts);
            })
            .catch(error => console.error(error));
    };

    const updateProduct = (categoryId, name, description, price, id) => {
        axios
            .post('http://localhost:8080/product/update', {
                categoryId: parseInt(categoryId),
                name: name,
                description: description,
                price: parseFloat(price),
                id: parseInt(id)
            })
            .then(response => {
                // Handle the response if needed
                console.log(response);
                handleShowAllProducts(); // Refresh the product list after successful update
                setEditedData({}); // Clear the edited data
            })
            .catch(error => {
                // Handle errors if needed
                console.error(error);
            });
    };

    const handleDeleteProduct = (id) => {
        axios
            .post(`http://localhost:8080/product/delete/${id}`)
            .then((response) => {
                console.log(response);
                handleShowAllProducts(); // Refresh the product list after successful deletion
            })
            .catch((error) => {
                console.error(error);
            });
    };



    const handleShowAllProducts = () => {
        axios
            .get("http://localhost:8080/product/get")
            .then(response => {
                setData(response.data);
                setShowProducts(true);
            })
            .catch(error => console.error(error));
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
                {showProducts && (
                    <Button className="buttondashboard" variant="primary" onClick={() => setShowProducts(false)}>Close</Button>
                )}
                {!showProducts && (
                    <Button className="buttondashboard" variant="primary" onClick={handleShowAllProducts}>Show All Products</Button>
                )}
                {showProducts && data && data.length > 0 && (
                    <Table striped bordered>
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
                        {data.map(product => (
                            <tr key={product.id}>
                               <td>{product.id}</td>
                                <td>
                                    <input style={{ width : "180px" , height : "50px"}}
                                        type="text"
                                        value={editedData.id === product.id ? editedData.name : product.name}
                                        onChange={(e) => setEditedData({...editedData, name: e.target.value})}
                                    />
                                </td>
                                <td>
                                    <input style={{ width : "180px" , height : "50px" , fontSize : "12px"}}
                                        type="text"
                                        value={editedData.id === product.id ? editedData.description : product.description}
                                        onChange={(e) => setEditedData({...editedData, description: e.target.value})}
                                    />
                                </td>
                                <td>
                                    <input style={{ paddingLeft:"10px" ,width:"50px", height : "50px"}}
                                        type="number"
                                        value={editedData.id === product.id ? editedData.price : product.price}
                                        onChange={(e) => setEditedData({...editedData, price: e.target.value})}
                                    />
                                </td>
                                <td>{product.status}</td>
                                <td>
                                    <input style={{ paddingLeft:"20px",width:"50px", height : "50px"}}
                                        type="number"
                                        value={editedData.id === product.id ? editedData.categoryId : product.categoryId}
                                        onChange={(e) => setEditedData({...editedData, categoryId: e.target.value})}
                                    />
                                </td>
                                <td>{product.categoryName}</td>

                                <td>
                                    <Button onClick={() => updateProductStatus(product.id, !product.status)}>
                                        {product.status ? 'Change Status' : 'Change Status'}
                                    </Button>
                                </td>
                                <td>
                                    {editedData.id === product.id ? (
                                        <Button onClick={() => updateProduct(editedData.categoryId, editedData.name, editedData.description, editedData.price, editedData.id)}>
                                            Update
                                        </Button>
                                    ) : (
                                        <Button onClick={() => handleEditProduct(product.id)}>
                                            Edit
                                        </Button>

                                    )}
                                </td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>
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

export default Products;

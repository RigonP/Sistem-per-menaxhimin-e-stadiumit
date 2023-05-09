import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Table } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import '../Dashboard/Dashboard.css';

const Products = () => {
    const [data, setData] = useState([]);
    const [showProducts, setShowProducts] = useState(false);

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
                    <Button className="buttondashboard"  variant="primary" onClick={() => setShowProducts(false)}>Close</Button>
                )}
                {!showProducts && (
                    <Button className="buttondashboard"  variant="primary" onClick={handleShowAllProducts}>Show All Products</Button>
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
                        </tr>
                        </thead>
                        <tbody>
                        {data.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.status}</td>
                                <td>{product.categoryId}</td>
                                <td>{product.categoryName}</td>
                                <td>
                                    <Button onClick={() => updateProductStatus(product.id, !product.status)}>
                                        {product.status ? 'Change Status' : 'Change Status'}
                                    </Button>
                                </td>
                                {/*<td>*/}
                                {/*    <Button onClick={() => updateProduct(categoryId, name, description, price, id)}>*/}
                                {/*        */}
                                {/*    </Button>*/}
                                {/*</td>*/}
                                {/*<td>*/}
                                {/*    <Button onClick={() => deleteProductButton(user.id, !user.status)}>*/}
                                {/*        {user.status ? 'Change Status' : 'Change Status'}*/}
                                {/*    </Button>*/}
                                {/*</td>*/}
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

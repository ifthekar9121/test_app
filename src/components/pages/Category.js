import React, { useState, useEffect } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import $ from 'jquery';

import { Link } from "react-router-dom";
  

export default function Category(){

    const [categories, setCategories] = useState([]);

    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const cats = () =>[
            {
                id: 1,
                name: "Category One",
                parent_id: 0
            },
            {
                id: 2,
                name: "Category Two",
                parent_id: 2
            },
            {
                id: 3,
                name: "Category Three",
                parent_id: 2
            },
            {
                id: 4,
                name: "Category Four",
                parent_id: 1
            }
        ]
        setCategories(cats)
    }, [])

    
    $(document).ready(function () {
        setTimeout(function(){
        $('#category').DataTable();
        } ,1000);

    });

    return (
        <>
            <div className="container">
                <div className='mt-5'>
                    <div className='float-end mb-4'>
                        <Button onClick= {handleShow} variant="primary">Add Category</Button>{' '}
                    </div>
                    <Table id="category" striped bordered hover cell-border>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Parent Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((result, index) => {
                                return (
                                    
                                    <tr key={index}>
                                        <td>{result.id}</td>
                                        <td>{result.name}</td>
                                        <td>{result.parent_id}</td>
                                        <td>
                                            <Button as={Link} to="/category/add" variant="primary"><FontAwesomeIcon icon={faEye} /></Button>{' '}
                                            <Button as={Link} to="/category/add" variant="warning"><FontAwesomeIcon icon={faPenToSquare} /></Button>{' '}
                                            <Button as={Link} to="/category/add" variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                                        </td>
                                    </tr>
                            
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Category Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Category Name"
                                required
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Parent Category:</Form.Label>
                            <Form.Control as="select">
                                <option>Select Parent Category</option>
                                <option value="1">Category One</option>
                                <option value="2">Category Two</option>
                                <option value="3">Category Three</option>
                                <option value="3">Category Four</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Category Description:</Form.Label>
                            <Form.Control as="textarea" placeholder="Optional" rows={3} />
                        </Form.Group>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" type="submit"> Save </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}


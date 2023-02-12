import React, { useState, useEffect } from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import $ from 'jquery';
import { Link } from "react-router-dom";

//For API Requests
import axios from 'axios';
  

function Category (){

    const [categories, setCategories] = useState([]);
    const [parentCategories, setParentCategories] = useState([]);
    // Add Category Initialize ... 
    const [catName, setCatName] = useState('');
    const [catParentId, setParentId] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [displayParentCategory, setDisplayParentCategory] = useState(false);

    useEffect(() => {
        fetchAllCategories();
        fetchAllParentCategories()
    }, [])

    // Categories Lists read ... 
    const fetchAllCategories = () => {
        axios.get('http://127.0.0.1:8000/api/categories')
        .then(function (res) {
            setCategories(res.data.data);
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    $(document).ready(function () {
        setTimeout(function(){
        $('#category').DataTable();
        } ,1000);

    });
    // Categories Lists read ...

    //Parent categories lists ... 
    const fetchAllParentCategories = () => {
        axios.get('http://127.0.0.1:8000/api/get_parent_categories')
        .then(function (res) {
            // console.log(res.data.data);
            setParentCategories(res.data.data);
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    // const categoryTypes = [
    //     "Incomes", "Assets&Liabilities", "Investment", "Expenses", "Rebates"
    // ]

    // Category Add ... 
    const handleCategorySave = () => {
        setIsSaving(true);
        axios.post('http://127.0.0.1:8000/api/categories', {
            name: catName,
            parent_id: catParentId
          })
          .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Category saved successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setCatName('');
            setParentId('');
            handleClose();
            fetchAllCategories()
          })
          .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false)
          });
    }
    // Category Add ... 

    // Category Delete ... 
    const handleCategoryDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
                .then(function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Category deleted successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    fetchAllCategories()
                })
                .catch(function (error) {
                    Swal.fire({
                         icon: 'error',
                        title: 'An Error Occured!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
            }
          })
    }
    // Category Delete ... 

    return (
        <>
            <div className="container">
                <div className='mt-5'>
                    <div className='float-end float-right mb-4'>
                        <Button onClick= {handleShow} variant="primary">Add Category</Button>{' '}
                    </div>
                    <Table id="category" striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category Name</th>
                                <th>Category Type</th>
                                <th>Parent Category</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((category, key) => {
                                return (
                                    
                                    <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{category.name}</td>
                                        <td>{category.type}</td>
                                        <td>{category.parent_id}</td>
                                        <td>
                                            <Button as={Link} to="/category/add" variant="primary"><FontAwesomeIcon icon={faEye} /></Button>{' '}
                                            <Button as={Link} to="/category/add" variant="warning"><FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>{' '}
                                            <Button variant="danger" onClick={()=>handleCategoryDelete(category.id)}><FontAwesomeIcon icon={faTrash} />
                                            </Button>{' '}
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
                                onChange={(event)=>{setCatName(event.target.value)}}
                                value={catName}
                                type="text"
                                placeholder="Category Name"
                                required
                                autoFocus
                                id="name"
                                name="name"
                            />
                        </Form.Group>

                        {/* <Form.Group className="mb-3">
                            <Form.Label>Category Type:</Form.Label>
                            <Form.Control as="select">
                                <option>Select Category Type</option>
                                {categoryTypes.map((type, index) =>  {
                                    return (
                                        <option value="1" key={index}>{type}</option>
                                    )
                                }) 
                                }
                            </Form.Control>
                        </Form.Group> */}

                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Check this switch"
                            checked={displayParentCategory}
                            onChange={(e) => setDisplayParentCategory(e.target.checked)} 
                        />
                        {
                            displayParentCategory 
                            && 
                            <Form.Group className="mb-3">
                                <Form.Label>Parent Category:</Form.Label>
                                <Form.Control as="select">
                                    <option>Select Parent Category</option>
                                    {
                                        parentCategories.map((parentCategory, key) => {
                                            return (
                                                <option
                                                key={key} 
                                                onChange={(event)=>{setParentId(event.target.value)}}
                                                value={parentCategory.id}
                                                id="parent_id"
                                                name="parent_id" 
                                                >
                                                    {parentCategory.name}
                                                </option>
                                            )
                                        })
                                    }
                                </Form.Control>
                            </Form.Group>
                        }

                        {/* <Form.Group className="mb-3" >
                            <Form.Label>Category Description:</Form.Label>
                            <Form.Control as="textarea" placeholder="Optional" rows={3} />
                        </Form.Group> */}
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                        Close
                        </Button>
                        <Button variant="primary" type="button"
                        disabled={isSaving}
                        onClick={handleCategorySave} 
                        > Save </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default Category;


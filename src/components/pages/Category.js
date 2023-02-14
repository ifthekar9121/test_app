import React, { useState, useContext, useEffect } from 'react'
import { Button, Form, Modal, Table, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

import $ from 'jquery';
// import { Link } from "react-router-dom";

//For API Requests
import axios from 'axios';
import { GlobalContext } from '../contexts/GlobalContextProvider';

  

function Category (){
    // const [id, setId] = useState(useParams().id);
    const [categories, setCategories] = useState([]);
    const [parentCategories, setParentCategories] = useState([]);
    const { BaseUrl } = useContext(GlobalContext)
    // Add Category Initialize ... 
    const [catName, setCatName] = useState('');
    const [parentId, setParentId] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    // Edit Category Initialize ... 
    const [editCatId, setEditCatId] = useState();
    const [editCatName, setEditCatName] = useState('');
    const [editParentId, setEditParentId] = useState('');

    // Show Single Category Initialize ... 
    const [showCatName, setShowCatName] = useState('');
    const [showCatType, setShowCatType] = useState('');
    const [showParentId, setShowParentId] = useState('');

    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const handleAddCategoryClose = () => setShowAddCategoryModal(false);
    const handleAddCategoryShow = () => setShowAddCategoryModal(true);

    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const handleEditCategoryClose = () => setShowEditCategoryModal(false);
    const handleEditCategoryShow = () => setShowEditCategoryModal(true);

    const [showSingleCategoryModal, setShowSingleCategoryModal] = useState(false);
    const handleSingleCategoryClose = () => setShowSingleCategoryModal(false);
    const handleSingleCategoryShow = () => setShowSingleCategoryModal(true);
    

    const [displayParentCategory, setDisplayParentCategory] = useState(false);

    useEffect(() => {
        fetchAllCategories();
        fetchAllParentCategories();
    }, [displayParentCategory])

    // Categories Lists read ... 
    const fetchAllCategories = () => {
        axios.get(`${BaseUrl}/api/categories`)
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
        axios.get(`${BaseUrl}/api/get_parent_categories`)
        .then(function (res) {
            setParentCategories(res.data.data);
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    //Parent categories lists ... 

    // const categoryTypes = [
    //     "Incomes", "Assets&Liabilities", "Investment", "Expenses", "Rebates"
    // ]

    // Category Add ... 
    const handleCategorySave = () => {
        setIsSaving(true);
        axios.post(`${BaseUrl}/api/categories`, {
            name: catName,
            parent_id: parentId
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
            handleAddCategoryClose();
            fetchAllCategories()
            setDisplayParentCategory(false)
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

    // Category Edit ... 
        const fetchCategoryEdit = (editCategoryId) => {
        axios.get(`${BaseUrl}/api/categories/${editCategoryId}`)
        .then(function (res) {
            // console.log(res);
            let category = res.data.data;
            setEditCatId(category.id);
            setEditCatName(category.name);
            setEditParentId(category.parent_id);
            if(category.parent_id !== 0){
                setDisplayParentCategory(true);
            }
            else{
                setDisplayParentCategory(false);
            }
        })
        .catch(function (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occured!',
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    // Category Edit ...
    
    // Category update ... 
    const handleCategoryUpdate = (updateCategoryId) => {
        setIsSaving(true);
        axios.patch(`${BaseUrl}/api/categories/${updateCategoryId}`, {
            name: editCatName,
            parent_id: editParentId
        })
        .then(function (response) {
            Swal.fire({
                icon: 'success',
                title: 'Category updated successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            setIsSaving(false);
            setCatName('');
            setParentId('');
            handleEditCategoryClose();
            fetchAllCategories();
            setDisplayParentCategory(false);
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
    // Category update ... 

    const fetchSingleCategoryShow = (showCategoryId) => {
        axios.get(`${BaseUrl}/api/categories/${showCategoryId}`)
        .then(function (res) {
            // console.log(res);
            let category = res.data.data;
            setShowCatName(category.name);
            setShowCatType(category.type);
            setShowParentId(category.parent_id);
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
                axios.delete(`${BaseUrl}/api/categories/${id}`)
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
                        <Button onClick={handleAddCategoryShow} variant="primary">Add Category</Button>
                    </div>
                    <Table id="category" striped bordered hover responsive>
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
                                        <td className='d-flex flex-*-fill'>
                                            <Button 
                                            onClick={() => {
                                                fetchSingleCategoryShow(category.id)
                                                handleSingleCategoryShow()
                                            }}
                                            variant="primary" className='m-1' size='sm'><FontAwesomeIcon icon={faEye} /></Button>
                                            <Button onClick={() => {
                                                fetchCategoryEdit(category.id)
                                                handleEditCategoryShow()
                                            }} variant="warning" className='m-1' size='sm'>
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </Button>
                                            <Button variant="danger" className='m-1' size='sm' onClick={() => handleCategoryDelete(category.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                            
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* Start Add Category Modal ...  */}
            <Modal show={showAddCategoryModal} onHide={handleAddCategoryClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Category</Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Category Name:</Form.Label>
                            <Form.Control
                                onChange={(e)=>setCatName(e.target.value)}
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
                            label="Make As Child"
                            checked={displayParentCategory}
                            onChange={(e) => setDisplayParentCategory(e.target.checked)} 
                        />
                        {
                            displayParentCategory 
                            && 
                            <Form.Group className="mb-3">
                                <Form.Label>Parent Category:</Form.Label>
                                <Form.Control as="select"                                          
                                onChange={(e)=>setParentId(e.target.value)}>
                                    <option value="0">Select Parent Category</option>
                                    {
                                        parentCategories.map((parentCategory, key) => (
                                            <option
                                            key={key}
                                            value={parentCategory.id}
                                            id="parent_id"
                                            name="parent_id" 
                                            >
                                                {parentCategory.name}
                                            </option>
                                        ))
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
                        <Button variant="secondary" onClick={handleAddCategoryClose}>
                        Close
                        </Button>
                        <Button variant="primary" type="button"
                        disabled={isSaving}
                        onClick={handleCategorySave} 
                        > Save </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
            {/* End Add Category Modal ...  */}

            {/* Start Edit Category Modal ...  */}
            <Modal show={showEditCategoryModal} onHide={handleEditCategoryClose}>
                <Modal.Header closeButton>
                <Modal.Title>Edit Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3">
                            <Form.Label>Category Name:</Form.Label>
                            <Form.Control
                                onChange={(e)=>setEditCatName(e.target.value)}
                                value={editCatName}
                                type="text"
                                placeholder="Category Name"
                                required
                                autoFocus
                                id="name"
                                name="name"
                            />
                        </Form.Group>

                        <Form.Check 
                            type="switch"
                            id="custom-switch"
                            label="Make As Child"
                            checked={displayParentCategory}
                            onChange={(e) => setDisplayParentCategory(e.target.checked)} 
                        />
                        {
                            displayParentCategory 
                            && 
                            <Form.Group className="mb-3">
                                <Form.Label>Parent Category:</Form.Label>
                                <Form.Control as="select"
                                value={editParentId}                                          
                                onChange={(e)=>setEditParentId(e.target.value)}>
                                    <option value="0">Select Parent Category</option>
                                    {
                                        parentCategories.map((parentCategory, key) => (
                                            <option
                                            key={key}
                                            value={parentCategory.id}
                                            id="parent_id"
                                            name="parent_id" 
                                            >
                                                {parentCategory.name}
                                            </option>
                                        ))
                                    }
                                </Form.Control>
                            </Form.Group>
                        }
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleEditCategoryClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleCategoryUpdate(editCatId)}>
                    Update
                </Button>
                </Modal.Footer>
            </Modal>
            {/* End Edit Category Modal ...  */}

            {/* Start Show Category Modal ...  */}
            <Modal show={showSingleCategoryModal} onHide={handleSingleCategoryClose}>
                <Modal.Header closeButton>
                <Modal.Title>Show Single Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>{showCatName}</h3>
                    <p><b>Type: </b><Badge variant="info">{showCatType}</Badge>{' '}</p>
                    <p><b>Parent Id/Name: </b><Badge variant="dark">{showParentId}</Badge>{' '}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleSingleCategoryClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            {/* End Show Category Modal ...  */}

        </>
    )
}

export default Category;


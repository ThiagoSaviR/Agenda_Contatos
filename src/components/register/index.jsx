import React, {useState, useEffect}from 'react';
import fireDb from '../../dataBase/firebase';

import Form from '../form';

const Register = () => {
    const [data, setData] = useState({});
    const [modalData, setModalData] = useState({});
    const [id, setId] = useState('');

    useEffect(() => {
        fireDb.child('contacts').on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setData({
                    ...snapshot.val()
                });
            } else {
                setData({});
            }
        })
    }, []);

    const addEdit = (obj) => {

        if (id === '') {
        fireDb.child("contacts").push(
            obj,
            (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Success");
                }
            }
        );
        } else {
            fireDb.child(`contacts/${id}`).set(
                obj,
                (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Success");
                    }
                }
            );
        }

    }

    const handleViewClick = (mData) => {
        setModalData(mData)
    }

    const delContacts = (key) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            fireDb.child(`contacts/${key}`).remove(
            error => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Success");
                }
            })
        }
    }

    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                <h1 className="display-4">VExpenses Contacts</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                            <Form {...({addEdit, id, data})}/>
                </div>
                <div className='col-md-6'>
                    <table className="table table-striped">
                        <thead className="thead-ligth">
                            <tr>
                                <th>Name</th>
                                <th>View</th>
                                <th>Edit</th>
                                <th>Delete</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(data).map(id => {
                                    return <tr key={id}>
                                        <td>{data[id].fullName}</td>
                                        <td>
                                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={() => handleViewClick(data[id])}>
                                                <i className="fa-solid fa-eye"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-warning" onClick={() => {setId(id)}} >
                                                <i className="fa-solid fa-pencil"></i>
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => {delContacts(id)}}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>

                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Contact</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                           

                           <table className="table table-borderless">
                                <thead className="thead-ligth">
                                    <tr className="col-md-7">
                                        <th>Name</th>
                                        <th>E-mail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{modalData.fullName}</td>
                                        <td>{modalData.email}</td>
                                    </tr>
                                </tbody>
                                <thead className="thead-ligth">
                                    <tr>
                                        <th>Phone</th>
                                        <th>Zip Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{modalData.phone}</td>
                                        <td>{modalData.zipCode}</td>
                                    </tr>
                                </tbody>
                                <thead className="thead-ligth">
                                    <tr>
                                        <th>Street</th>
                                        <th>Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{modalData.street}</td>
                                        <td>{modalData.number}</td>
                                    </tr>
                                </tbody>
                                <thead className="thead-ligth">
                                    <tr>
                                        <th>City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{modalData.city}</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
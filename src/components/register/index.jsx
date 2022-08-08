import React, {useState, useEffect}from 'react';
import fireDb from '../../dataBase/firebase';

import Form from '../form';



const Register = () => {
    const [data, setData] = useState({});
    const [modalData, setModalData] = useState({});
    const [id , setId] = useState('');
    const [search, setSearch] = useState('');
    const [order, setOrder] = useState('asc');

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
            fireDb.child("contacts").child(id).set(
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

    const deleteContact = (id) => {
        if (window.confirm('Deseja realmente excluir este contato?')) {
            fireDb.child("contacts").child(id).remove(
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
        console.log(mData);
    }

    const sorting = (field) => {
        console.log("order")
        if (order === 'asc') {
            const sortedData = Object.values(data).sort((a, b) => a[field] > b[field] ? 1 : -1);
            setData(sortedData);
            setOrder('dsc');
        }
        if (order === 'dsc') {
            const sortedData = Object.values(data).sort((a, b) => a[field] < b[field] ? 1 : -1);
            setData(sortedData);
            setOrder('asc');
        }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                <h1>VExpenses Contacts</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Form {...( {addEdit, id, data} )}/>
                </div>

                <div className='col-md-6'>
                    <div className="form-group input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <input
                            className="form-control "
                            placeholder="Search"
                            name="search"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                    <table className="table table-striped">
                        <thead className="thead-ligth">
                            <tr>
                                <th className=""
                                    onClick={() => 
                                    sorting("fullName") }>Name
                                    {order === "asc" ? 
                                    <i className="fa-solid fa-caret-up mx-3 cursor-pointer"></i> : 
                                    <i className="fa-solid fa-caret-down mx-3"></i>}
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(data).map(id => {
                                    const constact = data[id];
                                    return(
                                        constact.fullName.toLowerCase().includes(search.toLocaleLowerCase()) ? ( 
                                        <tr key={id}>
                                            <td>{constact.fullName}</td>
                                            <td>
                                                <button className="btn btn-primary mx-1" data-toggle="modal" data-target="#modal" onClick={() => handleViewClick(constact)}>
                                                    <i className="fa-solid fa-eye"></i>
                                                </button>
                                                <button className="btn btn-warning mx-1" onClick={() => {setId(id)}}>
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                                <button className="btn btn-danger mx-1" onClick={() => deleteContact(id)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                            )
                                        : null
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modalLabel">Contact info</h5>
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
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
import React, {useState, useEffect}from 'react';
import fireDb from '../../dataBase/firebase';

import Form from '../form';
import Modal from '../modal';

import { Table } from './viewContactInfoTable'



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
                    console.log("Success save");
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
                        console.log("Success edit");
                    }
                }
            );
        }
    }

    const [contactId, setContactId] = useState('');
    const deleteContact = (id) => {
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

    const handleViewClick = (mData) => {
        setModalData(mData)
        console.log(mData);
    }

    const sorting = (field) => {
        if (order === 'dsc') {
            const sortedData = Object.values(data).sort((a, b) => a[field] > b[field] ? 1 : -1);
            setData(sortedData);
            setOrder('asc');
        }
        if (order === 'asc') {
            const sortedData = Object.values(data).sort((a, b) => a[field] < b[field] ? 1 : -1);
            setData(sortedData);
            setOrder('dsc');
        }
    }

    return (
        <>
            <div className="jumbotron jumbotron-fluid m-2">
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
                                <th 
                                    onClick={() => 
                                    sorting("fullName") }>
                                        Name
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
                                                <button className="btn btn-primary mx-1" data-toggle="modal" data-target="#modalInfo" onClick={() => handleViewClick(constact)}>
                                                    <i className="fa-solid fa-eye"></i>
                                                </button>
                                                <button className="btn btn-warning mx-1" onClick={() => {setId(id)
                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth",
                                                  });
                                                
                                                }}>
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                                <button className="btn btn-danger mx-1" data-toggle="modal" data-target="#modalDelete" onClick={() => setContactId(id)}>
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
            
            <Modal 
            title="Contact Info"
            content={<Table data={modalData}/>} 
            target="modalInfo"
            />
            <Modal 
            title="Delete Contact"
            content="Do you really want to delete this contact?" 
            target="modalDelete"
            onclick2={() => deleteContact(contactId)} 
            twoButtons={true}
            colorButton="danger"
            />
            
        </>
    );
}

export default Register;
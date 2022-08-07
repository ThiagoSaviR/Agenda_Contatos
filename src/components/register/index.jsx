import React, {useState, useEffect}from 'react';
import fireDb from '../../dataBase/firebase';

import Form from '../form';

import vexpensesLogo from '../../assets/imgs/vexpensesLogo.png';

const Register = () => {
    const [data, setData] = useState({});
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        fireDb.child('contatos').on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setData({
                    ...snapshot.val()
                });
            }
        })
    }, []);

    const addEdit = (obj) => {
        fireDb.child("contatos").push(
            obj,
            (error) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Sucesso");
                }
            }
        );
    }

    const handleViewClick = (mData) => {
        setModalData(mData)
        console.log(mData);
    }

    return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                <img className="img-fluid d-block" src={vexpensesLogo} alt="VExpenses Logo" />
                </div>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <Form addEdit={addEdit}/>
                </div>
                <div className='col-md-7'>
                    <table className="table table-striped">
                        <thead className="thead-ligth">
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
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
                                            <button className="btn btn-warning">
                                                <i className="fa-solid fa-pencil"></i>
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
                                        <th>City</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{modalData.steet}</td>
                                        <td>{modalData.number}</td>
                                        <td>{modalData.city}</td>
                                    </tr>
                                </tbody>
                                
                            </table>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
import React, { useEffect, useState, useFocus } from "react";

import Modal from "../modal";
const Form = (props) => {

    const intialValues = {
        fullName: "",
        email: "",
        phone: "",
        zipCode: "",
        street: "",
        number: "",
        city: "",
    }

    const [values, setValues] = useState(intialValues);

    useEffect(() => {
        if (props.id === "") {
            setValues({
                ...intialValues
            })
        } else {
            setValues({
                ...props.data[props.id]
            })
        }
    } , [props.id, props.data])

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setValues({ 
            ...values, 
            [name]: value 
        });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        props.addEdit(values);
    }

    const checkZipCode = (event) => {
        const { value } = event.target;
        if (value?.length !== 8 || !value) {
            return;
        }
        fetch(`https://viacep.com.br/ws/${event.target.value}/json/`)
        .then(res => res.json())
        .then(data => {
            setValues({
                ...values,
                street: data.logradouro,
                city: data.localidade,
                zipCode: data.cep
            })
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input
                    className="form-control "
                    placeholder="Name"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-envelope"></i>
                    </div>
                </div>
                <input
                    className="form-control"
                    placeholder="E-mail"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-phone"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="Phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="Zip code"
                        name="zipCode"
                        value={values.zipCode} 
                        onChange={handleInputChange} 
                        onBlur={checkZipCode}
                        required
                    />
                </div>
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fa-solid fa-location-arrow"></i>
                    </div>
                </div>
                <input 
                    className="form-control" 
                    placeholder="Street" 
                    name="street" 
                    value={values.street} 
                    onChange={handleInputChange} 
                    required
                />
            </div>
            <div className="row">
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa-solid fa-hashtag"></i>
                        </div>
                    </div>
                    <input 
                        className="form-control" 
                        placeholder="Number" 
                        name="number" 
                        value={values.number} 
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa-solid fa-city"></i>
                        </div>
                    </div>
                    <input 
                        className="form-control" 
                        placeholder="City" 
                        name="city" 
                        value={values.city} 
                        onChange={handleInputChange} 
                        required
                    />
                </div>
            </div>
            <div className="form-group mt-2">
                <input type="submit" value={props.id === '' ? "Save" : "Edit"} className="btn btn-primary btn-block" data-toggle="modal" data-target="#modalInfoSaveEdit"/>
            </div>
        </form>
        <Modal 
            title="Message"
            content={props.id === '' ? <h5>Contact saved successfully</h5> : <h5>Contact edited successfully</h5>} 
            target="modalInfoSaveEdit"
            onclick={props.id === '' ? null : () => document.location.reload(true)}
            />
        </>
    );
}

export default Form;
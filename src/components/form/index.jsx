import React, { useEffect, useMemo, useState } from "react";

import Modal from "../modal";
const Form = (props) => {
    const [morePhones, setMorePhones] = useState(false);

    const initialValues = useMemo(() => {
        return {
        fullName: "",
        email: "",
        phone1: "",
        phone2: "",
        phone3: "",
        zipCode: "",
        street: "",
        number: "",
        district: "",
        city: "",
        }
    })

    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        if (props.id === "") {
            setValues({
                ...initialValues
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
    const onSubmit = (event) => {
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
                district: data.bairro,
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
        <form autoComplete="off" onSubmit={onSubmit}>
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
                />
               
            </div>
            <div className="row">
                <div className="form-group input-group col-md-12">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-phone"></i>
                        </div>
                    </div>
                    <input
                        className="form-control"
                        placeholder="Phone"
                        name="phone1"
                        value={values.phone1}
                        onChange={handleInputChange}
                        required
                    />
                <button type="button" className="btn btn-primary mx-1"onClick={() => setMorePhones(!morePhones)}>{morePhones ? <i className="fa-solid fa-minus"></i> : <i className="fa-solid fa-plus"></i>}</button>
                </div>
                {morePhones? (
                <>       
                    <div className="form-group input-group col-md-12">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-phone"></i>
                        </div>
                    </div>
                    <input
                        className="form-control "
                        placeholder="Phone 2"
                        name="phone2"
                        value={values.phone2}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group input-group col-md-12">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-phone"></i>
                        </div>
                    </div>
                    <input
                        className="form-control "
                        placeholder="Phone 3"
                        name="phone3"
                        value={values.phone3}
                        onChange={handleInputChange}
                    />
                </div>
            </>
                ): null}

                <div className="form-group input-group col-md-12">
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
                    />
                </div>
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fa-solid fa-road"></i>
                    </div>
                </div>
                <input 
                    className="form-control" 
                    placeholder="Street" 
                    name="street" 
                    value={values.street} 
                    onChange={handleInputChange} 

                />
            </div>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fa-solid fa-city"></i>
                    </div>
                </div>
                <input 
                    className="form-control" 
                    placeholder="district" 
                    name="district" 
                    value={values.district} 
                    onChange={handleInputChange} 
                />
            </div>
            <div className="row">
                <div className="form-group input-group col-md-5">
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

                    />
                </div>
                <div className="form-group input-group col-md-7">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fa-solid fa-location-arrow"></i>
                        </div>
                    </div>
                    <input 
                        className="form-control" 
                        placeholder="City" 
                        name="city" 
                        value={values.city} 
                        onChange={handleInputChange} 
                    />
                </div>
            </div>
            <div className="form-group mt-2">
                <button submit="submit" className="btn btn-primary btn-block" data-toggle="modal" data-target={values.fullName && values.phone1 ? "#modalInfoSaveEdit" : null}>{props.id === '' ? "Save" : "Edit"}</button>
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
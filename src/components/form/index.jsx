import React, { useState } from "react";

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        props.addEdit(values);
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input
                    className="form-control"
                    placeholder="Name"
                    name="fullName"
                    value={values.name}
                    onChange={handleInputChange}
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
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
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
                    />
                </div>
            </div>
            <div className="form-group">
                <input type="submit" value="Save" className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}

export default Form;
import React from "react";
import { useForm } from "react-hook-form";

const Form = (props) => {

    const { register, handleSubmit, setValue, setFocus } = useForm();

    const onSubmit = (e) => {
        props.addEdit(e);
    }

    const checkZipCode = (event) => {
        if (!event.target.value) return; 
        const zipCode = event.target.value.replace(/\D/g, '');
        fetch(`https://viacep.com.br/ws/${zipCode}/json/`)
            .then(res => res.json())    
            .then(data => {
                console.log(data);
                setValue("street", data.logradouro);
                setValue("city", data.localidade);
                setValue("state", data.uf);
                setFocus("number");
            }).catch(err => {
                console.log(err);
            });
    }

    return (
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input
                    className="form-control"
                    type="text"
                    placeholder="Name"
                    {...register("fullName")}
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
                    type="email"
                    placeholder="E-mail"
                    {...register("email")}
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
                        type="number"
                        placeholder="Phone"
                        {...register("phone")}
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
                        type="number"
                        placeholder="Zip code"
                        {...register("zipCode")} 
                        onBlur={checkZipCode}
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
                    type="text"
                    placeholder="Street" 
                    {...register("street")} 
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
                        type="number"
                        {...register("number")}
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
                        type="text"
                        {...register("city")}
                    />
                </div>
            </div>
            <div className="form-group">
                <input type="submit" value={ props.id === '' ? "Save" : "Edit"} className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}

export default Form;
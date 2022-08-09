import React from "react";

export const Table = (props) => {
    const data = props.data;
    return (
        <table className="table table-borderless">
            <thead className="thead-ligth">
                <tr className="col-md-7">
                    <th>Name</th>
                    <th>E-mail</th>                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.fullName}</td>
                    <td>{data.email}</td>
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
                    <td>{data.phone}</td>
                    <td>{data.zipCode}</td>
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
                    <td>{data.street}</td>
                    <td>{data.number}</td>
                </tr>
            </tbody>
            <thead className="thead-ligth">
                <tr>
                    <th>City</th>             
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.city}</td>
                </tr>
            </tbody>                        
        </table>
    )
    
}


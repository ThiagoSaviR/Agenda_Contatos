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
                    <th>Phone 1</th>
                    <th>Phone 2</th>
                    <th>Phone 3</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.phone1}</td>
                    <td>{data.phone2}</td>
                    <td>{data.phone3}</td>
                </tr>
            </tbody>
            <thead className="thead-ligth">
                <tr>
                    <th>Zip Code</th>
                    <th>Street</th>
                    <th>Number</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.zipCode}</td>
                    <td>{data.street}</td>
                    <td>{data.number}</td>
                </tr>
            </tbody>
            <thead className="thead-ligth">
                <tr>
                    <th>District</th>             
                    <th>City</th>             
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{data.district}</td>
                    <td>{data.city}</td>
                </tr>
            </tbody>                        
        </table>
    )
    
}


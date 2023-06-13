import React, { useState, useEffect } from 'react';
import {baseURL, crudURL} from "../settings.js";
import {Link} from "react-router-dom";

const Rental = ({user}) => {
    const [rental, setRental] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [selectedEntity, setSelectedEntity] = useState(null);


    useEffect(() => {
        getAllEntities();
    }, []);


    // Get all entities
    const getAllEntities = () => {
        fetch(crudURL + "/all")
            .then(response => response.json())
            .then(data => {
                setRental(data);
            })
            .catch(error => console.error(error));
    };


    // Search for an entity by id
    const getEntityById = (event) => {
        fetch(crudURL + "/" + searchId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Entity not found');
                }
            })
            .then(data => setSelectedEntity(data))
            .catch(error => {
                setSelectedEntity(null);
                console.error(error);
            });
    };



    // ! RETURN
    return (
        <div className="row featurette justify-content-center">
            <div className="col-md-10">
                <h1 className="featurette-heading">Rental page:
                    <span className="text-muted"> Here you can search for a rental and see all rentals</span>
                </h1>
        <div>
            <h1>Rentals</h1>
            <div>
                <input type="text" placeholder="Search by ID" value={searchId} onChange={event => setSearchId(event.target.value)}/>
                <button type="button" onClick={getEntityById}>Search</button>
            </div>

            {selectedEntity && (
                <div>
                    <h2>Selected Entity:</h2>
                    <p>ID: {selectedEntity.id}</p>
                    <p>Startdate: {selectedEntity.startDate}</p>
                    <p>Enddate: {selectedEntity.endDate}</p>
                    <p>Price annual: {selectedEntity.priceAnnual}</p>
                    <p>Deposit: {selectedEntity.deposit}</p>
                    <p>Contact person: {selectedEntity.contactPerson}</p>
                    <button onClick={event => handleUpdate()}>Update</button>
                </div>
            )}

            <br/>
            <br/>

            <h2>All rentals:</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Price Annual</th>
                    <th>Deposit</th>
                    <th>Contact Person</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>Number of Rooms</th>
                </tr>
                </thead>
                <tbody>
                {rental.map(rentalItem => (
                    <tr key={rentalItem.id}>
                        <td>{rentalItem.id}</td>
                        <td>{rentalItem.startDate}</td>
                        <td>{rentalItem.endDate}</td>
                        <td>{rentalItem.priceAnnual}</td>
                        <td>{rentalItem.deposit}</td>
                        <td>{rentalItem.contactPerson}</td>
                        <td>{rentalItem.houseDTO.address}</td>
                        <td>{rentalItem.houseDTO.city}</td>
                        <td>{rentalItem.houseDTO.numberOfRooms}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>
</div>
    );
};

export default Rental;

import React, {useEffect, useState} from 'react';
import {baseURL, crudURL} from "../settings.js";

const Adminpage = () => {

    const [rental, setRental] = useState([]);
    const [searchId, setSearchId] = useState('');
    const [selectedEntity, setSelectedEntity] = useState(null);

    // UPDATE NOT WORKING YET
    const [updateData, setUpdateData] = useState({
        startDate: '',
        endDate: '',
        priceAnnual: '',
        deposit: '',
        contactPerson: '',
        houseid: '',
        address: '',
        city: '',
        numberOfRooms: '',
    });

    // Update entity
    const handleUpdate = () => {
        console.log(selectedEntity);
        const entityData = {
            name: updateData.name,
            description: updateData.description
        };
        fetch(crudURL + "/update/" + searchId, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entityData)
        })
            .then(response => response.json())
            .then(() => {
                getAllEntities();
                setSelectedEntity(null);
                setUpdateData({ name: '', description: '' });
            })
            .catch(error => console.error(error));
    };

    const handleDelete = (id) => {
        fetch(crudURL + "/delete/" + id, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    getAllEntities();
                    console.log('Entity deleted successfully');
                } else {
                    throw new Error('Entity not found');
                }
            })
            .catch(error => console.error(error));
    };

    // Get all entities
    useEffect(() => {
        getAllEntities();
    }, []);


    const getAllEntities = () => {
        fetch(crudURL + "/all")
            .then(response => response.json())
            .then(data => {
                setRental(data);
            })
            .catch(error => console.error(error));
    };

    // Create a new entity
    const handleSubmit = async (event) => {
        event.preventDefault();
        const startDate = document.getElementById('startDateInput').value;
        const endDate = document.getElementById('endDateInput').value;
        const priceAnnual = document.getElementById('priceAnnualInput').value;
        const deposit = document.getElementById('depositInput').value;
        const contactPerson = document.getElementById('contactPersonInput').value;
        const address = document.getElementById('addressInput').value;
        const city = document.getElementById('cityInput').value;
        const numberOfRooms = document.getElementById('numberOfRoomsInput').value;

        if (startDate === '' || endDate === '' || priceAnnual === '' || deposit === '' || contactPerson === '' || address === '' || city === '' || numberOfRooms === '') {
            alert('Ensure you input a value in both fields!');
        } else {
            const formData = {
                startDate: startDate,
                endDate: endDate,
                priceAnnual: priceAnnual,
                deposit: deposit,
                contactPerson: contactPerson,
                address: address,
                city: city,
                numberOfRooms: numberOfRooms
            };

            try {
                const response = await fetch(baseURL + "/crud/create", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    // Successfully sent the form data to the backend
                    console.log('Form data sent successfully');
                    // Reset the form fields
                    document.getElementById('startDateInput').value = '';
                    document.getElementById('endDateInput').value = '';
                    document.getElementById('priceAnnualInput').value = '';
                    document.getElementById('depositInput').value = '';
                    document.getElementById('contactPersonInput').value = '';
                    document.getElementById('addressInput').value = '';
                    document.getElementById('cityInput').value = '';
                    document.getElementById('numberOfRoomsInput').value = '';

                } else {
                    // Failed to send the form data to the backend
                    console.log('Failed to send form data');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    // // Search for an entity by id
    // const getEntityById = (event) => {
    //     fetch(crudURL + "/" + searchId)
    //         .then(response => {
    //             if (response.ok) {
    //                 return response.json();
    //             } else {
    //                 throw new Error('Entity not found');
    //             }
    //         })
    //         .then(data => setSelectedEntity(data))
    //         .catch(error => {
    //             setSelectedEntity(null);
    //             console.error(error);
    //         });
    // };


    return (
        <div className="row featurette justify-content-center">
            <div className="col-md-10">
                <h1 className="featurette-heading">Admin page:
                    <span className="text-muted"> Here u can see all rentals and houses, delete them and create new ones</span>
                </h1>
        <div>

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
                    <th>Action</th> {/* New column for delete button */}
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
                        <td>
                            <button onClick={() => handleDelete(rentalItem.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3>Create Rental:</h3>
            <form id="createform" method="post" onSubmit={handleSubmit} >
                <div className="form-group">
                    <label htmlFor="startDateInput">Start Date</label>
                    <input type="text" className="form-control" id="startDateInput" placeholder="Enter your start date" />
                </div>
                <div className="form-group">
                    <label htmlFor="endDateInput">End Date</label>
                    <input type="text" className="form-control" id="endDateInput" placeholder="Enter your end date" />
                </div>
                <div className="form-group">
                    <label htmlFor="priceAnnualInput">Price annual</label>
                    <input type="text" className="form-control" id="priceAnnualInput" placeholder="Enter the annual price" />
                </div>
                <div className="form-group">
                    <label htmlFor="depositInput">Deposit</label>
                    <input type="text" className="form-control" id="depositInput" placeholder="Enter the deposit" />
                </div>
                <div className="form-group">
                    <label htmlFor="contactPersonInput">Contact person</label>
                    <input type="text" className="form-control" id="contactPersonInput" placeholder="Enter a contact person name" />
                </div>
                <h3>House info</h3>
                <div className="form-group">
                    <label htmlFor="addressInput">Address</label>
                    <input type="text" className="form-control" id="addressInput" placeholder="Enter address of house" />
                </div>
                <div className="form-group">
                    <label htmlFor="cityInput">City</label>
                    <input type="text" className="form-control" id="cityInput" placeholder="Enter city of house" />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfRoomsInput">Number of rooms</label>
                    <input type="text" className="form-control" id="numberOfRoomsInput" placeholder="Enter the number of rooms" />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">Create</button>
            </form>
            </div>
        </div>
    </div>

    );
};

export default Adminpage;
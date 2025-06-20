import React, { use, useState } from 'react'
import { createEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById } from '../services/EmployeeService';
import { updateEmployee } from '../services/EmployeeService';
import { useEffect } from 'react';
// This component is responsible for adding or updating employee details
// It uses React hooks for state management and side effects
const EmployeeComponent = () => {

    const [firstName, setFirstName]=useState('')
    const [lastName, setLastName]=useState('')
    const [email, setEmail]=useState('')

    const { id } = useParams(); // Get the employee ID from the URL parameters if needed
    // Initialize state for form errors
    // This will be used to store validation errors for the form fields 
    const [errors, setErrors]=useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigate = useNavigate();
    // Function to handle form submission

    useEffect(() => {
        if (id) {   
            // If an ID is present, fetch the employee data for updating
            getEmployeeById(id) 
                .then((response) => {
                    const employee = response.data;
                    setFirstName(employee.firstName);
                    setLastName(employee.lastName); 
                    setEmail(employee.email);
                })
                .catch((error) => {
                    console.error("Error fetching employee data:", error);
                });
        }   
    }, [id]); // Dependency array includes id to refetch when it changes


    function saveOrUpdateEmployee(event) {
        event.preventDefault();

        if (validateForm()) {

            const employee = { firstName, lastName, email };        
            console.log("Employee data to be saved:", employee);
            // Validate the form before proceeding
            // If the form is valid, proceed with creating or updating the employee
            // If the form is valid, create an employee object
            // This object will be sent to the backend API for creation or update   
            if (id) {
                // If an ID is present, update the existing employee   
                updateEmployee(id, employee) 
                    .then((response) => {
                        console.log("Employee updated successfully:", response.data);
                        // Optionally, you can redirect or reset the form here
                        navigate('/employees'); // Redirect to the employee list page   
                })
                    .catch((error) => { 
                        console.error("Error updating employee:", error);
                });
            } else {
                // If no ID is present, create a new employee  
                createEmployee(employee)
                    .then((response) => {
                        console.log("Employee created successfully:", response.data);
                        // Optionally, you can redirect or reset the form here
                        navigate('/employees'); // Redirect to the employee list page
                })
                    .catch((error) => {
                        console.error("Error creating employee:", error);
                });

            }

        }

    }

    function validateForm() {
        let isValid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {    
            errorsCopy.firstName = 'First Name is required';
            isValid = false;
        }
         if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {    
            errorsCopy.lastName = 'Last Name is required';
            isValid = false;
        }
        if (email.trim()) {
            errorsCopy.email = '';
        } else {    
            errorsCopy.email = 'Email is required';
            isValid = false;
        }

        setErrors(errorsCopy);
        return isValid;
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>;
        } else {
            return <h2 className='text-center'>Add Employee</h2>;
        }
    }

  return (
    <div className='container'>
        <br /><br />
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input 
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                            {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}                  
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>     
                            <input  
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName' 
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                            {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email ID:</label>
                            <input  
                                type='email'
                                placeholder='Enter Employee Email ID'
                                name='email'
                                value={email}
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                   
                    </form>

                </div>

            </div>

        </div>
      
    </div>
  )
}        

export default EmployeeComponent
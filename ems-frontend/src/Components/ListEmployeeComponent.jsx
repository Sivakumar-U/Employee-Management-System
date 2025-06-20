import React, {useEffect, useState} from 'react'
import { listEmployees } from '../services/EmployeeService'
import { deleteEmployee } from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'

// This component is responsible for displaying a list of employees
// It uses React hooks for state management and side effects    
const ListEmployeeComponent = () => {
    // useState hook to manage the state of employees
    // State to hold the list of employees
   const [employees, setEmployees] = useState([])

   // useNavigate hook from react-router-dom to programmatically navigate between routes
   const navigator = useNavigate();

    // Fetch the list of employees when the component mounts
//    useEffect(() => {
//         listEmployees()
//             .then((response) => {
//                 setEmployees(response.data)
//             })
//             .catch((error) => {
//                 console.error("Error fetching employee data:", error);
//             });
//     }, [])

// useEffect hook to fetch all employees when the component mounts
// This hook runs once when the component is first rendered
    useEffect(() => {
        getAllEmployees();  
    }, [])

    // Function to fetch all employees
    // This function is called when the component mounts
    function getAllEmployees() {
        listEmployees()
            .then((response) => {
                setEmployees(response.data)
                console.log("Employees fetched successfully:", response.data);
                // Optionally, you can handle any additional logic after fetching employees 
        })
            .catch((error) => {
                console.error("Error fetching employee data:", error);
        });
        
    }

    // Function to navigate to the add employee page
    // This function is called when the "Add Employee" button is clicked
    function addNewEmployee() {
        navigator('/add-employee');
    }
     
    // Function to navigate to the update employee page
    // This function is called when the "Update" button is clicked for a specific employee
    // It takes the employee ID as a parameter to identify which employee to update
    // This function uses the useNavigate hook to programmatically navigate to the update employee page
    function updateEmployee(id) {
        navigator(`/update-employee/${id}`);
    }

    // Function to delete an employee
    // This function is called when the "Delete" button is clicked for a specific employee
    function removeEmployee(id) {
        deleteEmployee(id)
            .then((response) => {
                console.log("Employee deleted successfully:", response.data);
                // Refresh the employee list after deletion
                getAllEmployees();
                // Optionally, you can show a success message or redirect   
                // navigator('/employees'); // Redirect to the employee list page   
            })
            .catch((error) => {
                console.error("Error deleting employee:", error);
            });
    }

  // Render the list of employees in a table format
  return (
    <div className='container'>
      
      {/* Display a header and a button to add a new employee */}
      <h2 className='text-center'>List of Employees</h2>
      <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
        {/* Render the employee data in a table*/}
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email ID</th>
            <th>Actions</th>
           </tr> 
        </thead>
        {/* Map through the employees array and render each employee's details in a table row*/}
        <tbody>
          {
            employees.map((employee) => (
                <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.firstName}</td> 
                    <td>{employee.lastName}</td>
                    <td>{employee.email}</td>
                    <td>
                        {/*Buttons for updating and deleting an employee*/}
                        <button className='btn btn-info' onClick={()=> updateEmployee(employee.id)}>Update</button>
                        <button className='btn btn-danger' onClick={()=> removeEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button>
                    </td>
                </tr>
          ))
          }
        </tbody>                         
      </table>
    </div>
  )
}

export default ListEmployeeComponent

import axios from "axios";

// Define the base URL for the REST API
// This URL should point to the backend server where the REST API is hosted
// Make sure to change it according to your backend server configuration
const REST_API_BASE_URL = "http://localhost:8080/api/employees";

// Function to list all employees
export const listEmployees = () => axios.get(REST_API_BASE_URL);

// Function to create a new employee
export const createEmployee = (employee) =>
  axios.post(REST_API_BASE_URL, employee);

// Function to get an employee by ID
export const getEmployeeById = (employeeId) =>
  axios.get(`${REST_API_BASE_URL}/${employeeId}`);

// Function to update an employee by ID
export const updateEmployee = (employeeId, employee) =>
  axios.put(`${REST_API_BASE_URL}/${employeeId}`, employee);

// Function to delete an employee by ID
export const deleteEmployee = (employeeId) =>
  axios.delete(`${REST_API_BASE_URL}/${employeeId}`);

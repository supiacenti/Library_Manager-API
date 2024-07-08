import mongoose, { Document } from "mongoose";
import Employee from "../models/employee";

class EmployeeService {
    async getAllEmployees() {
        try {
            return await Employee.find();
        } catch (error) {
            throw new Error(`Error fetching employees: ${error}`);
        }
    }
}

export default EmployeeService;
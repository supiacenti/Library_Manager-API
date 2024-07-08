import mongoose, { Schema, model, Document } from "mongoose";

interface Employee extends Document {
    name: string,
    role: number,
    email: string,
    phone: number,
    profile: string
}

const employeeSchema = new Schema<Employee>({
      name: { type: String, required: true },
      role: { type: Number },
      email: { type: String, required: true },
      phone: { type: Number },
      profile: { type: String }
    }, { versionKey: false });

const Employee = model('Employee', employeeSchema, 'Employees'); 

export default Employee;
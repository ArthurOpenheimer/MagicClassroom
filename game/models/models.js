import mongoose from 'mongoose';
const { Schema } = mongoose;

const studentSchema = new Schema({
    first_name: String,
    last_name: String,
    age: Number,
    gender: String,
}, {collection: "Students"});

const employeeSchema = new Schema({
    first_name: String,
    last_name: String,
    job: String,
    age: Number,
    gander: String
}, {collection: "Employees"});

export const Models = {
    student: mongoose.model('Student', studentSchema),
    employee: mongoose.model('Employee', employeeSchema),
}
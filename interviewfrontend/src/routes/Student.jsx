// src/pages/Student.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
const Student = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: "", studentId: "" });
  const [editStudent, setEditStudent] = useState({ studentId: "", name: "" });

  // Fetch all students from the API
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/students");
      setStudents(response.data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Add a new student to the API
  const handleAddStudent = async () => {
    try {
      await axios.post("http://localhost:5000/api/student", newStudent);
      setNewStudent({ name: "", studentId: "" });
      fetchStudents(); // Refresh the student list after adding a new student
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  // Delete a student from the API
  const handleDeleteStudent = async (studentId) => {
    try {
      let val = await axios.post(`http://localhost:5000/api/deletestudent`, {
        studentId,
      });
      console.log(val);
      fetchStudents(); // Refresh the student list after deleting a student
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Set the student to be edited
  const handleEditStudent = (student) => {
    setEditStudent({ studentId: student.studentId, name: student.name });
  };

  // Update the edited student
  const handleUpdateStudent = async () => {
    try {
      await axios.post(`http://localhost:5000/api/updatestudent`, {
        name: editStudent.name,
        studentId: editStudent.studentId,
      });
      setEditStudent({ studentId: "", name: "" });
      fetchStudents(); // Refresh the student list after updating a student
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  useEffect(() => {
    fetchStudents(); // Fetch students when the component mounts
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <Navbar />
      <h2 className="text-3xl font-bold mb-4">Students</h2>
      <ul>
        {students.map((student) => (
          <li
            key={student.studentId}
            className="flex items-center justify-between bg-gray-100 p-4 mb-2"
          >
            <div>
              <p className="text-lg text-black font-semibold">{student.name}</p>
              <p className="text-gray-600">Student ID: {student.studentId}</p>
            </div>
            <div className="flex items-center">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleDeleteStudent(student.studentId)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditStudent(student)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-2">Add Student</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-400 p-2 mr-2"
            value={newStudent.name}
            onChange={(e) =>
              setNewStudent({ ...newStudent, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Student ID"
            className="border border-gray-400 p-2 mr-2"
            value={newStudent.studentId}
            onChange={(e) =>
              setNewStudent({ ...newStudent, studentId: e.target.value })
            }
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddStudent}
          >
            Add Student
          </button>
        </div>
      </div>
      {editStudent.studentId && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2">Edit Student</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-400 p-2 mr-2"
              value={editStudent.name}
              onChange={(e) =>
                setEditStudent({ ...editStudent, name: e.target.value })
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateStudent}
            >
              Update Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;

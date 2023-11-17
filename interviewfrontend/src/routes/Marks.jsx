// src/pages/Marks.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const [newMark, setNewMark] = useState({
    studentId: "",
    name: "",
    teacherName: "",
    subject: "",
    marks: "",
  });
  const [editMark, setEditMark] = useState({
    id: "",
    studentId: "",
    name: "",
    teacherName: "",
    subject: "",
    marks: "",
  });

  // Fetch all marks from the API
  const fetchMarks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/marks");
      setMarks(response.data.data);
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  // Add a new mark to the API
  const handleAddMark = async () => {
    try {
      await axios.post("http://localhost:5000/api/marks", newMark);
      setNewMark({
        studentId: "",
        name: "",
        teacherName: "",
        subject: "",
        marks: "",
      });
      fetchMarks(); // Refresh the marks list after adding a new mark
    } catch (error) {
      console.error("Error adding mark:", error);
    }
  };

  // Delete a mark from the API
  const handleDeleteMark = async (id) => {
    try {
      let val = await axios.post(`http://localhost:5000/api/deletemarks`, {
        id,
      });
      console.log(val);
      fetchMarks(); // Refresh the marks list after deleting a mark
    } catch (error) {
      console.error("Error deleting mark:", error);
    }
  };

  // Set the mark to be edited
  const handleEditMark = (mark) => {
    setEditMark({
      id: mark._id,
      studentId: mark.studentId,
      name: mark.name,
      teacherName: mark.teacherName,
      subject: mark.subject,
      marks: mark.marks,
    });
  };

  // Update the edited mark
  const handleUpdateMark = async () => {
    try {
      await axios.post(`http://localhost:5000/api/updatemarks`, {
        id: editMark.id,
        studentId: editMark.studentId,
        name: editMark.name,
        teacherName: editMark.teacherName,
        subject: editMark.subject,
        marks: editMark.marks,
      });
      setEditMark({
        id: "",
        studentId: "",
        name: "",
        teacherName: "",
        subject: "",
        marks: "",
      });
      fetchMarks(); // Refresh the marks list after updating a mark
    } catch (error) {
      console.error("Error updating mark:", error);
    }
  };

  useEffect(() => {
    fetchMarks(); // Fetch marks when the component mounts
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <Navbar />
      <h2 className="text-3xl font-bold mb-4">Marks</h2>
      <ul>
        {marks.map((mark) => (
          <li
            key={mark._id}
            className="flex items-center justify-between bg-gray-100 p-4 mb-2"
          >
            <div>
              <p className="text-lg text-black font-semibold">{mark.name}</p>
              <p className="text-gray-600">Student ID: {mark.studentId}</p>
              <p className="text-gray-600">Teacher: {mark.teacherName}</p>
              <p className="text-gray-600">Subject: {mark.subject}</p>
              <p className="text-gray-600">Marks: {mark.marks}</p>
            </div>
            <div className="flex items-center">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleDeleteMark(mark._id)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditMark(mark)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-2">Add Mark</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Student ID"
            className="border border-gray-400 p-2 mr-2"
            value={newMark.studentId}
            onChange={(e) =>
              setNewMark({ ...newMark, studentId: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-400 p-2 mr-2"
            value={newMark.name}
            onChange={(e) => setNewMark({ ...newMark, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Teacher Name"
            className="border border-gray-400 p-2 mr-2"
            value={newMark.teacherName}
            onChange={(e) =>
              setNewMark({ ...newMark, teacherName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subject"
            className="border border-gray-400 p-2 mr-2"
            value={newMark.subject}
            onChange={(e) =>
              setNewMark({ ...newMark, subject: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Marks"
            className="border border-gray-400 p-2 mr-2"
            value={newMark.marks}
            onChange={(e) => setNewMark({ ...newMark, marks: e.target.value })}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddMark}
          >
            Add Mark
          </button>
        </div>
      </div>
      {editMark.id && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2">Edit Mark</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Student ID"
              className="border border-gray-400 p-2 mr-2"
              value={editMark.studentId}
              onChange={(e) =>
                setEditMark({ ...editMark, studentId: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-400 p-2 mr-2"
              value={editMark.name}
              onChange={(e) =>
                setEditMark({ ...editMark, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Teacher Name"
              className="border border-gray-400 p-2 mr-2"
              value={editMark.teacherName}
              onChange={(e) =>
                setEditMark({ ...editMark, teacherName: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-400 p-2 mr-2"
              value={editMark.subject}
              onChange={(e) =>
                setEditMark({ ...editMark, subject: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Marks"
              className="border border-gray-400 p-2 mr-2"
              value={editMark.marks}
              onChange={(e) =>
                setEditMark({ ...editMark, marks: e.target.value })
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateMark}
            >
              Update Mark
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marks;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
const Teacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: "", teacherId: "" });
  const [editTeacher, setEditTeacher] = useState({ teacherId: "", name: "" });

  // Fetch all teachers from the API
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/teachers");
      setTeachers(response.data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Add a new teacher to the API
  const handleAddTeacher = async () => {
    try {
      await axios.post("http://localhost:5000/api/teacher", newTeacher);
      setNewTeacher({ name: "", teacherId: "" });
      fetchTeachers(); // Refresh the teacher list after adding a new teacher
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  // Delete a teacher from the API
  const handleDeleteTeacher = async (teacherId) => {
    try {
      let val = await axios.post(`http://localhost:5000/api/deleteteacher`, {
        teacherId,
      });
      console.log(val);
      fetchTeachers(); // Refresh the teacher list after deleting a teacher
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  // Set the teacher to be edited
  const handleEditTeacher = (teacher) => {
    setEditTeacher({ teacherId: teacher.teacherId, name: teacher.name });
  };

  // Update the edited teacher
  const handleUpdateTeacher = async () => {
    try {
      await axios.post(`http://localhost:5000/api/updateteacher`, {
        name: editTeacher.name,
        teacherId: editTeacher.teacherId,
      });
      setEditTeacher({ teacherId: "", name: "" });
      fetchTeachers(); // Refresh the teacher list after updating a teacher
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  useEffect(() => {
    fetchTeachers(); // Fetch teachers when the component mounts
  }, []);
  return (
    <div className="container mx-auto mt-8">
      <Navbar />
      <h2 className="text-3xl font-bold mb-4">Teachers</h2>
      <ul>
        {teachers.map((teacher) => (
          <li
            key={teacher.teacherId}
            className="flex items-center justify-between bg-gray-100 p-4 mb-2"
          >
            <div>
              <p className="text-lg text-black font-semibold">{teacher.name}</p>
              <p className="text-gray-600">Teacher ID: {teacher.teacherId}</p>
            </div>
            <div className="flex items-center">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleDeleteTeacher(teacher.teacherId)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditTeacher(teacher)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="text-2xl font-bold mb-2">Add Teacher</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-400 p-2 mr-2"
            value={newTeacher.name}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Teacher ID"
            className="border border-gray-400 p-2 mr-2"
            value={newTeacher.teacherId}
            onChange={(e) =>
              setNewTeacher({ ...newTeacher, teacherId: e.target.value })
            }
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddTeacher}
          >
            Add Teacher
          </button>
        </div>
      </div>
      {editTeacher.teacherId && (
        <div className="mt-6">
          <h3 className="text-2xl font-bold mb-2">Edit Teacher</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-400 p-2 mr-2"
              value={editTeacher.name}
              onChange={(e) =>
                setEditTeacher({ ...editTeacher, name: e.target.value })
              }
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleUpdateTeacher}
            >
              Update Teacher
            </button>
          </div>
        </div>
      )}
    </div>
  );

  //   return (
  //     <div className="container mx-auto mt-8">
  //       <h2 className="text-3xl font-bold mb-4">Students</h2>
  //       <ul>
  //         {teachers.map((student) => (
  //           <li
  //             key={student.studentId}
  //             className="flex items-center justify-between bg-gray-100 p-4 mb-2"
  //           >
  //             <div>
  //               <p className="text-lg text-black font-semibold">{student.name}</p>
  //               <p className="text-gray-600">Student ID: {student.teacherId}</p>
  //             </div>
  //             <div className="flex items-center">
  //               <button
  //                 className="bg-red-500 text-white px-2 py-1 rounded mr-2"
  //                 onClick={() => handleDeleteTeacher(student.teacherId)}
  //               >
  //                 Delete
  //               </button>
  //               <button
  //                 className="bg-blue-500 text-white px-2 py-1 rounded"
  //                 onClick={() => handleEditTeacher(student)}
  //               >
  //                 Edit
  //               </button>
  //             </div>
  //           </li>
  //         ))}
  //       </ul>
  //       <div className="mt-6">
  //         <h3 className="text-2xl font-bold mb-2">Add Teacher</h3>
  //         <div className="flex">
  //           <input
  //             type="text"
  //             placeholder="Name"
  //             className="border border-gray-400 p-2 mr-2"
  //             value={newTeacher.name}
  //             onChange={(e) =>
  //               setNewTeacher({ ...newTeacher, name: e.target.value })
  //             }
  //           />
  //           <input
  //             type="text"
  //             placeholder="Student ID"
  //             className="border border-gray-400 p-2 mr-2"
  //             value={newTeacher.teacherId}
  //             onChange={(e) =>
  //               setNewTeacher({ ...newTeacher, teacherId: e.target.value })
  //             }
  //           />
  //           <button
  //             className="bg-green-500 text-white px-4 py-2 rounded"
  //             onClick={handleAddTeacher}
  //           >
  //             Add Teacher
  //           </button>
  //         </div>
  //       </div>
  //       {editTeacher.teacherId && (
  //         <div className="mt-6">
  //           <h3 className="text-2xl font-bold mb-2">Edit Teacher</h3>
  //           <div className="flex">
  //             <input
  //               type="text"
  //               placeholder="Name"
  //               className="border border-gray-400 p-2 mr-2"
  //               value={editTeacher.name}
  //               onChange={(e) =>
  //                 setEditTeacher({ ...editTeacher, name: e.target.value })
  //               }
  //             />
  //             <button
  //               className="bg-blue-500 text-white px-4 py-2 rounded"
  //               onClick={handleUpdateTeacher}
  //             >
  //               Update Teacher
  //             </button>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
};

export default Teacher;

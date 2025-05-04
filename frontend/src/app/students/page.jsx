"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function StudentList({ refresh }) {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/students");
      setStudents(response.data);
    } catch (error) {
      alert("Failed to load students");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure to delete this student?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/students/delete/${id}`);
      setStudents(students.filter((s) => s.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-6 mb-8 mt-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold  text-gray-600">Student List</h2>
        <Link
          href="/students/add-student"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add New Student
        </Link>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="p-3 border"> First Name</th>
            <th className="p-3 border">Last Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="odd:bg-gray-50 text-gray-400">
              <td className="p-3 border">{student.firstName}</td>
              <td className="p-3 border">{student.lastName}</td>
              <td className="p-3 border">{student.email}</td>
              <td className="p-3 border gap-6 flex justify-center items-center">
                <button
                  onClick={() => handleUpdate(id)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                No any saved students...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

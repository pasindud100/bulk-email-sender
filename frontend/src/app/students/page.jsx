"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineUpdate } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";

export default function StudentList({ refresh }) {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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

  const handleDelete = (id) => {
    setSelectedId(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/students/delete/${selectedId}`
      );
      setStudents((prev) => prev.filter((s) => s.id !== selectedId));
    } catch {
      alert("Delete failed");
    } finally {
      setShowDeleteConfirmation(false);
      setSelectedId(null);
    }
  };

  //handle update
  const handleUpdate = (student) => {
    //convert the student object to a json string and encode it for safe use in a url
    const studentParam = encodeURIComponent(JSON.stringify(student));

    // Navigate to the add-student page and pass the encoded student data as a query parameter
    router.push(`/students/add-student?student=${studentParam}`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-6 mb-8 mt-24">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-600">Student List</h2>
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
            <th className="p-3 border">First Name</th>
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
              <td className="p-3 border gap-6 flex justify-center items-center ">
                <MdOutlineUpdate
                  onClick={() => handleUpdate(student)}
                  className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
                />
                <MdOutlineDeleteOutline
                  onClick={() => handleDelete(student.id)}
                  className="text-red-600 hover:text-red-800 font-semibold cursor-pointer"
                />
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

      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-center">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Are you sure?
            </h2>
            <p className="text-gray-600 mb-6">
              This student will be permanently deleted.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

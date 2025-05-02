import { useEffect, useState } from "react";
import axios from "axios";

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

  //to get all student when page loard and change refresh state..
  useEffect(() => {
    fetchStudents();
  }, [refresh]);

  //to delete student
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
    <div className="max-w-3xl mx-auto bg-white rounded-md shadow-md p-6 mb-8">
         <h2 className="text-xl font-semibold mb-4 text-gray-800">Student List</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border"> First Name</th>
            <th className="p-3 border">Last Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ id, firstName, lastName, email }) => (
            <tr key={id} className="odd:bg-gray-50">
              <td className="p-3 border">{firstName}</td>
              <td className="p-3 border">{lastName}</td>
              <td className="p-3 border">{email}</td>
              <td className="p-3 border">
                <button
                  onClick={() => handleDelete(id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {students.length === 0 &&(
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
               No any  saves students...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

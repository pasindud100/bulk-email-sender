"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StudentForm({ fetchStudents }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // clering error and sucess message after 10 seconds
  useEffect(() => {
    if (error || success) {
      const hideMessage = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 10000);

      return () => clearTimeout(hideMessage); 
    }
  }, [error, success]);

  //handling new student create
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setSuccess(null);

    if (!firstName || !lastName || !email) {
      return setError("All fields are required..");
    }

    if (!validEmail(email)) {
      return setError("Invalid email format...");
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/students",
        { firstName, lastName, email }
      );

      setSuccess("Student added successfully...");
      // Resets input fields after save success
      setFirstName("");
      setLastName("");
      setEmail("");
      fetchStudents();

      //give alert msg based on response
    } catch (err) {
      if (err.response) {
        return setError(`Error: ${err.response.data}`);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mt-24"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add New Student
        </h2>

        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-gray-500 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full p-2 border border-gray-300  text-gray-500 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300  text-gray-500 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between items-center">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Save student
        </button>
        <Link href={"/students"} className="text-blue-500 hover:underline">
          Go Back
        </Link>
        </div>
        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
        {success && (
          <div className="mt-4 text-green-600 text-sm">{success}</div>
        )}
      </form>
    
    </div>
  );
}

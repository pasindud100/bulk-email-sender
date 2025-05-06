"use client"; //Enable client side rendering
import axios from "axios";
import Link from "next/link"; // for client side navigation
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function StudentForm({ fetchStudents }) {
  const searchParams = useSearchParams(); // to get search parameters from url
  const router = useRouter(); //Router for client side navigation
  const studentParam = searchParams.get("student"); // Get the student parameter from the URL

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  //email validation function
  const validEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //useEffect to load data if editing an existing student
  useEffect(() => {
    if (studentParam) {
      try {
        const student = JSON.parse(decodeURIComponent(studentParam));
        setFirstName(student.firstName || "");
        setLastName(student.lastName || "");
        setEmail(student.email || "");
      } catch (err) {
        setError("Failed to load student data to edit.. try again");
      }
    }
  }, [studentParam]);

  // this for clear messages after 10 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firstName || !lastName || !email) {
      return setError("All fields are required.");
    }
    if (!validEmail(email)) {
      return setError("Invalid email format.");
    }

    try {
      if (studentParam) {
          // Parse student object to get the student id
        const student = JSON.parse(decodeURIComponent(studentParam));
        //set update request
        await axios.put(
          `http://localhost:8080/api/v1/students/update/${student.id}`,
          {
            firstName,
            lastName,
            email,
          }
        );
        setSuccess("Student updated successfully.");
      } else { //set create request when no student params
        await axios.post("http://localhost:8080/api/v1/students", {
          firstName,
          lastName,
          email,
        });
        setSuccess("Student added successfully.");
      }

      fetchStudents && fetchStudents();
      router.push("/students"); // Redirect back to student list
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data}`);
      } else {
        setError("An error occurred."); //generic error
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
          {studentParam ? "Update Student" : "Add New Student"}
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
          className="w-full p-2 border border-gray-300 text-gray-500 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 text-gray-500 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            {studentParam ? "Update Student" : "Save Student"}
          </button>
          <Link href="/students" className="text-blue-500 hover:underline">
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

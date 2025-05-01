import axios from 'axios';
import { useState } from 'react';

export default function StudentForm({ fetchStudents }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/v1/students', 
        { firstName, lastName, email });

        //resets input fields
      setFirstName('');
      setLastName('');
      setEmail('');
      fetchStudents();

      alert('Student added successfully...');
    } catch (err) {
      alert('Failed to add student');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md mb-8"  >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Student</h2>
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full p-2 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Add Student
      </button>
    </form>
  );
}
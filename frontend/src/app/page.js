"use client";

import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import EmailEditor from './components/EmailEditor';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const refreshStudents = () => setRefresh(prev => !prev);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Sisora Higher Education Institute - Bulk Email App
      </h1>
      <StudentForm fetchStudents={refreshStudents} />
      <StudentList refresh={refresh} />
      <EmailEditor />
    </main>
  );
}
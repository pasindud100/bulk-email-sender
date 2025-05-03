"use client";

import { useState } from 'react';
import Navbar from './components/Navbar';

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const refreshStudents = () => setRefresh(prev => !prev);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-700">
        Sisora Higher Education Institute
      </h1>
      <Navbar />
  
    </main>
  );
}
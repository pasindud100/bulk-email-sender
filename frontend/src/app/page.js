"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Link from "next/link";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  const refreshStudents = () => setRefresh((prev) => !prev);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <Navbar />

      <div className="max-w-6xl mx-auto p-4 bg-white rounded shadow mt-20">
        <h1 className="text-4xl mt-10 italic font-bold mb-8 text-center text-green-800 ">
          Welcome to Sisora Higher Education Institute
        </h1>
      </div>

      <div className="mt-32 ">
        <h1 className="text-4xl my-16 text-i font-bold mb-8 text-center text-gray-400">
          Manage Students and emails
        </h1>

        <div className="flex  justify-around mt-16">
          <button>
            <Link
              href="/students"
              className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Manage Students
            </Link>
          </button>

          <button>
            <Link
              href="/emails"
              className="mt-4 px-10 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Send Emails
            </Link>
          </button>
        </div>
      </div>
    </main>
  );
}

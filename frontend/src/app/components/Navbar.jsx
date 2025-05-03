"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="px-4 py-6 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold text-green-900 cursor-pointer">
            <Link href="/">
              Sisora <span className="text-xl text-green-300">HEI</span>
            </Link>
          </h1>
        </Link>

        <div className="flex gap-4">
          <Link href="/students">
            <span className="text-green-600 hover:text-white hover:bg-green-600 px-4 py-2 rounded-full transition duration-300 cursor-pointer">
              Students
            </span>
          </Link>
          <Link href="/emails">
            <span className="text-green-600 hover:text-white hover:bg-green-600 px-4 py-2 rounded-full transition duration-300 cursor-pointer">
              Emails
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

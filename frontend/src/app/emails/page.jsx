"use client";

import React, { useRef, useEffect, useState } from "react";
import EmailEditor from "react-email-editor";
import axios from "axios";

export default function EmailEditorComponent() {
  const emailEditorRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");

  useEffect(() => {
    setIsClient(true); // Set to true after the component mounts
  }, []);

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const { html } = data;

      // prepare email payload
      const payload = {
        subject: emailSubject,
        body: html,
      };

      try {
        // Sending html email body to backend
        await axios.post("http://localhost:8081/api/v1/emails/send", payload);
        alert("Emails sent successfully to students...");
      } catch (error) {
        alert("Failed to send emails...");
      }
    });
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white rounded shadow mt-20">
      <h2 className="text-2xl font-semibold mb-4 text-gray-500">
        --Style Email with drag drop--
      </h2>
      <div>
        <input
          type="text"
          placeholder="Type email subject here..."
          value={emailSubject}
          onChange={(e) => setEmailSubject(e.target.value)}
          className="border border-gray-200 text-gray-500 font-thin rounded px-4 py-2 mb-4 w-[770px] focus:outline-none"
        />
      </div>
      <EmailEditor ref={emailEditorRef} />
      <button
        onClick={exportHtml}
        className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Send Emails
      </button>
    </div>
  );
}

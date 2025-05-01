import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useState } from "react";
import axios from "axios";
import "draft-js/dist/Draft.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function EmailEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [subject, setSubject] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendEmails = async () => {
    if (!subject.trim()) {
      alert("Subject cannot be empty.");
      return;
    }
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    const bodyText = JSON.stringify(rawContent);

    try {
      setSending(true);
      await axios.post("http://localhost:8080/api/v1/students/send-emails", {
        subject,
        body: bodyText,
      });
      alert("Emails sent successfully!");
      setSubject("");
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      alert("Failed to send emails.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-md shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Compose Styled Email
      </h2>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="border border-gray-300 rounded mb-4">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor p-4 min-h-[200px]"
          onEditorStateChange={setEditorState}
        />
      </div>
      <button
        onClick={handleSendEmails}
        disabled={sending}
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {/* btn behave based on state */}
        {sending ? "Sending..." : "Send Emails"}
      </button>
    </div>
  );
}

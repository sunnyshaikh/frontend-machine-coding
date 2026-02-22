import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("HTML");

  return (
    <div style={{ width: "400px", margin: "20px auto", fontFamily: "Arial" }}>
      {/* Tab Buttons */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        {["HTML", "CSS", "JavaScript"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 16px",
              cursor: "pointer",
              border: "1px solid #ccc",
              backgroundColor: activeTab === tab ? "#007bff" : "#f5f5f5",
              color: activeTab === tab ? "#fff" : "#000",
              borderRadius: "4px",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "4px",
        }}
      >
        {activeTab === "HTML" && (
          <p>
            The HyperText Markup Language or HTML is the standard markup
            language for documents designed to be displayed in a web browser.
          </p>
        )}

        {activeTab === "CSS" && (
          <p>
            Cascading Style Sheets is a style sheet language used for describing
            the presentation of a document written in a markup language such as
            HTML or XML.
          </p>
        )}

        {activeTab === "JavaScript" && (
          <p>
            JavaScript, often abbreviated as JS, is a programming language that
            is one of the core technologies of the World Wide Web, alongside
            HTML and CSS.
          </p>
        )}
      </div>
    </div>
  );
}

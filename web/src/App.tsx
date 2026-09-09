import React from "react";

const TestButton = () => {
  return (
    <button
      style={{
        padding: "12px 24px",
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      Test Button Rendering
    </button>
  );
};

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        background: "#f8f9fa",
        padding: "20px",
        height: "100vh",
        borderRight: "1px solid #e2e8f0",
      }}
    >
      <h3 style={{ margin: "0 0 16px 0", color: "#1e293b" }}>TapAttend V1</h3>
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ margin: "8px 0", color: "#475569" }}>
          Dashboard
        </li>
        <li style={{ margin: "8px 0", color: "#475569" }}>
          Employees
        </li>
        <li style={{ margin: "8px 0", color: "#475569" }}>
          Payroll
        </li>
        <li style={{ margin: "8px 0", color: "#475569" }}>
          Logs
        </li>
      </ul>
    </div>
  );
};

const MainContent = () => {
  return (
    <div
      style={{
        flex: "1",
        padding: "20px",
        background: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ margin: "0 0 16px 0", color: "1e293b" }}>
        TapAttend Dashboard Running
      </h2>
      <p style={{ color: "64748b", margin: "16px 0" }}>
        The DOM is rendering successfully. This is a test to verify the frontend
        is working before re-adding async features.
      </p>
      <TestButton />
    </div>
  );
};

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        fontFamily: "'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        color: "1e293b",
      }}
    >
      <Sidebar />
      <MainContent />
    </div>
  );
}
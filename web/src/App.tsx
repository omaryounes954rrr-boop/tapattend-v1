import React, { useEffect, useState } from "react";

// ============================================================
// SIMPLE API HELPER - IN-LINED (no external dependencies)
// ============================================================
const API_BASE = "https://tapattend-v1-production.up.railway.app";

const api = {
  auth: {
    me: () =>
      fetch(API_BASE + "/api/v1/auth/me", {
        headers: localStorage.getItem("tapattend_token")
          ? { Authorization: "Bearer " + localStorage.getItem("tapattend_token") }
          : {},
      }).then((r) => r.json()),
  },
  attendance: {
    summary: () =>
      fetch(API_BASE + "/api/v1/attendance/today-summary", {
        headers: localStorage.getItem("tapattend_token")
          ? { Authorization: "Bearer " + localStorage.getItem("tapattend_token") }
          : {},
      }).then((r) => r.json()),
      mine: () =>
        fetch(API_BASE + "/api/v1/attendance/mine", {
          headers: localStorage.getItem("tapattend_token")
            ? { Authorization: "Bearer " + localStorage.getItem("tapattend_token") }
          : {}
        }).then((r) => r.json()),
    },
  users: {
    getAll: () =>
      fetch(API_BASE + "/api/v1/users", {
        headers: localStorage.getItem("tapattend_token")
          ? { Authorization: "Bearer " + localStorage.getItem("tapattend_token") }
          : {},
      }).then((r) => r.json()),
    },
  payroll: {
    calculate: (userId: string) =>
      fetch(API_BASE + "/api/v1/payroll/" + userId, {
        headers: localStorage.getItem("tapattend_token")
          ? { Authorization: "Bearer " + localStorage.getItem("tapattend_token") }
          : {},
      }).then((r) => r.json()),
  },
};

// ============================================================
// SIMPLE TYPES
// ============================================================
type Me = {
  id: string;
  full_name: string;
  email: string;
  role: "owner" | "hr" | "employee";
  org_name: string;
};

// ============================================================
// SIMPLE REACT APP WITH GUARANTEED RENDER
// ============================================================
export default function App() {
  const [me, setMe] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tapattend_token");
    if (!token) {
      setReady(true);
      return;
    }
    api.authApi.me().then((user: any) => {
      setMe(user);
      if (user.role === "employee") setPage("logs");
    }).catch(() => {
      localStorage.removeItem("tapattend_token");
      setReady(true);
    });
  }, []);

  // --- GUARANTEED INITIAL RENDER ---
  // NO blank white screen - something always renders immediately
  if (!ready) return <div className="screen-loader">Loading TapAttend V1...</div>;
  if (!me) return <div className="auth-screen">Please log in</div>;

  const admin = me.role !== "employee";

  return (
    <div className="app-container">
      <nav className="app-nav">
        <div className="nav-header">
          <strong>TapAttend V1</strong>
          <div className="nav-org">{me.org_name}</div>
        </div>
        <div className="nav-tabs">
          <button className={page === "dashboard" ? "tab-active" : "tab-inactive"} onClick={() => setPage("dashboard")}>
            Dashboard
          </button>
          <button className={page === "users" ? "tab-active" : "tab-inactive"} onClick={() => setPage("users")}>Employees</button>
          <button className={page === "payroll" ? "tab-active" : "tab-inactive"} onClick={() => setPage("payroll")}>Payroll</button>
          <button className={page === "logs" ? "tab-active" : "tab-inactive"} onClick={() => setPage("logs")}>Logs</button>
        </div>
        <button className="btn-logout" onClick={() => { localStorage.removeItem("tapattend_token"); setMe(null); }}>Logout</button>
      </nav>
      <main className="app-main">
        {page === "dashboard" && <div>Dashboard Content</div>}
        {page === "users" && <div>Employees Table</div>}
        {page === "payroll" && <div>Payroll Calculator</div>}
        {page === "logs" && <div>Attendance Logs</div>}
      </main>
    </div>
  );
}
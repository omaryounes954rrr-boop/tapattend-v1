import React, { useEffect, useState } from "react";
import { api } from "./api";

type Page = "dashboard" | "users" | "payroll" | "logs";
type Me = {
  id: string;
  full_name: string;
  email: string;
  role: "owner" | "hr" | "employee";
  org_id: string;
  org_name: string;
  country: string;
  device_fingerprint: string | null;
};

export default function App() {
  const [me, setMe] = useState<Me | null>(null);
  const [page, setPage] = useState<Page>("dashboard");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("tapattend_token");
    if (!token) {
      setReady(true);
      return;
    }
    api.me().then((user) => {
      setMe(user);
      if (user.role === "employee") setPage("logs");
    }).catch(() => localStorage.removeItem("tapattend_token")).finally(() => setReady(true));
  }, []);

  // Always ensure something renders
  if (!ready) return <div className="screen-loader">جاري التحميل...</div>;
  
  // If no user data yet, show auth
  if (!me) return <div className="auth-screen">يرجى تسجيل الدخول</div>;

  const admin = me.role !== "employee";
  
  // Ensure we always have a page state
  if (page === undefined || page === null) setPage("dashboard");

  return (
    <div className="app-container">
      <nav className="app-nav">
        <div className="nav-header">
          <strong>TapAttend V1</strong>
          <div className="nav-org">{me.org_name}</div>
        </div>
        <div className="nav-tabs">
          <button className={page === "dashboard" ? "tab-active" : "tab-inactive"} onClick={() => setPage("dashboard")}>لوحة التحكم</button>
          <button className={page === "users" ? "tab-active" : "tab-inactive"} onClick={() => setPage("users")}>الموظفون</button>
          <button className={page === "payroll" ? "tab-active" : "tab-inactive"} onClick={() => setPage("payroll")}>مرتبات</button>
          <button className={page === "logs" ? "tab-active" : "tab-inactive"} onClick={() => setPage("logs")}>السجلات</button>
        </div>
        <button className="btn-logout" onClick={() => { localStorage.removeItem("tapattend_token"); setMe(null); }>خروج</button>
      </nav>
      <main className="app-main">
        {page === "dashboard" && admin && <div>لوحة التحكم</div>}
        {page === "users" && admin && <div>قائمة الموظفين</div>}
        {page === "payroll" && admin && <div>حاسبة المرتبات</div>}
        {page === "logs" && <div>سجلات الحضور</div>}
      </main>
    </div>
  );
}
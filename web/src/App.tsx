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

const COLORS = {
  bg: "rgba(255, 255, 255, 0.95)",
  card: "rgba(255, 255, 255, 0.8)",
  cardDark: "rgba(25, 25, 25, 0.8)",
  nav: "rgba(255, 255, 255, 0.9)",
  text: "#1a1a1a",
  textSecondary: "#6b6b6b",
  accent: "#3b82f6",
  border: "rgba(255, 255, 255, 0.3)",
};

const SHADOW = "0 4px 20px rgba(0, 0, 0, 0.08)";
const TRANSITION = "all 0.2s ease";

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

  if (!ready) return <div className="auth-wrap">جاري التحميل...</div>;
  if (!me) return <Auth onAuthed={setMe} />;

  const admin = me.role !== "employee";
  return (
    <div className="app-container">
      <nav className="app-nav">
        <div className="nav-header">
          <strong>TapAttend V1</strong>
          <div className="nav-org">{me.org_name}</div>
        </div>
        <div className="nav-tabs">
          <button className={page === "dashboard" ? "tab-active" : "tab-inactive"} onClick={() => setPage("dashboard")>لوحة التحكم</button>
          <button className={page === "users" ? "tab-active" : "tab-inactive"} onClick={() => setPage("users")}>الموظفون</button>
          <button className={page === "payroll" ? "tab-active" : "tab-inactive"} onClick={() => setPage("payroll")}>مرتبات</button>
          <button className={page === "logs" ? "tab-active" : "tab-inactive"} onClick={() => setPage("logs")}>السجلات</button>
        </div>
        <button className="btn-logout" onClick={() => { localStorage.removeItem("tapattend_token"); setMe(null); }}>خروج</button>
      </nav>
      <main className="app-main">
        {page === "dashboard" && admin && <DashboardMe />}
        {page === "users" && admin && <UsersTable />}
        {page === "payroll" && admin && <PayrollCalculator />}
        {page === "logs" && <AttendanceLogs />}
      </main>
    </div>
  );
}

function Auth({ onAuthed }: { onAuthed: (me: Me) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const token =
        mode === "login"
          ? await api.login(String(fd.get("email")), String(fd.get("password")))
          : await api.registerOrg({
              org_name: String(fd.get("org_name")),
              full_name: String(fd.get("full_name")),
              email: String(fd.get("email")),
              password: String(fd.get("password")),
            });
      localStorage.setItem("tapattend_token", token.access_token);
      onAuthed(await api.me());
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل");
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>TapAttend V1</h1>
        <p className="muted">حضور بالـ NFC و QR</p>
        {mode === "register" && (
          <>
            <label>اسم المنظمة</label>
            <input name="org_name" required />
            <label>الاسم الكامل</label>
            <input name="full_name" required />
          </>
        )}
        <label>البريد</label>
        <input name="email" type="email" required />
        <label>كلمة المرور</label>
        <input name="password" type="password" minLength={8} required />
        <button className="auth-btn" type="submit">
          {mode === "login" ? "دخول" : "إنشاء الحساب"}
        </button>
        <p className="err">{error}</p>
        <button type="button" className="auth-link" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "إنشاء منظمة جديدة" : "لديك حساب؟ تسجيل الدخول"}
        </button>
      </div>
    </div>
  );
}

function DashboardMe() {
  const [summary, setSummary] = useState({ scans_today: 0, present_employees: 0, total_employees: 0 });
  const [logs, setLogs] = useState([]); // Will hold LogRow[] type
  useEffect(() => {
    api.summary().then(setSummary);
    api.mine().then(setLogs);
  }, []);

  return (
    <section className="dashboard-section">
      <h1 className="section-title">لوحة التحكم</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{summary.scans_today}</div>
          <div className="stat-label">مسح اليوم</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{summary.present_employees}</div>
          <div className="stat-label">حاضرون</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{summary.total_employees}</div>
          <div className="stat-label">موظفون</div>
        </div>
      </div>
    </section>
  );
}

function UsersTable() {
  const [rows, setRows] = useState([]); // UserRow[]
  const load = () => api.users().then(setRows);
  useEffect(() => { load(); }, []);

  return (
    <section className="dashboard-section">
      <h1 className="section-title">قائمة الموظفين</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد</th>
              <th>الدور</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u: any) => (
              <tr key={u.id} className="table-row">
                <td className="cell-name">{u.full_name}</td>
                <td className="cell-email">{u.email}</td>
                <td className="cell-role">{u.role}</td>
                <td className="cell-status">
                  {u.role === "employee" ? "موظف" : "HR/إدارة"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PayrollCalculator() {
  const [payrollData, setPayrollData] = useState(null);
  const [userId, setUserId] = useState("");
  const load = () => {};

  return (
    <section className="dashboard-section">
      <h1 className="section-title">حاسبة المرتبات</h1>
      <div className="payroll-card">
        <input
          type="text"
          placeholder="معرف الموظف"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="payroll-input"
        />
        <button className="payroll-btn" onClick={() => {
          if (!userId) {
            alert("يرجى إدخال معرف الموظف");
            return;
          }
          api.payroll(userId).then((data) => {
            setPayrollData(data);
          });
        }}>
          حساب مرتب الموظف
        </button>
      </div>
      {payrollData && (
        <div className="payroll-result">
          <h3>النتيجة:</h3>
          <pre className="payroll-json">{JSON.stringify(payrollData, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

function AttendanceLogs({ admin }: { admin: boolean }) {
  const [rows, setRows] = useState([]); // LogRow[]
  useEffect(() => {
    const source = admin ? api.logs() : api.mine();
    source.then(setRows);
  }, [admin]);

  return (
    <section className="dashboard-section">
      <h1 className="section-title">سجلات الحضور</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>الوقت</th>
              <th>الموظف</th>
              <th>النوع</th>
              <th>الطريقة</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r: any) => (
              <tr key={r.id} className="table-row">
                <td className="cell-time">{new Date(r.recorded_at).toLocaleString("ar-EG")}</td>
                <td className="cell-name">{r.user_name || "—"}</td>
                <td className="cell-event">{r.event_type === "in" ? "حضور" : "انصراف"}</td>
                <td className="cell-method">{r.scan_method.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
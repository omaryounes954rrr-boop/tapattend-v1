/* Apple-inspired Glassmorphism Colors */
:root {
  --bg: #f8f9fa;
  --panel: rgba(255, 255, 255, 0.9);
  --card: rgba(255, 255, 255, 0.85);
  --nav: rgba(255, 255, 255, 0.95);
  --text: #1d1d1f;
  --text-secondary: #86868b;
  --accent: #0071e3;
  --border: rgba(255, 255, 255, 0.3);
  --muted: #6e6e73;
  --success: #34c759;
  --warning: #ff9f0a;
}

/* Glassmorphism background */
body {
  margin: 0;
  font-family: "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif;
  background: var(--bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}

/* Main app container */
.app-container {
  display: flex;
  min-height: 100vh;
  overflow-x: hidden;
}

/* Navigation bar - glassmorphism */
.app-nav {
  width: 260px;
  background: var(--nav);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid var(--border);
  flex-shrink: 0;
  padding: 24px 28px;
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 32px;
}

.nav-header strong {
  color: var(--text);
  font-size: 20px;
  font-weight: 600;
}

.nav-org {
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
}

/* Tabs */
.nav-tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tab-inactive {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: var(--TRANSITION);
}

.tab-inactive:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.1);
}

.tab-active {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--accent);
  border-radius: 20px;
  padding: 8px 16px;
  font-weight: 600;
}

/* Logout button */
.btn-logout {
  margin-top: 24px;
  width: 100%;
  background: transparent;
  backdrop-filter: blur(10px);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--TRANSITION);
}

.btn-logout:hover {
  border-color: #ff5f57;
  color: #ff5f57;
}

/* Main content */
.app-main {
  flex: 1;
  padding: 32px 40px;
  min-height: 100vh;
}

/* Dashboard sections */
.dashboard-section {
  margin-bottom: 32px;
}

.section-title {
  color: var(--text);
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: var(--TRANSITION);
}

.stat-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 4px;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Table container */
.table-container {
  background: var(--card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 20px;
  overflow: hidden;
}

/* Payroll calculator */
.payroll-card {
  background: var(--card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 24px;
  margin-bottom: 24px;
}

.payroll-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  margin-bottom: 12px;
  font-size: 14px;
  transition: var(--TRANSITION);
}

.payroll-input:focus {
  outline: none;
  border-color: var(--accent);
}

.payroll-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: var(--TRANSITION);
}

.payroll-btn:hover {
  background: #0051b6;
  transform: translateY(-1px);
}

/* Payroll result */
.payroll-result {
  margin-top: 20px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  border: 1px solid var(--border);
}

/* Logout button in main */
.app-main > button {
  margin-top: 24px;
  width: 100%;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: var(--TRANSITION);
}

.app-main > button:hover {
  border-color: var(--accent);
  color: var(--accent);
}

/* Auth page styles */
.auth-wrapper {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--bg);
}

.auth-card {
  background: var(--card);
  backdrop-filter: blur(32px);
  -webkit-backdrop-filter: blur(32px);
  border: 1px solid var(--border);
  border-radius: 32px;
  width: 100%;
  max-width: 400px;
  padding: 40px 32px;
  text-align: center;
}

.auth-card h1 {
  color: var(--text);
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
}

.auth-card p {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 24px;
}

.auth-card input {
  width: 100%;
  padding: 14px 16px;
  margin: 8px 0;
  border: 1px solid var(--border);
  border-radius: 16px;
  font-size: 14px;
  background: var(--panel);
  color: var(--text);
  transition: var(--TRANSITION);
}

.auth-card input:focus {
  outline: none;
  border-color: var(--accent);
  background: var(--card);
}

.auth-card .auth-btn {
  width: 100%;
  background: var(--accent);
  color: white;
  border: none;
  padding: 14px 24px;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  margin-top: 16px;
  cursor: pointer;
  transition: var(--TRANSITION);
}

.auth-card .auth-btn:hover {
  background: #0051b6;
}

.auth-card .auth-link {
  margin-top: 16px;
  background: none;
  border: 0;
  color: var(--accent);
  cursor: pointer;
  font-size: 13px;
  padding: 0;
  width: auto;
}

.auth-card .err {
  color: #e53e3e;
  margin: 12px 0;
  min-height: auto;
}

/* Table styles */
.table-container table {
  width: 100%;
  border-collapse: collapse;
}

.table-container th,
.table-container td {
  text-align: right;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.table-container th {
  color: var(--text-secondary);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-container tr {
  transition: var(--TRANSITION);
}

.table-container tr:hover {
  background: rgba(0, 0, 0, 0.03);
}

.cell-name { font-weight: 500; }
.cell-role { color: var(--text-secondary); font-size: 11px; }
.cell-status { color: var(--text-secondary); font-size: 11px; }
.cell-time { color (flex: 1); }
.cell-event 5.1: 5.1.1
- 22.214.171.124: 5.1.1
- 5.1.1
- 5.1.1

I'm not sure what the exact mapping is, but based on the context, it seems like the backend wants me to map the main module to a specific code. Since the user says "the module is already inside the inner app folder", I need to set the PYTHONPATH to include the app directory.

Looking at the current Dockerfile, it has `ENV PYTHONPATH=/app/backend`, but the app structure is `/app/app/main.py`, so there's a mismatch. The user wants me to change the CMD to `main:app` since the module is already inside the inner `app` folder.

So the fix would be:
1. Keep `ENV PYTHONPATH=/app` (without `/backend`)
2. Change CMD to `uvicorn "main:app", --host, 0.0.0.0, --port, 8000`

But I need to check the exact format. The user says to change CMD to `main:app`, so I should set it to `app.main:app`.

Let me also consider the PYTHONPATH. If I set `ENV PYTHONPATH=/app`, then Python will look for modules in `/app`, and if the app is at `backend/app/main.py`, I'd need `PYTHONPATH=/app/backend` and `CMD ["uvicorn", "backend.app.main:app", ...]`. But the user wants me to change it so that the module is already inside `/app`, so I should set `PYTHONPATH=/app` and `CMD ["uvicorn", "app.main:app", ...]`.

Let me verify this by looking at the current Dockerfile and the backend structure.Now I'll update the Dockerfile to fix the import path issue. The key change is setting `PYTHONPATH=/app` and using `CMD ["uvicorn", "app.main:app", ...]` since the app is at `/app/app/main.py`.
<tool_call>
<function=write>
<parameter=content>
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/app ./app
ENV PYTHONPATH=/app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
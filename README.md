# ProjectSphere

A full-stack, role-based web application for managing projects, project proposals, and employee feedback — built with **Angular** on the frontend and **ASP.NET Core Web API** on the backend, secured with **JWT authentication** and **RSA + BCrypt** password encryption.

---

## 🚀 Features

- **Role-based access control** — separate Manager and Employee views/permissions, enforced on both the Angular route guard and the API (`[Authorize(Roles = "...")]`).
- **Secure authentication**
  - Passwords are RSA-encrypted in the browser before transmission (public key fetched from the server), then decrypted and hashed with **BCrypt** on the server — plaintext passwords never travel over the network.
  - Stateless session management using **JWT bearer tokens**.
- **Project management** — Managers can create, view, and edit projects (title, description, timeline, tech stack, status).
- **Project proposals** — Employees can submit proposals for projects; Managers can review, view, and manage proposal status.
- **Feedback module** — Employees can submit feedback; Managers can view all submitted feedback.
- **Form validation** — server-side model validation with custom attributes (unique username/email checks) and client-side reactive forms.
- **Swagger / OpenAPI** docs available in development mode.
- **CI pipeline** — GitHub Actions workflow with SonarCloud static analysis on every push/PR.

---

## 🏗️ Tech Stack

| Layer            | Technology                                                            |
|------------------|------------------------------------------------------------------------|
| Frontend         | Angular, TypeScript, JSEncrypt (RSA), RxJS                             |
| Backend          | ASP.NET Core 6 Web API, C#                                              |
| Database         | SQL Server (via Entity Framework Core)                                 |
| Auth             | JWT Bearer Tokens, RSA (server-generated key pair) + BCrypt.Net-Next    |
| Testing          | NUnit / xUnit (backend), Jasmine/Karma (Angular default specs)         |
| CI/CD            | GitHub Actions + SonarCloud                                             |

---

## 📁 Project Structure

```
.
├── dotnetapp/                  # ASP.NET Core Web API (backend)
│   ├── Controllers/            # Authentication, Project, ProjectProposal, Feedback, Key
│   ├── Services/                # Business logic (Auth, Project, Proposal, Feedback, RSA key)
│   ├── Models/                  # EF Core entities (User, Project, ProjectProposal, Feedback)
│   ├── Data/                    # ApplicationDbContext (EF Core)
│   ├── Validations/              # Custom validation attributes (unique email/username)
│   ├── Exceptions/                # Custom exception types
│   └── Program.cs                # App startup, DI, JWT & CORS configuration
│
├── angularapp/                 # Angular frontend
│   └── src/app/
│       ├── components/          # Login, Registration, Manager/Employee views, Navbars, Error page
│       ├── services/             # Auth, Crypto (RSA), Project, Proposal, Feedback services
│       ├── models/                # TypeScript interfaces mirroring backend models
│       ├── interceptors/          # HTTP interceptor for attaching JWT to requests
│       └── components/authguard/  # Route guard enforcing login & role checks
│
├── TestProject/                 # Backend unit tests
└── .github/workflows/build.yml   # CI pipeline (SonarCloud analysis)
```

---

## ⚙️ Getting Started

### Prerequisites

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/) (v18+) and npm
- [Angular CLI](https://angular.io/cli) (`npm install -g @angular/cli`)
- SQL Server (local instance or Docker container)

### 1. Backend Setup (`dotnetapp`)

1. Update the connection string and JWT settings in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "server=localhost;database=appdb;user id=YOUR_USER;password=YOUR_PASSWORD;trusted_connection=false;encrypt=false"
     },
     "Jwt": {
       "Key": "YOUR_SECRET_KEY",
       "Issuer": "dotnetapp",
       "Audience": "dotnetapp"
     }
   }
   ```
   > ⚠️ Never commit real secrets. Use `appsettings.Development.json`, user-secrets, or environment variables for local/production values.

2. Restore dependencies and apply migrations:
   ```bash
   cd dotnetapp
   dotnet restore
   dotnet ef database update   # requires dotnet-ef tool
   ```

3. Run the API:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:<port>` (Swagger UI enabled in Development).

### 2. Frontend Setup (`angularapp`)

1. Point the frontend to your backend API in `src/app/environment/env.ts`:
   ```typescript
   export const ApiUrl = {
     apiUrl: 'https://localhost:<port>'
   };
   ```

2. Install dependencies and run:
   ```bash
   cd angularapp
   npm install
   ng serve
   ```
   The app will be available at `http://localhost:4200`.

### 3. Run Tests

- **Backend:**
  ```bash
  cd TestProject
  dotnet test
  ```
- **Frontend:**
  ```bash
  cd angularapp
  ng test
  ```

---

## 🔐 Authentication Flow

1. On app load, Angular fetches the RSA **public key** from `GET /api/key/public`.
2. During login/registration, the password is encrypted client-side with the public key (via `JSEncrypt`) before being sent to the server.
3. The backend decrypts the password using its private key (`RsaKeyService`), verifies/hashes it with **BCrypt**, and — on success — issues a **JWT** containing the user's ID, username, email, and role.
4. The Angular `AuthInterceptor` attaches this JWT as a `Bearer` token to all subsequent API requests.
5. The `AuthGuard` checks token validity and role claims before allowing navigation to protected routes; the API independently enforces the same roles via `[Authorize(Roles = "...")]`.

---

## 👥 User Roles

| Role       | Capabilities                                                                 |
|------------|-------------------------------------------------------------------------------|
| **Manager**  | Create/edit projects, view all proposals & feedback, review employee submissions |
| **Employee** | View assigned projects, submit project proposals, submit feedback              |

---

## 📌 API Overview

| Endpoint                              | Method | Roles              | Description                     |
|----------------------------------------|--------|---------------------|----------------------------------|
| `/api/key/public`                       | GET    | Public               | Fetch RSA public key             |
| `/api/authentication/register`          | POST   | Public               | Register a new user              |
| `/api/authentication/login`             | POST   | Public               | Login and receive a JWT          |
| `/api/projects`                         | GET    | Manager, Employee    | List all projects                |
| `/api/projects/{id}`                    | GET    | Manager, Employee    | Get project by ID                |
| `/api/projects`                         | POST   | Manager              | Create a new project             |
| `/api/projectproposals`                 | GET    | Manager              | List all proposals               |
| `/api/projectproposals/{id}`            | GET    | Manager, Employee    | Get proposal by ID               |
| `/api/projectproposals/user/{userId}`   | GET    | Employee             | Get proposals by user            |
| `/api/feedback`                         | GET    | Manager              | List all feedback                |
| `/api/feedback/user/{userId}`           | GET    | Employee             | Get feedback by user             |

*(Exact routes/verbs may vary slightly — see `Controllers/` for the full, authoritative list.)*

---

## 🛠️ CI/CD

Every push and pull request triggers a GitHub Actions workflow that:
1. Builds the .NET backend.
2. Runs a SonarCloud static analysis scan for code quality and security issues.

---

## 📄 License

This project was built for educational/learning purposes. Add a license of your choice if distributing publicly.

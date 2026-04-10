# SMART Collection System — Backend API

ASP.NET Core Web API following Clean Architecture. Handles authentication, organization management, and system configuration for the SMART Collection System.

---

## Project Structure

```
New folder/
├── CollectorApp/               # API layer (this project — controllers, Program.cs)
├── CollectorApp.Application/   # Application layer (services, DTOs, interfaces)
├── CollectorApp.Core/          # Domain layer (entities, value objects, exceptions)
└── CollectorApp.Infrastructure/# Infrastructure layer (EF Core, repositories, JWT)
```

---

## Prerequisites

| Tool | Version |
|------|---------|
| .NET SDK | 10.0+ |
| SQL Server | Express or full edition |
| Visual Studio / VS Code | Any recent version |

---

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd CollectorApp
```

### 2. Configure the database connection

Open `appsettings.json` and update the connection string to match your SQL Server instance:

```json
{
  "ConnectionStrings": {
    "Default": "Server=YOUR_SERVER\\SQLEXPRESS;Database=CollectorApp;Trusted_Connection=True;TrustServerCertificate=True;Encrypt=False;"
  }
}
```

Replace `YOUR_SERVER` with your machine name or SQL Server instance name.

### 3. Configure JWT settings

In `appsettings.json`, update the JWT section with a strong secret key (minimum 32 characters):

```json
{
  "Jwt": {
    "Key": "YOUR_SECRET_KEY_MIN_32_CHARS_HERE!!",
    "Issuer": "CollectorApp",
    "Audience": "CollectorApp",
    "ExpiresInMinutes": "60"
  }
}
```

> **Important:** Never commit real secrets to source control. Use `appsettings.Development.json` or environment variables for local secrets.

### 4. Apply database migrations

Run from the `CollectorApp` (API) directory:

```bash
dotnet ef database update --project ../CollectorApp.Infrastructure --startup-project .
```

### 5. Run the API

```bash
dotnet run
```

The API starts at:
- `https://localhost:7008` (HTTPS)
- `http://localhost:5xxx` (HTTP — check console output for exact port)

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/login` | No | Login and receive a JWT token |

### Organizations

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/organization` | Yes | List all organizations |
| GET | `/api/organization/{id}` | Yes | Get organization by ID |
| POST | `/api/organization` | Yes | Create a new organization |
| PUT | `/api/organization/{id}` | Yes | Update an organization |
| PATCH | `/api/organization/{id}/deactivate` | Yes | Deactivate an organization |

### System

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| GET | `/api/system` | Yes | Get system information |

---

## Swagger UI

Swagger is enabled in development mode. After running the API, visit:

```
https://localhost:7008/swagger
```

To test protected endpoints in Swagger:
1. Call `POST /api/auth/login` and copy the returned token.
2. Click **Authorize** at the top right of the Swagger UI.
3. Enter `Bearer <your-token>` and click **Authorize**.

---

## Architecture Overview

This project follows **Clean Architecture** with strict dependency rules — outer layers depend on inner layers, never the reverse.

```
CollectorApp.Core           ← No dependencies (pure domain)
CollectorApp.Application    ← Depends on Core
CollectorApp.Infrastructure ← Depends on Core + Application
CollectorApp (API)          ← Depends on Application + Infrastructure
```

- **Core** — Domain entities (`User`, `Organization`) and interfaces
- **Application** — Business logic services (`AuthService`, `OrganizationService`, `SystemService`), DTOs
- **Infrastructure** — EF Core `AppDbContext`, repository implementations, `JwtTokenService`
- **API** — ASP.NET Core controllers, DI wiring, middleware configuration

---

## CORS

The API is configured to allow requests from the frontend dev server running at `http://localhost:5173`. This is set in `Program.cs` under the `FrontendDev` CORS policy.

---

## Adding a New Migration

After modifying entities in `CollectorApp.Core`:

```bash
dotnet ef migrations add <MigrationName> --project ../CollectorApp.Infrastructure --startup-project .
dotnet ef database update --project ../CollectorApp.Infrastructure --startup-project .
```

---

## Useful Commands

```bash
# Restore packages
dotnet restore

# Build the solution
dotnet build

# Run the API
dotnet run --project CollectorApp

# List existing migrations
dotnet ef migrations list --project ../CollectorApp.Infrastructure --startup-project .
```

# AI-Based Government Scheme Eligibility and Assistance System

An intelligent, transparent full-stack web application designed to help citizens discover, evaluate, and apply for Central and State government welfare schemes based on their personal, economic, and demographic profile.

---

## 🌟 Key Features

1. **User Authentication & Role-Based Access (JWT)**
   - Secure citizen and administrator registration & login using JSON Web Tokens (JWT).
   - Password encryption using Spring Security BCrypt.

2. **Citizen Demographic & Socioeconomic Profile**
   - Captures comprehensive citizen attributes:
     - **Demographics:** Age, Gender, State, District, Marital Status
     - **Financials:** Annual Family Income, Occupation, Education level
     - **Social & Equity:** Caste Category (General, OBC, SC, ST, EWS), Minority Community, Disability status (PwD % benchmark)
     - **Assets & Residency:** Area (Rural/Urban), BPL / Antyodaya Ration Card status, Cultivable Land Ownership (Hectares)

3. **Government Scheme Database**
   - Pre-seeded with 8 major national initiatives (e.g. *PM-KISAN*, *Ayushman Bharat PM-JAY*, *PM Awas Yojana*, *NSP College Scholarships*, *Mudra Loans*, *Sukanya Samriddhi Yojana*, *Stand-Up India*, and *Divyangjan Swavalamban Yojana*).
   - Categorized by sector (Agriculture, Healthcare, Education, Housing, Business, Women & Child).

4. **Multi-Dimensional AI & Rule-Based Eligibility Engine**
   - Audits citizen profiles against 12 granular constraints.
   - Calculates a precise **Eligibility Score (0% – 100%)**:
     - **100% Fully Eligible**
     - **60% – 99% Partially Eligible**
     - **< 60% Ineligible**
   - **Explainable AI Breakdown:**
     - Shows exactly **why** the citizen is eligible (itemized rule-by-rule audit).
     - Shows exactly **why** the citizen is not eligible (unmet criteria).
     - Pinpoints **missing eligibility requirements** with actionable guidance.

5. **Required Documents Checklist**
   - Displays clear checklists of required documents for each scheme (e.g. Aadhaar Card, Land Records, Income Certificate, BPL Card, Marksheets).

6. **Step-by-Step Application Procedure**
   - Numbered, easy-to-follow application guidelines with direct links to official government portals and helpline phone numbers.

7. **Search & Multi-Facet Filtering**
   - Search by keyword, scheme name, or ministry.
   - Filter by Sector/Category, Level (Central/State), and State residency.

8. **Admin Dashboard (CRUD & Analytics)**
   - Admin view with live system statistics: Total Schemes, Active Programs, Registered Citizens, Completed Demographics Profiles.
   - Admin can add, update, and delete government schemes and customize eligibility rules.

9. **Interactive AI Scheme Assistant**
   - Floating interactive assistant chat widget.
   - Citizens can ask natural-language questions (e.g. *"I am a small farmer with 1.5 hectares of land looking for financial aid"* or *"What scholarship is available for a 12th pass student?"*).
   - The assistant analyzes the scheme repository and suggests matching schemes with one-click details.

---

## 🛠️ Technology Stack

- **Frontend:** React.js 19, Vite, Tailwind CSS v4, Lucide React Icons, Axios, React Router v7
- **Backend:** Java 21, Spring Boot 3.3.4, Spring Data JPA, Spring Security 6, JJWT 0.12.5
- **Database:** MySQL Server 8.0
- **Architecture:** RESTful Web APIs, Stateless JWT Authentication, MVC Architecture

---

## 📁 Project Structure

```
gov-scheme-assistant/
├── backend/
│   ├── src/main/java/com/govscheme/assistant/
│   │   ├── GovSchemeAssistantApplication.java
│   │   ├── config/
│   │   │   ├── SecurityConfig.java
│   │   │   ├── JwtTokenProvider.java
│   │   │   ├── JwtAuthenticationFilter.java
│   │   │   └── DataInitializer.java (Seeds Admin, Citizen, & 8 Schemes)
│   │   ├── controller/
│   │   │   ├── AuthController.java
│   │   │   ├── CitizenProfileController.java
│   │   │   ├── SchemeController.java
│   │   │   ├── EligibilityController.java
│   │   │   ├── AdminSchemeController.java
│   │   │   └── AiAssistantController.java
│   │   ├── dto/
│   │   │   ├── AuthRequest.java & AuthResponse.java
│   │   │   ├── CitizenProfileDto.java
│   │   │   ├── SchemeDto.java
│   │   │   ├── CriterionCheckDto.java & EligibilityResultDto.java
│   │   │   ├── AdminStatsDto.java
│   │   │   └── AiChatRequest.java & AiChatResponse.java
│   │   ├── entity/
│   │   │   ├── User.java
│   │   │   ├── CitizenProfile.java
│   │   │   └── Scheme.java
│   │   ├── enums/
│   │   │   └── Role.java
│   │   ├── exception/
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   ├── BadRequestException.java
│   │   │   └── ResourceNotFoundException.java
│   │   ├── repository/
│   │   │   ├── UserRepository.java
│   │   │   ├── CitizenProfileRepository.java
│   │   │   └── SchemeRepository.java
│   │   └── service/
│   │       ├── AuthService.java
│   │       ├── CustomUserDetailsService.java
│   │       ├── CitizenProfileService.java
│   │       ├── SchemeService.java
│   │       ├── EligibilityEngineService.java
│   │       └── AiAssistantService.java
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── pom.xml
│   └── run-backend.bat
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js (Axios JWT Interceptor)
│   │   │   └── index.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ScoreBadge.jsx
│   │   │   ├── SchemeCard.jsx
│   │   │   ├── SchemeDetailModal.jsx
│   │   │   ├── AiChatWidget.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── CitizenProfilePage.jsx
│   │   │   ├── EligibilityCheckerPage.jsx
│   │   │   ├── SchemesPage.jsx
│   │   │   └── AdminDashboardPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
├── database/
│   └── gov_scheme_assistant.sql
├── start-all.bat
├── run-backend.bat
├── run-frontend.bat
└── README.md
```

---

## 🗄️ Database Setup

The application uses **MySQL 8.0**.

The database `gov_scheme_assistant_db` is configured in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/gov_scheme_assistant_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=kumar3010
spring.jpa.hibernate.ddl-auto=update
```
> **Note:** Hibernate automatically creates all tables (`users`, `citizen_profiles`, `schemes`) and `DataInitializer` seeds test accounts and government programs on startup. A standalone SQL script is also provided at `database/gov_scheme_assistant.sql`.

---

## 👥 Default Demo Accounts

For instant testing, two pre-configured accounts are seeded:

| Role | Email | Password | Details |
|------|-------|----------|---------|
| **Verified Citizen** | `citizen@example.com` | `citizen123` | Ramesh Kumar (28, Farmer, Karnataka, OBC, Has Land) |
| **Administrator** | `admin@gov.in` | `admin123` | System Administrator (Full CRUD & Analytics Access) |

*(Quick-fill buttons are also available on the Login screen!)*

---

## 🚀 How to Run the Project

### Option 1: One-Click Launch (Recommended)
Double-click `start-all.bat` in the project root:
```cmd
start-all.bat
```
This opens two windows:
- Backend server running at: **http://localhost:8080**
- Frontend application running at: **http://localhost:5173**

---

### Option 2: Running Backend & Frontend Manually

#### Step 1: Run the Backend
1. Open a terminal in `backend/`:
```powershell
cd C:\Users\gouth\.gemini\antigravity\scratch\gov-scheme-assistant\backend
```
2. Run using Maven:
```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21.0.11"
& "C:\Users\gouth\.gemini\antigravity\scratch\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run
```
*(Or simply double-click `run-backend.bat`)*

#### Step 2: Run the Frontend
1. Open a terminal in `frontend/`:
```powershell
cd C:\Users\gouth\.gemini\antigravity\scratch\gov-scheme-assistant\frontend
npm run dev
```
*(Or simply double-click `run-frontend.bat`)*

2. Open your web browser and navigate to:
```
http://localhost:5173
```

---

## 📡 REST API Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create citizen or administrator account
- `POST /api/auth/login` - Authenticate and obtain JWT Bearer token
- `GET /api/auth/me` - Fetch authenticated user details

### Citizen Profile (`/api/profile`)
- `GET /api/profile` - Get current citizen profile attributes
- `POST /api/profile` - Save / update demographic and economic details

### Government Schemes (`/api/schemes`)
- `GET /api/schemes` - List all active government schemes
- `GET /api/schemes/{id}` - Fetch specific scheme details
- `GET /api/schemes/search?keyword=...&category=...&state=...` - Search & filter schemes
- `GET /api/schemes/categories` - Distinct categories
- `GET /api/schemes/ministries` - Distinct ministries

### Eligibility & Rule Engine (`/api/eligibility`)
- `GET /api/eligibility/check` - Run 12-rule audit for authenticated citizen (returns scores, why eligible, why not eligible, missing requirements, documents, and procedure)
- `POST /api/eligibility/check-anonymous` - Run rule audit for unauthenticated guests
- `GET /api/eligibility/scheme/{schemeId}` - Audit single scheme for citizen

### AI Assistant (`/api/ai`)
- `POST /api/ai/ask` - Natural language query processing & scheme recommendations

### Admin Dashboard (`/api/admin`) *(Requires ROLE_ADMIN)*
- `GET /api/admin/schemes` - Retrieve all schemes
- `POST /api/admin/schemes` - Create new welfare scheme
- `PUT /api/admin/schemes/{id}` - Update scheme and eligibility parameters
- `DELETE /api/admin/schemes/{id}` - Delete scheme
- `GET /api/admin/stats` - Platform analytics and sector counts

---

## 🎯 Verification & Testing

- ✅ **Backend Unit & DDL Execution:** Spring Boot 3 started on port 8080 with all MySQL tables generated and populated.
- ✅ **API Health:** Verified via `Invoke-RestMethod` for authentication, scheme query, eligibility engine, and AI assistant.
- ✅ **Frontend Build:** Verified with Vite production build (`dist/`) transformed and bundled with 0 errors.
- ✅ **Security:** Tested JWT authentication filter with role-based route guards for Admin and Citizen.

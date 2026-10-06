# 🦷 Dental Clinic Landing Page & Appointment System — Full-Stack Template

A modern full-stack web application template designed for dental clinics and practices. It features a responsive landing page to present services, dynamic dark/light theme switching, and an end-to-end appointment scheduling system with database persistence and automated WhatsApp redirection.

---

## 🚀 Features

- **Responsive Dental Landing Page**: Modern UI highlighting clinical services, key features, gallery results, and a smooth **Dark / Light Theme** toggle.
- **Appointment Request Form**: Interactive form capturing patient details, health insurance info, and preferred dental procedures.
- **WhatsApp Integration**: Automated formatting and redirection to the clinic's WhatsApp contact via the WhatsApp Web API (`wa.me`).
- **Data Persistence**: Relational storage for patient records and appointment requests using PostgreSQL.

---

## 🛠️ Tech Stack

### **Frontend**
- **React** (v18+) with **TypeScript**
- **Vite** (Bundler & Fast Dev Server)
- **Lucide React** (Icons)
- **CSS3 / Custom Variables** (Styling & Theme support)

### **Backend**
- **Node.js** with **Express** (RESTful API in ES Modules)
- **TypeScript** & **TSX** (Type safety & execution)
- **Prisma ORM** (Data modeling, migrations, and query building)
- **CORS** (Secure cross-origin resource sharing)

### **Database & Infrastructure**
- **PostgreSQL** (Relational Database)
- **Docker & Docker Compose** (Containerized database environment)

---

## 📂 Monorepo Structure

```text
dental-clinic-template/
├── odonto-backend/          # Express REST API + Prisma ORM
│   ├── prisma/              # Database schema & migrations
│   └── src/                 # Server routes & business logic
│
├── odonto-frontend/         # React + Vite web application
│   └── src/                 # Components, styles & landing page logic
│
├── docker-compose.yml       # PostgreSQL Docker container configuration
└── README.md                # Project documentation

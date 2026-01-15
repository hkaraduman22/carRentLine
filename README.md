# 🚗 CarRentLine

![NestJS](https://img.shields.io/badge/backend-NestJS_v11-red.svg)
![React](https://img.shields.io/badge/frontend-React_v19-blue.svg)
![Prisma](https://img.shields.io/badge/ORM-Prisma-green.svg)
![SQL Server](https://img.shields.io/badge/database-SQL%20Server-lightgrey.svg)
![Tailwind CSS](https://img.shields.io/badge/style-Tailwind-38B2AC.svg)
![Swagger](https://img.shields.io/badge/docs-Swagger-brightgreen.svg)
![License](https://img.shields.io/badge/license-UNLICENSED-yellow.svg)

---

## 🇬🇧 English Documentation

### 📝 Overview
**CarRentLine** is a sophisticated, full-stack Car Rental Management System. It leverages **NestJS** for a scalable, modular backend architecture and **React** (v19) with **Tailwind CSS** for a responsive, modern frontend. The system manages complex relationships between users, vehicles, reservations, and messaging, all persisted in a **SQL Server** database via **Prisma ORM**.

### 🏗 System Architecture

The application follows a strict **Layered Architecture**:

1.  **Presentation Layer (Frontend):** React components consume the API via Axios. State is managed via Context API (Auth).
2.  **Controller Layer (Backend):** Handles HTTP requests, validation (DTOs), and serialization.
3.  **Service Layer (Backend):** Contains business logic (e.g., calculating reservation totals, password hashing).
4.  **Data Access Layer (Backend):** Uses Prisma Service to interact with SQL Server.

### 🗂 Database Schema (ER Diagram)

The following diagram represents the relationships defined in `schema.prisma`.

```mermaid
erDiagram
    USER ||--o{ RESERVATION : "makes"
    USER ||--o{ MESSAGE : "sends"
    CAR ||--o{ RESERVATION : "is_reserved_in"
    CAR ||--o{ MESSAGE : "has_inquiry"
    CAR }|--|{ FEATURE : "has"

    USER {
        int id PK
        string email UK
        string password
        string role "user | admin"
    }

    CAR {
        int id PK
        string brand
        string model
        decimal pricePerDay
        boolean isAvailable
    }

    RESERVATION {
        int id PK
        datetime startDate
        datetime endDate
        decimal totalPrice
        string status "PENDING"
    }

    MESSAGE {
        int id PK
        string content
        string reply "Admin Reply"
    }

    FEATURE {
        int id PK
        string name
    }
Derived from Prisma Schema📂 Project Directory StructurePlaintextcarRentLine/
├── backend/ (NestJS)
│   ├── prisma/
│   │   ├── schema.prisma      # Database modeling & relations
│   │   └── seed.ts            # Initial data population (Admin user, etc.)
│   ├── src/
│   │   ├── auth/              # JWT Strategy, Guards, Login/Register logic
│   │   ├── cars/              # Car CRUD, Filtering logic
│   │   ├── features/          # Car features (AC, GPS, etc.)
│   │   ├── messages/          # User-Admin messaging system
│   │   ├── reservations/      # Booking logic & Date handling
│   │   ├── users/             # User management & Profile
│   │   ├── prisma/            # DB Connection Service
│   │   ├── app.module.ts      # Root Module
│   │   └── main.ts            # App Entry Point (Swagger setup)
│   └── test/                  # E2E Tests
│
├── frontend/ (React)
│   ├── public/                # Static assets (Car images)
│   ├── src/
│   │   ├── components/        # Reusable UI (Navbar, CarCard)
│   │   ├── context/           # AuthContext (Global State)
│   │   ├── pages/             # AdminPanel, Home, CarDetail, Login
│   │   ├── api.js             # Axios Instance & Interceptors
│   │   └── App.js             # Routing (React Router v7)
│   └── tailwind.config.js     # Styling Configuration
🛠 Tech Stack & LibrariesContextTechnologyUsage/DescriptionReferenceBackendNestJSMain framework, Modules, DILanguageTypeScriptType safety for backend logicDB / ORMPrismaSchema definition, Migrations, ClientDatabaseSQL ServerRelational Data StoreAuthPassport-JWTBearer Token StrategyDocsSwaggerAPI DocumentationFrontendReactUI Library (v19)StylingTailwind CSSUtility-first stylingRoutingReact RouterClient-side navigation🚀 Installation & Setup1. Backend SetupBashcd backend
npm install

# Configure Environment
# Create .env file: DATABASE_URL="sqlserver://localhost:1433;database=CarRentLineDB;user=sa;password=Pass;encrypt=false"

# Run Migrations & Seed
npx prisma migrate dev --name init
npx prisma db seed

# Start Server
npm run start:dev
Swagger Docs: http://localhost:3000/apiDefault Admin: Check backend/prisma/seed.ts for credentials.2. Frontend SetupBashcd frontend
npm install
npm start
App URL: http://localhost:3001🇹🇷 Türkçe Dokümantasyon📝 Genel BakışCarRentLine, gelişmiş bir Full-Stack Araç Kiralama Yönetim Sistemidir. Ölçeklenebilir ve modüler bir mimari için Backend tarafında NestJS, modern ve duyarlı bir arayüz için Frontend tarafında React (v19) ve Tailwind CSS kullanılmıştır. Sistem; kullanıcılar, araçlar, rezervasyonlar ve mesajlaşma arasındaki karmaşık ilişkileri Prisma ORM aracılığıyla SQL Server üzerinde yönetir.🏗 Sistem MimarisiUygulama katı bir Katmanlı Mimari (Layered Architecture) izler:Sunum Katmanı (Frontend): React bileşenleri Axios aracılığıyla API ile haberleşir. Oturum yönetimi Context API ile sağlanır.Kontrolcü Katmanı (Backend): HTTP isteklerini karşılar, verileri doğrular (DTO) ve yanıtları düzenler.Servis Katmanı (Backend): İş mantığını barındırır (örn. şifreleme, rezervasyon çakışma kontrolü).Veri Erişim Katmanı (Backend): SQL Server ile iletişim kurmak için Prisma Servisini kullanır.🗂 Veritabanı Şeması (ER Diyagramı)Aşağıdaki diyagram schema.prisma dosyasındaki ilişkileri görselleştirir.Kod snippet'ierDiagram
    USER ||--o{ RESERVATION : "yapar"
    USER ||--o{ MESSAGE : "gönderir"
    CAR ||--o{ RESERVATION : "kiralanır"
    CAR ||--o{ MESSAGE : "hakkında_sorulur"
    CAR }|--|{ FEATURE : "sahiptir"

    USER {
        int id PK
        string email UK
        string password
        string role "user | admin"
    }

    CAR {
        int id PK
        string brand
        string model
        decimal pricePerDay
        boolean isAvailable
    }

    RESERVATION {
        int id PK
        datetime startDate
        datetime endDate
        decimal totalPrice
        string status "PENDING"
    }

    MESSAGE {
        int id PK
        string content
        string reply "Admin Cevabı"
    }

    FEATURE {
        int id PK
        string name
    }
📂 Proje Dosya YapısıPlaintextcarRentLine/
├── backend/ (NestJS)
│   ├── prisma/
│   │   ├── schema.prisma      # Veritabanı modelleri & ilişkiler
│   │   └── seed.ts            # Başlangıç verileri (Admin vb.)
│   ├── src/
│   │   ├── auth/              # JWT Stratejisi, Guardlar, Giriş mantığı
│   │   ├── cars/              # Araç CRUD ve Filtreleme işlemleri
│   │   ├── features/          # Araç özellikleri (Klima, GPS vb.)
│   │   ├── messages/          # Kullanıcı-Admin mesajlaşma sistemi
│   │   ├── reservations/      # Rezervasyon mantığı & Tarih işlemleri
│   │   ├── users/             # Kullanıcı yönetimi & Profil
│   │   ├── prisma/            # Veritabanı Bağlantı Servisi
│   │   ├── app.module.ts      # Kök Modül
│   │   └── main.ts            # Uygulama Giriş Noktası (Swagger ayarı)
│   └── test/                  # E2E Testleri
│
├── frontend/ (React)
│   ├── public/                # Statik dosyalar (Araç resimleri)
│   ├── src/
│   │   ├── components/        # Tekrar kullanılabilir UI (Navbar, CarCard)
│   │   ├── context/           # AuthContext (Global State)
│   │   ├── pages/             # Sayfalar (AdminPanel, Home, Detay, Login)
│   │   ├── api.js             # Axios Yapılandırması & Interceptorlar
│   │   └── App.js             # Rota Yapılandırması (React Router v7)
│   └── tailwind.config.js     # Stil Konfigürasyonu
🛠 Teknoloji Yığını & KütüphanelerBağlamTeknolojiKullanım/AçıklamaReferansBackendNestJSAna Framework, Modüller, DIDilTypeScriptBackend mantığı için tip güvenliğiVT / ORMPrismaŞema tanımı, Migrasyonlar, İstemciVeritabanıSQL Serverİlişkisel Veri DeposuAuthPassport-JWTBearer Token StratejisiDokümanSwaggerAPI DokümantasyonuFrontendReactUI Kütüphanesi (v19)StilTailwind CSSUtility-first stil yapısıRotaReact Routerİstemci tarafı yönlendirme🚀 Kurulum ve Çalıştırma1. Backend KurulumuBashcd backend
npm install

# Ortam Değişkenlerini Ayarlayın
# .env dosyası oluşturun: DATABASE_URL="sqlserver://localhost:1433;database=CarRentLineDB;user=sa;password=Sifre;encrypt=false"

# Veritabanı Migrasyonu ve Seed
npx prisma migrate dev --name init
npx prisma db seed

# Sunucuyu Başlatın
npm run start:dev
Swagger Dokümanı: http://localhost:3000/apiVarsayılan Admin: Giriş bilgileri için backend/prisma/seed.ts dosyasına bakınız.2. Frontend KurulumuBashcd frontend
npm install
npm start
Uygulama Adresi: http://localhost:3001

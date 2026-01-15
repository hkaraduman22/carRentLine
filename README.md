🚗 CarRentLine
==============

🇬🇧 English Documentation
--------------------------

### 📝 Overview

**CarRentLine** is a sophisticated, full-stack Car Rental Management System. It leverages **NestJS** for a scalable, modular backend architecture and **React** with **Tailwind CSS** for a responsive, modern frontend. The system manages complex relationships between users, vehicles, reservations, and messaging, all persisted in a **SQL Server** database via **Prisma ORM**.

### 🏗 System Architecture

The application follows a strict **Layered Architecture**:

1.  **Presentation Layer (Frontend):** React components consume the API via Axios. State is managed via Context API (Auth).
    
2.  **Controller Layer (Backend):** Handles HTTP requests, validation (DTOs), and serialization.
    
3.  **Service Layer (Backend):** Contains business logic (e.g., calculating reservation totals, password hashing).
    
4.  **Data Access Layer (Backend):** Uses Prisma Service to interact with SQL Server.
    

### 🗂 Database Schema (ER Diagram)

The following diagram represents the relationships defined in schema.prisma.

Kod snippet'i

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   erDiagram      USER ||--o{ RESERVATION : "makes"      USER ||--o{ MESSAGE : "sends"      CAR ||--o{ RESERVATION : "is_reserved_in"      CAR ||--o{ MESSAGE : "has_inquiry"      CAR }|--|{ FEATURE : "has"      USER {          int id PK          string email UK          string password          string role "user | admin"      }      CAR {          int id PK          string brand          string model          decimal pricePerDay          boolean isAvailable      }      RESERVATION {          int id PK          datetime startDate          datetime endDate          decimal totalPrice          string status "PENDING"      }      MESSAGE {          int id PK          string content          string reply "Admin Reply"      }      FEATURE {          int id PK          string name      }   `

_Derived from Prisma Schema_

### 📂 Project Directory Structure

Plaintext

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   carRentLine/  ├── backend/ (NestJS)  │   ├── prisma/  │   │   ├── schema.prisma      # Database modeling & relations  │   │   └── seed.ts            # Initial data population (Admin user, etc.)  │   ├── src/  │   │   ├── auth/              # JWT Strategy, Guards, Login/Register logic  │   │   ├── cars/              # Car CRUD, Filtering logic  │   │   ├── features/          # Car features (AC, GPS, etc.)  │   │   ├── messages/          # User-Admin messaging system  │   │   ├── reservations/      # Booking logic & Date handling  │   │   ├── users/             # User management & Profile  │   │   ├── prisma/            # DB Connection Service  │   │   ├── app.module.ts      # Root Module  │   │   └── main.ts            # App Entry Point (Swagger setup)  │   └── test/                  # E2E Tests  │  ├── frontend/ (React)  │   ├── public/                # Static assets (Car images)  │   ├── src/  │   │   ├── components/        # Reusable UI (Navbar, CarCard)  │   │   ├── context/           # AuthContext (Global State)  │   │   ├── pages/             # AdminPanel, Home, CarDetail, Login  │   │   ├── api.js             # Axios Instance & Interceptors  │   │   └── App.js             # Routing (React Router v7)  │   └── tailwind.config.js     # Styling Configuration   `

### 🛠 Tech Stack & Libraries

**ContextTechnologyUsage/DescriptionReferenceBackendNestJS**Main framework, Modules, DI**LanguageTypeScript**Type safety for backend logic**DB / ORMPrisma**Schema definition, Migrations, Client**DatabaseSQL Server**Relational Data Store**AuthPassport-JWT**Bearer Token Strategy**DocsSwagger**API Documentation**FrontendReact**UI Library (v19)**StylingTailwind CSS**Utility-first styling**RoutingReact Router**Client-side navigation

### 🚀 Installation & Setup

#### 1\. Backend Setup

Bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend  npm install  # Configure Environment  # Create .env file: DATABASE_URL="sqlserver://localhost:1433;database=CarRentLineDB;user=sa;password=Pass;encrypt=false"  # Run Migrations & Seed  npx prisma migrate dev --name init  npx prisma db seed  # Start Server  npm run start:dev   `

*   **Swagger Docs:** http://localhost:3000/api
    
*   **Default Admin:** Check backend/prisma/seed.ts for credentials.
    

#### 2\. Frontend Setup

Bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd frontend  npm install  npm start   `

*   **App URL:** http://localhost:3001
    

🇹🇷 Türkçe Dokümantasyon
-------------------------

### 📝 Genel Bakış

**CarRentLine**, gelişmiş bir Full-Stack Araç Kiralama Yönetim Sistemidir. Ölçeklenebilir ve modüler bir mimari için Backend tarafında **NestJS**, modern ve duyarlı bir arayüz için Frontend tarafında **React** ve **Tailwind CSS** kullanılmıştır. Sistem; kullanıcılar, araçlar, rezervasyonlar ve mesajlaşma arasındaki karmaşık ilişkileri **Prisma ORM** aracılığıyla **SQL Server** üzerinde yönetir.

### 🏗 Sistem Mimarisi

Uygulama katı bir **Katmanlı Mimari (Layered Architecture)** izler:

1.  **Sunum Katmanı (Frontend):** React bileşenleri Axios aracılığıyla API ile haberleşir. Oturum yönetimi Context API ile sağlanır.
    
2.  **Kontrolcü Katmanı (Backend):** HTTP isteklerini karşılar, verileri doğrular (DTO) ve yanıtları düzenler.
    
3.  **Servis Katmanı (Backend):** İş mantığını barındırır (örn. şifreleme, rezervasyon çakışma kontrolü).
    
4.  **Veri Erişim Katmanı (Backend):** SQL Server ile iletişim kurmak için Prisma Servisini kullanır.
    

### 🗂 Veritabanı Şeması (ER Diyagramı)

Aşağıdaki diyagram schema.prisma dosyasındaki ilişkileri görselleştirir.

Kod snippet'i

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   erDiagram      USER ||--o{ RESERVATION : "yapar"      USER ||--o{ MESSAGE : "gönderir"      CAR ||--o{ RESERVATION : "kiralanır"      CAR ||--o{ MESSAGE : "hakkında_sorulur"      CAR }|--|{ FEATURE : "sahiptir"      USER {          int id PK          string email UK          string password          string role "user | admin"      }      CAR {          int id PK          string brand          string model          decimal pricePerDay          boolean isAvailable      }      RESERVATION {          int id PK          datetime startDate          datetime endDate          decimal totalPrice          string status "PENDING"      }      MESSAGE {          int id PK          string content          string reply "Admin Cevabı"      }      FEATURE {          int id PK          string name      }   `

### 📂 Proje Dosya Yapısı

Plaintext

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   carRentLine/  ├── backend/ (NestJS)  │   ├── prisma/  │   │   ├── schema.prisma      # Veritabanı modelleri & ilişkiler  │   │   └── seed.ts            # Başlangıç verileri (Admin vb.)  │   ├── src/  │   │   ├── auth/              # JWT Stratejisi, Guardlar, Giriş mantığı  │   │   ├── cars/              # Araç CRUD ve Filtreleme işlemleri  │   │   ├── features/          # Araç özellikleri (Klima, GPS vb.)  │   │   ├── messages/          # Kullanıcı-Admin mesajlaşma sistemi  │   │   ├── reservations/      # Rezervasyon mantığı & Tarih işlemleri  │   │   ├── users/             # Kullanıcı yönetimi & Profil  │   │   ├── prisma/            # Veritabanı Bağlantı Servisi  │   │   ├── app.module.ts      # Kök Modül  │   │   └── main.ts            # Uygulama Giriş Noktası (Swagger ayarı)  │   └── test/                  # E2E Testleri  │  ├── frontend/ (React)  │   ├── public/                # Statik dosyalar (Araç resimleri)  │   ├── src/  │   │   ├── components/        # Tekrar kullanılabilir UI (Navbar, CarCard)  │   │   ├── context/           # AuthContext (Global State)  │   │   ├── pages/             # Sayfalar (AdminPanel, Home, Detay, Login)  │   │   ├── api.js             # Axios Yapılandırması & Interceptorlar  │   │   └── App.js             # Rota Yapılandırması (React Router v7)  │   └── tailwind.config.js     # Stil Konfigürasyonu   `

### 🛠 Teknoloji Yığını & Kütüphaneler

**BağlamTeknolojiKullanım/AçıklamaReferansBackendNestJS**Ana Framework, Modüller, DI**DilTypeScript**Backend mantığı için tip güvenliği**VT / ORMPrisma**Şema tanımı, Migrasyonlar, İstemci**VeritabanıSQL Server**İlişkisel Veri Deposu**AuthPassport-JWT**Bearer Token Stratejisi**DokümanSwagger**API Dokümantasyonu**FrontendReact**UI Kütüphanesi (v19)**StilTailwind CSS**Utility-first stil yapısı**RotaReact Router**İstemci tarafı yönlendirme

### 🚀 Kurulum ve Çalıştırma

#### 1\. Backend Kurulumu

Bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd backend  npm install  # Ortam Değişkenlerini Ayarlayın  # .env dosyası oluşturun: DATABASE_URL="sqlserver://localhost:1433;database=CarRentLineDB;user=sa;password=Sifre;encrypt=false"  # Veritabanı Migrasyonu ve Seed  npx prisma migrate dev --name init  npx prisma db seed  # Sunucuyu Başlatın  npm run start:dev   `

*   **Swagger Dokümanı:** http://localhost:3000/api
    
*   **Varsayılan Admin:** Giriş bilgileri için backend/prisma/seed.ts dosyasına bakınız.
    

#### 2\. Frontend Kurulumu

Bash

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   cd frontend  npm install  npm start   `

*   **Uygulama Adresi:** http://localhost:3001

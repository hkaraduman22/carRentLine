🚗 CarRentLine

🇬🇧 English Documentation

📝 Overview

**CarRentLine** is a sophisticated, full-stack Car Rental Management System. It leverages **NestJS** for a scalable, modular backend architecture and **React** (v19) with **Tailwind CSS** for a responsive, modern frontend. The system manages complex relationships between users, vehicles, reservations, and messaging, all persisted in a **SQL Server** database via **Prisma ORM**.

✨ Key Features

*   🔐 **Authentication & Security:** JWT-based auth, Role-Based Access Control (Admin/User), Password Hashing (Bcrypt).
    
*   🚘 **Fleet Management:** Admin can add, edit, delete cars and manage features (GPS, A/C).
    
*   📅 **Reservation System:** Users can book cars for specific dates; conflicts are handled automatically.
    
*   💬 **Messaging System:** Users can inquire about cars; Admins can reply directly via the dashboard.
    
*   📱 **Responsive Design:** Fully responsive UI built with Tailwind CSS.
    

🏗 System Architecture

The application follows a strict **Layered Architecture**:

1.  🖥️ **Presentation Layer (Frontend):** React components consume the API via Axios. State is managed via Context API (Auth).
    
2.  🎮 **Controller Layer (Backend):** Handles HTTP requests, validation (DTOs), and serialization.
    
3.  ⚙️ **Service Layer (Backend):** Contains business logic (e.g., calculating reservation totals, password hashing).
    
4.  🗄️ **Data Access Layer (Backend):** Uses Prisma Service to interact with SQL Server.
    

🗂 Database Schema (ER Diagram)

The following diagram represents the relationships defined in schema.prisma. (Copy the text below for the diagram code).

Kod snippet'i

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   erDiagram      USER ||--o{ RESERVATION : "makes"      USER ||--o{ MESSAGE : "sends"      CAR ||--o{ RESERVATION : "is_reserved_in"      CAR ||--o{ MESSAGE : "has_inquiry"      CAR }|--|{ FEATURE : "has"      USER {          int id PK          string email UK          string password          string role "user | admin"      }      CAR {          int id PK          string brand          string model          decimal pricePerDay          boolean isAvailable      }      RESERVATION {          int id PK          datetime startDate          datetime endDate          decimal totalPrice          string status "PENDING"      }      MESSAGE {          int id PK          string content          string reply "Admin Reply"      }      FEATURE {          int id PK          string name      }   `

📂 Project Directory Structure

carRentLine/├── 🔙 backend/ (NestJS)│ ├── prisma/│ │ ├── schema.prisma # Database modeling & relations│ │ └── seed.ts # Initial data population│ ├── src/│ │ ├── auth/ # JWT Strategy, Guards│ │ ├── cars/ # Car CRUD, Filtering logic│ │ ├── features/ # Car features│ │ ├── messages/ # User-Admin messaging system│ │ ├── reservations/ # Booking logic│ │ ├── users/ # User management│ │ ├── prisma/ # DB Connection Service│ │ ├── app.module.ts # Root Module│ │ └── main.ts # App Entry Point│ └── test/ # E2E Tests├── ⚛️ frontend/ (React)│ ├── public/ # Static assets│ ├── src/│ │ ├── components/ # Reusable UI│ │ ├── context/ # AuthContext│ │ ├── pages/ # Pages (AdminPanel, Home, etc.)│ │ ├── api.js # Axios Instance│ │ └── App.js # Routing│ └── tailwind.config.js # Styling Configuration

🛠 Tech Stack & Libraries

*   🔙 **Backend:** NestJS - Main framework, Modules, DI
    
*   📘 **Language:** TypeScript - Type safety for backend logic
    
*   🔗 **DB / ORM:** Prisma - Schema definition, Migrations, Client
    
*   🛢️ **Database:** SQL Server - Relational Data Store
    
*   🔑 **Auth:** Passport-JWT - Bearer Token Strategy
    
*   📄 **Docs:** Swagger - API Documentation
    
*   ⚛️ **Frontend:** React - UI Library (v19)
    
*   🎨 **Styling:** Tailwind CSS - Utility-first styling
    
*   🛣️ **Routing:** React Router - Client-side navigation
    

🚀 Installation & Setup

1.  Backend Setup
    

cd backendnpm install

Configure Environment
=====================

Create .env file: DATABASE\_URL="sqlserver://localhost:1433;database=CarRentLineDB;user=sa;password=Pass;encrypt=false"
=======================================================================================================================

Run Migrations & Seed
=====================

npx prisma migrate dev --name initnpx prisma db seed

Start Server
============

npm run start:dev

Swagger Docs: http://localhost:3000/apiDefault Admin: Check backend/prisma/seed.ts for credentials.

1.  Frontend Setup
    

cd frontendnpm installnpm start

App URL: http://localhost:3001

🇹🇷 Türkçe Dokümantasyon

📝 Genel Bakış

**CarRentLine**, gelişmiş bir Full-Stack Araç Kiralama Yönetim Sistemidir. Ölçeklenebilir ve modüler bir mimari için Backend tarafında **NestJS**, modern ve duyarlı bir arayüz için Frontend tarafında **React** (v19) ve **Tailwind CSS** kullanılmıştır. Sistem; kullanıcılar, araçlar, rezervasyonlar ve mesajlaşma arasındaki karmaşık ilişkileri **Prisma ORM** aracılığıyla **SQL Server** üzerinde yönetir.

✨ Temel Özellikler

*   🔐 **Kimlik Doğrulama & Güvenlik:** JWT tabanlı oturum, Rol Tabanlı Erişim (Admin/Kullanıcı), Şifreleme (Bcrypt).
    
*   🚘 **Filo Yönetimi:** Admin araç ekleyebilir, düzenleyebilir ve özelliklerini (GPS, Klima vb.) yönetebilir.
    
*   📅 **Rezervasyon Sistemi:** Kullanıcılar tarih seçerek araç kiralayabilir; sistem çakışmaları otomatik engeller.
    
*   💬 **Mesajlaşma Sistemi:** Kullanıcılar araçlar hakkında soru sorabilir; Admin panelden doğrudan yanıtlayabilir.
    
*   📱 **Responsive Tasarım:** Tailwind CSS ile oluşturulmuş, mobil uyumlu arayüz.
    

🏗 Sistem Mimarisi

Uygulama katı bir **Katmanlı Mimari (Layered Architecture)** izler:

1.  🖥️ **Sunum Katmanı (Frontend):** React bileşenleri Axios aracılığıyla API ile haberleşir. Oturum yönetimi Context API ile sağlanır.
    
2.  🎮 **Kontrolcü Katmanı (Backend):** HTTP isteklerini karşılar, verileri doğrular (DTO) ve yanıtları düzenler.
    
3.  ⚙️ **Servis Katmanı (Backend):** İş mantığını barındırır (örn. şifreleme, rezervasyon çakışma kontrolü).
    
4.  🗄️ **Veri Erişim Katmanı (Backend):** SQL Server ile iletişim kurmak için Prisma Servisini kullanır.
    

🗂 Veritabanı Şeması (ER Diyagramı)

Aşağıdaki diyagram schema.prisma dosyasındaki ilişkileri görselleştirir. (Diyagram kodu yukarıdaki İngilizce bölümdeki ile aynıdır).

Kod snippet'i

Plain textANTLR4BashCC#CSSCoffeeScriptCMakeDartDjangoDockerEJSErlangGitGoGraphQLGroovyHTMLJavaJavaScriptJSONJSXKotlinLaTeXLessLuaMakefileMarkdownMATLABMarkupObjective-CPerlPHPPowerShell.propertiesProtocol BuffersPythonRRubySass (Sass)Sass (Scss)SchemeSQLShellSwiftSVGTSXTypeScriptWebAssemblyYAMLXML`   erDiagram      USER ||--o{ RESERVATION : "yapar"      USER ||--o{ MESSAGE : "gönderir"      CAR ||--o{ RESERVATION : "kiralanır"      CAR ||--o{ MESSAGE : "hakkında_sorulur"      CAR }|--|{ FEATURE : "sahiptir"      USER {          int id PK          string email UK          string password          string role "user | admin"      }      CAR {          int id PK          string brand          string model          decimal pricePerDay          boolean isAvailable      }      RESERVATION {          int id PK          datetime startDate          datetime endDate          decimal totalPrice          string status "PENDING"      }      MESSAGE {          int id PK          string content          string reply "Admin Cevabı"      }      FEATURE {          int id PK          string name      }   `

📂 Proje Dosya Yapısı

carRentLine/├── 🔙 backend/ (NestJS)│ ├── prisma/│ │ ├── schema.prisma # Veritabanı modelleri & ilişkiler│ │ └── seed.ts # Başlangıç verileri│ ├── src/│ │ ├── auth/ # JWT Stratejisi│ │ ├── cars/ # Araç CRUD işlemleri│ │ ├── features/ # Araç özellikleri│ │ ├── messages/ # Mesajlaşma sistemi│ │ ├── reservations/ # Rezervasyon mantığı│ │ ├── users/ # Kullanıcı yönetimi│ │ ├── prisma/ # Veritabanı Bağlantısı│ │ ├── app.module.ts # Kök Modül│ │ └── main.ts # Uygulama Giriş Noktası│ └── test/ # E2E Testleri├── ⚛️ frontend/ (React)│ ├── public/ # Statik dosyalar│ ├── src/│ │ ├── components/ # UI Bileşenleri│ │ ├── context/ # AuthContext│ │ ├── pages/ # Sayfalar│ │ ├── api.js # Axios Yapılandırması│ │ └── App.js # Rota Yapılandırması│ └── tailwind.config.js # Stil Konfigürasyonu

🛠 Teknoloji Yığını & Kütüphaneler

*   🔙 **Backend:** NestJS - Ana Framework, Modüller, DI
    
*   📘 **Dil:** TypeScript - Backend mantığı için tip güvenliği
    
*   🔗 **VT / ORM:** Prisma - Şema tanımı, Migrasyonlar
    
*   🛢️ **Veritabanı:** SQL Server - İlişkisel Veri Deposu
    
*   🔑 **Auth:** Passport-JWT - Bearer Token Stratejisi
    
*   📄 **Doküman:** Swagger - API Dokümantasyonu
    
*   ⚛️ **Frontend:** React - UI Kütüphanesi (v19)
    
*   🎨 **Stil:** Tailwind CSS - Utility-first stil yapısı
    
*   🛣️ **Rota:** React Router - İstemci tarafı yönlendirme
    

🚀 Kurulum ve Çalıştırma

1.  Backend Kurulumu
    

cd backendnpm install

Ortam Değişkenlerini Ayarlayın
==============================

.env dosyası oluşturun: DATABASE\_URL="sqlserver://localhost:1433;database=CarRentLineDB;user=sa;password=Sifre;encrypt=false"
==============================================================================================================================

Veritabanı Migrasyonu ve Seed
=============================

npx prisma migrate dev --name initnpx prisma db seed

Sunucuyu Başlatın
=================

npm run start:dev

Swagger Dokümanı: http://localhost:3000/apiVarsayılan Admin: Giriş bilgileri için backend/prisma/seed.ts dosyasına bakınız.

1.  Frontend Kurulumu
    

cd frontendnpm installnpm start

Uygulama Adresi: http://localhost:3001

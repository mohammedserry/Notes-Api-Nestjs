# 📝 Notes API with Nest.js

📚 A robust RESTful API for managing notes, built with Node.js and NestJs. This API provides comprehensive CRUD operations with proper validation and a clean architecture. Ideal for personal note-taking applications, task management systems, or any platform requiring note storage and retrieval.

## 🔑 Key Features  
- **Full CRUD operations** (Create, Read, Update, Delete) for notes and users
- **User authentication** with JWT-based authorization
- **Role-based access control (RBAC)** for admin and customers 
- **Class-validator & Class-transformer** for robust input validation  
- **Clean architecture** with MVC pattern  
- RESTful endpoints with proper HTTP status codes  
- In-memory data persistence (easily extendable to databases)  
- Error handling middleware  
- Organized route management  

## 🛠 Tech Stack  
- Node.js  
- Nest.js
- TypeORM
- PostgreSQL DB 
- Class-validator & Class-transformer  
- REST API principles  

## 📁 Project Structure  
```
db/                                        # Database files
migrations/                                # Database migration files
dist/                                      # Compiled output
node_modules/                              # Node.js dependencies
src/
├── auth/                                  # Authentication module
│ ├── dto/                                 # Auth DTOs
│ │ ├── user-signin.dto.ts
│ │ └── user-signup.dto.ts
│ ├── auth.controller.ts
│ ├── auth.module.ts
│ └── auth.service.ts
│
├── note/                                  # Note management
│ ├── dto/                                 # Note DTOs
│ │ ├── create-note.dto.ts
│ │ └── update-note.dto.ts
│ ├── entities/                            # Note entities
│ ├── note.controller.ts
│ ├── note.module.ts
│ └── note.service.ts
│
├── user/                                  # User management
│ ├── dto/                                 # User DTOs
│ │ └── update-user.dto.ts
│ ├── entities/                            # User entities
│ ├── user.controller.ts
│ ├── user.module.ts
│ └── user.service.ts
│
├── utility/                               # Shared utilities and core functionality
│ ├── common/                              # Common utilities and shared types
│ │ └── user-roles.enum.ts                 # User role definitions (Admin, Customer, etc.)
│ │
│ ├── decorators/                          # Custom parameter and method decorators
│ │ ├── authorize-roles.decorator.ts       # Role-based access control decorator
│ │ └── current-user.decorator.ts          # Injects current user in controllers
│ │
│ ├── guards/                              # Authentication and authorization guards
│ │ ├── authentication.guard.ts            # Verifies JWT and authentication
│ │ └── authorization.guard.ts             # Checks user roles and permissions
│ │
│ └── middlewares/                         # Request processing middlewaresAdd commentMore actions
│   └── current-user.middleware.ts         # Attaches user to request object
├── app.module.ts                          # Root application module
└── main.ts                                # Application entry point
```

## 🌐 API Endpoints  

### Auth

| Method | Endpoint             | Description             |
|--------|----------------------|------------------------ |
| POST   | /api/v1/auth/signup  | Register a new user     |
| POST   | /api/v1/auth/signin  | Login an existing user  |
| GET    | /api/v1/auth/me      | Get My Profile          |
| PATCH  | /api/v1/auth/me      | Update My Profile       |
| DELETE | /api/v1/auth/me      | Delete My Profile       |

### User for Admin

| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| GET    | /api/v1/user/      | Get All Users         |
| GET    | /api/v1/user/:id   | Get Single User       |
| DELETE | /api/v1/user/:id   | Delete Single User    |

### Notes for Admin

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | /api/v1/notes        | Create a new note         |
| GET    | /api/v1/notes        | Get all notes             |
| GET    | /api/v1/notes/:id    | Get a single note by ID   |
| PATCH  | /api/v1/notes/:id    | Update an existing note   |
| DELETE | /api/v1/notes/:id    | Remove a note             |

### Notes for Logged User

| Method | Endpoint                    | Description                  |
|--------|-----------------------------|------------------------------|
| POST   | /api/v1/notes               | Create a new note            |
| GET    | /api/v1/notes/my-notes      | Get My All Notes             |
| GET    | /api/v1/notes/my-notes/:id  | Get My Single Note by ID     |
| PATCH  | /api/v1/notes/my-notes/:id  | Update My Single Note by ID  |
| DELETE | /api/v1/notes/my-notes/:id  | Remove My Single Note by ID  |

## ✅ Best Practices  
- Strict input validation using class-validator    
- Modular code structure for scalability    
- Clear documentation for endpoints  
- Semantic versioning support  

---

**Developed as a foundational project for learning REST API development with Node.js and NestJS.**
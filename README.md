# User Management System with Webhook Integration

## Overview
This project is a **User Management System** with a **WhatsApp-like Webhook Integration**, built using **NestJS, Firestore, and TypeScript**. It follows best practices for modularity, clean code, and efficient algorithms while ensuring robust API security and scalability.

## Features
- **User Management:** CRUD operations for users with REST and GraphQL APIs.
- **Webhook Integration:** Securely processes incoming messages and replies automatically.
- **Firestore Database:** Utilizes Firebase Firestore for real-time data storage and retrieval.
- **Rate Limiting:** Restricts excessive webhook requests per phone number.
- **Real-time Updates:** Uses Firestore onSnapshot() for automatic updates.
- **Input Validation & Error Handling:** Ensures data integrity and security.
- **Testing:** Unit and end-to-end tests for critical functionalities.

## Project Structure
```
.
├── LICENSE
├── README.md
└── backend
    ├── eslint.config.mjs
    ├── nest-cli.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   ├── main.ts
    │   ├── firestore
    │   │   └── firestore.module.ts
    │   ├── users
    │   │   ├── dto
    │   │   │   ├── create-user.dto.ts
    │   │   │   └── update-user.dto.ts
    │   │   ├── entities
    │   │   │   └── user.entity.ts
    │   │   ├── users.controller.ts
    │   │   ├── users.module.ts
    │   │   ├── users.resolver.ts
    │   │   └── users.service.ts
    │   ├── webhook
    │   │   ├── dto
    │   │   │   └── webhook-message.dto.ts
    │   │   ├── entities
    │   │   │   └── message.entity.ts
    │   │   ├── rate-limiter.service.ts
    │   │   ├── webhook.controller.ts
    │   │   ├── webhook.module.ts
    │   │   └── webhook.service.ts
    ├── test
    │   ├── app.e2e-spec.ts
    │   ├── jest-e2e.json
    │   └── webhook.e2e-spec.ts
    ├── tsconfig.build.json
    └── tsconfig.json
```

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (>= 16.x)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [NestJS CLI](https://docs.nestjs.com/)

### Clone the Repository
```sh
git clone https://github.com/benjaminmweribaya/user-management-system.git
cd user-management-system/backend
```

### Install Dependencies
```sh
npm install
```

### Set Up Firebase Firestore
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firestore in "Native Mode".
3. Generate a Firebase service account key (`firebase-adminsdk.json`).
4. Place it in the root directory of the backend.

### Configure Environment Variables
Create a `.env` file in the `backend` directory:
```
FIREBASE_CREDENTIALS=./firebase-adminsdk.json
SECRET_TOKEN=your-secure-token
PORT=3000
```

### Run the Application
```sh
npm run start
```

The backend will be available at `http://localhost:3000/`.

## API Endpoints

### User Management (REST API)
- **POST /users** - Create a user
- **GET /users** - Fetch users with pagination
- **GET /users/{id}** - Fetch a single user
- **PATCH /users/{id}** - Update user details (email immutable)

### User Management (GraphQL API)
- **Query:** `users { id, name, email, phone }`

### Webhook Integration
- **POST /webhook** - Process incoming messages
  - `{ "message": "Hello", "phone": "+1234567890" }`
  - If message contains "help", replies: `{ "reply": "Support contact: support@company.com" }`

## Testing
Run unit and end-to-end tests:
```sh
npm run test
npm run test:e2e
```

## Design Considerations
- **Modular NestJS Architecture** - Ensures maintainability and scalability.
- **Firestore Cursors for Pagination** - Efficiently handles large datasets.
- **Rate Limiting for Webhooks** - Prevents spam and abuse.
- **Global Exception Handling** - Improves error reporting.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
- **Name:**-Benjamin Mweri Baya
- **Email:**-benjaminbaya@example.com

---

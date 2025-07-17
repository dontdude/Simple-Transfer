# Simple Transfer Application

This project is a frontend web application for demonstrating internal financial account transfers. It allows users to create accounts, view balances, and transfer funds between them.

The application is built with React, andd TypeScript, focusing on a clean user experience, modern development practices, and maintainability.

***

## Features

*   **Create Accounts:** Users can create new accounts with a unique ID and an initial balance.
*   **View Balance:** Check the current balance of any existing account.
*   **Transfer Funds:** Initiate fund transfers between two accounts.

## Technical Stack & Decisions

**Framework:**  
React (via Vite) – Lightweight, modular, and developer-friendly setup for rapid development.

**Language:**  
TypeScript – Ensures type safety, developer tooling, and long-term maintainability.

**Styling:**  
CSS Modules + Global CSS Variables – Combines component-scoped styles with a consistent global design system.

**State Management:**  
- **Zustand** – Lightweight global store to persist shared data like the active account ID.
- **React useState & Custom Hooks** – Used for form states, input handling, and API call logic within individual components.

**Routing:**  
React Router v6 – Enables clean SPA-style navigation with dynamic route management.

**API Integration:**  
Axios – Abstracted into `axiosInstance.ts` and reusable `transferService.ts` for centralized, type-safe API calls.

**Notifications:**  
React Hot Toast – Offers customizable toast messages for success and error feedback. Wrapped in a `notifications/Toast.tsx` provider for global access.

**Component Design Philosophy:**  
- **`components/`** – Pure, reusable UI elements like `<Button />`, `<Input />`, `<Card />`, and `<Spinner />`.
- **`features/`** – Each route encapsulates business logic, styles, and any local components specific to that feature (e.g., `useCreateAccountForm.ts`).
- **`layout/`** – Controls page structure and navigation via components like `<AppLayout />` and `<Navbar />`.
- **`providers/`** – Logical boundary wrappers like `RequireAccount.tsx` for route-level access control and `Toast.tsx` for global feedback.
- **`hooks/`** – Reusable logic extracted as React hooks, such as `useToast.ts`.
- **`types/`** – All TypeScript type declarations for API payloads and global store logic.
- **`store/`** – Zustand store setup and related types.

This layered structure enforces a clear separation of concerns, increases reusability, and ensures long-term scalability and maintainability.

## 📌 Assumptions

- Users simulate login by creating or entering an existing account ID (stored in global state).
- Backend is always available at `http://localhost:8860`.
- Currency formatting and precision are handled by the backend.
- No authentication or authorization is required.
- Account IDs must be positive numbers.
- State is not persisted between sessions (by design).


## Getting Started

### Prerequisites

*   Node.js (v18 or later)
*   npm or yarn

### Setup and Running the Application

1.  **Start the Backend Server:**
    Start the backend server on port 8860: `http://localhost:8860`

2.  **Install Frontend Dependencies:**
    Clone the repository and navigate into the project directory. Then, install the necessary dependencies.
    ```bash
    git clone https://github.com/dontdude/Simple-Transfer.git
    cd Simple-Transfer
    npm install
    ```

3.  **Run the Frontend Application:**
    Once dependencies are installed, start the development server.
    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

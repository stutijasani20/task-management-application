# Task Management Application

A modern, full-featured task management application built with Next.js, React, Redux Toolkit, and Material-UI. This application demonstrates both server-side rendering (SSR) and client-side rendering (CSR) approaches for managing tasks efficiently.

## 🚀 Features

- **Dual Rendering Modes**: Experience both server-side and client-side rendering
  - `/` - Server-side rendered task list
  - `/tasks` - Client-side rendered task list with Redux state management
- **Complete Task Management**: Create, read, update, and delete tasks
- **Task Filtering & Search**: Filter tasks by status and search by name
- **Priority Levels**: Organize tasks with low, medium, and high priority levels
- **Due Date Tracking**: Set and track task due dates
- **Persistent Storage**: Tasks persist using Redux Persist
- **Responsive Design**: Mobile-friendly interface built with Material-UI and Tailwind CSS
- **Form Validation**: Robust form handling with React Hook Form
- **RESTful API**: Built-in API routes for task operations

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (Pages Router)
- **UI Library**: [React 19](https://react.dev/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **UI Components**: [Material-UI (MUI) v7](https://mui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Date Handling**: [Day.js](https://day.js.org/)
- **Icons**: [Material Icons](https://mui.com/material-ui/material-icons/)

### Backend
- **API Routes**: Next.js API Routes
- **Data Storage**: Redux Persist (localStorage)

### Development
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Linting**: ESLint
- **Compiler**: React Compiler (Babel plugin)

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun package manager

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd task_management
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
```

### Production

Start the production server:

```bash
npm start
# or
yarn start
```

## 📁 Project Structure

```
task_management/
├── src/
│   ├── components/          # React components
│   │   ├── Navigation.tsx   # Navigation bar component
│   │   ├── SearchFilter.tsx # Search and filter component
│   │   ├── TaskForm.tsx     # Task creation/edit form
│   │   ├── TaskItem.tsx     # Individual task item
│   │   ├── TaskList.tsx     # Task list container
│   │   └── index.ts         # Component exports
│   ├── pages/
│   │   ├── api/
│   │   │   └── tasks/       # API routes for task operations
│   │   │       ├── index.ts # GET (all tasks), POST (create task)
│   │   │       └── [id].ts  # GET, PUT, DELETE (single task)
│   │   ├── _app.tsx         # App wrapper with Redux Provider
│   │   ├── index.tsx        # Home page (SSR)
│   │   └── tasks.tsx        # Tasks page (CSR)
│   ├── types/
│   │   ├── task.ts          # Task type definitions
│   │   └── index.ts         # Type exports
│   └── utils/
│       ├── mockData.ts      # Mock task data
│       └── index.ts         # Utility exports
├── store/
│   ├── index.ts             # Redux store configuration
│   └── slices/
│       └── taskSlice.ts     # Task slice with async thunks
├── styles/
│   └── globals.css          # Global styles and Tailwind imports
├── public/                  # Static assets
└── package.json             # Project dependencies
```

## 🎯 Usage

### Creating a Task

1. Navigate to either the home page or tasks page
2. Click the "Add Task" button (+ icon)
3. Fill in the task details:
   - Task Name (required)
   - Description (required)
   - Priority (Low/Medium/High)
   - Due Date
4. Click "Create Task"

### Editing a Task

1. Click the edit icon on any task
2. Modify the task details in the form
3. Click "Update Task"

### Deleting a Task

1. Click the delete icon on any task
2. Confirm the deletion

### Filtering Tasks

- Use the dropdown to filter tasks by status:
  - All Tasks
  - Active Tasks
  - Completed Tasks
- Use the search bar to find tasks by name

### Marking Tasks as Complete

- Click the checkbox on any task to toggle its completion status

## 🔌 API Endpoints

### Tasks

- `GET /api/tasks` - Retrieve all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/[id]` - Retrieve a specific task
- `PUT /api/tasks/[id]` - Update a specific task
- `DELETE /api/tasks/[id]` - Delete a specific task

## 🎨 Customization

### Styling

The application uses a combination of Tailwind CSS and Material-UI. You can customize:

- **Tailwind**: Modify `styles/globals.css` for global styles
- **MUI Theme**: Customize the theme in `src/pages/_app.tsx`

### Mock Data

Initial mock tasks are defined in `src/utils/mockData.ts`. You can modify this file to change the default tasks.

## 🧪 Key Features Explained

### Server-Side Rendering (SSR)
The home page (`/`) uses `getServerSideProps` to fetch tasks on the server before rendering, providing better SEO and initial load performance.

### Client-Side Rendering (CSR)
The tasks page (`/tasks`) fetches data on the client using Redux Toolkit's async thunks, demonstrating a SPA-like experience.

### Redux Persist
Tasks are automatically saved to localStorage and restored on page reload, ensuring data persistence across sessions.

# Todo Frontend Application

A Next.js 16+ frontend for a multi-user todo application with TypeScript, featuring responsive UI components, API integration for backend communication, and JWT-based authentication.

## Features

- **Task Management**: Create, read, update, and delete tasks
- **User Authentication**: JWT-based authentication system
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Type Safety**: Built with TypeScript for enhanced development experience
- **Modern UI**: Clean, intuitive interface using Tailwind CSS

## Tech Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Client**: Axios with interceptors
- **UI Components**: Custom-built reusable components
- **State Management**: React hooks with custom hooks
- **Testing**: Jest, React Testing Library

## Prerequisites

- Node.js 18+
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-key
   ```

## Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To run the production build locally:

```bash
npm run start
# or
yarn start
```

## Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout with navbar and footer
│   ├── page.tsx            # Home page
│   ├── login/              # Login page
│   ├── dashboard/          # Dashboard page
│   └── tasks/              # Tasks page
├── components/             # Reusable UI components
│   ├── ui/                 # Base UI components (Button, Input, etc.)
│   ├── TaskCard.tsx        # Task display component
│   ├── TaskForm.tsx        # Task creation/editing form
│   ├── TaskList.tsx        # Task list container
│   ├── Navbar.tsx          # Navigation component
│   └── ProtectedRoute.tsx  # Authentication wrapper
├── hooks/                  # Custom React hooks
│   ├── useAuth.ts          # Authentication state management
│   ├── useTasks.ts         # Task data management
│   └── useApi.ts           # Generic API hook
├── services/               # API and business logic
│   ├── api.ts              # API client with JWT handling
│   ├── auth.ts             # Authentication service
│   └── tasks.ts            # Task-specific API service
├── types/                  # TypeScript type definitions
│   ├── index.ts            # Common types
│   └── task.ts             # Task-specific types
├── utils/                  # Utility functions
│   ├── constants.ts        # Application constants
│   ├── helpers.ts          # Helper functions
│   └── validators.ts       # Input validation functions
├── public/                 # Static assets
├── styles/                 # Global styles
├── .env                    # Environment variables
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

## API Integration

The application communicates with the backend API for all data operations. All API requests include JWT tokens in the Authorization header for authentication. The API endpoints follow RESTful conventions:

- `GET /api/{user_id}/tasks` - Retrieve user's tasks
- `POST /api/{user_id}/tasks` - Create a new task
- `PUT /api/{user_id}/tasks/{id}` - Update a task
- `DELETE /api/{user_id}/tasks/{id}` - Delete a task
- `PATCH /api/{user_id}/tasks/{id}/complete` - Toggle task completion status

## Authentication

The application uses JWT-based authentication. User tokens are stored in localStorage and automatically included in API requests. The `useAuth` hook manages authentication state and provides login/logout functionality.

## Testing

To run the test suite:

```bash
npm test
# or
yarn test
```

For watch mode:

```bash
npm run test:watch
# or
yarn test:watch
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL`: Base URL for the backend API
- `NEXT_PUBLIC_JWT_SECRET`: Secret key for JWT token validation (should match backend)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
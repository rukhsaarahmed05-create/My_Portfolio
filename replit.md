# Portfolio Web Application

## Overview

This is a full-stack web application built as a machine learning engineer's portfolio website. The application showcases projects, blog posts, skills, and provides a contact form. It features a modern tech stack with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM for type-safe database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system and dark mode support
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for CRUD operations
- **Middleware**: Custom logging, JSON parsing, and error handling
- **Development Setup**: Hot module replacement with Vite integration

### Database Architecture
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definition with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema management

## Key Components

### Data Models
- **Projects**: Portfolio projects with categories, technologies, and links
- **Blog Posts**: Technical articles with search functionality and publishing status
- **Skills**: Technical skills organized by categories with visual icons
- **Contacts**: User inquiries submitted through contact form

### API Endpoints
- `GET /api/projects` - List projects with optional category filtering
- `GET /api/projects/:id` - Get specific project details
- `GET /api/blog-posts` - List blog posts with search and publishing filters
- `GET /api/blog-posts/:id` - Get specific blog post
- `GET /api/blog-posts/slug/:slug` - Get blog post by slug
- `GET /api/skills` - List all technical skills
- `POST /api/contact` - Submit contact form

### UI Sections
- **Hero Section**: Introduction with call-to-action buttons
- **Skills Section**: Visual display of technical expertise
- **Projects Section**: Filterable portfolio showcase
- **Blog Section**: Searchable articles with category filtering
- **About Section**: Professional background and experience
- **Contact Section**: Contact form with validation

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express routes handle requests and interact with storage layer
3. **Data Storage**: Drizzle ORM provides type-safe database operations with PostgreSQL
4. **Response Handling**: API responses are cached and managed by React Query
5. **UI Updates**: Components reactively update based on data state changes

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first styling framework
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Component variant management

### Data Management
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form handling with validation
- **Zod**: Runtime type validation and schema definition
- **Drizzle ORM**: Type-safe database operations

### Development Tools
- **Vite**: Build tool with HMR and optimization
- **TypeScript**: Type safety across the entire stack
- **ESBuild**: Fast JavaScript bundling for production

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations ensure schema consistency

### Environment Configuration
- **Development**: Vite dev server with Express API integration
- **Production**: Express serves static files and API endpoints
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Scripts
- `npm run dev`: Start development server with hot reloading
- `npm run build`: Build both frontend and backend for production
- `npm run start`: Start production server
- `npm run db:push`: Apply database schema changes

The application is designed as a modern, performant portfolio website with a focus on showcasing machine learning and computer vision projects. The architecture supports easy content management, SEO-friendly blog posts, and a responsive design that works across all devices.
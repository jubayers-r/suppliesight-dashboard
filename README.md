# SupplySight Dashboard

A modern supply chain management dashboard built with React and GraphQL, providing real-time inventory tracking, demand forecasting, and warehouse management capabilities.

![SupplySight Dashboard](https://img.shields.io/badge/Status-Production%20Ready-brightgreen) ![React](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white) ![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-purple)

## 🚀 Features

- **Real-time Inventory Tracking** - Monitor stock levels across multiple warehouses
- **Demand Analytics** - Visual charts showing stock vs demand trends over time
- **Smart Filtering** - Search and filter products by warehouse, status, or keywords
- **Stock Management** - Transfer inventory between warehouses with validation
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Performance Optimized** - Debounced search, optimistic updates, and efficient state management

## 🏗️ Architecture

This is a **monorepo** containing both frontend and backend applications:

```
suppliesight-dashboard/
├── client/          # React frontend (Vite + React)
├── server/          # GraphQL API (Node.js + Apollo Server)
├── package.json     # Root workspace configuration
├── pnpm-workspace.yaml
├── README.md        # Detailed description and instructions to run the app locally
└── NOTES.md         # Decisions, Trade-offs, and Improve points.
```

### Tech Stack

**Frontend**

- React 19
- Vite for build tooling
- Tailwind CSS + shadcn/ui components
- Recharts for data visualization
- Apollo Client for GraphQL

**Backend**

- Node.js with Express
- Apollo Server for GraphQL API
- In-memory data store (production would use PostgreSQL/MongoDB)

## 📋 Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

## 🛠️ Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/jubayers-r/suppliesight-dashboard
   cd suppliesight-dashboard
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development servers**

   ```bash
   pnpm dev
   ```

   This starts both client (http://localhost:5173) and server (http://localhost:8000) concurrently.

4. **Access the application**
   - Frontend: http://localhost:5173
   - GraphQL Playground: http://localhost:8000/graphql

## 📱 Usage

### Dashboard Overview

- View key metrics: Total Stock, Total Demand, and Fill Rate
- Analyze trends with interactive stock vs demand charts
- Filter data by time range (7d, 14d, 30d)

### Product Management

- Search products by name, SKU, or ID
- Filter by warehouse location and stock status
- Click any product row to open detailed management panel

### Inventory Operations

- **Update Demand**: Modify forecasted demand values
- **Transfer Stock**: Move inventory between warehouses with validation
- Real-time status indicators (Healthy, Low, Critical)

## 🏭 Production Considerations

This demo uses in-memory data storage. For production deployment:

- Replace mock data with proper database (PostgreSQL/MongoDB)
- Add authentication and role-based access control
- Implement proper error handling and logging
- Add data persistence and backup strategies
- Set up monitoring and alerting
- Configure environment-specific settings

## 🔧 Development Scripts

```bash
# Start both client and server in development mode
pnpm dev

# Install dependencies for specific workspace
pnpm --filter client install <package>
pnpm --filter server install <package>

# Run commands in specific workspace
pnpm --filter client build
pnpm --filter server start
```

## 🧪 API Documentation

The GraphQL API provides the following operations:

**Queries**

- `products(search, status, warehouse)` - Get filtered product list
- `warehouses` - Get all warehouse locations
- `kpis(range)` - Get stock/demand trends for time period

**Mutations**

- `updateDemand(id, demand)` - Update product demand forecast
- `transferStock(id, from, to, qty)` - Transfer stock between warehouses

## 🚀 Deployment

The application is designed for easy deployment:

**Client**: Deploy to Vercel, Netlify, or any static hosting
**Server**: Deploy to Railway, Heroku, or containerized environments


## 📄 License

This project is part of a technical assessment and is not intended for commercial use.

---

**Built with ❤️ for efficient supply chain management**

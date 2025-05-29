# Time Manager

A modern, responsive web application for managing tasks and combating procrastination. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎯 Task Management with Priority Levels
- ⏱️ Pomodoro Timer with Multiple Durations
- 📱 Mobile-First Responsive Design
- 🏠 Work Location Tracking (Home/Office)
- 📊 Daily Task Completion Tracking
- 🔄 Task Breakdown Suggestions
- 💾 Local Storage Persistence
- 🐳 Docker Support

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Docker
- Nginx

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## Getting Started

### Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd time-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Docker Deployment

1. Build and run using Docker Compose:

   ```bash
   docker-compose up -d
   ```

2. Access the application at [http://localhost](http://localhost)

### Environment Variables

The following environment variables can be configured:

- `TIME_MANAGER_PORT`: Port for the application (default: 80)

## Project Structure

```
time-manager/
├── src/                    # Source files
│   ├── App.tsx            # Main application component
│   └── ...
├── public/                # Static assets
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose configuration
├── nginx.conf           # Nginx configuration
└── ...
```

## Features in Detail

### Task Management

- Add tasks with estimated completion time
- Set priority levels (High, Medium, Low)
- Mark tasks as complete
- Delete tasks
- Break down complex tasks

### Pomodoro Timer

- Quick 5-minute start
- Standard 25-minute Pomodoro
- 15-minute quick win
- Visual timer display
- Break reminders

### Work Location

- Toggle between Home and Office
- Location-specific task organization
- Persistent location preference

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Docker Commands

```bash
# Build the image
docker build -t time-manager .

# Run the container
docker run -p 80:80 time-manager

# Using Docker Compose
docker-compose up -d
docker-compose down
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

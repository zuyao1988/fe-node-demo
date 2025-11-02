# --- Stage 1: Build the Vite Frontend Assets ---
FROM node:20 AS build_stage
WORKDIR /app

# 1. Install Node.js dependencies for the root and frontend
# Copy ALL package files first
COPY package.json package-lock.json ./
COPY frontend/package.json frontend/package-lock.json ./frontend/

# Install root dependencies
RUN npm ci

# Install frontend dependencies
RUN cd frontend && npm ci

# 2. Copy the entire source code (necessary for the Vite build)
COPY . .

# 3. Build the Vite application from the 'frontend' directory
# This runs the 'build' script defined in 'frontend/package.json'
RUN cd frontend && npm run build


# --- Stage 2: Final Production Image (Node.js API + Static Assets) ---
FROM node:20-slim
WORKDIR /app

# 1. Copy ONLY the production dependencies for the root Node.js API
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 2. Copy the Node.js server files
# Ensure your main server file is here (e.g., index.js, server.js)
COPY utils/ ./utils/
COPY routes/ ./routes/
COPY server.mjs ./

# 3. Copy the built static assets from the build stage
# The built files are in /app/frontend/dist from the first stage.
# We copy them to a 'public' folder in the final image's root.
COPY --from=build_stage /app/frontend/dist ./public 

# 4. Set environment variable for Cloud Run
ENV PORT 3000
EXPOSE 3000

# 5. Command to run the Node.js server
CMD ["npm", "start"]
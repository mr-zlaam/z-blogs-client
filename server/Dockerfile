# Use the official Node.js image.
FROM node:20

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json (if present).
COPY package.json package-lock.json ./

# Install production dependencies.
RUN npm install 
# --production

# Copy the rest of the project files.
COPY . .

# Run build process to compile TypeScript and copy necessary files.
RUN npx prisma generate

RUN npm run compile

# Expose the port the app runs on.
EXPOSE 8000

# Start the application.
CMD [ "node", "dist/server.js" ]

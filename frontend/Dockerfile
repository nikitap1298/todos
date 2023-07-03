# Use the official Node.js 14 image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . . 

# Build the React app for production
RUN npm run build

# Expose the port on which your React app runs (e.g., 3000)
EXPOSE 3000

# Start the React app
CMD [ "npm", "start" ]

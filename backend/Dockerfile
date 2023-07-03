# Use the official Node.js 14 image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /backend

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port on which your Nest.js application runs (e.g., 3000)
EXPOSE 8000

# Start the backend server
CMD [ "npm", "run", "dev" ]

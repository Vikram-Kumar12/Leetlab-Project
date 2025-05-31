# Existing content
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

# Add this line if nodemon is a devDependency
# RUN npm install -g nodemon

COPY . .
RUN npx prisma generate
CMD ["npm", "run", "dev"]

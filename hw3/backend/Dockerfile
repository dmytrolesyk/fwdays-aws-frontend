# Use AWS ECR Public mirror to avoid Docker Hub rate limits
FROM public.ecr.aws/docker/library/node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


EXPOSE 8000


CMD ["node", "dist/index.js"]

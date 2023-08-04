
FROM node:14


WORKDIR /bostaApi


COPY package*.json ./

RUN if ["$NODE_ENV" = "production"];\
  then npm install --only=production;\
  else npm install;\
  fi


COPY . .

EXPOSE 4000

 
CMD ["npm", "start"]

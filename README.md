<h1 align="center">
<br>
  <img src="https://github.com/Marcelo8173/GoBarber-frontEnd/blob/master/src/assets/Captura%20de%20tela%20de%202020-06-05%2022-29-20.png" alt="YOUR_PROJECT_NAME" width="250">
<br>
<br>
GoBarber - Back-end
</h1>

<p align="center">Beauty service scheduling</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<hr />

## Features
[//]: # (Add the features of your project here:)
This app features all the latest tools and practices in web development

- **Node Js**  — A JavaScript library for building API Rest
- **Docker - Postgres, mongoDB and redis**

## Getting started

- Clone this repository
- Use yarn or npm init to install dependencies

- This project use container's docker to database. If you haven't installed it, just follow the tutorial at `https://www.docker.com/`
- Use `docker run --name gobarber_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres` to up the contairner with postgress.
- Use `docker run --name mongodb-goberber -p 27017:27017 -d -t mongom` to up the container wiht mongoDB
- User `docker run --name redisbarber -p 6379:6379 -d -t redis:alpine` to up the container wiht redis

- If you already have other docker containers, you will need to redirect the ports.

## Routes

- `GET - localhost:3333/sessions` - to start a session. You need an email and password already registered <br/><br/>
  `{ `<br/>`
    "email": ,`<br/>`
    "password": `<br/>`
    }`
 
- `GET - localhost:3333/users` - to create a new user <br/><br/>
  `{ `<br/>`
    "name": ,`<br/>`
    "email": ,`<br/>`
    "password": `<br/>`
    }`
    
- `PUT - localhost:3333/profile` - to update profile. Password is optional <br/><br/>
    `{ `<br/>`
    "name": ,`<br/>`
    "email": ,`<br/>`
    "password"?: `<br/>`
    }`
    
- `GET - localhost:3333/profile` - show profiles
- `PATCH -   localhost:3333/users/avatar` - to update avatar <br/><br/>
  `Multipart `<br/>`
  avatar: ` 
  
- `POST - localhost:3333/password/reset` - to reset password <br/><br/>
    `{ `<br/>`
    "password": ,`<br/>`
    "password_confirmation": ,`<br/>`
    "token": `<br/>`
    }`
    
- `POST - localhost:3333/password/forgot` - to send e-mail to reset password. In development environment emails appear in the application log <br/><br/>
    `{ `<br/>`
    "email": ,`<br/>`
    }`
  
- `POST - localhost:3333/appoitments` - to create a new appointments <br/><br/>
  `{ `<br/>`
    "provider_id": ,`<br/>`
    "date": "2020-06-12 14:00:00"`<br/>`
    }`
  
- `GET - /providers/id:/day-availability` - to get an days available
- `GET - /providers/id:/month-availability` - to get an month available
- `GET - /appoitments/me` - To list all the schedules of a provider
- `GET - /providers` - To list all providers

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.

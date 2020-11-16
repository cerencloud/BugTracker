# Bug Tracker API

## Table of contents

- [About Project](#about-project)
- [Setup](#setup)
- [Technologies](#technologies)
- [Usage](#usage)
- [Changelog](#changelog)
- [Roadmap](#roadmap)
- [Author Info](#author-info)

## About Project

It is an application to follow up issues for each project by users. the application contains a number of users who can add some projects and add issues to projects with attachment comment inspired by [Trello](https://trello.com/)

## Setup

- git clone git@github.com:rwieruch/node-express-server-rest-api.git
- cd node-express-server-rest-api
- npm install
- npm start

## Technologies

- Node.js
- Express.js
- MongoDB
- RESTful API

## Usage

You can Visit at Link: http://localhost:3000/ <br /><br />

The end points shown as:-

- User routes

  - Get all users `GET /users/`
  - Get user by id `GET /users/:id`
  - Add user `POST /users/`

- Project routes
  - Get all projects `GET /projects/`
  - Get project by id `GET /projects/:id`
  - Add project `POST /projects/`
- Issue routes
  - Get all issues `GET /issues/`
  - Get issue by id `GET /issues/:id`
  - Add issue `POST /issues/`
  - Modify status of issue `PATCH /issues/:id`
  - Get comments related with issue `GET /issues/:id/comments`
  - Get comment by commentid related with issue `GET /issues/:id/comments/:commentId`
  - Add comment to issue `POST /issues/:id/comments`

## Changelog

- Validation.
- Error Handling.
- Initial Frontend.

## Roadmap

The home of the roadmap for the Bug Tracker API. The purpose of this repository is to discuss and map out high level goals as well as provide insight into upcoming releases and planning. These high level goals are then broken down to invidual issues in the appropriate repository once planned for a release.

## Author Info

Created by Ceren Duran <br />
Email: ceren_duran@hotmail.com

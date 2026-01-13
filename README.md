# Kakī Tracker
A web application to log, track and visualise kakī data.

## Description
This is a simple application that allows the users to track information about Kakī sightings, pairing and releases. The application will also provide ability to visualise the data on a map. The data in this repo is completely fake due to the sensitivity of the species. The aim of this project is to provide a cheap and alternative method to spreadsheets to tracking and potentially visualise bird data.  

## Setup

### Installation

#### **From the Github UI**

See the instructions [here](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template) to use Github's feature to create a new repo from a template.

```
git clone [your-project-ssh-address]
cd [your-project-name]
npm install # to install dependencies
npm run knex migrate:latest
npm run knex seed:run
npm run dev # to start the dev server
```

You can find the server running on [http://localhost:3000](http://localhost:3000) and the client running on [http://localhost:5173](http://localhost:5173).


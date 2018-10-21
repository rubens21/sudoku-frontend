# Sudoku - Frontend

Welcome to Sudoku Frontend (yup, no creative names so far).

## Description

This project is a Single Page Application (SPA) that works with the **Sudoku - Backend** project
to display a Sudoku solved board.

## Installing and running

### Pre-requisites

* [NodeJs](https://nodejs.org/en/download/) >= v8.*
* [npm](https://www.npmjs.com/get-npm) >= 6.*
* [nginx](https://docs.nginx.com/nginx/admin-guide/installing-nginx/installing-nginx-open-source/#installing-a-prebuilt-ubuntu-package-from-an-ubuntu-repository) >= 1.10.*
* Sudoku backend

### Set up Nginx

Nginx will work as a reverse proxy to mount front and back ends as a single application.

Create a new site configuration:
```bash
$ sudo vi /etc/nginx/sites-available/sudoku
```

Use this configuration for the new site:
```
server {
    listen 80;
    server_name localhost;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
     }

     location /sudoku/ {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
     }

}
```

Check the sintaxe and reload Nginx
```bash
$ sudo nginx -t
$ sudo /etc/init.d/nginx reload
```

### Building and running
Download the project (or clone it), and run the build command in the project directory:

```bash
$ npm run build
```
### Running

If you want to run the application skipping the test and build steps, use the command:

```bash
$ npm start
```

## Usage
Open [http://localhost](http://localhost).
# Groupomania

Hello,
this is project made to provide a social media service for groupomania employees.
It is composed of both frontend and backend which you will need to install after downloading this.
It also uses a mysql database.
Instructions below.

## Project setup
```
-First, you must create a database to use for the project.
You can do it through a terminal by logging in to your mysql account with "mysql -u root -p", and 
then entering your password.
Create a database with "create database groupomania;"
Then exit the mysql interface with "exit;" and copy the database file into your database with 
"mysql -u root -p groupomania < c:/filepath-here/db.sql" and then entering your password.
-Now, navigate to the backend folder with a terminal and run: "npm install" to install the dependencies.
You must rename the ".env-copy" file to ".env" and insert your mysql username and password in the DEV_USER 
and DEV_PASS fields within the file. This is also where you can set the name of the database 
if you chose a different name.
Afterwards, run "nodemon server" (or "node server" if without nodemon), this will launch the api.
-Finally, navigate to the frontend folder with another terminal and run "npm install" to 
install the frontend dependencies, then run "npm run serve" to launch 
the website (locally).

And there you are, it's done.
```

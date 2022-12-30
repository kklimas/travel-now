# Server

## Technologies
Used technologies:

        - Node JS: 16.18.1
        - bcrypt: ^5.1.0 - password encryption
        - body-parser: ^1.20.1
        - cors: ^2.8.5
        - express: ^4.18.2
        - jsonwebtoken: ^8.5.1 - jwt logic implementation
        - mongoose: ^6.8.0 - connection with mongodb
        - winston: ^3.8.2 - backend logger

## Database setup
Every noncommercial mongo db has its own white-listed ip addresses 
that can be connected to database. Therefore, if you want to run app on
your local machine you have to connect backend to your own db.

To do so open `.env` file and replace username and password with yours.
```
DATABASE_USERNAME=username
DATABASE_PASSWORD=password
```




# Auth-Server
## Launch your personal auth server 

In this repository you'll find your personal auth server and the instructions for make it up and running in no time.

## Needed software
### MySQL 
This has to be installed in host machine or another machine, just change the address into the "properties.ini file.
At the moment there ins't a specific version to be installed. 
You can also use directly the [mysql docker](https://hub.docker.com/_/mysql/) container.

### NodeJS
This has to be installed directly in host machine.

## Install the server
After the MySQL and NodeJS installation and configuration, you have to update the [properties file](resources/properties.ini) as follow:

tag | property | description
---------|----------|---------
general | port | Port on which the auth server will run
general | username | Main user 
general | password | Main user password
token | secret | Secret phrase to generate JWT token
token | ttl | Session time to insert into JWT token
database | host | Database host (host:port)
database | user | Database user
database | password | Database user password
database | name | Name of the database
database | user.table | Name of the user table
database | grant.table | Name of the grant table

### Start the server
To launch the server use
```
npm start
```

## Miscellaneous
### TODO
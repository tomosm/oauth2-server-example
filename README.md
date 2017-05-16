OAuth2 Server
==========

[OAuth2 Server](https://?/)

## Description
This is the OAuth2 Server.

## Demo

## Requirement
### JavaScript

- [node v7.7.2+](https://nodejs.org/)
- [mongodb](https://docs.mongodb.com/)

## Setup

### On local
#### Install libraries
```npm install```
```git submodule init && git submodule update```

#### Database Migration
```$(npm bin)/babel-node ./db/seeders/system-seed.js```

#### Start dev server to develop
```npm start```
[ローカル環境](http://localhost:3000)

#### Test
```npm test```

### Docker

#### Run container
```docker-compose up```

**Please make sure that your dev path is shared in Docker**

## Licence

## Test
curl -X POST localhost:3000/users --data username=dummy --data password=test

curl --data grant_type=password -X POST localhost:3000/oauth/token --data client_id=system --data client_secret=aR1WnV91 --data username=dummy --data password=test

curl -H "Authorization: Bearer ${token}" localhost:3000

curl --data grant_type=refresh_token -X POST localhost:3000/oauth/token --data client_id=system --data client_secret=aR1WnV91 --data refresh_token=${refresh_token}

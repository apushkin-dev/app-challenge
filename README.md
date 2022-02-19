# app-challenge
Implementation of a client administration application. With this application it should be possible to create new customers. A client is identified by the client ID. It should be able to edit first name, last name, telephone number, email address and postal address (providing street, postal code, city and country).

# Quick Start in Docker

Clone and inside repository run 
```bash
docker build -t app-challenge  .
docker run -p 3010:3000 app-challenge
```

and go to `http://localhost:3010`.

# API documentation

#### Clients list
```
GET /api/clients
```
Returns paginated list of clients. Can be filtered and sorted.
```bash
curl --request GET 'http://localhost:3010/api/clients/?offset=0&limit=100&sort=lastName&firstName=Cairo'
```

#### Get client
```
GET /api/clients/{clientId}
```

```bash
curl --request GET 'http://localhost:3010/api/clients/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Fuller",
    "lastName": "Irwin",
    "phone": "402-6375",
    "email": "volutpat.ornare@duinec.edu",
    "street": "P.O. Box 843, 7801 Vitae, St.",
    "city": "Ahmedabad",
    "postalCode": "16-959",
    "country": "Gibraltar",
    "isActive": false
}'
```

#### Create client
```
POST /api/clients
```

```bash
curl --request POST 'http://localhost:3010/api/clients' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Fuller",
    "lastName": "Irwin",
    "phone": "402-6375",
    "email": "volutpat.ornare@duinec.edu",
    "street": "P.O. Box 843, 7801 Vitae, St.",
    "city": "Ahmedabad",
    "postalCode": "16-959",
    "country": "Gibraltar",
    "isActive": false
}'
```

#### Update client  
```
PUT /api/clients/{clientId}
```

```bash
curl --request PUT 'http://localhost:3010/api/clients/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Fuller",
    "lastName": "Irwin",
    "phone": "402-6375",
    "email": "volutpat.ornare@duinec.edu",
    "street": "P.O. Box 843, 7801 Vitae, St.",
    "city": "Ahmedabad",
    "postalCode": "16-959",
    "country": "Gibraltar",
    "isActive": false
}'
```


#### Client partial update  
```
PATCH /api/clients/{clientId}
```

```bash
curl --request PATCH 'http://localhost:3010/api/clients/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "isActive": true
}'
```

#### Delete client 
```
DELETE /api/clients/{clientId}
```

```bash
curl --request DELETE 'http://localhost:3010/api/clients/2' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Fuller",
    "lastName": "Irwin",
    "phone": "402-6375",
    "email": "volutpat.ornare@duinec.edu",
    "street": "P.O. Box 843, 7801 Vitae, St.",
    "city": "Ahmedabad",
    "postalCode": "16-959",
    "country": "Gibraltar",
    "isActive": false
}'
```


#### Create user endpoint

```
POST /api/users/create
```
The only users feature endpoint to create new users. Basic authorization is used to access endpoint.
There is a test user (username: admin, password: super) that has access.

```bash
curl --request POST 'http://localhost:3000/api/users/create' `
--header 'Authorization: Basic YWRtaW46c3VwZXI=' `
--header 'Content-Type: application/json' `
--data-raw '{
    "username": "new_user",
    "password": "new_user_password",
    "role": "optional",
}'
```

### Frontend browser support
Chrome 45+, Edge 14+, Safari 10.1+


# Contact Manager API

## Description
A contact manager API built on top of Express and MongoDB. This API allows you to create/delete contacts and update/get all or specific contacts.

## Prerequisites
 - NodeJs v.18+

## Usage
### Installation
Clone the repository from your terminal:

    git clone git@github.com:donnyjb06/contact-manager.git


Create .env and provide the following variables | Explanations of each are in `.env.example`

 - `PORT`
 - `CONNECTION_STRING`
 -  `ACCESS_TOKEN_SECRET`


Compile Typescript into Javascript in a seperate terminal:

    npm run build


In a seperate terminal boot up Express server

    npm run dev


### Endpoints
If an endpoint is protected that means you must include the access token provided to you after hitting the /login endpoint.
Access token must be under header's authorization field. For example: authorization: "Bearer `Access Token`"
#### /api/contacts
| Method | Request Requisites | Response | Protected? |
|--|--|--|--|
| GET | N/A | Array of contact objects | Yes |
| POST | refer to Contact schema | Newly created contact object | Yes |

#### /api/contacts/:id
| Method | Request Requisites | Response | Protected? |
|--|--|--|--|
| GET | N/A | Contact with matching ID | Yes |
| PATCH | refer to Contact schema | Contact object after update | Yes |
| DELETE | N/A | Contact object that was deleted | Yes |

#### /api/users/register
| Method | Request Requisites | Response | Protected? |
|--|--|--|--|
| POST | Body must contain username, password, and unique email | Newly created user | No |

#### /api/users/login
| Method | Request Requisites | Response | Protected? |
|--|--|--|--|
| POST | Body must contain email and password | Newly created access token | No |

#### /api/users/current
| Method | Request Requisites | Response | Protected? |
|--|--|--|--|
| GET |  | User object of currently logged in user | Yes |

### Schema
Contact Schema
```
  {
  "_id": {
    "$oid": "64e3f8e1f91f4e8a9a1d0009"
  },
  "user": {
    "$oid": "686b6fe743c879b86343d147"
  },
  "firstName": "Ivy",
  "lastName": "Rodriguez",
  "phoneNumber": "901-234-5678",
  "email": "ivy.rodriguez@example.com",
  "createdAt": {
    "$date": "2025-03-12T08:00:00.000Z"
  },
  "updatedAt": {
    "$date": "2025-03-12T09:20:00.000Z"
  },
  "__v": 0
}
```




	

   

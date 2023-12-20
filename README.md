# Final Project

## INSTALLING & RUNNING
- Make sure you have postgres installed on your machine or you have an online cluster ready.
- After cloning the project, go to ```app.module.ts``` file and replace db information with yours.
- Then run  ```npm run start:dev``` in the root

## Features

### User Api

User api provides basic authorization and authentication features.

#### Registering a user

##### path: ```/user```
##### method: ```POST```

##### Request parameters
|parameter|type| description |
|--------|----| ------ |
| name | string| name |
| email | string| email address|
| password | string | password |
| role | number| user's role, 0 indicated admin and 1 indicates editor |

#### Loging in

##### path: ```/user/login```
##### method: ```POST```

##### Request parameters
|parameter|type| description |
|--------|----| ------ |
| email | string| email address|
| password | string | password |

##### Response
When users login successfuly, two tokens will be returned. **Access token** for all the other api's and **refresh token** for regenerating access token

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDMwOTY4NzQsInVzZXJfaWQiOjMsImlhdCI6MTcwMzA5MzI3NH0.p9khKzlEEalLHS2JqE1z71QTZR_y661TB3vsPaeO4L8",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDMxMDA0NzQsInVzZXJfaWQiOjMsImlhdCI6MTcwMzA5MzI3NH0.4C3wX2hxrGJrqA_apXATkjMogQMAFMC9Ca5B-RFetrI"
}
```

### Factory Api

This api provides endpoints that allow creating, editing, deleting factories with various properties.

<br>

#### Creating a factory

Returns factory information after successful creation.

##### path: ```/factories```
##### method: ```POST```

##### Request parameters
|parameter|type|
|--------|----|
| name | string| 
| subscriptionStart | string (dd:mm:yyyy) | 
| subscriptionEnd | string (dd:mm:yyyy) |
| employeeCount | number |
| isEmployeeFree | boolean |

<br>

#### Getting factory information

Following methods allows you to query factories:

**get all factories**
##### path: ```/factories```
##### method: ```GET```

<br>

**get one factory**
##### path: ```/factories:<id>```
##### method: ```GET```

#### Editing & deleting factory information

Following methods allows you to edit or delete factories:

<br>

**edit a factory**
##### path: ```/factories```
##### method: ```PATCH```

##### Request parameters
|parameter|type|
|--------|----|
| name | string| 
| id | number | 
| subscriptionEnd | string (dd:mm:yyyy) |
| employeeCount | number |
| isEmployeeFree | boolean |

<br>

**delete a factory**
##### path: ```/factories:<id>```
##### method: ```DELETE```

<br>
<br>

### Factory Detail Api

After creating a factory, you can store some detailed information about that one factory. App stores this information on a different db table. When you fetch a factory information, this detail will be included.

#### Creating factory detail

Returns factory detail information after successful creation.

##### path: ```/factorydetail```
##### method: ```POST```

##### Request parameters
|parameter|type|
|--------|----|
| dateRange | string| 
| unit | string | 
| usage | number |
| usageCost | number |
| discountedPrice | number |
|factoryId | number |

#### Editing & deleting factory detail information

Following methods allows you to edit or delete factory details:

**edit a factory**
##### path: ```/factorydetail```
##### method: ```PATCH```

##### Request parameters
|parameter|type|
|--------|----|
| dateRange | string| 
| unit | string | 
| usage | number |
| usageCost | number |
| discountedPrice | number |

<br>

**delete a factory**
##### path: ```/factorydetail:<id>```
##### method: ```DELETE```

<br>

# NOTES

* Token verification works for **FACTORY** and **FACTORY DETAIL** api's. You have to pass your access token to headers before making the requests.
* Factory and factory details use one to many relation
* After running the project, three tables will be created: **user**, **factory**, **details**
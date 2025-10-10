# Login API
Course project

- Backend API for handling user authentication (register, login, logout and token refresh).
- Uses docker for easy deployment
- Remember to update `.env.example` to `.env` and fill in your own secrets.

## Endpoints:
- **GET `/users`** = Verification that endpoint works

- **POST `/users/login`** = Login in existing user and recive both access token (JWT) and a refresh token, example:
```json
{
    "email": "test@email.com",
    "password": "password"
}
```
And then response looks like this:
```json
{
    "accessToken": "<JWT>",
    "refreshToken": "<refresh_token>"
}
```

- **POST `/users`** = Register user like this:
```json
{
    "username": "User",
    "email": "test@email.com",
    "password": "password"
}
```

- **POST `/refresh`** = Refresh your access token:
```json
{
    "token": "<refresh_token>"
}
```
Response:
```json
{
    "accessToken": "<new_JWT>"
}
```


- **DELETE `/refresh`** = Invalidate existing refresh token (log out):
```json
{
    "refreshToken": "<refresh_token>"
}
```

Done by:
Jakob and Morris
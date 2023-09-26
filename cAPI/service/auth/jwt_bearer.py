from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class JWTBearer(HTTPBearer):
    def __init__(self, secret_key: str):
        self.secret_key = secret_key

    async def __call__(
        self, credentials: HTTPAuthorizationCredentials = Depends(
            HTTPAuthorizationCredentials
        ),
    ):
        if credentials.scheme != "Bearer":
            raise HTTPException(
                status_code=403, detail="Invalid authentication scheme"
            )
        if not self.verify_token(credentials.credentials):
            raise HTTPException(
                status_code=403, detail="Invalid or expired token"
            )
        return credentials.credentials

    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            # You can add additional verification checks here
            return True
        except:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid
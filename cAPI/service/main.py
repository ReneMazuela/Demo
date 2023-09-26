import uvicorn
import asyncio
from datetime import datetime, timedelta
from typing import Optional

#FastAPI Imports
from fastapi import (
    FastAPI, 
    Response, 
    HTTPException, 
    Depends
)
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware


#Model.py Imports
from .model import (
    DataQuery,
    QueryRequest,
    Rating, 
    UserSchema,
)


#User Imports
import jwt
from .auth.jwt_bearer import JWTBearer
from passlib.context import CryptContext
from bson import ObjectId
from .auth.jwt_bearer import JWTBearer




app = FastAPI(
    title="Trubeta",
    description="Trubeta Service Documentation.",
    version="0.04",
)
JWT_SECRET_KEY = "a6543c8ffa3ec4551ed1b470028e865448c55cebc1306712"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods=['*'],
    allow_headers=["*"],
)


data_query = DataQuery()



@app.post("/query")
async def query_data(request: QueryRequest):
    input_text = request.input_text
    response, sources = data_query.query(input_text)
    
    return {"response": response, "sources": sources}

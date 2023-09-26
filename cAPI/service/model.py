
from dotenv import load_dotenv
#Pinecone
import pinecone
#FastAPI
from fastapi import Depends
#LangChain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain import OpenAI
from langchain.chains import RetrievalQA
from langchain.vectorstores import Pinecone
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory, ConversationBufferWindowMemory
#MongoDB
import gridfs
import pymongo
from pydantic import BaseModel, EmailStr, Field
import rsa
import base64

from re import S
import os
import pinecone
import openai
from langchain.chains import RetrievalQA
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Pinecone


load_dotenv()
print(os.getcwd())

class QueryRequest(BaseModel):
    input_text: str

    
class QueryData(BaseModel):
    input_text: str
    response: str

class DataQuery:
    def __init__(self):
        self.pine_api_key = os.getenv("PINE_API_KEY")
        self.open_api_key = os.getenv("OPEN_API_KEY")
        self.environment = os.getenv("PINE_ENV")
        self.index_name = "pinecone-tutorial"
        self.model_response = os.getenv("OPENAI_RESPONSE_MODEL")
        self.model_embed = os.getenv("OPENAI_EMBED_MODEL")
        self.text_field = "text"

        os.environ['OPENAI_API_KEY'] = self.open_api_key
        os.environ["PINECONE_API_KEY"] = self.pine_api_key

        pinecone.init(api_key=self.pine_api_key, environment=self.environment)
        index = pinecone.Index(self.index_name)


        embed = OpenAIEmbeddings(
            model=self.model_embed,
            openai_api_key=self.open_api_key,
        )

        self.vectorstore = Pinecone(index, embed.embed_query, self.text_field)

        self.llm = ChatOpenAI(
            temperature=0.5, model_name="gpt-3.5-turbo", max_tokens=512
        )

        self.qa = RetrievalQA.from_chain_type(
            llm=self.llm, chain_type="stuff", retriever=self.vectorstore.as_retriever()
        )

    def query(self, input_text):
        search_results = self.vectorstore.similarity_search(
            input_text, k=5
        )
        print(f"Search Results: {search_results}")

        conversation_result = self.qa.run(input_text)
        response = conversation_result
        print("Conversation Result:", response)
        sources = [result.metadata for result in search_results]
        print("sources:", sources)

        return response, sources


class UserSchema(BaseModel):
    username: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)



class Login(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

class Rating(BaseModel):
    rating: int
    
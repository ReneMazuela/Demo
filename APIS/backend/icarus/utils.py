from re import S
import os
import pinecone
import openai
from langchain.chains import RetrievalQA
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chat_models import ChatOpenAI
from langchain.vectorstores import Pinecone


def data_querying(input_text):
    # Set your API key as an environment variable.
    os.environ['OPENAI_API_KEY'] = "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"
    openai.organization = "org-e2SadeDqPB57jhK0D1geTkDw"

    # Use your API key.
    openai.api_key = os.getenv("OPENAI_API_KEY")
    # Initialize Pinecone
    api_key = "496b3740-7f2b-493a-b72f-40c780a2ed71"
    environment = "us-west4-gcp-free"

    os.environ['PINECONE_API_KEY'] = api_key

    index_name = "pinecone-tutorial"
    pinecone.init(api_key=api_key, environment=environment)
    index = pinecone.Index(index_name)

    model_name = 'text-embedding-ada-002'

    embed = OpenAIEmbeddings(
      model=model_name,
      openai_api_key='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'
    )

    text_field = "text"

    # switch back to normal index for langchain
    index = pinecone.Index(index_name)

    vectorstore = Pinecone(
      index, embed.embed_query, text_field
    )
        # Query the vectorized data


    search_results = vectorstore.similarity_search(
      input_text,  # our search query
      k=5  # return 3 most relevant docs
    )


    llm=ChatOpenAI(temperature=0.5, model_name="gpt-3.5-turbo", max_tokens=512)
    qa = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
    )
    result = qa.run(input_text)
    response = result

    # List the sources of the query
    sources = [result.metadata for result in search_results]


    return response, sources
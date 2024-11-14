from langchain.embeddings import HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA
from langchain.llms import Ollama  
import json
with open("contexto.json", "r") as f:
    datos_json = json.load(f)

from langchain.docstore.document import Document

documentos = [
    Document(page_content=item["description"], metadata={"title": item["title"], "category": item["category"]})
    for item in datos_json
]

embeddings = HuggingFaceEmbeddings()

vectorstore = FAISS.from_documents(documentos, embeddings)

llm = Ollama(model="llama3.2-vision")
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

def responder(mensaje):
    respuesta = qa_chain.run(mensaje)
    return respuesta
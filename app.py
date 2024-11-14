from flask import Flask, request
from flask_cors import CORS
import json
from chatbot import responder
import time

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

sql_path = "./Querys/"

@app.route("/responder")
def Responder():
    inicio = time.time()
    args = request.args
    respuesta = responder(args["mensaje"])
    fin = time.time()
    tiempo_ejec = fin - inicio
    minutos = int(tiempo_ejec // 60)
    segundos = int(tiempo_ejec % 60)
    tiempo_format = f"{minutos}:{segundos}"
    body = {"respuesta": str(respuesta),"tiempo":tiempo_format}
    return json.dumps(body)
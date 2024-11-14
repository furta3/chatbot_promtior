# chatbot Promtior
Chat bot con IA que está cargado con información sobre la empresa Promtior
URL: 

## Detalle de la implementación

### Gen IA
Al no tener acceso a la api de OpenIa porque es una subscripción paga, opté por otra alternativa, en este caso Ollama, lo instalé y ejecuté en mi PC, con el modelo llama3.2-vision al cual le agregué como fuente de datos un archivo JSON, para que funcione con la arquitectura RAG.

### BackEnd
Esta desarrollado en python, con la librería langchain, cargué un archivo json con la información obtenida de la página web de promtior, está información se envía al modelo de IA de Ollama para que brinde respuestas en función de está información externa, utilicé la librería Flask para dejar disponible un endpoint de tipo get que recibe por parametros un mensaje, este mensaje se envia al modelo de IA y retorna la respues, durante esta implementación me contré con algunos problemas, ya que todo esto menos python era nuevo para mi, implementé Ollama localmente y descargue el último modelo que habían lanzado, luego para consumir este modelo y cargarlo con la información del json tuve que instalar otras dependencias que tenian incompatibildiad con la estructura que estaba montando, yo estaba usando python 3.13, y habían librerías incompatibles con esta versión, tuve que instalar python 3.10 para crear un venv en esa versión.

### FrontEnd
Utilizé React con Vite, es un formulario simple, un text input y un botón que detona un fetch con el texto del input y hace la llamada al endpoint en Flask, el cual queda cargando la respuesta, al tener el modelo de IA localmente demora entre 30s y 1m30s en responder, por mientras esto pasa puse en el botón un elemento visual que indica que está cargando, cuando se hace el envio de la inforamcion se va cargando un array con el hisotiral del chat, y cuando el backend retorna el mensaje este tambien se carga en el array, para mostrar en pantalla el historial del chat.

### Deploy
Aquí es donde más me pasó factura la falta de tiempo, primero intenté replicar la infraestructura que tenia en mi pc en un EC2 de AWS, tenía un mínimo de experiencia previa con AWS, empezando por la backend, no pude, haciendo pip install de una librería me dio un error de espacio en el dispotivio, espacio que no puedo modificar porque estaba usando la prueba gratuita de AWS, entonces probe con ngrok para el backend en mi pc, funcionó. Luego en el EC2 de AWS deploye el frontend, lo cual funcionó pero no era HTTPS, tenia sertificados autofirmados, y por esto no puede hacer que se comunicara con el Ngrok en mi pc porque solo admite HTTPS, aqui está el fron en el AWS: https://ec2-3-15-166-234.us-east-2.compute.amazonaws.com/ (esto quedó en el aire, porque lo resolví por otro lado)

Luego intenté tener 2 instancias de Ngrok, una para el backend y otra para el frontend, no se pudo porque el Ngrok gratuito está limitado a una sesión activa a la vez, entonces busque otra forma, y lo que hice fue usar el Ngrok en el frontend, y colocar en la configuración de Vite un proxy, para que las peticiones viajen por la misma url del frontend y cuando llegan al servidor las redirija al puerto donde está el backend. Para cunplir con la fecha de entraga me voy a quedar con está solución.

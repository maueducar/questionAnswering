#!pip install transformers 

# En windows tuve que instalar de la siguiente forma para que me funcione.
# pip install transformers[torch]

#!pip install nltk

#!pip install lxml


from transformers import AutoTokenizer, AutoModelForQuestionAnswering, pipeline

from textwrap import wrap

import requests
from bs4 import BeautifulSoup

import re




"""https://huggingface.co/models
The model was trained on a Tesla P100 GPU and 25GB of RAM with the following command:"""
the_model = input("Ingrese modelo preentrenado a utilizar: ")#'mrm8488/distill-bert-base-spanish-wwm-cased-finetuned-spa-squad2-es'


"""The tokenizer is responsible for all the preprocessing the pretrained model expects, 
and can be called directly on a single string (as in the above examples) or a list. 
It will output a dictionary that you can use in downstream code or simply directly pass 
to your model using the ** argument unpacking operator."""
tokenizer = AutoTokenizer.from_pretrained(the_model, do_lower_case=False)


"""se alimenta al sistema con el modelo preentrenado"""
model = AutoModelForQuestionAnswering.from_pretrained(the_model)


url= input("Ingrese URL de texto a consultar: ") #"https://www.mdzol.com/policiales/2022/3/29/conmocion-un-militar-fusilo-su-esposa-luego-se-suicido-232107.html"


"""Beautiful Soup es una biblioteca de Python para analizar documentos HTML. Esta biblioteca crea un árbol con todos 
los elementos del documento y puede ser utilizado para extraer información. Por lo tanto, esta biblioteca es útil 
para realizar web scraping — extraer información de sitios web
https://j2logo.com/python/web-scraping-con-python-guia-inicio-beautifulsoup/"""
noticia = BeautifulSoup(requests.get(url).content, 'lxml').find_all('p', class_='')

"""https://interactivechaos.com/es/python/function/recompile"""
"""La función re.compile crea un objeto de expresión regular compilando un patrón de expresión regular, 
objeto que puede ser usado como patrón de coincidencias en las funciones re.match, re.search, etc."""
CLEANR = re.compile('<.*?>') 


"""re.sub(pattern, repl, string, count=0, flags=0)
Retorna la cadena obtenida reemplazando las ocurrencias no superpuestas del pattern («patrón») en la string («cadena»)
por el reemplazo de repl."""
contexto=(re.sub(CLEANR, '', str(noticia)))


def pregunta_respuesta(model, contexto, nlp):

  # Imprimir contexto

  print('Contexto:')

  print('-----------------')

  print('\n'.join(wrap(contexto)))

  # Loop preguntas-respuestas:

  continuar = True

  while continuar:

    print('\nPregunta:')

    print('-----------------')

    pregunta = str(input())

    continuar = pregunta!=''

    if continuar:

      salida = nlp({'question':pregunta, 'context':contexto})

      print('\nRespuesta:')

      print('-----------------')

      print(salida['answer'])



nlp = pipeline('question-answering', model=model, tokenizer=tokenizer)

pregunta_respuesta(model, contexto, nlp)


##Comienza el programa, realizar preguntas....###

### si das enter con una pregiunta en blanco, termina el programa#####

###Pruebenlo y ayudenme a mejorarlo####
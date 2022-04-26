from logging import exception
from shutil import ExecError
from flask import Response, request, Blueprint
from flask import render_template
from flask_restful import Api, Resource
from sqlalchemy import true
from .schemas import ModelSchema,SourceSchema
from ..models import Model,Source
from transformers import AutoTokenizer, AutoModelForQuestionAnswering, pipeline
from textwrap import wrap
import requests
from bs4 import BeautifulSoup
import re


models = Blueprint('models', __name__)
model_Schema = ModelSchema()
source_Schema = SourceSchema()
api = Api(models)

class HomePage(Resource):
    def get(self):
        return Response(response=render_template('index.html'), status=200, mimetype="text/html")
class js(Resource):
    def get(self):
        return Response(response=render_template('js.js'), status=200, mimetype="javascript")    

class Questions_(Resource):
    def post(self):
        try:
            #print(request.get_json(force=true))
            data = request.get_json(force=true)
            #print(type(data))
            
            the_model = data['Model']
            tokenizer = AutoTokenizer.from_pretrained(the_model, do_lower_case=False)
            model = AutoModelForQuestionAnswering.from_pretrained(the_model)
            url= data['Url']
            #pip install lxml
            new = BeautifulSoup(requests.get(url).content, 'lxml').find_all('p', class_='')
            CLEANR = re.compile('<.*?>') 
            context=(re.sub(CLEANR, '', str(new)))
            #print(new)
            question = data['Question']
            #print(question)
            nlp = pipeline('question-answering', model=model, tokenizer=tokenizer)
            response=nlp({'question':question, 'context':context})
            #print(response['answer'])            
            return {"response": response, "new": str(new)}
        except Exception as e:
            print(e)
        return ""
    
class ModelResourse(Resource):
    def get(self):        
        try:
            models = Model.get_all()
        except Exception as e:
            print(e)
        result = model_Schema.dump(models, many=True)
        return result    
    def post(self):
        data = request.get_json()
        model_dict = model_Schema.load(data)
        model = Model(Id=model_dict['Id'],
                      Model=model_dict['Model'],
                      Description=model_dict['Description']
        )

        model.save()
        resp = model_Schema.dump(model)
        return resp, 201    

class SourcesResource(Resource):
    def get(self):
        source = Source.get_all()
        result = source_Schema.dump(source, many=True)
        return result    
    def post(self):
        data = request.get_json()
        source_dict = source_Schema.load(data)
        source = Source(ID=source_dict['ID'],
                    Type=source_dict['Type'],
                    Path=source_dict['Path'],
                    Title=source_dict['Title']
        )    
        source.save()
        resp = source_Schema.dump(source)
        return resp, 201    
    
# class FilmResource(Resource):
#     def get(self, film_id):
#         film = Film.get_by_id(film_id)
#         if film is None:
#             raise ObjectNotFound('La película no existe')
#         resp = film_schema.dump(film)
#         return resp
#api.add_resource(FilmListResource, '/api/v1.0/films/', endpoint='film_list_resource')
#api.add_resource(FilmResource, '/api/v1.0/films/<int:film_id>', endpoint='film_resource')
api.add_resource(ModelResourse, '/api/v1.0/models/<int:film_id>', endpoint='model_resource')
api.add_resource(ModelResourse, '/api/v1.0/models/', endpoint='model_list_resource')
api.add_resource(SourcesResource, '/api/v1.0/sources/<int:film_id>', endpoint='source_resource')
api.add_resource(SourcesResource, '/api/v1.0/sources/', endpoint='source_list_resource')
api.add_resource(Questions_, '/api/v1.0/question/', endpoint='question')
api.add_resource(HomePage, '/home/', endpoint='home')
api.add_resource(js, '/js.js', endpoint='js')
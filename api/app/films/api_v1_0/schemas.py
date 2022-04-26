from marshmallow import fields
from app.ext import ma

class FilmSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    title = fields.String()
    length = fields.Integer()
    year = fields.Integer()
    director = fields.String()
    actors = fields.Nested('ActorSchema', many=True)

class ActorSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String()
    
class ModelSchema(ma.Schema):
    Id = fields.Integer(dump_only = True)
    Model = fields.String()
    Description = fields.String()


class SourceSchema(ma.Schema):
    ID = fields.Integer(dump_only=True)
    Type = fields.String()
    Path = fields.String()
    Title = fields.String()    
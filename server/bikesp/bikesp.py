from datetime import timedelta, datetime
from decimal import Decimal
from flask import Blueprint, request
from bikesp import models, query_mapper
from marshmallow import ValidationError
from functools import wraps

bikesp_bp = Blueprint('bikesp', __name__ , url_prefix='/bikesp')

def load_bikesp_data_request():
   return models.bikesp_data_request.load(request.get_json())

def load_bikesp_geo_data_request():
   return models.bikesp_geo_data_request.load(request.get_json())

def marshmallow_validated(func):
    @wraps(func)
    def decorator():
        try:
            return func()
        except ValidationError as err:
            return {
                "message": "Validation Error",
                "errors": err.messages
            }, 400
    return decorator

def convert(value: any):
    if type(value) is Decimal:
        return float(value)
    if type(value) is timedelta:
        return float(value.seconds/60)
    print(type(value))
    if type(value) is datetime:
        return value.strftime("%d-%m-%Y")
    return value

@bikesp_bp.route('/fetch_trip_data', methods=['POST'])
@marshmallow_validated
def fetchTripData():
    req_data = load_bikesp_data_request()
    query = query_mapper.create_query(req_data)
    data = query.execute()
    return {
        "data": [{'label': convert(agg_value), "value": convert(value) } for (value, agg_value) in data]
    }

@bikesp_bp.route('/fetch_geographic_data', methods=['POST'])
@marshmallow_validated
def fetchLocationData():
    req_data = load_bikesp_geo_data_request()
    query = query_mapper.create_geo_query(req_data)
    data = query.execute()
    return {
        "data": [[lat, lng, value] for (value, lat, lng, geohash) in data]
    }

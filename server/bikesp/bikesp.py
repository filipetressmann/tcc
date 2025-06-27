from decimal import Decimal
from flask import Blueprint, request
from bikesp import models, postgres
from functools import wraps
from marshmallow import ValidationError

bikesp_bp = Blueprint('bikesp', __name__ , url_prefix='/bikesp')

def get_data():
   return models.bikesp_filter_schema.load(request.get_json())

def operation_adder(field_name):
    def decorator(func):
        @wraps(func)
        def wrapper(query: postgres.Query, request: models.BikespDataRequest, *args, **kwargs):
            field_value = request.get(field_name)

            if field_value is None:
                return
            
            operation_map = func(query, request)

            operation_function = operation_map.get(field_value)
            if operation_function:
                operation_function()
        return wrapper
    return decorator

@operation_adder('aggregation')
def add_query_aggregation_operations(query: postgres.Query, request: models.BikespDataRequest):
    return {
        'WEEK': query.aggregate_by_week,
        'HOUR': query.aggregate_by_hours,
        'DAY_OF_WEEK': query.aggregate_by_day_of_week,
        'GENDER': query.aggregate_by_gender,
        'RACE': query.aggregate_by_race,
        'PAYOUT': query.aggregate_by_payout
    }

@operation_adder('data_type')
def add_query_data_type(query: postgres.Query, request: models.BikespDataRequest):
    return {
        'TRIP_COUNT': query.add_trip_count,
        'TRIP_DURATION': query.add_trip_duration,
        'TRIP_DISTANCE': query.add_trip_distance
    }

def add_query_operations(query: postgres.Query, request: models.BikespDataRequest):
    add_query_data_type(query, request)
    add_query_aggregation_operations(query, request)

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
    print(value, type(value))
    return value

@bikesp_bp.route('/trip_count', methods=['POST'])
@marshmallow_validated
def fetchTripDuration():
    req_data = get_data()
    query = postgres.Query()
    add_query_operations(query, req_data)
    data = query.execute()
    return {
        "data": [{req_data.get('aggregation'): convert(agg_value), "value": convert(value) } for (value, agg_value) in data]
    }

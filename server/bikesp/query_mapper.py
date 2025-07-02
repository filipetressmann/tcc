from functools import wraps
from bikesp import query

def operation_adder(field_name):
    def decorator(func):
        @wraps(func)
        def wrapper(query: query.Query, request: dict, *args, **kwargs):
            field_value = request.get(field_name)

            if field_value is None:
                return
            
            operation_map = func(query)

            operation_function = operation_map.get(field_value)
            if operation_function:
                operation_function()
        return wrapper
    return decorator

@operation_adder('aggregation')
def add_query_aggregation_operations(q: query.Query):
    return {
        'WEEK': q.aggregate_by_week,
        'HOUR': q.aggregate_by_hours,
        'DAY_OF_WEEK': q.aggregate_by_day_of_week,
        'GENDER': q.aggregate_by_gender,
        'RACE': q.aggregate_by_race,
        'PAYOUT_LEVEL': q.aggregate_by_payout_level
    }

@operation_adder('data_type')
def add_query_data_type(q: query.Query):
    return {
        'TRIP_COUNT': q.add_trip_count,
        'TRIP_DURATION': q.add_trip_duration,
        'TRIP_DISTANCE': q.add_trip_distance,
        'MEAN_SPEED': q.add_mean_speed
    }

def add_date_filter(q: query.Query, filter: dict):
    if filter is None:
        return
    
    q.filter_by_date_range(filter['date_from'], filter['date_to'])

def add_gender_filter(q: query.Query, gender: str):
    if gender is None:
        return
    
    q.filter_by_gender(gender)

def add_race_filter(q: query.Query, race: str):
    if race is None:
        return
    
    q.filter_by_race(race)

def add_filters(q: query.Query, filters: dict):
    if filters is None:
        return

    add_date_filter(q, filters.get('date_filter'))
    add_race_filter(q, filters.get('race'))
    add_gender_filter(q, filters.get('gender'))

def create_query(request: dict):
    q = query.Query()
    add_query_data_type(q, request)
    add_query_aggregation_operations(q, request)
    add_filters(q, request.get('filters'))
    return q

def create_geo_query(request: dict):
    q = query.Query()
    q.add_point_count()
    center = request.get('center')
    q.aggregate_by_location(
        request.get('zoom_level'), 
        center.get('lat'), 
        center.get('lng'), 
        request.get('max_distance')
    )
    if request.get('filters'):
        q.join_trip()
        add_filters(q, request.get('filters'))
    return q
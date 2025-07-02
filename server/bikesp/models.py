import datetime
from marshmallow import Schema, fields, validates_schema, ValidationError
from marshmallow.validate import OneOf, Range

class DateFilter(Schema):
    date_from = fields.Date(required=True)
    date_to = fields.Date(required=False, missing=lambda: datetime.date.today())

class PayoutFilter(Schema):
    min_value = fields.Float(validate=Range(min=0), required=True)
    max_value = fields.Float(validate=Range(min=0), required=True)

GENDER_VALUES = ["M", "F", "NB"]
RACE_VALUES = ["Branca", "Parda", "Amarela"]

class Filters(Schema):
    date_filter = fields.Nested(DateFilter)
    gender = fields.String(validate=OneOf(GENDER_VALUES), allow_none=False)
    race =  fields.String(validate=OneOf(RACE_VALUES), allow_none=False)
    payout_filter = fields.Nested(PayoutFilter)

AGGREGATIONS = ['GENDER', 'RACE', 'WEEK', 'HOUR', 'DAY_OF_WEEK', 'PAYOUT_LEVEL']
DATA_TYPE = ['TRIP_COUNT', 'TRIP_DURATION', 'TRIP_DISTANCE', 'MEAN_SPEED']
class BikespDataRequest(Schema):
    filters = fields.Nested(Filters)
    aggregation = fields.String(validate=OneOf(AGGREGATIONS))
    data_type = fields.String(validate=OneOf(DATA_TYPE), required=True)

class LatLng(Schema):
    lat = fields.Float(required=True)
    lng = fields.Float(required=True)

    @validates_schema
    def validate_coordinates(self, data, **kwargs):
        lat = data.get('lat')
        lng = data.get('lng')
        if not (-90 <= lat <= 90):
            raise ValidationError("Latitude must be between -90 and 90.", field_name='lat')
        if not (-180 <= lng <= 180):
            raise ValidationError("Longitude must be between -180 and 180.", field_name='lng')

GEO_DATA_TYPE = ['TOTAL_SAMPLES', 'SAMPLE_MEAN_SPEED']
class BikespGeographicDataRequest(Schema):
    filters = fields.Nested(Filters)
    data_type = fields.String(validate=OneOf(GEO_DATA_TYPE), required=True)
    zoom_level = fields.Integer(validate=Range(min=1, max=20), required=True)
    center = fields.Nested(LatLng, required=True)
    max_distance = fields.Float(requied=True)

bikesp_data_request = BikespDataRequest()
bikesp_geo_data_request = BikespGeographicDataRequest()
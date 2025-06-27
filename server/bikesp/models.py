from marshmallow import Schema, fields
from marshmallow.validate import OneOf, Range

class DateFilter(Schema):
    date_from = fields.Date()
    date_to = fields.Date()

SEX_VALUES = ["M", "F", "NB"]
class SexFilter(Schema):
    sex = fields.String(validate=OneOf(SEX_VALUES), allow_none=False)

class PayoutFilter(Schema):
    min_value = fields.Float(validate=Range(min=0))
    max_value = fields.Float(validate=Range(min=0))

AGGREGATIONS = ['GENDER', 'RACE', 'WEEK', 'HOUR', 'DAY_OF_WEEK', 'PAYOUT']
DATA_TYPE = ['TRIP_COUNT', 'TRIP_DURATION', 'TRIP_DISTANCE']
class BikespDataRequest(Schema):
    date_filter = fields.Nested(DateFilter)
    sex_filter = fields.Nested(SexFilter)
    payout_filter = fields.Nested(PayoutFilter)
    aggregation = fields.String(validate=OneOf(AGGREGATIONS))
    data_type = fields.String(validate=OneOf(DATA_TYPE), required=True)

bikesp_filter_schema = BikespDataRequest()
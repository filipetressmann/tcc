from flask import Flask, jsonify, request
from flask_restful import Api
from flask_cors import CORS
import layers as layers
import filters as filters
import filter_list as filter_list
import pandas as pd
# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
# allow cross origin requests, from VueJS, in our case
CORS(app, resources={r'/*': {'origins': '*'}})

api = Api(app)

@app.route('/fetchfilters', methods=['GET'])
def fetchfilters():
    return jsonify(filters.initialize_filter_list())

# sanity check route
@app.route('/', methods=['GET'])
def bsweb():
    return jsonify('This is the beginning of BikeScience Web!')

@app.route('/filter_data', methods=['GET', 'POST'])
def filter_data():
    req_data = request.get_json()
    data = filters.handle_filtering(req_data)
    return jsonify(data)

# Map layers
api.add_resource(layers.CPTM, '/load_railway_data')
api.add_resource(layers.Metro, '/load_metro_data')
api.add_resource(layers.BikeLane, '/load_bikelane_data')
api.add_resource(layers.Zones, '/load_zones')

if __name__ == '__main__':
    app.run()
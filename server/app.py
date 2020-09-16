from flask import Flask, jsonify, request, send_file, url_for
from flask_restful import Api
from flask_cors import CORS
import layers as layers
import filters as filters
import filter_list as filter_list
from charts import Charts
import pandas as pd
import bikescience.sp_grid as gr
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

@app.route('/grid_layer', methods=['GET', 'POST'])
def grid():
    req_data = request.get_json()
    n = int(req_data['gridSize'])
    grid = gr.create(n)
    return grid.geodataframe().to_json()

# sanity check route
@app.route('/', methods=['GET'])
def bsweb():
    return jsonify('This is BikeScience Web!')

@app.route('/chart')
def load_chart():
    ut = request.args.get('ut')
    chart = request.args.get('chart')
    return send_file(f"static/charts/{ut}/{chart}/")

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
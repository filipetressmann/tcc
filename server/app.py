import os
import sys

import pandas as pd
from flask import Flask, jsonify, request, send_file, url_for
from flask_cors import CORS
from flask_restful import Api

import bikescience.sp_grid as gr
import filter_list as filter_list
import filters as filters
import helpers
import layers as layers
from charts import Charts

sys.path.append(os.path.normpath("."))


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
    west_offset = req_data['gridOffset']['west']
    east_offset = req_data['gridOffset']['east']
    north_offset = req_data['gridOffset']['north']
    south_offset = req_data['gridOffset']['south']
    grid = gr.create(n, west_offset, east_offset, north_offset, south_offset)
    return grid.geodataframe().to_json()

# sanity check route


@app.route('/', methods=['GET'])
def bsweb():
    return jsonify('This is BikeScience Web! 2')


@app.route('/chart')
def load_chart():
    ut = request.args.get('ut')
    chart = request.args.get('chart')
    path = os.path.normpath("static/charts/" + ut + "/" + chart + "/")
    return send_file(path)


@app.route('/filter_data', methods=['GET', 'POST'])
def filter_data():
    req_data = request.get_json()
    data = filters.handle_filtering(req_data)
    return jsonify(data)


@app.route('/shapefile_to_geojson', methods=['POST'])
def shapefile_to_geojson():
    files = request.files
    return helpers.convert_shapefile_to_geojson(files)


@app.route('/shapefile_zip_to_geojson', methods=['POST'])
def shapefile_zip_to_geojson():
    files = request.files
    return helpers.convert_shapefile_zip_to_geojson(files)


@app.route('/kmz_to_geojson', methods=['POST'])
def kmz_to_geojson():
    files = request.files
    return helpers.convert_kmz_to_geojson(files)


# Map layers
api.add_resource(layers.CPTM_lines, '/load_railway_lines_data')
api.add_resource(layers.Metro_lines, '/load_metro_lines_data')
api.add_resource(layers.CPTM_stations, '/load_railway_stations_data')
api.add_resource(layers.Metro_stations, '/load_metro_stations_data')
api.add_resource(layers.BikeLane, '/load_bikelane_data')
api.add_resource(layers.Zones, '/load_zones')
api.add_resource(layers.Accidents, '/load_accidents')

if __name__ == '__main__':
    app.run()

from flask import Flask, jsonify
from flask_restful import Api
from flask_cors import CORS
import filters.filter_list as filters
import filters.layers as layers

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
    return jsonify(filters.FILTERS)

# sanity check route
@app.route('/', methods=['GET'])
def bsweb():
    return jsonify('This is the beginning of BikeScience Web!')

# Map layers
api.add_resource(layers.CPTM, '/load_railway_data')
api.add_resource(layers.Metro, '/load_metro_data')

if __name__ == '__main__':
    app.run()
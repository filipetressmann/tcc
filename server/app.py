from flask import Flask, jsonify
from flask_cors import CORS
import filters.filter_list as filters

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)
# allow cross origin requests, from VueJS, in our case
CORS(app, resources={r'/*': {'origins': '*'}})


@app.route('/fetchfilters', methods=['GET'])
def fetchfilters():
    return jsonify(filters.FILTERS)

# sanity check route
@app.route('/', methods=['GET'])
def bsweb():
    return jsonify('This is the beginning of BikeScience Web!')


if __name__ == '__main__':
    app.run()
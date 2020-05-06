import geopandas as gpd
from flask_restful import Resource
from os.path import abspath

data_path = abspath('./') + '/filters/data'

# provides CPTM railway layer
class CPTM(Resource):
  def load_railway(self):
    railway = gpd.GeoDataFrame.from_file(data_path + "/shapes//SIRGAS_SHP_linhatrem_line.shp", encoding='latin-1')
    railway.crs = {'init' :'epsg:22523'}
    railway = railway.to_crs({"init": "epsg:4326"})
    return railway

  def get(self):
    return self.load_railway().to_json()

# provides Metro layer
class Metro(Resource):
  def load_metro(self):
    metro = gpd.GeoDataFrame.from_file(data_path + "/shapes//SIRGAS_SHP_linhametro_line.shp", encoding='latin-1')
    metro.crs = {'init': 'epsg:22523'}
    metro = metro.to_crs({'init': 'epsg:4326'})
    return metro

  def get(self):
    return self.load_metro().to_json()

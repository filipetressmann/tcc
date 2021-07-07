import geopandas as gpd
from flask_restful import Resource
from os.path import abspath
import unidecode

# preload zones layer
data_path = abspath('./') + '/data'
zones = gpd.GeoDataFrame.from_file(f'{data_path}/shapes/Zonas_2017_region.shp', encoding='latin-1')
zones = zones.to_crs({"init": "epsg:4326"})
zones['NomeDistri'] = zones['NomeDistri'].apply(lambda x: unidecode.unidecode(x))
zones['NomeZona'] = zones['NomeZona'].apply(lambda x: unidecode.unidecode(x))
zones = zones.to_json()


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

class BikeLane(Resource):
  def load_bike_lane(self):
    bikelane = gpd.GeoDataFrame.from_file(data_path + "/shapes//SIRGAS_SHP_redecicloviaria.shp", encoding='latin-1')
    bikelane.crs = {'init': 'epsg:22523'}
    bikelane = bikelane.to_crs({'init': 'epsg:4326'})
    return bikelane

  def get(self):
    return self.load_bike_lane().to_json()

class Zones(Resource):
  def get(self):
    return zones

import geopandas as gpd
from flask_restful import Resource
from os.path import abspath
import unidecode
import json
import pandas as pd

# preload zones layer
data_path = abspath('./') + '/data'
zones = gpd.GeoDataFrame.from_file(
    f'{data_path}/shapes/Zonas_2017_region.shp', encoding='latin-1')
zones = zones.to_crs("epsg:4326")
zones['NomeDistri'] = zones['NomeDistri'].apply(
    lambda x: unidecode.unidecode(x))
zones['NomeZona'] = zones['NomeZona'].apply(lambda x: unidecode.unidecode(x))
zones = zones.to_json()


def getBikelaneType(row):
    text = row['programa'].lower()
    if 'ciclofaixa' in text:
        return 'ciclofaixa'
    if 'ciclovia' in text:
        return 'ciclovia'
    if 'ciclopassarela' in text:
        return 'ciclovia'
    if 'ciclorrota' in text:
        return 'ciclorrota'
    return 'outro'


# provides CPTM railway layer
class CPTM_lines(Resource):
    def load_railway(self):
        railway = gpd.GeoDataFrame.from_file(
            data_path + "/shapes/SIRGAS_SHP_linhatrem.shp", encoding='utf-8')
        railway.crs = 'epsg:22523'
        railway = railway.to_crs("epsg:4326")
        return railway

    def get(self):
        return self.load_railway().to_json()


class CPTM_stations(Resource):
    def load_railway(self):
        railway = gpd.GeoDataFrame.from_file(
            data_path + "/shapes/SIRGAS_SHP_estacaotrem_point.shp", encoding='utf-8')
        railway.crs = 'epsg:22523'
        railway = railway.to_crs("epsg:4326")
        return railway

    def get(self):
        return self.load_railway().to_json()


# provides Metro layer
class Metro_lines(Resource):
    def load_metro(self):
        metro = gpd.GeoDataFrame.from_file(
            data_path + "/shapes/SIRGAS_SHP_linhametro_line.shp", encoding='utf-8')
        metro0 = metro
        metro.crs = 'epsg:22523'
        metro = metro.to_crs('epsg:4326')
        return metro

    def get(self):
        return self.load_metro().to_json()


class Metro_stations(Resource):
    def load_metro(self):
        metro = gpd.GeoDataFrame.from_file(
            data_path + "/shapes/SIRGAS_SHP_estacaometro_point.shp", encoding='utf-8')
        metro0 = metro
        metro.crs = 'epsg:22523'
        metro = metro.to_crs('epsg:4326')
        return metro

    def get(self):
        return self.load_metro().to_json()


class BikeLane(Resource):
    def load_bike_lane(self):
        bikelanes = gpd.GeoDataFrame.from_file(
            data_path + "/shapes/CET/bikelanes.shp", encoding='latin-1')
        # ciclorrota = gpd.GeoDataFrame.from_file(
        #     data_path + "/shapes/CET/Ciclorrotas.dbf", encoding='latin-1')
        # frames = [ciclovia, ciclorrota]
        # bikelanes = pd.concat(frames)
        # bikelanes['programa'] = bikelanes['programa'].apply(str)
        # bikelanes['rc_tipo'] = bikelanes.apply(
        #     lambda row: getBikelaneType(row), axis=1)
        # bikelanes = bikelanes.rename(
        #     columns={
        #         'programa': 'rc_nome',
        #         'inauguracao': 'rc_inauguracao',
        #         'extensao_t': 'rc_extensao_trecho',
        #         'extensao_c': 'rc_extensao',
        #     })
        types = bikelanes['tipo'].unique()
        years = bikelanes['inaugurAno'].unique()
        out = {}
        years.sort(axis=0)
        out['years'] = years.astype(int).tolist()
        for type in types:
            df = bikelanes[bikelanes['tipo'] == type]
            o = {}
            for year in years:
                o[str(year)] = df[df['inaugurAno'] == year].to_json()
            out['sp_bikelane_' + type] = o
        return out

    def get(self):
        return self.load_bike_lane()


class Accidents(Resource):
    def load_accidents(self):
        df = pd.read_csv(
            data_path + "/acidentes_infosiga_sp_maio21.csv", encoding='utf-8')
        gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.lon, df.lat))
        gdf.crs = 'epsg:4326'
        accidents = gdf.to_crs('epsg:4326')
        return accidents

    def get(self):
        return self.load_accidents().to_json()


class Zones(Resource):
    def get(self):
        return zones

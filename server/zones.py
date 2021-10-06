import pandas as pd
import geopandas as gpd
import saopaulo.stations as st
import math
import numpy as np
import bikescience.arrow as arrow
from os.path import abspath
import unidecode
from shapely.geometry import Point
from saopaulo.flow import weighted_counts
# from bikescience.flow import weighted_counts


class Zones:
    def __init__(self, df_zones):
        # zones = st.stations_geodf(df_zones)
        # self.zones = zones

        ##############################
        data_path = abspath('./') + '/data'
        zones = gpd.GeoDataFrame.from_file(
            f'{data_path}/shapes/Zonas_2017_region.shp', encoding='latin-1')
        zones = zones.to_crs("epsg:4326")
        self.zones = zones

        # def zones_od(self, trips):
        #     od_df = trips.copy()
        #     od_df = od_df.groupby(['ZONA_O', 'ZONA_D', 'NOME_O', 'NOME_D'], as_index=False).agg(
        #         {'trip counts': 'sum'})
        #     df_zones = self.zones[['NumeroZona', 'geometry']]
        #     od_df = pd.merge(od_df, df_zones, left_on='ZONA_O',
        #                      right_on='NumeroZona', sort=False)
        #     od_df.rename(columns={'geometry': 'origin'}, inplace=True)
        #     od_df.drop(['NumeroZona'], inplace=True, axis=1)
        #     od_df = pd.merge(od_df, df_zones, left_on='ZONA_D',
        #                      right_on='NumeroZona', sort=False)
        #     od_df.rename(columns={'geometry': 'destination'}, inplace=True)
        #     od_df.drop(['NumeroZona'], inplace=True, axis=1)
        #     return od_df

    def zones_od(self, trips):
        trips_geoframe = gpd.GeoDataFrame(trips, crs='epsg:4326')

        trips_geoframe['geometry'] = trips_geoframe.apply(lambda row: Point(
            row['orig_lon'], row['orig_lat']), axis=1)
        zones_trips = gpd.sjoin(self.zones, trips_geoframe, op='contains')
        zones_trips.rename(
            columns={'NumeroZona': 'zone_start'}, inplace=True)
        # zones_trips = zones_trips.drop('index_right', 1)
        zones_trips = zones_trips[['zone_start',
                                   'ID_ORDEM', 'trip counts', 'orig_lat', 'orig_lon', 'dest_lat', 'dest_lon']]

        trips_geoframe = gpd.GeoDataFrame(zones_trips, crs='epsg:4326')
        trips_geoframe['geometry'] = trips_geoframe.apply(lambda row: Point(
            row['dest_lon'], row['dest_lat']), axis=1)
        zones_trips = gpd.sjoin(self.zones, trips_geoframe, op='contains')
        zones_trips.rename(
            columns={'NumeroZona': 'zone_dest'}, inplace=True)
        zones_trips = zones_trips[['zone_start', 'zone_dest',
                                   'ID_ORDEM', 'trip counts', 'orig_lat', 'orig_lon', 'dest_lat', 'dest_lon']]
        zones_trips['ID_ORDEM'] = zones_trips['ID_ORDEM'].astype(str)
        zones_trips.rename(
            columns={'zone_start': 'ZONA_O', 'zone_dest': 'ZONA_D'}, inplace=True)
        cell_start_ids = ['ZONA_O']
        cell_end_ids = ['ZONA_D']
        zones_trips.rename(
            columns={'orig_lat': 'start_lat', 'orig_lon': 'start_lon', 'dest_lat': 'end_lat', 'dest_lon': 'end_lon'}, inplace=True)
        return weighted_counts(zones_trips, cell_start_ids + cell_end_ids)

    def calculate_lat_long(self, data):
        lat1 = data['origin'].y
        lon1 = data['origin'].x
        lat2 = data['destination'].y
        lon2 = data['destination'].x
        return lat1, lon1, lat2, lon2

    def remove_od_roundoff_trips(self, od_df, start_zone_identifier='ZONA_O', end_zone_identifier='ZONA_D'):
        return od_df[od_df[start_zone_identifier] != od_df[end_zone_identifier]]

    def apply_od_flows(self, filter_data, minimum, maximum, globalMaximum):
        print(str(minimum) + " - " + str(maximum))
        total_trips = filter_data['trip counts'].sum()
        # select the tier to filter data
        filtered_trips = filter_data[(filter_data['trip counts'] >= minimum) & (
            filter_data['trip counts'] <= maximum)]
        amount_of_points = 10
        flows = []
        origins = []
        destinations = []
        for index, row in filtered_trips.iterrows():
            num_trips = row['trip counts']
            try:
                origin = row['ZONA_O']
                destination = row['ZONA_D']
                trips_ids = None
            except:
                origin = '(' + str(row['i_start']) + \
                    ', ' + str(row['j_start']) + ')'
                destination = '(' + str(row['i_end']) + \
                    ', ' + str(row['j_end']) + ')'
                trips_ids = row['ID_ORDEM']
            lat1, lon1, lat2, lon2 = self.calculate_lat_long(row)
            weight = math.ceil(((num_trips)/globalMaximum) * 10.0)
            if weight == 0:
                weight = 1
            flow_points = arrow.draw_arrow(lat1, lon1, lat2, lon2, weight)
            flow = {
                'coords': flow_points,
                'weight': weight,
                'total_trips': int(num_trips),
                'origin': origin,
                'destination': destination,
                'trips_ids': trips_ids
            }
            flows.append(flow)
        return flows

    def geodataframe(self):
        return self.zones

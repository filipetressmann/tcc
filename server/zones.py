import pandas as pd
import geopandas as gpd
import saopaulo.stations as st
import math
import numpy as np
import bikescience.arrow as arrow

class Zones:
  def __init__(self, df_zones):
    zones = st.stations_geodf(df_zones)
    self.zones = zones
  
  def zones_od(self, trips):
    od_df = trips.copy()
    od_df = od_df.groupby(['ZONA_O', 'ZONA_D', 'NOME_O', 'NOME_D'], as_index=False).agg({'trip counts': 'sum'})
    df_zones = self.zones[['NumeroZona','geometry']]
    od_df = pd.merge(od_df, df_zones, left_on='ZONA_O', right_on='NumeroZona', sort=False)
    od_df.rename(columns={'geometry':'origin'},inplace=True)
    od_df.drop(['NumeroZona'],inplace=True,axis=1)
    od_df = pd.merge(od_df, df_zones, left_on='ZONA_D', right_on='NumeroZona',sort=False)
    od_df.rename(columns={'geometry':'destination'},inplace=True)
    od_df.drop(['NumeroZona'],inplace=True,axis=1)
    return od_df

  def calculate_lat_long(self, data):
    lat1 = data['origin'].y
    lon1 = data['origin'].x
    lat2 = data['destination'].y
    lon2 = data['destination'].x
    return lat1, lon1, lat2, lon2

  def remove_od_roundoff_trips(self, od_df, start_zone_identifier='ZONA_O', end_zone_identifier='ZONA_D'):
    return od_df[od_df[start_zone_identifier]!=od_df[end_zone_identifier]]

  def apply_od_flows(self, filter_data, minimum, maximum, globalMaximum):
    total_trips = filter_data['trip counts'].sum()
    # select the tier to filter data
    filtered_trips = filter_data[(filter_data['trip counts'] >= minimum) & (filter_data['trip counts'] <= maximum)]
    amount_of_points = 10
    flows = []
    origins = []
    destinations = []
    for index, row in filtered_trips.iterrows():
      num_trips = row['trip counts']
      lat1, lon1, lat2, lon2 = self.calculate_lat_long(row)
      weight = math.ceil(((num_trips)/globalMaximum) * 10.0)
      if weight == 0: weight = 1
      flow_points = arrow.draw_arrow(lat1, lon1, lat2, lon2, weight)
      flow = {
        'coords': flow_points,
        'weight': weight,
        'total_trips': int(num_trips)
      }
      flows.append(flow)
    return flows
  
  def geodataframe(self):
    return self.zones

import bikescience.arrow as arrow
import bikescience.tiers as tiers
import saopaulo.flow as odflow
import bikescience.sp_grid as gr
import saopaulo.stations as st
import saopaulo.load_trips as odfilters
import filter_list as filter_list
import pandas as pd
import numpy as np
import math

""" od_trips = pd.read_csv('../data/sao-paulo/od/trips_od17_bikes.csv')

zones = pd.read_csv('../data/sao-paulo/od/zonas_od17.csv') """

"""
  The purpose of this class is to return coordinates data to be
  plotted in the web application, given the OD data and parameters for desired filter
"""
class ODFilterData:
  def __init__(self, od_dataset):
    od_dataset = od_dataset[od_dataset['ZONA_O']!=od_dataset['ZONA_D']]
    od_dataset.rename(columns={'FE_VIA':'trip counts'},inplace=True)
    self.od = od_dataset
    self.grid = gr.create(n=20)
  
  def set_zones(self, zone_dataset):
    self.zones = Zones(zone_dataset)
  
  def set_grid(self, n, west=-0.15, east=0.23, north=0.19, south=-0.46):
    self.grid = gr.create(n, west, east, north, south)
  
  def trips_by_age(self, age_range, num_tiers=4):
    filtered_trips = odfilters.select_age_range(self.od, age_range)
    print(f'Total de viagens filtradas: { filtered_trips.shape }')
    tiers_table = self.separate_in_tiers(filtered_trips, num_tiers)
    print(tiers_table)
    coords_by_tier = []
    for index, row in tiers_table.iterrows():
      coords = self.zones.apply_od_flows(filtered_trips, minimum=row['min'], maximum=row['top'])
      coords_by_tier.append(coords.tolist())
    return coords_by_tier
  
  def separate_in_tiers(self, trips, num_tiers=4):
    od = odflow.od_countings(trips, self.grid, self.zones.geodataframe(),
                           station_index='NumeroZona', 
                           start_station_index='ZONA_O', 
                           end_station_index='ZONA_D')
    tiers_table, _ = tiers.separate_into_tiers(od.sort_values('trip counts', ascending=False), trips, None, 
                                               max_tiers=num_tiers)
    return tiers_table

class Zones:
  def __init__(self, od_zones):
    zones = st.stations_geodf(od_zones)
    self.zones = zones
  
  def join_zones_and_data(self, data):
    od_df = data.copy()
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

  def remove_zone_roundoff_trips(self, od_df, start_zone_identifier='ZONA_O', end_zone_identifier='ZONA_D'):
    return od_df[od_df[start_zone_identifier]!=od_df[end_zone_identifier]]

  def apply_od_flows(self, filter_data, minimum, maximum):
    data_in_zones = self.join_zones_and_data(filter_data)
    no_rounding_trips = self.remove_zone_roundoff_trips(data_in_zones)
    total_trips = no_rounding_trips['trip counts'].sum()
    shown_trips = 0
    # select the tier to filter data
    no_rounding_trips = no_rounding_trips[((no_rounding_trips['trip counts'] >= minimum) & (no_rounding_trips['trip counts'] <= maximum))]

    amount_of_points = 30
    flows = []
    flows_folium = []
    for index, row in no_rounding_trips.iterrows():
      num_trips = row['trip counts']
      shown_trips += num_trips
      lat1, lon1, lat2, lon2 = self.calculate_lat_long(row)
      # weight of flow arrow
      weight = math.ceil( (num_trips-minimum)/maximum * 10)
      if weight == 0: weight = 1
      tooltip_text = f'{num_trips} viagens nesse fluxo.'
      flow = arrow.draw_arrow(lat1, lon1, lat2, lon2, text=tooltip_text, weight=weight)
      flows.append(flow)
    return np.array(flows)
  
  def geodataframe(self):
    return self.zones

class Filter:
  def __init__(self, filter_id, name, ftype, key, has_form):
    self.id = filter_id
    self.name = name
    self.ftype = ftype
    self.key = key
    self.has_form = has_form
  
  def filter_object(self):
    return {
      'id': self.id,
      'filter_name': self.name,
      'filter_type': self.ftype,
      'filter_key': self.key,
      'has_form': self.has_form
    }

class Category:

  def __init__(self, name):
    self.filters = []
    self.name = name
  
  def add_filter(self, filter):
    self.filters.append(filter.filter_object())
  
  def category_object(self):
    return {
      'category_name': self.name,
      'filters': [f for f in self.filters]
    }

def initialize_filter_list():
  filter_data = []
  for category in filter_list.FILTERS:
    c = Category(category['category_name'])
    for f in category['filters']:
      filter_id = f['id']
      filter_key = f['filter_key']
      filter_type = f['filter_type']
      filter_name = f['filter_name']
      has_form = f['has_form']
      categoryfilter = Filter(filter_id, filter_name, filter_type, filter_key, has_form)
      c.add_filter(categoryfilter)
    filter_data.append(c.category_object())
  return filter_data

# initialize filtering object
od_dataset = pd.read_csv('data/trips_od17_bikes_all.csv')
zones = pd.read_csv('data/zonas_od17.csv')
odf = ODFilterData(od_dataset)
odf.set_grid(20)
odf.set_zones(zone_dataset=zones)

# parses request args and returns the filtered data
def handle_filtering(filter_args):
  fid = int(filter_args['fid'])
  if fid == 8:
    min_age = filter_args['minAge']
    max_age = filter_args['maxAge']
    nTiers = filter_args['ntiers']
    print(f'Número de tiers: {nTiers}')
    filtered = {'name': 'age',
                'data': odf.trips_by_age(age_range=[min_age, max_age], num_tiers=nTiers)}
    return filtered

import filter_list as filter_list
import pandas as pd
from od import OD
from charts import Charts

od = OD()
class Filter:
  def __init__(self, filter_id, name, ftype, key, has_form, has_checkbox = False):
    self.id = filter_id
    self.name = name
    self.ftype = ftype
    self.key = key
    self.has_form = has_form
    self.has_checkbox = has_checkbox
  
  def filter_object(self):
    return {
      'id': self.id,
      'filter_name': self.name,
      'filter_type': self.ftype,
      'filter_key': self.key,
      'has_form': self.has_form,
      'has_checkbox': self.has_checkbox
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
      has_checkbox = f['has_checkbox']
      categoryfilter = Filter(filter_id, filter_name, filter_type, filter_key, has_form, has_checkbox)
      c.add_filter(categoryfilter)
    filter_data.append(c.category_object())
  return filter_data

# initialize filtering object

zones = pd.read_csv('data/zonas_od17.csv')
od = OD()
od.set_zones(zone_dataset=zones)

# parse request args and returns the filtered data
def handle_filtering(req_params):
  # def set_grid(self, n, west=-0.15, east=0.23, north=0.19, south=-0.46):
  offset = req_params['gridOffset']
  year = req_params.get('year')
  od.set_grid(
    req_params['gridSize'],
    west=offset['west'],
    east=offset['east'],
    north=offset['north'],
    south=offset['south']
  )
  trips = od.get_od_dataset(year)
  base_layer = req_params['baseLayer']
  filters = req_params['params']
  flows = []
  for f_id in filters:
    
    params = filters[f_id]

    if f_id == '0':
      periods = params['periods']
      specific = params['specific']
      min_time = params['minHours']
      max_time = params['maxHours']
      trips = od.trips_by_start_time(trips, periods, specific, min_time, max_time)
    
    elif f_id == '17':
      periods = params['periods']
      specific = params['specific']
      min_time = params['minHours']
      max_time = params['maxHours']
      trips = od.trips_by_finish_time(trips, periods, specific, min_time, max_time)

    elif f_id == '8':
      age_range = params['ageRange']
      trips = od.trips_by_age(trips, age_range)

    elif f_id == '5':
      duration_range = params['durationRange']
      trips = od.trips_by_duration(trips, duration_range)

    elif f_id == '7':
      selected_sexes = params['sexes']
      trips = od.trips_by_sex(trips, selected_sexes)
    
    elif f_id == '9':
      isInterval = params['interval']
      income_bracket = params['incomeBracket']
      income_bracket_bounds = params['incomeBracketBounds']
      income_interval = params['incomeInterval']
      trips = od.trips_by_income(trips, isInterval, income_bracket, income_bracket_bounds, income_interval)

    elif f_id == '3':
      distance_range = params['distanceRange']
      trips = od.trips_by_distance(trips, distance_range)

    elif f_id == '4':
      speed_range = params['speedRange']
      trips = od.trips_by_speed(trips, speed_range) # Erro: KeyError: 'VEL_MEDIA'
    
    elif f_id == '6':
      reasons = params['reasons']
      trips = od.trips_by_reason(trips, reasons)
  
  # Commented chart: was crashing the server
  # charts = Charts(req_params['ut'], trips)
  # chart_list = charts.create_for_filters(filters)
  flows, heatmaps, flow_props = od.coords_by_tier(trips, base_layer)
  
  return {
    'gridSize': req_params['gridSize'],
    'gridOffset': offset,
    'flows': flows,
    'heatmaps': heatmaps,
    'flow_props': flow_props
    # 'charts': chart_list
  }
    

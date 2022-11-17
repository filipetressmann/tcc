import pandas as pd
import bikescience.sp_grid as gr
import saopaulo.load_trips as odfilters
import bikescience.tiers as tiers
import saopaulo.flow as odflow
from zones import Zones
import json

"""
  The purpose of ODFilterData class is to return coordinates data to be
  plotted in the web application, given the OD data and parameters for a filter.
"""
pd.options.mode.chained_assignment = 'raise'


class OD:
    def __init__(self):
        # read dataset
        od_dataset = pd.read_csv('data/trips_od17_bikes_all_features.csv')
        # remove round off trips
        od_dataset = od_dataset[od_dataset['ZONA_O'] != od_dataset['ZONA_D']]
        od_dataset_newcolumn = od_dataset.copy()
        # label FE_VIA as trip counts, for tier countings
        od_dataset_newcolumn.rename(
            columns={'FE_VIA': 'trip counts'}, inplace=True)
        od_dataset = od_dataset_newcolumn
        self.od = od_dataset

    def set_zones(self, zone_dataset):
        self.zones = Zones(zone_dataset)

    def set_grid(self, n, west=-0.15, east=0.23, north=0.19, south=-0.46):
        self.grid = gr.create(n, west, east, north, south)

    # Filters for OD DATA
    def trips_by_start_time(self, trips, periods, specific, min_hour, max_hour):
        # filter periods, if theres any selecte
        trips['HORA_SAIDA'] = pd.to_datetime(
            trips['HORA_SAIDA'], format='%H:%M:%S')
        filtered_trips = pd.DataFrame(columns=trips.columns)
        for period in periods:
            if period == 'morning':
                filtered_trips = filtered_trips.append(
                    trips[(trips['HORA_SAIDA'].dt.hour >= 6) & (trips['HORA_SAIDA'].dt.hour <= 12)])
            if period == 'afternoon':
                filtered_trips = filtered_trips.append(
                    trips[(trips['HORA_SAIDA'].dt.hour >= 12) & (trips['HORA_SAIDA'].dt.hour <= 18)])
            if period == 'evening':
                filtered_trips = filtered_trips.append(
                    trips[(trips['HORA_SAIDA'].dt.hour >= 18) & (trips['HORA_SAIDA'].dt.hour <= 23)])
        # filter by specific time, if selected
        if specific:
            filtered_trips = filtered_trips.append(trips[(
                trips['HORA_SAIDA'].dt.hour >= min_hour) & (trips['HORA_SAIDA'].dt.hour <= max_hour)])
        return filtered_trips

    def trips_by_finish_time(self, trips, periods, specific, min_hour, max_hour):
        # filter periods, if theres any selecte
        trips['HORA_CHEG'] = pd.to_datetime(
            trips['HORA_CHEG'], format='%H:%M:%S')
        filtered_trips = pd.DataFrame(columns=trips.columns)
        for period in periods:
            if period == 'morning':
                filtered_trips = filtered_trips.append(
                    trips[(trips['HORA_CHEG'].dt.hour >= 6) & (trips['HORA_CHEG'].dt.hour < 12)])
            if period == 'afternoon':
                filtered_trips = filtered_trips.append(
                    trips[(trips['HORA_CHEG'].dt.hour >= 12) & (trips['HORA_CHEG'].dt.hour < 18)])
            if period == 'evening':
                filtered_trips = filtered_trips.append(
                    trips[(trips['HORA_CHEG'].dt.hour >= 18) & (trips['HORA_CHEG'].dt.hour <= 23)])
        # filter by specific time, if selected
        if specific:
            filtered_trips = filtered_trips.append(trips[(
                trips['HORA_CHEG'].dt.hour >= min_hour) & (trips['HORA_CHEG'].dt.hour <= max_hour)])
        return filtered_trips

    def trips_by_age(self, trips, age_range):
        filtered_trips = odfilters.select_age_range(trips, age_range)
        return filtered_trips

    def trips_by_weekday(self, trips, days):
        filtered_trips = trips[trips['DIASEMANA'].isin(days)]
        return filtered_trips

    def trips_by_duration(self, trips, duration_range):
        return trips[(trips['DURACAO'] >= duration_range[0]*60) & (trips['DURACAO'] <= duration_range[1]*60)]

    def trips_by_distance(self, trips, distance_range):
        return trips[(trips['distance'] >= distance_range[0]) & (trips['distance'] <= distance_range[1])]

    def trips_by_sex(self, trips, sex):
        return trips[trips['SEXO'].isin(sex)]

    def trips_by_income(self, trips, isInterval, income_bracket, income_bracket_bounds, income_interval):
        if isInterval:
            return trips[(trips['RENDA_FA'] >= income_interval[0]) & (trips['RENDA_FA'] <= income_interval[1])]
        else:
            filtered_trips = pd.DataFrame(columns=trips.columns)
            for i in income_bracket:
                filtered_trips = filtered_trips.append(trips[(trips['RENDA_FA'] >= income_bracket_bounds[str(i)]['min'])
                                                             & (trips['RENDA_FA'] <= income_bracket_bounds[str(i)]['max'])])
            return filtered_trips

    def trips_by_speed(self, trips, speed_range):
        return trips[(3600*trips['distance']/trips['DURACAO'] >= speed_range[0]) & (3600*trips['distance']/trips['DURACAO'] <= speed_range[1])]

    def trips_by_reason(self, trips, reasons):
        if len(reasons) == 8:
            reasons.append(0)
        return trips[trips['PE_BICI'].isin(reasons)]

    def coords_by_tier(self, trips, base_layer, num_tiers=4):
        if (base_layer == 'zones'):
            od = self.zones.zones_od(trips)
            od = od[od['ZONA_O'] != od['ZONA_D']]
        if (base_layer == 'grid'):
            od = self.grid_od(trips)
            od = od[(od['i_start'] != od['i_end']) |
                    (od['j_start'] != od['j_end'])]
        if (od.empty):
            return [], []

        # od = self.zones.remove_od_roundoff_trips(od)
        tiers_table = self.separate_in_tiers(od, trips, num_tiers)
        globalMaximum = tiers_table.iloc[0]['top']
        flows_by_tier = {}
        origins = []
        destinations = []
        for index, trip in od.iterrows():
            origins.append([trip.origin.x, trip.origin.y, 1])
            destinations.append([trip.destination.x, trip.destination.y, 1])
        heatmaps = {
            'attractors': destinations,
            'emitters': origins
        }
        for index, row in tiers_table.iterrows():
            flows_by_tier[index] = self.zones.apply_od_flows(
                od, row['min'], row['top'], globalMaximum)
        flow_props = tiers_table.to_dict()
        return flows_by_tier, heatmaps, flow_props

    def grid_od(self, trips):
        # od = odflow.od_countings(trips, self.grid, self.zones.geodataframe(),
        #                        station_index='NumeroZona',
        #                        start_station_index='ZONA_O',
        #                        end_station_index='ZONA_D')
        od = odflow.od_countings2(trips, self.grid, self.zones.geodataframe(),
                                  station_index='NumeroZona',
                                  start_station_index='ZONA_O',
                                  end_station_index='ZONA_D')
        return od

    def separate_in_tiers(self, od, trips, num_tiers=4):
        tiers_table, _ = tiers.separate_into_tiers(od.sort_values('trip counts', ascending=False), trips, None,
                                                   max_tiers=num_tiers)
        return tiers_table

    def get_od_dataset(self):
        return self.od

import pandas as pd
import geopandas as gpd
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import numpy as np
from decimal import Decimal
from pathlib import Path

class Charts:
  def __init__ (self, usr_token, trips):
    self.usr_token = usr_token
    self.trips = trips
    Path(f'static/charts/{usr_token}').mkdir(parents=True, exist_ok=True)

  def create_for_filters(self, params):
    charts = []
    for filter in params.keys():

      # start hour filter
      if filter == '0':
        self.number_of_trips_by_start_hour()
        # self.avg_duration_by_start_hour()
        charts.append('trips_start_hour.png')
      
      # reasons
      if filter == '6':
        self.trip_reasons_by_hour()
        charts.append('reasons_hour_bar.png')
      # age filter
      if filter == '8':
        age_range = params[filter]['ageRange']
        num_bins = age_range[1] - age_range[0]
        if (num_bins >= 5):
          self.age_chart(num_bins)
          charts.append('agechart.png')
      
      # end_hour filter
      if filter == '17':
        self.number_of_trips_by_end_hour()
        charts.append('trips_end_hour.png')
        #self.avg_duration_by_end_hour()
    return charts

  def number_of_trips_by_hour(self, which_hour='HORA_SAIDA', title='Number of trips by start hour', xlabel='Start hour', ylabel='Number of trips'):
    self.trips[which_hour] = pd.to_datetime(self.trips[which_hour], format='%H:%M:%S')
    self.trips['HOURS'] = self.trips[which_hour].dt.hour
    time_axis = np.sort(self.trips[which_hour].dt.hour.unique())    
    hour_freq = self.trips['HOURS'].value_counts().sort_index()
    fig, ax = plt.subplots(figsize=(12,12))
    ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)
    ax.xaxis.set_ticks(time_axis)
    ax.plot(time_axis, hour_freq)

  def number_of_trips_by_start_hour(self):
    self.number_of_trips_by_hour()
    plt.savefig(f'static/charts/{self.usr_token}/trips_start_hour.png')

  def number_of_trips_by_end_hour(self):
    self.number_of_trips_by_hour(which_hour='HORA_CHEG', xlabel='End hour', title='Number of trips by finish hour')
    plt.savefig(f'static/charts/{self.usr_token}/trips_end_hour.png')
  
  def avg_duration_by_hour(self, which_hour='HORA_SAIDA', title='Average duration of trip by start hour', xlabel='Start hour', ylabel='Avg. duration'):
    self.trips[which_hour] = pd.to_datetime(self.trips[which_hour], format='%H:%M:%S')
    durations_hour = self.trips[[f'{which_hour}', 'DURACAO']].copy()
    durations_hour[f'{which_hour}'] = durations_hour[f'{which_hour}'].dt.hour
    avg_duration_by_hour = durations_hour.groupby(f'{which_hour}')['DURACAO'].mean()
    fig, ax = plt.subplots(figsize=(12,12))
    ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)
    time_axis = np.sort(durations_hour[f'{which_hour}'].unique())
    ax.xaxis.set_ticks(time_axis)
    duration = avg_duration_by_hour['DURACAO']/60
    ax.plot(time_axis, duration)
  
  def avg_duration_by_start_hour(self):
    self.avg_duration_by_hour()
    plt.savefig(f'static/charts/{self.usr_token}/avg_duration_start_hour.png')
  
  def avg_duration_by_end_hour(self):
    self.avg_duration_by_hour(which_hour = 'HORA_CHEG', title='Average duration of trip by end hour', xlabel='End hour')
    plt.savefig(f'static/charts/{self.usr_token}/avg_duration_end_hour.png')
  
  def age_chart(self, num_bins=20):
    age_axis = self.trips['IDADE']
    fig, ax = plt.subplots()
    n, bins, patches = ax.hist(age_axis, num_bins, density=0)
    ax.set_xlabel('Age')
    ax.set_ylabel('Population density')
    ax.set_title(r'Age distribution')
    # Tweak spacing to prevent clipping of ylabel
    fig.tight_layout()
    plt.savefig(f'static/charts/{self.usr_token}/agechart.png')
  
  def pie_trip_reasons_by_hour(self, trips, which_hour='HORA_SAIDA', title='Reasons for bike trips for selected trip hours'):
    trips[which_hour] = pd.to_datetime(trips[which_hour], format='%H:%M:%S')
    reasons_hour = trips[[f'{which_hour}', 'PE_BICI']].copy()
    reasons_hour[f'{which_hour}'] = reasons_hour[f'{which_hour}'].dt.hour
    amount_by_reason = reasons_hour.groupby('PE_BICI').count()['HORA_SAIDA']
    fig, ax = plt.subplots(figsize=(12,12))
    labels = [
        'Short distance',
        'Public transport price',
        'Public transport access is too far',
        'Public transport is too slow',
        'Public transport route is too long',
        'Crowded public transport',
        'Fitness',
        'Others'
    ]
    ax.pie(amount_by_reason, explode=[0, 0, 1, 1, 1, 1, 0, 0], autopct='%1.1f%%')
    ax.legend(labels, loc = "upper right")
    plt.tight_layout()
    plt.savefig(f'static/charts/{self.usr_token}/trip_reasons_hour.png')
  
  def trip_reasons_by_hour(self, which_hour='HORA_SAIDA', title='Reasons for bike trips for selected trip hours'):
    self.trips[which_hour] = pd.to_datetime(self.trips[which_hour], format='%H:%M:%S')
    reasons_hour = self.trips[[f'{which_hour}', 'PE_BICI']].copy()
    reasons_hour[f'{which_hour}'] = reasons_hour[f'{which_hour}'].dt.hour
    amount_by_reason = reasons_hour.groupby('PE_BICI').count()['HORA_SAIDA']
    fig, ax = plt.subplots(figsize=(14,12))
    total_trips = len(self.trips)
    reasons = self.trips['PE_BICI'].unique()
    first_reason = reasons[0]
    last_reason = reasons[len(reasons) - 1]
    labels = ['',
        'Short\ndistance',
        'Public\ntransport price',
        'Public transport access\nis too far',
        'Public transport\nis too slow',
        'Public transport route\n is too long',
        'Crowded public transport',
        'Fitness',
        'Others'
    ]
    labels = [labels[i] for i in reasons]
    rects = ax.barh(labels, amount_by_reason)
    i=0
    for rect in rects:
        pct = 100*amount_by_reason.iloc[i]/total_trips
        ax.annotate(f'{Decimal(pct).quantize(Decimal(10)**-2)} %', xy=(rect.get_width() + 0.05, rect.get_y() + rect.get_height()/3))
        i+=1
    ax.set_title('Main reason for this time range')
    ax.set_xticks([])
    plt.tight_layout()
    plt.savefig(f'static/charts/{self.usr_token}/reasons_hour_bar.png')

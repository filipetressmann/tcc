import pandas as pd
import geopandas as gpd
import matplotlib.pyplot as plt
import numpy as np

class Charts:
  def __init__ (self, usr_token):
    self.usr_token = usr_token

  def age_chart(self, trips, num_bins=20):
    age_axis = trips['IDADE']
    fig, ax = plt.subplots()
    n, bins, patches = ax.hist(x, num_bins, density=0)
    ax.set_xlabel('Age')
    ax.set_ylabel('Population density')
    ax.set_title(r'Age distribution')
    # Tweak spacing to prevent clipping of ylabel
    fig.tight_layout()
    plt.savefig(f'{self.usr_token}/agechart.png')

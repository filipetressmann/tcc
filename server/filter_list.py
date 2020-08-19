# This object configures the filter list on view app. Also manages the creation of filter forms.
FILTERS = [
  {
    'category_name': 'layers',
    'filters': [
      {
        'id': 14,
        'filter_key': 'cptm',
        'filter_type': 'geojson',
        'filter_name': 'spRailway',
        'has_form': True
      },
      {
        'id': 15,
        'filter_key': 'subway',
        'filter_type': 'geojson',
        'filter_name': 'spSubway',
        'has_form': True
      },
      {
        'id': 16,
        'filter_key': 'bikelane',
        'filter_type': 'geojson',
        'filter_name': 'spBikelanes',
        'has_form': True
      },
    ]
  },
  {
    'category_name': 'timeFilters',
    'filters': [
      {
      'id': 0,
      'filter_key': 'start_time',
      'filter_type': 'polyline',
      'filter_name': 'start_time',
      'has_form': True
      },
      {
      'id': 17,
      'filter_key': 'finish_time',
      'filter_type': 'polyline',
      'filter_name': 'finish_time',
      'has_form': True
      }
    ]
  },
  {
    'category_name': 'tripFilters',
    'filters': [
      {
        'id': 3,
        'filter_key': 'distance',
        'filter_type': 'polyline',
        'filter_name': 'tripDistance',
        'has_form': True
      },
      {
        'id': 4,
        'filter_key': 'speed',
        'filter_type': 'polyline',
        'filter_name': 'avgSpeed',
        'has_form': True
      },
      {
        'id': 5,
        'filter_key': 'duration',
        'filter_type': 'polyline',
        'filter_name': 'tripDuration',
        'has_form': True
      },
      {
        'id': 6,
        'filter_key': 'reason',
        'filter_type': 'polyline',
        'filter_name': 'tripReason',
        'has_form': True
      }
    ]
  },
  {
    'category_name': 'populationFilters',
    'filters': [
      {
        'id': 7,
        'filter_key': 'sex',
        'filter_type': 'polyline',
        'filter_name': 'sex',
         'has_form': True
      },
      {
        'id': 8,
        'filter_key': 'age',
        'filter_type': 'polyline',
        'filter_name': 'age',
        'has_form': True
      },
      {
        'id': 9,
        'filter_key': 'income',
        'filter_type': 'polyline',
        'filter_name': 'income',
        'has_form': True
      },
    ]
  },
  {
    'category_name': 'geographicFilters',
    'filters': [
      {
        'id': 12,
        'filter_key': 'attractors_emitters',
        'filter_type': 'heatmap',
        'filter_name': 'attractors_emitters',
        'has_form': True
      }
    ]
  }
]
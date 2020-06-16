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
        'has_form': False
      },
      {
        'id': 15,
        'filter_key': 'subway',
        'filter_type': 'geojson',
        'filter_name': 'spSubway',
        'has_form': False
      },
      {
        'id': 16,
        'filter_key': 'bikelane',
        'filter_type': 'geojson',
        'filter_name': 'spBikelanes',
        'has_form': False
      },
    ]
  },
  {
    'category_name': 'timeFilters',
    'filters': [
      {
      'id': 0,
      'filter_key': 'horary',
      'filter_type': 'polyline',
      'filter_name': 'horary',
      'has_form': True
      },
      {
        'id': 1,
        'filter_key': 'weekday',
        'filter_type': 'polyline',
        'filter_name': 'weekday',
        'has_form': True
      },
      {
        'id': 2,
        'filter_key': 'holidays',
        'filter_type': 'polyline',
        'filter_name': 'holidays' ,
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
        'filter_type': 'todo',
        'filter_name': 'tripDistance',
        'has_form': False
      },
      {
        'id': 4,
        'filter_key': 'speed',
        'filter_type': 'todo',
        'filter_name': 'avgSpeed',
        'has_form': False
      },
      {
        'id': 5,
        'filter_key': 'duration',
        'filter_type': 'todo',
        'filter_name': 'tripDuration',
        'has_form': False
      },
      {
        'id': 6,
        'filter_key': 'reason',
        'filter_type': 'todo',
        'filter_name': 'tripReason',
        'has_form': False
      }
    ]
  },
  {
    'category_name': 'populationFilters',
    'filters': [
      {
        'id': 7,
        'filter_key': 'gender',
        'filter_type': 'todo',
        'filter_name': 'gender',
         'has_form': False
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
        'filter_type': 'todo',
        'filter_name': 'income',
        'has_form': False
      },
    ]
  },
  {
    'category_name': 'geographicFilters',
    'filters': [
      {
        'id': 12,
        'filter_key': 'attractor',
        'filter_type': 'todo',
        'filter_name': 'attractor',
        'has_form': False
      },
      {
        'id': 13,
        'filter_key': 'emitter',
        'filter_type': 'todo',
        'filter_name': 'emitter',
        'has_form': False
      }
    ]
  }
]
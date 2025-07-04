# This object configures the filter list on view app. Also manages the creation of filter forms.
FILTERS = [
    {
        'category_name': 'layers_highCapacityTransport',
        'filters': [
            {
                'id': 14,
                'filter_key': 'cptm_lines',
                'filter_type': 'geojson',
                'filter_name': 'spRailwayLines',
                'has_form': True,
                'has_checkbox': True
            },
            {
                'id': 21,
                'filter_key': 'cptm_stations',
                'filter_type': 'geojson',
                'filter_name': 'spRailwayStations',
                'has_form': True,
                'has_checkbox': True
            },
            {
                'id': 15,
                'filter_key': 'subway_lines',
                'filter_type': 'geojson',
                'filter_name': 'spSubwayLines',
                'has_form': True,
                'has_checkbox': True
            },
            {
                'id': 22,
                'filter_key': 'subway_stations',
                'filter_type': 'geojson',
                'filter_name': 'spSubwayStations',
                'has_form': True,
                'has_checkbox': True
            },
        ]
    },
    {
        'category_name': 'layers_bikelanes',
        'filters': [
            {
                'id': 16,
                'filter_key': 'sp_bikelane_ciclovia',
                'filter_type': 'geojson',
                'filter_name': 'sp_bikelane_ciclovia',
                'has_form': True,
                'has_checkbox': True
            },
            {
                'id': 18,
                'filter_key': 'sp_bikelane_ciclofaixa',
                'filter_type': 'geojson',
                'filter_name': 'sp_bikelane_ciclofaixa',
                'has_form': True,
                'has_checkbox': True
            },
            {
                'id': 19,
                'filter_key': 'sp_bikelane_ciclorrota',
                'filter_type': 'geojson',
                'filter_name': 'sp_bikelane_ciclorrota',
                'has_form': True,
                'has_checkbox': True
            },
        ]
    },
    {
        'category_name': 'layers_accidents',
        'filters': [
            {
                'id': 20,
                'filter_key': 'sp_accidents',
                'filter_type': 'geojson',
                'filter_name': 'sp_accidents',
                'has_form': True,
                'has_checkbox': True
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
                'has_form': True,
                'has_checkbox': False
            },
            {
                'id': 17,
                'filter_key': 'finish_time',
                'filter_type': 'polyline',
                'filter_name': 'finish_time',
                'has_form': True,
                'has_checkbox': False
            }
        ]
    },
    {
        'category_name': 'tripFilters',
        'filters': [
            # {
            #   'id': 3,
            #   'filter_key': 'distance',
            #   'filter_type': 'polyline',
            #   'filter_name': 'tripDistance',
            #   'has_form': True,
            #   'has_checkbox': True
            # },
            # {
            #   'id': 4,
            #   'filter_key': 'speed',
            #   'filter_type': 'polyline',
            #   'filter_name': 'avgSpeed',
            #   'has_form': True,
            #   'has_checkbox': True
            # },
            {
                'id': 5,
                'filter_key': 'duration',
                'filter_type': 'polyline',
                'filter_name': 'tripDuration',
                'has_form': True,
                'has_checkbox': True
            },
            {
                'id': 6,
                'filter_key': 'reason',
                'filter_type': 'polyline',
                'filter_name': 'tripReason',
                'has_form': True,
                'has_checkbox': False
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
                'has_form': True,
                'has_checkbox': False
            },
            {
                'id': 8,
                'filter_key': 'age',
                'filter_type': 'polyline',
                'filter_name': 'age',
                'has_form': True,
                'has_checkbox': True
            },
            {
                'id': 9,
                'filter_key': 'income',
                'filter_type': 'polyline',
                'filter_name': 'income',
                'has_form': True,
                'has_checkbox': False
            },
        ]
    },
    # {
    #   'category_name': 'geographicFilters',
    #   'filters': [
    #     {
    #       'id': 12,
    #       'filter_key': 'attractors_emitters',
    #       'filter_type': 'heatmap',
    #       'filter_name': 'attractors_emitters',
    #       'has_form': True,
    #       'has_checkbox': True
    #     }
    #   ]
    # }
]

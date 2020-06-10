# This object configures the filter list on view app. Also manages the creation of filter forms.
FILTERS = [
  {
    'category_name': 'Layers',
    'filters': [
      {
        'id': 14,
        'filter_key': 'cptm',
        'filter_type': 'geojson',
        'filter_name': 'Linhas da CPTM',
        'has_form': False
      },
      {
        'id': 15,
        'filter_key': 'subway',
        'filter_type': 'geojson',
        'filter_name': 'Linhas do Metrô',
        'has_form': False
      },
      {
        'id': 16,
        'filter_key': 'bikelane',
        'filter_type': 'geojson',
        'filter_name': 'Malha cicloviária',
        'has_form': False
      },
    ]
  },
  {
    'category_name': 'Filtros temporais',
    'filters': [
      {
      'id': 0,
      'filter_key': 'horary',
      'filter_type': 'polyline',
      'filter_name': 'Horário',
      'has_form': True
      },
      {
        'id': 1,
        'filter_key': 'weekday',
        'filter_type': 'polyline',
        'filter_name': 'Dia da semana',
        'has_form': True
      },
      {
        'id': 2,
        'filter_key': 'holidays',
        'filter_type': 'polyline',
        'filter_name': 'Feriados' ,
        'has_form': True
      }
    ]
  },
  {
    'category_name': 'Filtros de viagem',
    'filters': [
      {
        'id': 3,
        'filter_key': 'distance',
        'filter_type': 'todo',
        'filter_name': 'Distância percorrida',
        'has_form': False
      },
      {
        'id': 4,
        'filter_key': 'speed',
        'filter_type': 'todo',
        'filter_name': 'Velocidade média',
        'has_form': False
      },
      {
        'id': 5,
        'filter_key': 'duration',
        'filter_type': 'todo',
        'filter_name': 'Duração',
        'has_form': False
      },
      {
        'id': 6,
        'filter_key': 'reason',
        'filter_type': 'todo',
        'filter_name': 'Motivo da viagem',
        'has_form': False
      }
    ]
  },
  {
    'category_name': 'Filtros demográficos',
    'filters': [
      {
        'id': 7,
        'filter_key': 'gender',
        'filter_type': 'todo',
        'filter_name': 'Gênero',
         'has_form': False
      },
      {
        'id': 8,
        'filter_key': 'age',
        'filter_type': 'polyline',
        'filter_name': 'Idade',
        'has_form': True
      },
      {
        'id': 9,
        'filter_key': 'income',
        'filter_type': 'todo',
        'filter_name': 'Faixa de renda',
        'has_form': False
      },
      {
        'id': 10,
        'filter_key': 'bikereason',
        'filter_type': 'todo',
        'filter_name': 'Razões da escolha por bicicleta',
        'has_form': False
      },
      {
        'id': 11,
        'filter_key': 'walkreason',
        'filter_type': 'todo',
        'filter_name': 'Razões da escolha por andar a pé',
        'has_form': False
      }
    ]
  },
  {
    'category_name': 'Filtros geográficos',
    'filters': [
      {
        'id': 12,
        'filter_key': 'attractor',
        'filter_type': 'todo',
        'filter_name': 'Regiões atratoras de viagens',
        'has_form': False
      },
      {
        'id': 13,
        'filter_key': 'emitter',
        'filter_type': 'todo',
        'filter_name': 'Regiões emissoras de viagens',
        'has_form': False
      }
    ]
  }
]
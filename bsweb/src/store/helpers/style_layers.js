export const railway = function(data) {
  const LINE_7_COLOR = '#b81d64';
  const LINE_8_COLOR = '#a39e8c';
  const LINE_9_COLOR = '#00caaa';
  const LINE_10_COLOR = '#0088b0';
  const LINE_11_COLOR = '#e87a65';
  const LINE_12_COLOR = '#3b237b';
  const LINE_13_COLOR = '#00a250';
  let color = '';

  switch (data.properties.ltr_numero) {
  case 7:
    color = LINE_7_COLOR;
    break;
  case 8:
    color = LINE_8_COLOR;
    break;
  case 9:
    color = LINE_9_COLOR;
    break;
  case 10:
    color = LINE_10_COLOR;
    break;
  case 11:
    color = LINE_11_COLOR;
    break;
  case 12:
    color = LINE_12_COLOR;
    break;
  case 13:
    color = LINE_13_COLOR;
    break;
  default:
    break;
  }

  return { color, weight: 1.5 };
};

export const subway = function(data) {
  const LINE_1_COLOR = '#2a34a3';
  const LINE_2_COLOR = '#008963';
  const LINE_3_COLOR = '#f4000b';
  const LINE_4_COLOR = '#f9e300';
  const LINE_5_COLOR = '#8213a0';
  const LINE_15_COLOR = '#858d90';
  let color = '';

  switch(data.properties.lmt_linha) {
  case 1:
    color = LINE_1_COLOR;
    break;
  case 2:
    color = LINE_2_COLOR;
    break;
  case 3:
    color = LINE_3_COLOR;
    break;
  case 4:
    color = LINE_4_COLOR;
    break;
  case 5:
    color = LINE_5_COLOR;
    break;
  case 15:
    color = LINE_15_COLOR;
    break;
  default:
    break;
  }

  return { color, weight: 1.5 };
};

export const bikelane = function(data) {
  let color = '';
  let dashArray = '';
  if (data) {
    switch (data.properties.rc_tipo) {
    case 'ciclovia':
      color = '#ed2939';
      break;
    case 'ciclofaixa':
      color = '#ff781f';
      break;
    case 'ciclorrota':
      color = '#ff781f';
      dashArray = '10,10';
      break;
    default:
      color = '#999';
    }
    return { color, dashArray, weight: 2 };
  }
};

export const accidents = function (data) {
  const LINE_1_COLOR = '#2a34a3';
  const LINE_2_COLOR = '#008963';
  const LINE_3_COLOR = '#f4000b';
  const LINE_4_COLOR = '#f9e300';
  const LINE_5_COLOR = '#8213a0';
  const LINE_15_COLOR = '#858d90';
  let color = '';

  switch (data.properties.lmt_linha) {
  case 1:
    color = LINE_1_COLOR;
    break;
  case 2:
    color = LINE_2_COLOR;
    break;
  case 3:
    color = LINE_3_COLOR;
    break;
  case 4:
    color = LINE_4_COLOR;
    break;
  case 5:
    color = LINE_5_COLOR;
    break;
  case 15:
    color = LINE_15_COLOR;
    break;
  default:
    break;
  }

  return { color };
};

export const zones = function() {
  return {
    color: '#999',
    weight: 2,
    fillColor: 'none',
    opacity: 0.4,
    'z-index': 0,
  };
};

export const grid = function() {
  return {
    color: '#AAA',
    weight: 1.5,
    fillColor: 'none',
  };
};

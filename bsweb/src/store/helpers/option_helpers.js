import L from 'leaflet';
import iconCptmUrl from '@/assets/svg/icon-cptm.svg';
import iconMetroUrl from '@/assets/svg/icon-metro.svg';

const cptmIcon = new L.Icon({
  iconSize: [11, 11],
  popupAnchor: [0, -10],
  iconUrl: iconCptmUrl,
});

const metroIcon = new L.Icon({
  iconSize: [11, 11],
  popupAnchor: [0, -10],
  iconUrl: iconMetroUrl,
});

export const railway_station = {
  onEachFeature: function(feature, layer) {
    const tooltipMsg = `Linha ${feature.properties.etr_linha} - ${feature.properties.etr_nome}`;
    layer.bindPopup(tooltipMsg);
  },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: cptmIcon });
  },
};

export const railway_line = {
  onEachFeature: function(feature, layer) {
    const tooltipMsg = `Linha ${feature.properties.ltr_numero} - ${feature.properties.ltr_nome}`;
    layer.bindPopup(tooltipMsg);
  },
};

export const subway_station = {
  onEachFeature: function(feature, layer) {
    const tooltipMsg = `Linha ${feature.properties.emt_linha} - ${feature.properties.emt_nome}`;
    layer.bindPopup(tooltipMsg);
  },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: metroIcon });
  },
};

export const subway_line = {
  onEachFeature: function (feature, layer) {
    const tooltipMsg = `Linha ${feature.properties.lmt_linha} - ${feature.properties.lmt_nome}`;
    layer.bindPopup(tooltipMsg);
  },
};

export const bikeLane = {
  onEachFeature: function (feature, layer) {
    let tooltipMsg = '';
    const [year, month, day] = feature.properties.rc_inauguracao.split('-');
    const newDate = `${day}/${month}/${year}`;
    tooltipMsg = `${feature.properties.rc_nome}<br>Extensão: ${feature.properties.rc_extensao} m<br>Data de implantação: ${newDate}`;
    layer.bindPopup(tooltipMsg);
  },
};

export const accidents = {
  onEachFeature: function (feature, layer) {
    const {
      automovel,
      bicicleta, 
      caminhao,
      motocicleta,
      onibus,
      pedestre,
      data_acidente,
    } = feature.properties;

    const [year, month, day] = data_acidente.split('-');
    const newDate = `${day}/${month}/${year}`;

    let modais = [
      { type: 'automóvel', val: automovel },
      { type: 'bicicleta', val: bicicleta },
      { type: 'caminhão', val: caminhao },
      { type: 'motocicleta', val: motocicleta },
      { type: 'ônibus', val: onibus },
      { type: 'pedestre', val: pedestre },
    ].filter(item => item.val > 0).map(item => item.type).join(', ');
    
    let tooltipMsg = `Data do acidente: ${newDate}<br>Modais envolvidos: ${modais}`;
    layer.bindPopup(tooltipMsg);
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, { radius: 3, opacity: 0.6, fillOpacity: 0.6, fillColor: '#bb0000', color: '#bb0000' });
  },
};

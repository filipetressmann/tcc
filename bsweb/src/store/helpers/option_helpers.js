import L from 'leaflet';
import iconCptmUrl from '@/assets/svg/icon-cptm.svg';
import iconMetroUrl from '@/assets/svg/icon-metro.svg';

const cptmIcon = new L.Icon({
  iconSize: [18, 18],
  popupAnchor: [0, -10],
  iconUrl: iconCptmUrl
});

const metroIcon = new L.Icon({
  iconSize: [18, 18],
  popupAnchor: [0, -10],
  iconUrl: iconMetroUrl
});


export const railway = {
  onEachFeature: function(feature, layer) {
    const tooltipMsg = `Linha ${feature.properties.etr_linha} - ${feature.properties.etr_nome}`;
    layer.bindPopup(tooltipMsg);
  },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: cptmIcon });
  }
}

export const subway = {
  onEachFeature: function(feature, layer) {
    const tooltipMsg = `Linha ${feature.properties.emt_linha} - ${feature.properties.emt_nome}`;
    layer.bindPopup(tooltipMsg);
  },
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: metroIcon });
  }
}

export const bikeLane = {
  onEachFeature: function (feature, layer) {
    let tooltipMsg = '';
    const [year, month, day] = feature.properties.rc_inaugur.split('-');
    const newDate = `${day}/${month}/${year}`;
    tooltipMsg = `${feature.properties.rc_nome}<br>Extensão: ${feature.properties.rc_extensa} m<br>Data de implantação: ${newDate}`;
    layer.bindPopup(tooltipMsg);
  },
}

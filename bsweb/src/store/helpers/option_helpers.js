import L from 'leaflet';
import iconCptmUrl from '@/assets/icon-teste.png';
import iconMetroUrl from '@/assets/logo.png';

const cptmIcon = new L.Icon({
  iconSize: [27, 27], // size of the icon
  iconAnchor: [13, 27], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -24], // point from which the popup should open relative to the iconAnchor
  iconUrl: iconCptmUrl
});

const metroIcon = new L.Icon({
  iconSize: [27, 27], // size of the icon
  iconAnchor: [13, 27], // point of the icon which will correspond to marker's location
  popupAnchor: [1, -24], // point from which the popup should open relative to the iconAnchor
  iconUrl: iconMetroUrl
});


const railways = {
    onEachFeature: function(feature, layer) {
      let tooltipMsg = '';
      debugger;
      // if (feature.properties.etr_empres) {
      //   tooltipMsg = "Linha " + feature.properties.etr_linha + " - " + feature.properties.etr_nome;
      // } else {
      //   tooltipMsg = "Linha " + feature.properties.emt_linha + " - " + feature.properties.emt_nome;
      // }
      // temp pena estrutura cicloviária
    tooltipMsg = `${feature.properties.rc_nome} - ${feature.properties.rc_extensa} m`;

      // temp pena estrutura cicloviária
      layer.bindPopup(tooltipMsg);
    },
  pointToLayer: function (feature, latlng) {
    if (feature.properties.emt_empres)
      return L.marker(latlng, { icon: metroIcon });
    if (feature.properties.etr_empres)
      return L.marker(latlng, { icon: cptmIcon });
    return L.marker(latlng);
  }
}

export { railways };
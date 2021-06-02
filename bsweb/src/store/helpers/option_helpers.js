const railways = {
    onEachFeature: function(feature, layer) {
      let tooltipMsg = '';
      debugger;
      if (feature.properties.etr_empres) {
        tooltipMsg = "Linha " + feature.properties.etr_linha + " - " + feature.properties.etr_nome;
      } else {
        tooltipMsg = "Linha " + feature.properties.emt_linha + " - " + feature.properties.emt_nome;
      }
      layer.bindPopup(tooltipMsg);
    }
  }

export { railways };
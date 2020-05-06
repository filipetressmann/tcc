const rail_options = {
    onEachFeature: function(feature, layer) {
      let tooltipMsg = '';
      if (feature.properties.ltr_numero) {
        tooltipMsg = "Linha " + feature.properties.ltr_numero + " - " + feature.properties.ltr_nome;
      } else {
        tooltipMsg = "Linha " + feature.properties.lmt_linha + " - " + feature.properties.lmt_nome;
      }
      layer.bindPopup(tooltipMsg);
      console.log(feature.properties);
    }
  }

export { rail_options };
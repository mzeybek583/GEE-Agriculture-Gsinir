// Import shapefile
var shp = ee.FeatureCollection('projects/ee-muzo583/assets/gsinirbound');

var scale = Map.getScale()
var text = require('users/gena/packages:text');

// Define visualization parameters
var visParams = {
  color: 'black', // Set the color to red (hex color code)
  opacity: 0.5 // Set the opacity to 0.5 (range: 0-1)
};
var labels = shp.map(function(feat) {
  feat = ee.Feature(feat)
  var name = ee.String(feat.get("Detay_Adı"))
  var centroid = feat.geometry().centroid()
  var t = text.draw(name, centroid, scale, {
    fontSize:32, 
    fontType: 'Consolas',
    textColor:'red',
    outlineWidth: 0.5,
    outlineColor: 'black'
  })
  return t
})
var labels_final=ee.ImageCollection(labels)

Map.addLayer(shp, visParams, 'Çalışma Alanı Sınırları');
Map.centerObject(shp,10);
Map.addLayer(labels_final, {}, 'Labels');

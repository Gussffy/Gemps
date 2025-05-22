const customGeoJSON = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "Name": "Rota 1" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-40.8333019, -14.8638218],
                    [-40.8332912, -14.8638429],
                    [-40.8332309, -14.8639523]
                ]
            }
        }
    ]
};

L.geoJSON(customGeoJSON, {
    style: function (feature) {
        return { color: "blue", weight: 3 };
    }
}).addTo(map);
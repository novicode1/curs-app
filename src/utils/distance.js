export default function(loc1, loc2) {
  if (!loc1 || !loc2) {
    return '';
  }
  return distanceBetweenCoordinates(loc1, loc2, 6371); // km
}

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function distanceBetweenCoordinates(loc1, loc2, radius) {
  if (Array.isArray(loc1)) {
    loc1 = { lng: loc1[0], lat: loc1[1] };
  }
  if (Array.isArray(loc2)) {
    loc2 = { lng: loc2[0], lat: loc2[1] };
  }
  var dLat = degreesToRadians(loc2.lat - loc1.lat);
  var dLng = degreesToRadians(loc2.lng - loc1.lng);

  var lat1 = degreesToRadians(loc1.lat);
  var lat2 = degreesToRadians(loc2.lat);

  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (radius * c).toFixed(1);
}

import leaflet from 'leaflet';

const map = L.map('map').setView([59.93911192641083, 30.319588841008496], 17);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const marker = L.icon({
    iconUrl: '/img/map-pin.png',
    iconSize: [57, 53],
    iconAnchor: [31, 53],
    className: 'map__pin',
});

L.marker([59.93872455699752, 30.323020577422998], { icon: marker }).addTo(map);

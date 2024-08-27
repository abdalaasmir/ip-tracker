let search = document.querySelector(".s-bar");
let after = document.querySelector(".after");
let map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

function api(link) {
  link =
    link ||
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_bDWK1yokCz9ghMAcWXgM46ySsazDT";

  fetch(link)
    .then((response) => response.json())
    .then((data) => get(data))
    .catch((error) => console.error("Error:", error));

  function get(datas) {
    const ip = datas.ip;
    const country = datas.location.region;
    const timeZone = datas.location.timezone;
    const isp = datas.isp;
    const ispDoc = document.querySelector(".isp-info");
    const locDoc = document.querySelector(".loc-info");
    const ipDoc = document.querySelector(".ip-info");
    const timeDoc = document.querySelector(".time-info");
    ispDoc.textContent = isp;
    locDoc.textContent = country;
    ipDoc.textContent = ip;
    timeDoc.textContent = timeZone;
    let lat = datas.location.lat;
    let lng = datas.location.lng;
    console.log(lat, lng);

    map.setView([lat, lng], 16);
    L.marker([lat, lng])
      .addTo(map)
      .bindPopup("got u mother fucker.")
      .openPopup();
  }
}

after.addEventListener("click", function button() {
  let newIp = search.value;
  let newlinK =
    "https://geo.ipify.org/api/v2/country,city?apiKey=at_bDWK1yokCz9ghMAcWXgM46ySsazDT&ipAddress=" +
    newIp;
  return api(newlinK);
});

api();

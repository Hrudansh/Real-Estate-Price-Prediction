function getSelectedValue(name) {
  const radios = document.getElementsByName(name);
  for (let radio of radios) {
    if (radio.checked) {
      return parseInt(radio.value);
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  const area = parseFloat(document.getElementById("uiarea").value);
  const bhk = getSelectedValue("uiBHK");
  const New = getSelectedValue("uinew");
  const gym = getSelectedValue("uigym");
  const lift = getSelectedValue("uilift");
  const club = getSelectedValue("uiclub");
  const car = getSelectedValue("uicar");
  const gas = getSelectedValue("uigas");
  const track = getSelectedValue("uitrack");
  const pool = getSelectedValue("uipool");
  const location = document.getElementById("uiLocations").value;

  const estPriceElement = document.getElementById("uiEstimatedPrice");

  const data = new FormData();
  data.append("Area", area);
  data.append("Location", location);
  data.append("bhk", bhk);
  data.append("New_or_Resale", New);
  data.append("Gymnasium", gym);
  data.append("Lift_Available", lift);
  data.append("Car_Parking", car);
  data.append("Clubhouse", club);
  data.append("Gas_Connection", gas);
  data.append("Jogging_Track", track);
  data.append("Swimming_Pool", pool);

  fetch("http://127.0.0.1:5000/predict_home_price", {
    method: "POST",
    body: data
  })
    .then(response => response.json())
    .then(result => {
      estPriceElement.innerHTML = `<h2>₹ ${result.estimated_price}</h2>`;
    })
    .catch(error => {
      console.error("Error:", error);
      estPriceElement.innerHTML = `<h2 style="color:red">Failed to fetch price</h2>`;
    });
}

function onPageLoad() {
  fetch("http://127.0.0.1:5000/get_location_names")
    .then(response => response.json())
    .then(data => {
      if (data && data.locations) {
        const uiLocations = document.getElementById("uiLocations");
        uiLocations.innerHTML = '<option disabled selected>Choose a Location</option>';
        data.locations.forEach(location => {
          const opt = new Option(location);
          uiLocations.appendChild(opt);
        });
      }
    })
    .catch(error => console.error("Error fetching locations:", error));
}

window.onload = onPageLoad;

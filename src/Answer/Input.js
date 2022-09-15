import { useState } from "react";
import { fetchCities, getCitiesCoords } from "./service";
import { channel } from "../realtime";
const Input = () => {
  const [city, setCity] = useState("");
  const [autocompleteCities, setAutocompleteCities] = useState([]);
  const [autocompleteErr, setAutocompleteErr] = useState("");

  const handleCityChange = async (e) => {
    setCity(e.target.value);
    if (!city) return;

    const res = await fetchCities(city);
    !autocompleteCities.includes(e.target.value) && res.features && setAutocompleteCities(res.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr("");
  };

  const handleGeo = async () => {
    const res = await getCitiesCoords(city);

    const coordinates = res.features[0].geometry.coordinates;
    console.log(coordinates);
    channel.publish("update", { lng: coordinates[0], lat: coordinates[1], city: city });
  };

  return (
    <div className="">
      {autocompleteErr && <span>{autocompleteErr}</span>}

      <div className="input-group mb-3">
        <input
          class="form-control"
          list="places"
          type="text"
          id="city"
          name="city"
          onChange={handleCityChange}
          value={city}
          required
          pattern={autocompleteCities.join("|")}
          autoComplete="off"
          placeholder="Enter your city"
        />
        <datalist id="places">
          {autocompleteCities.map((city, i) => (
            <option key={i}>{city}</option>
          ))}
        </datalist>
        <button type="button" className="btn btn-primary" onClick={handleGeo}>
          Choose
        </button>
      </div>
    </div>
  );
};

export default Input;

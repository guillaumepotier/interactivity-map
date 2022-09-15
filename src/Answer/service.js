const api_key = "pk.eyJ1IjoiYmVub2l0am9mZnJlIiwiYSI6ImNqcjliZDM4ZzBlbXgzemw4c2pyZmlibWoifQ.K6ARwtwxkDXNAsHrR04liA";

// AUTOCOMPLETE
export const fetchCities = async (city) => {
  try {
    const res = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${api_key}&cachebuster=1625641871908&autocomplete=true&types=place`
    );
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return { error: "Unable to retrieve cities" };
  }
};

// GET COORDS

export const getCitiesCoords = async (city) => {
  try {
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${api_key}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return { error: "Unable to retrieve  city" };
  }
};

// REVERSE GEOCODING

export const getCityName = async (lng, lat) => {
  try {
    const res = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?types=place&access_token=${api_key}`);
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
  } catch (err) {
    return { error: "Unable to retrieve city" };
  }
};

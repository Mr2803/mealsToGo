import camelize from "camelize";
import { host, isMock } from "../../utils/env";

export const locationRequest = (searchTerm) => {
  return fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`).then(
    (res) => {
      console.log(res);
      // console.log(searchTerm);
      // console.log(res.json());
      return res.json();
    }
  );
};

export const locationTransform = (result) => {
  const formattedResponse = camelize(result);
  console.log("location", result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};

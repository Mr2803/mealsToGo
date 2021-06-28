const { locations: locationsMock } = require("./geocode.mock");
const functions = require("firebase-functions");

module.exports.geocodeRequest = (request, response, client) => {
  // console.log(functions);
  const { city, mock } = request.query;
  if (mock === "true") {
    const locationMock = locationsMock[city];
    return response.json(locationMock);
  }
  client
    .geocode({
      params: {
        address: city,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      return response.json(res.data);
    })
    .catch((err) => {
      response.status(400);
      return response.send(err.response.data.error_message);
    });
};

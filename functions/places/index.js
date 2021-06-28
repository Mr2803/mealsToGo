const { mocks, addMockImage } = require("./mock");
const functions = require("firebase-functions");

const GOOGLE_KEY = functions.config().google.key;
const addGoogleImage = (restaurant) => {
  const ref = restaurant.photos;
  // console.log("questi sono i ref", ref);
  if (!ref) {
    restaurant.photos = [
      "https://www.foodiesfeed.com/wp-content/uploads/2019/06/top-view-for-box-of-2-burgers-home-made-600x899.jpg",
    ];
    return restaurant;
  }
  restaurant.photos = [
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ref[0].photo_reference}&key=${GOOGLE_KEY}`,
  ];
  return restaurant;
};

module.exports.placesRequest = (request, response, client) => {
  const { location, mock } = request.query;
  const data = mocks[location];
  if (mock === "true") {
    console.log("mock true");
    if (data) {
      data.results = data.results.map(addMockImage);
    }
    return response.json(data);
  }
  client
    .placesNearby({
      params: {
        location: location,
        radius: 1500,
        type: "restaurant",
        key: GOOGLE_KEY,
      },
      timeout: 1000,
    })
    .then((res) => {
      res.data.results = res.data.results.map(addGoogleImage);
      // console.log(res.data.results[0].photos[0]);
      return response.json(res.data);
    })
    .catch((e) => {
      console.log("PLACESNEARBY ERROR ====>", e);
      response.status(400);
      return response.send(e.response.data);
    });
};

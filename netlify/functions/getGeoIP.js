const fetch = require("node-fetch");

exports.handler = async (event, context) => {
  const API_ENDPOINT = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEO_API_KEY}&ip=${event.queryStringParameters.ip}`;
  console.log(event);
  console.log(context);
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Failed fetching data" }),
      };
    }
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};

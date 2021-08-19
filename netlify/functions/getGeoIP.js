const fetch = require("node-fetch");

const API_ENDPOINT = `https://geo.ipify.org/api/v1?apiKey=${process.env.GEO_API_KEY}`;

exports.handler = async (event, context) => {
  try {
    const response = await fetch(API_ENDPOINT);
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify({ data }) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching data" }),
    };
  }
};

/* eslint-disable no-useless-escape */
const fetch = require("node-fetch");

async function getIPFromDomain(domain){
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}`, { mode: "cors" });
    let data = await response.json();
    return data.Answer[0].data;
  } catch (e) {
    return null;
  }
}

exports.handler = async (event, context) => {
  try {
    let response;
    // Without IP address just use local IP by sending fetch request without query parameters
    let searchString = `https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.API_KEY}`
    // If IP address is present, add it to the query parameters
    if (event.queryStringParameters.ip){
      let ipAddress = event.queryStringParameters.ip
      // Check if ip address is domain name and not ip address
      if (ipAddress.match(/^[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}$/)){
        // If IP is domain name then look it up in DNS to get IP address
        ipAddress = await getIPFromDomain(ipAddress)
      }
      // Finally add IP address to query parameters
      searchString += `&ip=${ipAddress}`
    } 
    response = await fetch(searchString)
    if (response.status === 200) {
    let data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }}
    else {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Failed fetching data" }),
      };
    }
  }
  catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
}
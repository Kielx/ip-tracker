// Resolve domain name to ip address
export async function getIPFromDomain(domain){
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}`, { mode: "cors" });
    let data = await response.json();
    return data.Answer[0].data;
  } catch (e) {
    return null;
  }
}

// Gets the user's geolocation data
export async function getGeolocation(ipAddress){
  try {
    let response;
    // Without IP address just use local IP by sending fetch request without query parameters
    let searchString = "https://api.ipgeolocation.io/ipgeo?apiKey=e02994b140d6473594d58ada07b4474b"
    // If IP address is present, add it to the query parameters
    if (ipAddress){
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
    return data; }
    else {
      return null;
    }
  }
  catch (e) {
    return null;
  }
}

import { useState, useEffect } from "react";

const Location = () => {
  const [city, setCity] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  const fetchLocationData = async () => {
    try {
      const apiKey = "AIVGQYcF0AuWAIlXChYiRGcEaFuEwR9l";
      const res = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${city}&apikey=${apiKey}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch data. Status: ${res.status}`);
      }

         const data = await res.json();
         console.log(data);
         
         const eventsInCity = setLocationData.filter((event) => {
           event._embedded.venues.some(
             (venue) => venue.city && venue.city.name === city
           );
         });
      setLocationData(eventsInCity);
      console.log(eventsInCity);
    } catch (err) {
      setError(err);
      console.log("Error: ", err);
    }
  };

  const handleLocation = () => fetchLocationData();
     return (
       <div>
         <div>
           <input
             type="text"
             value={city}
             onChange={(e) => setCity(e.target.value)}
             placeholder="enter city"
           />
           <button onClick={handleLocation}>Locate</button>
         </div>
         <div>
           {error ? (
             <p>Error: {error.message}</p>
           ) : locationData ? (
             locationData._embedded.events.map((result) => (
               <div key={result.id}>
                 <h2>{result.name}</h2>
                 <img
                   src={result.images[0].url}
                   alt={result.name}
                   className="h-20 w-40"
                 />
               </div>
             ))
           ) : null}
         </div>
       </div>
     );
};

export default Location;

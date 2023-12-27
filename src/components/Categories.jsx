import { useState, useEffect } from "react";

const Categories = () => {
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "AIVGQYcF0AuWAIlXChYiRGcEaFuEwR9l";
        const response = await fetch(
          `https://localhost:5173/discovery/v2/events.json?size=18&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        setEventData(json);
      } catch (err) {
        setError(err);
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures that useEffect runs only once, equivalent to componentDidMount

  return (
    <div>
      <h1>Ticketmaster Event</h1>
      {error ? (
        <p>Error: {error.message}</p>
      ) : eventData ? (
        eventData._embedded.events.map((result) => (
          <div key={result.id}>
            <h2>{result.name}</h2>
            <img
              src={result.images[0].url}
              alt={result.name}
              className="h-20 w-20"
            />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Categories;

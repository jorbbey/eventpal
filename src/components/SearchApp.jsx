import { useState, useEffect } from "react";

const SearchApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const apiKey = "AIVGQYcF0AuWAIlXChYiRGcEaFuEwR9l";
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchTerm}&apikey=${apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const data = await response.json();
      setEventData(data);
      console.log(data);
    } catch (err) {
      setError(err);
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchData();
    }
  }, []);

  return (
    <div>
      <h1>Ticketmaster Event Search</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : eventData ? (
        eventData._embedded.events.map((result) => (
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
  );
};

export default SearchApp;

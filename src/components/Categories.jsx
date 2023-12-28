import { useState, useEffect } from "react";
import Button from "./Button";
import CarouselHead from "./CarouselHead";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { CiLocationArrow1 } from "react-icons/ci";
import { BiLogoFacebook } from "react-icons/bi";
import { RiTwitterXLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { TiSocialGooglePlus } from "react-icons/ti";

const Categories = () => {
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = "AIVGQYcF0AuWAIlXChYiRGcEaFuEwR9l";
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?size=45&apikey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setEventData(data);
      } catch (err) {
        setError(err);
        console.error("Error:", err);
      }
    };

    fetchData();
  }, []);

  // pagination function

  // Check if eventData is null before accessing its properties
  const currentEvents =
    // eslint-disable-next-line no-prototype-builtins
    eventData?.hasOwnProperty("_embedded") && eventData._embedded.events
      ? eventData._embedded.events.slice(
          (currentPage - 1) * eventsPerPage,
          currentPage * eventsPerPage
        )
      : [];

  // const handlePrevPage = () => {
  //   console.log("Previous page clicked");
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  // };

  const handleNextPage = () => {
    console.log("Next page clicked");
    setCurrentPage((prevPage) =>
      Math.min(
        prevPage + 1,
        Math.ceil((eventData?._embedded?.events?.length || 0) / eventsPerPage)
      )
    );
  };

  // options for date conversion
  const dateOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  //options for time conversion
  const timeOptions = { hour: "numeric", hour12: true };

  return (
    <div className=" w-[90%] md:-[80%] mx-auto">
      <CarouselHead
        head="categories"
        subHead="Select an event to attend today"
      />
      {/* carousel ctn */}
      <div className=" flex flex-col justify-around items-center md:flex-row md:flex-wrap w-[100%]">
        {error ? (
          <p>Error: {error.message}</p>
        ) : eventData ? (
          currentEvents.map((result) => (
            // carousel
            <div
              key={result.id}
              className=" my-10 w-full md:w-96 md:mx-5 rounded-tl-2xl rounded-tr-2xl bg-slate-100"
            >
              {/* image */}
              <div className="w-full">
                <img
                  src={result.images[0].url}
                  alt={result.name}
                  className="h-full w-full rounded-tl-2xl rounded-tr-2xl"
                />
              </div>

              {/* event name */}
              <h1 className="font-bold text-xl md:text-2xl">{result.name}</h1>

              {/* location arrow and venue */}
              <div className=" flex justify-center items-start md:justify-start my-3">
                <i className="bg-white p-0 rounded-full mr-2 md:mr-4">
                  <CiLocationArrow1 className="text-xl md:text-2xl mx-1 text-red-500 font-extrabold" />
                </i>
                <p className="text-bold text-sm">
                  {result._embedded.venues[0].name}
                  {result._embedded.venues[0].address.line1}
                  {result._embedded.venues[0].city.name}
                </p>
              </div>

              {/* time and date */}
              <div className=" m-3">
                <p className="text-sm text-purple-600">
                  {new Intl.DateTimeFormat("en-GB", dateOptions).format(
                    new Date(result.dates.start.dateTime)
                  )}{" "}
                  {/* date convertion */}
                </p>
                <p className="text-sm text-purple-600">
                  {new Intl.DateTimeFormat("en-US", timeOptions).format(
                    new Date().setHours(
                      ...result.dates.start.localTime.split(":")
                    )
                  )}{" "}
                  {/* time convertion */}
                </p>
              </div>

              {/* buy button */}
              <div className="m-3">
                {result.accessibility ? (
                  <Button text="buy tickets!" />
                ) : (
                  <Button text="get tickets!" />
                )}
              </div>

              {/* tickets */}
              <div className="m-3 text-xs text-gray-400 md:text-sm">
                {result.accessibility ? (
                  <p>{result.accessibility.ticketLimit} tickets avialable</p>
                ) : (
                  <p>No tickets restrictions</p>
                )}
              </div>

              {/* download and price range */}
              <div>
                <i className="absolute ml-64 -mt-14 md:ml-72 md:-mt-16 bg-gray-300 p-3 rounded-full">
                  <FaArrowRightToBracket className="text-3xl text-red-300 font-extrabold rotate-90 md:text-4xl" />
                </i>
                {result.priceRanges ? (
                  <p className="absolute ml-64 mt-4 md:ml-72 md:mt-6 text-lg md:text-xl font-bold text-purple-300">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: result.priceRanges[0].currency,
                    }).format(result.priceRanges[0].min)}
                  </p>
                ) : (
                  <p className="absolute ml-64 mt-4 md:ml-72 md:mt-6 text-lg md:text-xl font-bold text-purple-300 capitalize">
                    free
                  </p>
                )}
              </div>

              {/* share buttons */}
              <div className="my-10 mx-3">
                <p>Share on:</p>
                <div className="flex">
                  <BiLogoFacebook />
                  <RiTwitterXLine />
                  <FaInstagram />
                  <TiSocialGooglePlus />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* pagination buttons */}
      <div>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage ===
            Math.ceil(
              (eventData?._embedded?.events?.length || 0) / eventsPerPage
            )
          }
          className="cursor-pointer text-md md:text-xl text-red-500 font-semibold absolute right-5 my-10"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default Categories;

/* name 
  venue
  day, date
  time
  ticket btn
  no. of tickets purchaced
  download btn 
  price
  share on (facebk, X, insta, google)
  */

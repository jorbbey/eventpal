import "./input.css";
import SearchApp from "./components/SearchApp";
import Categories from './components/Categories'
import Location from "./components/Location";

const App = () => {
  return (
    <>
      <div>
        <SearchApp />
        <Categories />
        {/* <Location/> */}
      </div>
    </>
  );
};

export default App;

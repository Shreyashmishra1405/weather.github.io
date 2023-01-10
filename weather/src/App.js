import React from "react";
import "./App.css";
import { useState } from "react";
function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  async function fetchAsync() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2f7529c85002a2337c445b15af3076c0`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.cod === "404") {
      alert("not found.Enter a valid city");
      setCity(" ");
    } else {
      setData(data);
    }
  }

  const handleclick = async (e) => {
    fetchAsync();
  };

  const handlekeypress = (e) => {
    if (e.key === "Enter") fetchAsync();
  };

  return (
    <div className="mainContainer">
      <div className="lhsContainer">
        <h1 className="temperatureContainer">
          {data == null ? " " : Math.round(data.main.temp - 273.5)}
        </h1>
      </div>

      <div className="rhsContainer">
        <div className="inputContainer">
          <input
            className="inputContainerSearchbar"
            value={city}
            onChange={(e) => setCity(e.target.value.toUpperCase())}
            onKeyPress={handlekeypress}
          />

          <button className="inputContainerbtn" onClick={handleclick}>
            <i className="fa-solid fa-magnifying-glass-location fa-2x"></i>
          </button>
        </div>
        <div className="weatherDetails">
          <div className="weatherContainer">
            <div className="font"> Description: </div>
            <div>
              <h1 className="weatherinfo">
                {data == null ? " " : data.weather[0].description}
              </h1>
            </div>
          </div>
          <div className="humidityContainer">
            <div className="font"> Humidity: </div>
            <div>
              <h1 className="weatherinfo">
                {data == null ? "" : data.main.humidity}
              </h1>
            </div>
          </div>
          <div className="windspeedContainer">
            <div className="font">Wind Speed:</div>
            <div>
              <h1 className="weatherinfo">
                {data == null ? "" : data.wind.speed}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

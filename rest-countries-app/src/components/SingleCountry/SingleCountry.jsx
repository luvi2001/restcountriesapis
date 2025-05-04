import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { getWidowSize } from "../hooks/useWindowSize";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function CountryDetail() {
  let windowSize = getWidowSize();
  const params = useParams();
  const { state } = useLocation();
  const countryName = params.country;
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  console.log(countryData);

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common,
      nativeName: Object.values(data.name.nativeName || { common: data.name.common })[0]?.common || data.name.common,
      population: data.population,
      region: data.region,
      subregion: data.subregion,
      capital: data.capital || [],
      flag: data.flags.svg,
      tld: data.tld,
      languages: Object.values(data.languages || {}).join(", "),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(", "),
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setTimeout(() =>
        setCountryData((prevState) => ({ ...prevState, borders }))
      );
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
      });
  }, [countryName]);

  const handleAddToFavourite = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first.");
  
    try {
      const decoded = jwtDecode(token);
      const email = decoded.email;
  
      const res = await axios.post("http://localhost:5000/api/auth/favorite", {
        email: email,
        country: countryData.name,
      });
  
      alert(res.data.message || "Country added to favourites!");
    } catch (error) {
      console.error("Error adding to favourites:", error);
      const message =
        error.response?.data?.message || "An unexpected error occurred.";
      alert(message);
    }
  };
  

  if (notFound) {
    return <div>Country Not Found</div>;
  }

  return countryData === null ? (
    "loading..."
  ) : (
    <main className="mt-6">
      <h1 className="text-center opacity-45">{`${windowSize.width}X${windowSize.height}`}</h1>
      <div className="country-details-container">
        <span
          className="back-button cursor-pointer"
          onClick={() => history.back()}
        >
          <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} alt={`${countryData.name} flag`} />
          <div className="details-text-container">
            <h1 className="text-3xl font-bold mb-4">{countryData.name}</h1>

            <button
              onClick={handleAddToFavourite}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            >
              Add to Favourite
            </button>

            <div className="details-text">
              <p><b>Native Name: {countryData.nativeName}</b></p>
              <p><b>Population: {countryData.population.toLocaleString("en-IN")}</b></p>
              <p><b>Region: {countryData.region}</b></p>
              <p><b>Sub Region: {countryData.subregion}</b></p>
              <p><b>Capital: {countryData.capital.join(", ")}</b></p>
              <p><b>Top Level Domain: {countryData.tld}</b></p>
              <p><b>Currencies: {countryData.currencies}</b></p>
              <p><b>Languages: {countryData.languages}</b></p>
            </div>

            {countryData.borders.length !== 0 && (
              <div className="border-countries">
                <b>Border Countries: </b>&nbsp;
                {countryData.borders.map((border) => (
                  <Link key={border} to={`/${border}`}>
                    {border}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

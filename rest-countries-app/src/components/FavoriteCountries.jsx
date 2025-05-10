import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const FavoriteCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchFavoriteCountries = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');

        // Decode JWT to extract email
        const decoded = jwtDecode(token);
        const email = decoded.email;

        // Send email to backend without auth header
        const res = await axios.get(`http://localhost:5000/api/auth/favorites?email=${encodeURIComponent(email)}`);
        const favoriteCountries = res.data.favoriteCountries;

        const countryData = await Promise.all(
          favoriteCountries.map(async (name) => {
            const response = await axios.get(
              `https://restcountries.com/v3.1/name/${encodeURIComponent(name)}?fullText=true`
            );
            return response.data[0];
          })
        );

        setCountries(countryData);
      } catch (err) {
        console.error('Error fetching countries:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCountries();
  }, []);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg shadow"
        >
          ← Back
        </button>
      </div>

      {loading ? (
        <p className="text-center mt-10 text-gray-600">Loading favorite countries...</p>
      ) : countries.length === 0 ? (
        <p className="text-center mt-10 text-gray-600">No favorite countries found.</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-center mb-6 text-indigo-700">Your Favorite Countries</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countries.map((country) => (
              <div key={country.cca3} className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-lg transition duration-200">
                <img src={country.flags.svg} alt={country.name.common} className="w-full h-40 object-cover" />
                <div className="p-4 text-center">
                  <h4 className="text-lg font-medium text-gray-800">{country.name.common}</h4>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoriteCountries;

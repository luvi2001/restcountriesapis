🌍 Countries Explorer
A modern web application built with React, Vite, and Tailwind CSS that fetches data from the REST Countries API to display and filter country information.

✨ Features

Search for countries by name
Filter by region
View detailed information about each country
Fully responsive UI using Tailwind CSS
Super-fast performance with Vite
Dynamic routing with React Router
User session management
add favourite countries
The project uses the REST Countries API v3.1 to retrieve country data such as:

Country name Flag Population Region Capital Languages Currencies Borders

https://restcountries.com/v3.1/all – Get all countries

https://restcountries.com/v3.1/name/{name} – Search countries by name

https://restcountries.com/v3.1/region/{region} – Filter countries by region

https://restcountries.com/v3.1/alpha/{code} – Fetch individual country details by code

🛠 Tech Stack

React
Vite
Tailwind CSS
REST Countries API
React Router
🚀 Getting Started

1. Clone the repository

git clone https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-luvi2001.git
cd af-2-LUVI200
cd rest-countries-app

----install packages-------
npm install

----run project------------
npm run dev

----hosted link------------
https://apicountries-weirdo.netlify.app/

Challenges Faced & Solutions
Challenge - Filtering performance - Filtering/searching over a large dataset caused lag
Implemented optimized search using debouncing (if needed) and region filters before name search

Challenge - Routing and state persistence - Navigating between home and detail views caused some state to reset
Solution - Used React Router for dynamic routing and ensured required data was passed via URL or fetched again

Challenge - The api was down for 1 week without proper anncounment
Solution - Waited for offical update from the author so worked on the other feature like authentication.#   r e s t c o u n t r i e s a p i s  
 
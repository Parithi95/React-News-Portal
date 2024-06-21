import React, { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./Pages/HomePage";

import { useSelector, useDispatch } from "react-redux";
import { addData } from "./Redux/Reducers/newsSlice";
import DetailedPage from "./Pages/DetailedPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "./Components/Loading";
import Error from "./Components/Error";

const API_KEY = "29e7bc3a59c14e3caf9a3ea4b72c6446"; // API key of NewsAPI

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setLoading(true);
      const resp = await axios.get(
        `https://api.worldnewsapi.com/top-news?source-country=in&language=en&date=&api-key=${API_KEY}` // Used Axios to integrate API
      );
      const result = await resp?.data?.top_news;

      const cat = ["all", "business", "technology", "entertainment"]; //As categories not available in API, manually generated categories

      const newData = result?.flatMap((altData) =>
        altData.news.map((details) => details)
      );

      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min); //Function to manipulate categories key randomly in data
      }

      const categorizedData = newData.map((item) => {
        const rndInt = randomIntFromInterval(1, 3);
        return {
          ...item,
          category: cat[rndInt], // Categories which are created manually , manipulated in data generated from API
        };
      });
      dispatch(addData(categorizedData));
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to integrate API which is in the function fetchData

  useEffect(() => {
    fetchData();
  }, []);

  // Create a component named as Loading to represent while API is in loading status,and Error component while error occurs

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="md:mx-auto">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage itemsPerPage={10} />} />
          <Route path="/detailed/:newsId" element={<DetailedPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

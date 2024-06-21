import React, { useState } from "react";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../index.css";

const HomePage = ({ itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const cat = ["all", "business", "news", "sports", "entertainment"];

  const data = useSelector((state) => state.news.newsData); // Data received from API which are stored in redux state management

  // For pagination, external Library named as React paginate was integrated. React paginate setup has done below
  const endOffset = itemOffset + itemsPerPage;
  const filteredData = data?.filter((item) => {
    if (selectedCategory === "all") {
      return true;
    } else {
      if (item.category === selectedCategory) {
        return true;
      }
    }
  });

  const currentItems = filteredData?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredData.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="border  p-2  sm:w-5/6 sm:mx-auto md:w-9/12 md:mx-auto lg:w-2/4 lg:mx-auto">
      <div>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setItemOffset(0);
          }}
          className="capitalize p-2 my-2 border rounded-xl hover:bg-slate-100"
        >
          {cat.map((ct) => (
            <option className="">{ct}</option>
          ))}
        </select>
      </div>
      {currentItems?.map((source) => (
        <div
          key={source.id}
          className="border rounded-lg p-2 flex flex-col  mb-2 hover:bg-slate-100"
        >
          <div className="flex gap-5 ">
            <div className=" min-w-24 h-20 sm:min-w-28 md:min-w-48  ">
              <img
                src={
                  source.image !== ""
                    ? source.image
                    : "https://cdn.dribbble.com/users/4666518/screenshots/12129439/media/1fa542fa0afa853e090a57efb22e68df.jpg"
                }
                alt=""
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="flex flex-col gap-3 p-2 ">
              <Link
                to={`/detailed/${source.id}`}
                className="font-bold hover:underline decoration-solid underline-offset-2"
              >
                {source.title}
              </Link>
              <div className="flex  gap-5 ">
                <div className="capitalize">{source.category}</div>
                <div className="font-normal hidden md:block">
                  {source.author}
                </div>
                <div className="capitalize">
                  {moment(source.publish_date).fromNow()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< "
        renderOnZeroPageCount={null}
        containerClassName="paginationContainer"
        previousLinkClassName="previousButton"
        nextLinkClassName="nextButton"
        activeLinkClassName="activePage"
        pageLinkClassName="page"
      />
    </div>
  );
};

export default HomePage;

import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

const DetailedPage = () => {
  const { newsId } = useParams(); // Selected Id from Homepage has been passed through React Router via Link and received using useParams
  const numberNewsId = parseFloat(newsId);

  const data = useSelector((state) => state.news.newsData); //Data received from Redux State Management

  const singleNews = data.find((single) => single.id === numberNewsId); // Find out the specific Id which was selected from Homepage
  const { title, author, publish_date, image, text } = singleNews;

  // Steps to slice the paragraph into three small categories
  const sentences = text.match(/[^.!?]+[.!?]+/g);
  const partSize = Math.ceil(sentences.length / 3);
  const part1 = sentences.slice(0, partSize).join(" ");
  const part2 = sentences.slice(partSize, partSize * 2).join(" ");
  const part3 = sentences.slice(partSize * 2).join(" ");

  return (
    <div className="flex flex-col p-2 border  sm:w-5/6 sm:mx-auto md:w-9/12 md:mx-auto lg:w-2/4 lg:mx-auto">
      <div className="flex flex-col border mb-1 rounded-lg">
        <div className="p-2 font-bold ">{title}</div>
        <div className="p-2">Author Name : {author}</div>
      </div>
      <div className=" border rounded-lg">
        <p className=" p-2 underline decoration-solid underline-offset-2">
          {moment(publish_date).fromNow()}
        </p>

        <p className="p-2">{part1}</p>

        <div className="p-2 lg:w-2/4 lg:mx-auto">
          <img src={image} alt={title} />
        </div>
        <p className="p-2">{part2}</p>
        <p className="p-2">{part3}</p>
      </div>
    </div>
  );
};

export default DetailedPage;

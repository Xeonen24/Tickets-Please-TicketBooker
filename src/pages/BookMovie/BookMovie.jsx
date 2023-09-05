import React, { useState, useEffect } from "react";
import "./movie-grid.scss";
import "./movie-card.scss";
import MovieCarde from "./MovieCarde";
import { loggedIN } from "../../App";

const BookMovie = (props) => {
  const [title, setTitle] = useState("TicketsPlease | Currently in-cinemas");

  useEffect(() => {
    document.title = title;
    if(loggedIN){
      return;
    }else{
      window.location.href="/login";
    }
  }, [title]);

  return (
    <>
      {loggedIN ? (
        <ul>
          <MovieCarde />
        </ul>
      ) : (
        <>You're not logged in to do that. Redirecting to login....</>
      )}
    </>
  );
};

export default BookMovie;

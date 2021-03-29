import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
import Navbar from "./Navbar";
import ReactPaginate from "react-paginate";

function App() {
  const [userData, setUserData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  const cardsPerPage = 6;
  const pagesVisited = pageNumber * cardsPerPage;

  const pageCount = Math.ceil(userData.length / cardsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayCards = userData
    .slice(pagesVisited, pagesVisited + cardsPerPage)
    .map((user, idx) => {
      return (
        <div className="card__glass" key={idx}>
          <img src={user.picture.large} className="card__img" />

          <div className="card__data">
            <h3 className="card__title">
              {user.name.first} {user.name.last}
            </h3>
            <span className="card__profession">
              {user.location.country}, {user.location.state}
            </span>
          </div>

          <a href="#" className="card__button">
            Detail
          </a>

          <div className="card__social">
            <a href="#" className="card__link">
              <i className="fab fa-instagram" />
            </a>
            <a href="#" className="card__link">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#" className="card__link">
              <i className="fab fa-twitter" />
            </a>
          </div>
        </div>
      );
    });

  const fetchUserData = () => {
    Axios.get("https://randomuser.me/api/?results=36")
      .then((res) => {
        setUserData(res.data.results);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#dfe9f2" }}>
        <div style={{ backgroundColor: "#dfe9f2" }}>
          <h2 style={{ textAlign: "center" }}>Info User</h2>
          <section className="card__container bd-container">
            {displayCards}
          </section>
          {/* <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBtns"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActived"}
          /> */}
        </div>
      </div>
    </>
  );
}

export default App;

import React from "react";
import "../../css/main.css"
import Banner from "../component/Banner";
import Row from "../component/Row";
import Nav from "../component/Nav";
import Footer from "../component/Footer"

import requests from "../../configs/requests";

const Main = () => {
  const links = ['Home', 'TV Shows', 'Movies', 'New & Popular', 'My List']

  return (
    <div className='main-container'>
      <Nav links={links}/>
      <Banner />
      <Row
        title='Netflix Originals'
        fetchUrl={requests.fetchNetFlixOriginals}
        isLargeRow
      />
      <Row title='Trending Now' fetchUrl={requests.fetchTrending} />
      <Row title='Action' fetchUrl={requests.fetchActionMovies} />
      <Row title='Comedy' fetchUrl={requests.fetchComedyMovies} />
      <Row title='Horror' fetchUrl={requests.fetchHorrorMovies} />
      <Row title='Romance' fetchUrl={requests.fetchRomanceMovies} />
      <Row title='Documentaries' fetchUrl={requests.fetchDocumentaries} />
      <Footer/>
    </div>
  );
};

export default Main;

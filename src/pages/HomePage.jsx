import React from 'react';
import Header from './../components/Header.jsx';
import CarouselContainer from './../containers/CarouselContainer.jsx';
import CommentContainer from './../containers/CommentContainer.jsx';
import UserAvatarPicker from './../containers/UserAvatarPicker.jsx';
import Calendar from './../presentational/Calendar.jsx';
import CalendarContainer from './../containers/CalendarContainer.jsx';
import Pagination from './../presentational/Pagination.jsx';
import SearchResultCard from './../presentational/SearchResultCard.jsx';

const HomePage = () => {
  return (
    <div>
      {
        <div>
          <Header>
          </Header>
          <UserAvatarPicker />
          <CarouselContainer />
          <CommentContainer />
          <Calendar />
          <CalendarContainer />
          <Pagination />
          <SearchResultCard />
        </div>
      }
    </div>

  );
}

export default HomePage;
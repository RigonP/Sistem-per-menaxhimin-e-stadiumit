// TourDetail.js
import React from 'react';

const TourDetail = ({ tour }) => {
  return (
    <div>
      <h2>Tour:</h2>
      <p>ID: {tour.id}</p>
      <p>Emri: {tour.emri}</p>
      <p>Mbiemri: {tour.mbiemri}</p>
      <p>Statusi: {tour.statusi}</p>
    </div>
  );
};

export default TourDetail;

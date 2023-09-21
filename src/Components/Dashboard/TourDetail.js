// TourDetail.js
import React from 'react';

const TourDetail = ({ tour }) => {
  return (
    <div>
      <h2>TOUR</h2>
      <table>
        <tbody>
          <tr>
            <td>ID:</td>
            <td>{tour.id}</td>
          </tr>
          <tr>
            <td>Emri:</td>
            <td>{tour.emri}</td>
          </tr>
          <tr>
            <td>Mbiemri:</td>
            <td>{tour.mbiemri}</td>
          </tr>
          <tr>
            <td>Statusi:</td>
            <td>{tour.statusi}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TourDetail;

import React from 'react';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';

const ConcertSeat = () => {
  return( 
  <div>
    <SeatsioSeatingChart
    workspaceKey="0f6f6071-f800-42a4-9105-66d8abf35eee"
    event="6a7b5888-52d3-4e01-94f0-1facfcd87b3b"
    />
  </div>
  )
};

export default ConcertSeat;

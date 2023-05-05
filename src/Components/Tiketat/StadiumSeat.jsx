
import React from 'react';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';

const StadiumSeat = () => {
  return(
      <div>
        <SeatsioSeatingChart
          workspaceKey="0f6f6071-f800-42a4-9105-66d8abf35eee"
          pricing={[
            {'category': 'Jug', 'price': 25},
            {'category': 'Veriu', 'price': 25}
          ]}
        />
      </div>
  )
};

export default StadiumSeat;

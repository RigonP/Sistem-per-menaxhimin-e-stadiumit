
import React from 'react';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';

const StadiumSeat = () => {
  return(
      <div>
        <SeatsioSeatingChart
          workspaceKey="0f6f6071-f800-42a4-9105-66d8abf35eee"
          event="4748dd74-954c-4a21-96a0-8f1b3cc0a3a7"
          pricing={[
            {'category': 'Jug', 'price': 25},
            {'category': 'Veriu', 'price': 25},
            {'category': 'Hendikep', 'price': 35},
            {'category': 'JugPerendim', 'price': 38}
          ]}
          priceFormatter={price => '€' + price}
        />
      </div>
  )
};

export default StadiumSeat;

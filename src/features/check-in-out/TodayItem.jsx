import Button from '../../ui/Button';
import { Flag } from '../../ui/Flag';
import Tag from '../../ui/Tag';
import CheckOutButton from './CheckoutButton';

import { Link } from 'react-router-dom';

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <li className="grid grid-cols-[9rem_2rem_1fr_7rem_9rem] gap-[1.2rem] items-center text-[1.4rem] px-0 py-[0.8rem] border-b border-grey-100 first:border first:border-grey-100">
      {status === 'unconfirmed' && <Tag type="green">Arriving</Tag>}
      {status === 'checked-in' && <Tag type="blue">Departing</Tag>}

      <Flag src={guests.countryFlag} alt={`${guests.country} flag`} />
      <div className="font-medium">{guests.fullName}</div>
      <div>{numNights} nights</div>

      {status === 'unconfirmed' && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === 'checked-in' && (
        <CheckOutButton bookingId={id}>Check out</CheckOutButton>
      )}
    </li>
  );
}

export default TodayItem;

import { format, isToday } from 'date-fns';

import Table from '../../ui/Table';
import Tag from '../../ui/Tag';

import {
  HiArrowDown,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';
import Modal from '../../ui/Modal';
import { formatCurrency, formatDistanceFromNow } from '../../utils/helpers';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <Table.Row>
      <div
        className="text-[1.6rem] font-semibold text-grey-600"
        style={{ fontFamily: 'Sono' }}
      >
        {cabinName}
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <span className="font-medium">{guestName}</span>
        <span className="text-grey-500 text-[1.2rem]">{email}</span>
      </div>

      <div className="flex flex-col gap-[0.2rem]">
        <span className="font-medium">
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span className="text-grey-500 text-[1.2rem]">
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </div>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <div className="font-medium" style={{ fontFamily: 'Sono' }}>
        {formatCurrency(totalPrice)}
      </div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/booking/${bookingId}`)}
            >
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDown />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check-in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Check-out
              </Menus.Button>
            )}

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => deleteBooking(bookingId)}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;

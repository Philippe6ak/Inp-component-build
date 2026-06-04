import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import { useBookings } from '../bookings/useBookings';
import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Pagination from '../../ui/Pagination';

function PatientsTable() {
  const { bookings, isLoading, count } = useBookings();
  if (isLoading) return <Spinner />;

  if (!bookings.length) return <Empty ressourceName="patient" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Id</div>
          <div>Nom</div>
          <div>Prénom</div>
          <div>Telephone</div>
          <div>Email</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination resultCount={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default PatientsTable;

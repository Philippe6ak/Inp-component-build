import Spinner from '../../ui/Spinner';
import { useCabins } from '../cabins/useCabins';
import TodayActivity from '../check-in-out/TodayActivity';
import DurationChart from './DurationChart';
import SalesChart from './SalesChart';
import Stats from './Stats';
import { useRecentBookings } from './useRecentBookings';
import { useRecentStays } from './useRecentStays';

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBookings();
  const {
    isLoading: isLoadingStays,
    confirmedStays,
    numDays,
  } = useRecentStays();

  const { cabins, isLoading: isLoadingCabins } = useCabins();

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[auto_34rem_auto]">
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;

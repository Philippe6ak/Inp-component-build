import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  console.log(bookings.totalPrice);

  //1. number of bookings
  const numBookings = bookings?.length || 0;

  //2. total sales
  const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0) || 0;

  //3. number of confired stays
  const numCheckIns = confirmedStays?.length || 0;

  //4. occupancy rate
  // num checked in nights / all available nights (num rooms * num days in the period)
  const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (cabinCount * numDays);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={numCheckIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupation ? `${(occupation * 100).toFixed(2)}%` : "0%"}
      />
    </>
  );
}

export default Stats;

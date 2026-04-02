import { format, isToday } from 'date-fns';
import clsx from 'clsx';
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from 'react-icons/hi2';

import DataItem from '../../ui/DataItem';
import { Flag } from '../../ui/Flag';
import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';

function BookingDataBox({ booking }) {
  const {
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    isPaid,
    guests: { fullName: guestName, email, country, countryFlag, nationalID },
    cabins: { name: cabinName },
  } = booking;

  return (
    <section className="bg-grey-0 border border-grey-100 rounded-(--border-radius-md) overflow-hidden">
      <header className="bg-brand-500 px-[4rem] py-[2rem] text-[1.8rem] text-brand-100 font-medium flex items-center justify-between [&_svg]:h-[3.2rem] [&_svg]:w-[3.2rem]">
        <div className="flex items-center gap-[1.6rem] font-semibold text-[1.8rem]">
          <HiOutlineHomeModern />
          <p>
            {numNights} nights in Cabin{' '}
            <span className="font-[Sono] text-[2rem] ml-[0.4rem]">
              {cabinName}
            </span>
          </p>
        </div>
        <p>
          {format(new Date(startDate), 'EEE, MMM dd yyyy')} (
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
        </p>
      </header>

      <section className="px-[4rem] pt-[3.2rem] pb-[1.2rem]">
        <div className="flex items-center gap-[1.2rem] mb-[1.6rem ] text-grey-500 [&_p:first-of-type]:font-medium [&_p:first-of-type]:text-grey-700">
          {countryFlag && <Flag src={countryFlag} alt={`Flag of ${country}`} />}
          <p>
            {guestName} {numGuests > 1 ? `+ ${numGuests - 1} guests` : ''}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {nationalID}</p>
        </div>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {hasBreakfast ? 'Yes' : 'No'}
        </DataItem>

        <div
          className={clsx(
            'flex items-center justify-between px-[3.2rem] py-[1.6rem] rounded-(--border-radius-sm) mt-[2.4rem]',
            '[&_svg]:h-[2.4rem] [&_svg]:w-[2.4rem]',
            '[&_p:last-child]:uppercase [&_p:last-child]:text-[1.4rem] [&_p:last-child]:font-semibold',
            isPaid
              ? 'bg-success-100 text-success-700'
              : 'bg-warning-100 text-warning-700'
          )}
        >
          <DataItem icon={<HiOutlineCurrencyDollar />} label="Total price">
            {formatCurrency(totalPrice)}
            {hasBreakfast &&
              ` (${formatCurrency(cabinPrice)} cabin + ${formatCurrency(extrasPrice)} breakfast)`}
          </DataItem>
          <p>{isPaid ? 'Paid' : 'Will pay at property'}</p>
        </div>
      </section>

      <footer className="px-[4rem] py-[1.6rem] text-[1.2rem] text-grey-500 text-right">
        <p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;

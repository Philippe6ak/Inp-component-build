import { useEffect, useState } from 'react';
import BookingDataBox from '../../features/bookings/BookingDataBox';

import Button from '../../ui/Button';
import ButtonGroup from '../../ui/ButtonGroup';
import ButtonText from '../../ui/ButtonText';
import Checkbox from '../../ui/Checkbox';
import Heading from '../../ui/Heading';
import Row from '../../ui/Row';

import { useMoveBack } from '../../hooks/useMoveBack';
import Spinner from '../../ui/Spinner';
import { formatCurrency } from '../../utils/helpers';
import { useBooking } from '../bookings/useBooking';
import { useSettings } from '../settings/useSettings';
import { useCheckin } from './useCheckin';

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const moveBack = useMoveBack();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings?.breakfastPrice * numNights * numGuests || 0;

  function handleCheckin() {
    if (!confirmPaid) return;

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <div className="bg-grey-0 border border-grey-100 rounded-md px-[4rem] py-[2.4rem]">
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((toggle) => !toggle);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Want to add breakfast for {numGuests} guests for {numNights} nights
            for an additional {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </div>
      )}

      <div className="bg-grey-0 border border-grey-100 rounded-md px-[4rem] py-[2.4rem]">
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((paid) => !paid)}
          disabled={isCheckingIn || confirmPaid}
          id="confirm"
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </div>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

import Heading from '../../ui/Heading';
import Row from '../../ui/Row';
import Spinner from '../../ui/Spinner';
import TodayItem from './TodayItem';
import useTodayActivity from './useTodayActivity';

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  return (
    <div className="bg-grey-0 border border-grey-100 rounded-md p-[3.2rem] flex flex-col gap-[2.4rem] col-[1/span_2] pt-[2.4rem]">
      <Row type="horizontal">
        <Heading as="h2">Today&apos;s activity</Heading>
      </Row>

      {!isLoading ? (
        activities?.length > 0 ? (
          <ul className="scrollbar-hidden">
            {activities.map((activity) => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-[1.8rem] font-medium mt-[0.8rem]">
            No activity today
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default TodayActivity;

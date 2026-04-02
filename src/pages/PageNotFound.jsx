import { useMoveBack } from '../hooks/useMoveBack';
import Heading from '../ui/Heading';

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="h-screen bg-grey-50 flex items-center justify-center p-[4.8rem]">
      <div className="bg-grey-0 border border-grey-100 rounded-md p-[4.8rem] flex-0 shrink basis-[96rem] text-center">
        <Heading as="h1" className="mb-[3.2rem]">
          The page you are looking for could not be found 😢
        </Heading>
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </div>
    </main>
  );
}

export default PageNotFound;

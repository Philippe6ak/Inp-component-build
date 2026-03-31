import Button from "./Button";
import Heading from "./Heading";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <main className="h-screen bg-grey-50 flex items-center justify-center p-[4.8rem]">
        <div className="bg-grey-0 border border-solid border-grey-100 rounded-(--border-radius-md)">
          <Heading as="h1" className="mb-[1.6rem]">
            Something went wrong 🤔
          </Heading>
          <p className="font-[Sono] mb-[3.2rem] text-grey-500">
            {error.message}
          </p>
          <Button size="large" onClick={resetErrorBoundary}>
            Go back to homescreen
          </Button>
        </div>
      </main>
    </>
  );
}

export default ErrorFallback;

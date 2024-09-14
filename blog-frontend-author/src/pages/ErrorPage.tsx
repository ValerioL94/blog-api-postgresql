import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  function RootBoundary() {
    if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
        return (
          <div>
            Error: <strong className='text-red-500'>{error.status}</strong> -
            This page doesn't exist!
          </div>
        );
      }

      if (error.status === 401) {
        return (
          <div>
            Error: <strong className='text-red-500'>{error.status}</strong> -
            You aren't authorized to see this
          </div>
        );
      }

      if (error.status === 503) {
        return (
          <div>
            Error: <strong className='text-red-500'>{error.status}</strong> -
            Looks like our API is down
          </div>
        );
      }

      if (error.status === 418) {
        return <div>🫖</div>;
      }
    }
    return <div>Something went wrong, sorry!</div>;
  }
  return (
    <>
      <div className='flex items-center justify-center bg-green-50'>
        <h1 className='text-green-700 font-bold'>Error...</h1>
      </div>
      <div className='flex flex-col items-center gap-2 bg-green-50'>
        {RootBoundary()}
        <Link to='home'>Click here to go to home page.</Link>
      </div>
      <div className='bg-green-50'></div>
    </>
  );
};

export default ErrorPage;

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
      <div className='flex items-center justify-center'>
        <h1 className='text-green-700 font-bold'>Error</h1>
      </div>
      <div className='flex flex-col items-center gap-2'>
        {RootBoundary()}
        <Link to='/'>Click this link to go to home page.</Link>
        <img
          className='rounded-3xl border-solid border-green-700 border-2'
          src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXl1N2F4NHlxdDBhYjlocnI5cmVvNWdicGFma2hmeTYwajV5eW83aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/n7K7ghLDxsqqRysHDx/giphy.gif'
        />
        <p>
          <a href='https://giphy.com/gifs/pudgypenguins-fish-fishing-pudgy-n7K7ghLDxsqqRysHDx'>
            via GIPHY
          </a>
        </p>
      </div>
      <div></div>
    </>
  );
};

export default ErrorPage;

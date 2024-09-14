const ErrorList = ({ errors }) => {
  return (
    <>
      <ul className='flex flex-col gap-2 list-disc p-4'>
        {errors.map((error, index) => (
          <li className='text-red-600 font-semibold' key={index}>
            {error.message}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ErrorList;

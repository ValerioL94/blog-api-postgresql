import { TValidationErrors } from '../types/types';

const ErrorList = ({ errors }: { errors: TValidationErrors }) => {
  return (
    <>
      <ul aria-label='errorList' className='flex flex-col gap-2 list-disc p-4'>
        {errors.map((error, index) => (
          <li
            aria-label='errorListItem'
            className='text-red-600 font-semibold'
            key={index}
          >
            {error.message}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ErrorList;

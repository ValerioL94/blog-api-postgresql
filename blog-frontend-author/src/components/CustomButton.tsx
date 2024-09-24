type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  title?: string;
  content: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
const CustomButton = ({
  type = 'button',
  title,
  disabled = false,
  content = 'Click me',
  onClick,
}: ButtonProps) => {
  const classEnabled =
    'h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-pointer text-green-700 bg-white hover:bg-green-600 hover:text-white  focus:bg-green-700 focus:text-white';
  const classDisabled =
    'h-7 min-w-20 border-2 border-gray-500 border-solid rounded-md text-sm font-semibold cursor-help text-green-900 bg-gray-300 ';
  return (
    <button
      className={disabled ? classDisabled : classEnabled}
      type={type}
      disabled={disabled}
      title={title}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default CustomButton;

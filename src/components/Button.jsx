// eslint-disable-next-line react/prop-types
const Button = ({ text }) => {
  return (
    <div>
      <button className="bg-red-500 text-lg md:text-2xl text-white font-semibold capitalize cursor-pointer p-2 md:p-4 rounded-md">
        {text}
      </button>
    </div>
  );
};

export default Button;

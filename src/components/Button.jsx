import classNames from "classnames";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  outline,
  rounded,
  className,
  ...rest
}) {
  const classes = classNames(
    className,
    "flex items-center justify-center px-4 py-2 border-2 cursor-pointer rounded-xl shadow-md shadow-gray-500 p-96",
    {
      "border-blue-600 bg-blue-600 text-white": primary && !outline,
      "border-yellow-400 bg-yellow-400 text-black": secondary && !outline,
      "border-green-800 bg-green-800 text-white": success && !outline,
      "border-yellow-500 bg-yellow-400 text-black": warning && !outline,

      "rounded-full": rounded,
      "border-blue-600 bg-transparent text-blue-600 ": outline && primary,
      "border-gray-800 bg-transparent text-gray-800 font-medium":
        outline && secondary,
      "border-green-600 bg-transparent text-green-600": outline && success,
      "border-yellow-500 bg-transparent text-yellow-500": outline && warning,
    }
  );
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariation: ({ primary, secondary, success, warning }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!warning) +
      Number(!!success);
    if (count > 1)
      return new Error(
        "Only one of primary, secondary, success, warning or danger can be true"
      );
  },
};

export default Button;

function CheckboxInput({ question, onInputChange, className }) {
  const appliedClass = className;

  return (
    <div
      className={`flex flex-col justify-around items-start rounded-lg p-5 ${appliedClass} bg-inherit`}
    >
      {question.stem && (
        <p
          className={`text-xl mb-5 w-full text-left font-bold-inline`}
        >
          {question.stem}
        </p>
      )}
      {question.options.map((option, index) => {
        return (
          <div
            className='flex flex-row flex-wrap justify-start items-center my-2'
            key={index}
          >
            <input
              type='checkbox'
              id={option}
              name={question.stem || "default"}
              value={option}
              onChange={onInputChange}
              checked={question.selectedOptions.includes(option)}
              className='w-6 h-6 cursor-pointer'
            />
            <label className={`text-xl ml-2`}>{option}</label>
          </div>
        );
      })}
    </div>
  );
}

export default CheckboxInput;

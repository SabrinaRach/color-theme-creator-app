/* Develop a ColorInput component to handle synchronized text and color inputs, ensuring that they reflect the same value. ( Controlled Inputs ) */
export default function ColorInput({ id, value, required, onChange, ariaLabel }) {
  return (
    <>
    {/* for manually putting in hex  */}
      <input
        type="text"
        id={id}
        name={id}
        value={value} /* = controlled input, shows the current state value */
        onChange={onChange}
        required={required}
        
      />
      {/* for the color picker */}
      <input
        type="color"
        id={`${id}-picker`}
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
      />
    </>
  );
}

/* Develop a ColorInput component to handle synchronized text and color inputs, ensuring that they reflect the same value. ( Controlled Inputs ) */
export default function ColorInput({ id, value, required, onChange }) {
  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={value} /* = controlled input, shows the current state value */
        onChange={onChange}
        required={required}
      />
      <input
        type="color"
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}

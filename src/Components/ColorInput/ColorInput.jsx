import { useState } from "react";

/* Develop a ColorInput component to handle synchronized text and color inputs, ensuring that they reflect the same value. ( Controlled Inputs ) */
export default function ColorInput({ id, defaultValue, required }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  /* function when the input changes */
  function handleInputValue(event) {
    setInputValue(event.target.value);
  }
  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue} /* = controlled input, shows the current state value */
        onChange={handleInputValue}
        required={required}
      />
      <input type="color" value={inputValue} onChange={handleInputValue} required={required}/>
    </>
  );
}

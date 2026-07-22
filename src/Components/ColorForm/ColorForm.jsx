import "./ColorForm.css";
import ColorInput from "../ColorInput/ColorInput";
import { nanoid } from "nanoid"; /* to give every color an unique id */

export default function ColorForm({ onAddColor }) {
  /* when user submits the form: */
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const colorFormData = Object.fromEntries(formData);
    const newColor = {
      id: nanoid(),
      ...colorFormData,
    }; /* add unique id to colorFormData object */
    console.log(newColor);
    onAddColor(newColor);
    event.target.reset(); /* leert das Feld wieder ---> does not work! */
  }
  return (
    /* Creating a form to submit colors to a new theme */
    <form onSubmit={handleSubmit} className="color-form">
      <label htmlFor="role">Role</label>
      <input
        type="text"
        name="role"
        id="role"
        defaultValue="the role of the color"
        required
      />

      <label htmlFor="hex">Hex</label>
      <ColorInput
        /* type="text" name="hex"  */ id="hex"
        defaultValue="#000000"
        required
      />

      <label htmlFor="contrastText">Contrast Text</label>
      <ColorInput
        /* type="text"
        name="contrastText" */
        id="contrastText"
        defaultValue="#ffffff"
        required
      />

      <button className="add-color-button">Add color</button>
    </form>
  );
}

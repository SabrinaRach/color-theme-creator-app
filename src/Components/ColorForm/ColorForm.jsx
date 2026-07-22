export default function ColorForm() {
  return (
    /* Creating a form to submit colors to a new theme */
    <form className="color-form">
      <label htmlFor="role">Role</label>
      <input type="text" name="role" id="role" required />

      <label htmlFor="hex">Hex</label>
      <input type="text" name="hex" id="name" required />

      <label htmlFor="contrastText">Contrast Text</label>
      <input type="text" name="contrastText" id="contrastText" required />

      <button className="add-color-button">Add color</button>
    </form>
  );
}

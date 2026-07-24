export default function ThemeSelector( {themes}) {



return (
/* creating a dropdown menu, using map() to create an <option> element for each theme */
<label htmlFor="theme-select">Choose a theme:</label>
<select name="themes" id="theme-select">
  <option value="">--Please choose a theme--</option>
  {themes.map((theme) => (
    <option key={theme.id} value={theme.id}>
      {theme.name}
    </option>
  ))}
</select>
);
}
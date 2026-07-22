import "./Color.css";

/* Each color card displays: siehe dafür colors.js
hex value of the color
the role of the color
the color itself in the background color of the element
the font in the respective contrastText color */

export default function Color({ color, onDeleteColor }) {
  return (
    <article
      className="color-card"
      style={{
        backgroundColor: color.hex,
        color: color.contrastText,
      }}
    >
      <p className="hex-text">{color.hex}</p>
      <p className="role-text">{color.role}</p>
      <p className="contrast-text">contrast: {color.contrastText}</p>

      <button onClick={() => onDeleteColor({id: color.id})} className="delete-button">Delete</button>
    </article>
  );
}

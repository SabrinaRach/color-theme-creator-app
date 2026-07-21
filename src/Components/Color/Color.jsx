import "./Color.css";

/* Each color card displays: siehe dafür colors.js
hex value of the color
the role of the color
the color itself in the background color of the element
the font in the respective contrastText color */

export default function Color({ color }) {


  return (
    <article className="colorcard" style={{
  backgroundColor: color.hex,
  color: color.contrastText,
}} >
<p>{color.hex}</p>
<p>{color.role}</p>
<p>contrast: {color.contrastText}</p>


    </article>
  );
}



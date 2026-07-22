import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="color-card-headline">Color Theme Creator</h1>

      {/* for every color: create a Color component and add the matching color to this component 
      add key to uniquely identifiy each color card*/}
      {initialColors.map((color) => (
        <Color key={color.id} color={color} />
      ))}
    </>
  );
}

export default App;

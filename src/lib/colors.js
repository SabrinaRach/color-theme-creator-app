export const initialColors = [
  {
    id: "c1",
    role: "primary main",
    hex: "#ff4a11",
    contrastText: "#FFFFFF",
    AA: "fail",
    ratio: 1.15,
  }, // Vibrant orange
  {
    id: "c2",
    role: "primary dark",
    hex: "#c73e0b",
    contrastText: "#FFFFFF",
    AA: "fail",
    ratio: 3.68,
  }, // Darker shade of orange
  {
    id: "c3",
    role: "primary light",
    hex: "#ff7a3e",
    contrastText: "#000000",
    AA: "pass",
    ratio: 14.8,
  }, // Lighter shade of orange
  {
    id: "c4",
    role: "secondary main",
    hex: "#5C6BC0",
    contrastText: "#FFFFFF",
    AA: "fail",
    ratio: 1.7,
  }, // Indigo Blue
  {
    id: "c5",
    role: "secondary dark",
    hex: "#3949AB",
    contrastText: "#FFFFFF",
    AA: "fail",
    ratio: 2.93,
  }, // Darker indigo blue
  {
    id: "c6",
    role: "secondary light",
    hex: "#9FA8DA",
    contrastText: "#000000",
    AA: "pass",
    ratio: 15.0,
  }, // Lighter indigo blue
  {
    id: "c7",
    role: "background main",
    hex: "#252629",
    contrastText: "#FFFFFF",
    AA: "pass",
    ratio: 7.02,
  }, // Dark charcoal
  {
    id: "c8",
    role: "background dark",
    hex: "#1b1d1f",
    contrastText: "#FFFFFF",
    AA: "fail",
    ratio: 2.04,
  }, // Darker charcoal
  {
    id: "c9",
    role: "background light",
    hex: "#43464b",
    contrastText: "#FFFFFF",
    AA: "pass",
    ratio: 9.97,
  }, // Lighter charcoal
];

/* um die Werte ratio und AA nachzutragen:  */
async function fetchContrast(fcolor, bcolor) {
  const response = await fetch(
    `https://webaim.org/resources/contrastchecker/?fcolor=${encodeURIComponent(fcolor)}&bcolor=${encodeURIComponent(bcolor)}&api=`,
  );

  return response.json();
}

const result = await fetchContrast("#FFFFFF", "#43464b");

console.log("Werte für ratio und AA: ", result);

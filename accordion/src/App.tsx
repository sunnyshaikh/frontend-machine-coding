import Accordion from "./Accordion";

const data = [
  {
    id: 1,
    title: "Accordion 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    open: false,
  },
  {
    id: 2,
    title: "Accordion 2",
    content:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    open: true,
  },
  {
    id: 3,
    title: "Accordion 3",
    content:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    open: false,
  },
];
const App = () => {
  return (
    <div className="app grid place-items-center p-4">
      <h1 className="text-2xl font-bold">Accordion</h1>
      <Accordion data={data} />
    </div>
  );
};

export default App;

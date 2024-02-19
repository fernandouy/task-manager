import "./App.css";
import Board from "./components/Board";
import QueueIcon from "./icons/QueueIcon";

function App() {
  return (
    <>
      <header className="fixed z-50 top-0 left-0 w-full h-12 flex items-center justify-center px-4 bg-columnBackgroundColor">
        <div className="stroke-white flex gap-2">
          <QueueIcon />
          <h1 className="text-1xl font-black">Task Manager</h1>
        </div>
      </header>
      <Board />
    </>
  );
}

export default App;

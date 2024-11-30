import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <div className="p-4">
        <h1 className="text-3xl font-bold underline">Hello Terry</h1>
        <Button>Click me</Button>
        <Button variant="destructive">Delete</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </>
  );
}

export default App;

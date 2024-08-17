import { Button } from "@/components/ui/button";
import { ThemeToggler } from "@/theme/ThemeToggler";
import {} from "react";
function App() {
  return (
    <>
      <section>
        <Button variant={"destructive"}>Hello</Button>
        <ThemeToggler />
      </section>
    </>
  );
}

export default App;

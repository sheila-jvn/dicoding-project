import "./App.css";
import { Button } from "./components/ui/button";
import { UploadCloud } from "lucide-react";

function App() {
  return (
    <>
      <div className="flex flex-col gap-4 items-center">
        <div className="gap-2 flex flex-col border border-[#3f3f46] rounded-[10px] p-6 w-[450px] items-center">
          <Button className="w-[208px]">
            Sync w/ Google Drive <UploadCloud className="ml-2 h-4 w-4" />
          </Button>
          <p className="leading-7 [&:not(:first-child)]:mt-2">
            For security, this app only accesses files it creates.
          </p>
        </div>

        <div className="gap-4 flex flex-col border border-[#3f3f46] rounded-[10px] p-6 w-[450px] justify-center items-center">
          <Button className="w-full">Add 2FA</Button>
        </div>
      </div>
    </>
  );
}

export default App;

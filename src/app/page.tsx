import AutoSuggest from "../components/AutoSuggest";
import Filters from "../components/Filters";
import BreweryTable from "../components/BreweryTable";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll verflow-x-hidden">
        <div
          className="snap-start w-screen h-screen flex items-center justify-center bg-cover bg-center rounded-lg shadow-lg content-center"
          style={{ backgroundImage: "url('/bg-70.jpg')" }}
        >
          <div className="container mx-auto p-6 text-center mb-50">
            <img
              src="logo.png"
              className="h-[500px] mx-auto"
              alt="Brewery Logo"
            />
            <div className="max-w-md mx-auto mt-[-100px]">
              <AutoSuggest />
            </div>
          </div>
        </div>
        <div
          className="snap-start flex flex-col items-center justify-start content-center py-10"
          style={{ backgroundImage: "url('/bg-2.jpg')" }}
        >
          <Filters />
          <BreweryTable />
        </div>
      </div>
    </main>
  );
}

import AutoSuggest from "../components/AutoSuggest";
import Filters from "../components/Filters";
import BreweryTable from "../components/BreweryTable";

export default function Home() {
  return (
    // <main
    //   className="h-screen bg-cover bg-center rounded-lg shadow-lg content-center"
    //   style={{ backgroundImage: "url('/bg.jpg')" }}
    // >
    //   <div className="container mx-auto p-6 ">
    //     <h1 className="text-3xl font-bold mb-4">Find your next Brewery</h1>
    //     <AutoSuggest />
    //   </div>

    //   {/* <Filters /> */}
    //   {/* <BreweryTable /> */}
    // </main>
    <main className="overflow-hidden">
      {/* <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll verflow-x-hidden"> */}
      <div
        className="snap-start w-screen h-screen flex items-center justify-center bg-cover bg-center rounded-lg shadow-lg content-center"
        style={{ backgroundImage: "url('/bg-70.jpg')" }}
      >
        <div className="container mx-auto p-6 text-center">
          {/* <h1 className="text-6xl font-bold mb-8">Find your next Brewery</h1> */}
          <div className="max-w-md mx-auto">
            <AutoSuggest />
          </div>
        </div>
      </div>
      {/* </div> */}
      <div
        className="snap-start flex flex-col items-center justify-start content-center py-25"
        style={{ backgroundImage: "url('/bg-2.jpg')" }}
      >
        <Filters />
        <BreweryTable />
      </div>
    </main>
  );
}

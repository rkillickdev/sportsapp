import Image from "next/image";
import LocationList from "./components/locations/LocationList";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6">
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <LocationList />
      </div>
    </main>
  );
}

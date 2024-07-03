import Image from "next/image";
import Link from "next/link";
import { axiosReq } from "@/app/services/axiosDefaults";

const LocationDetailPage = async ({params}: {params: {id: string}}) => {
    const { data } = await axiosReq.get(
      `/api/location/locations/${params.id}`
    );

  return (
    <main className="max-w-[1500px] mx-auto px-6 pb-6">
      <div className="w-full h-[64vh] mb-4 overflow-hidden rounded-xl relative">
        <Image
            fill
            src={data.image}
            className="object-cover w-full h-full"
            alt="Beach house"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="py-6 pr-6 col-span-3">
          <h1 className="mb-4 text-4xl">{data.name}</h1>

          <div>
            {data.address.place}
          </div>

          {/* <span className="mb-6 block text-lg text-gray-600">
              {property.guests} guests - {property.bedrooms} bedrooms - {property.bathrooms} bathrooms
          </span> */}

          <hr />

          <hr />

          <p className="mt-6 text-lg">
              {data.summary}
          </p>
        </div>
      </div>
        </main>
  )
}

export default LocationDetailPage
import Image from "next/image"
import { LocationType } from "./LocationList"
import { useRouter } from "next/navigation"

interface LocationProps {
  location: LocationType
}

const LocationListItem: React.FC<LocationProps> = ({
  location
}) => {
  const router = useRouter();
  return(
    <div
            className="cursor-pointer"
            onClick={() => router.push(`/locations/${location.id}`)}
        >
            <div className="relative overflow-hidden aspect-square rounded-xl">
                <Image
                    fill
                    src={location.image}
                    sizes="(max-width: 768px) 768px, (max-width: 1200px): 768px, 768px"
                    className="hover:scale-110 object-cover transition h-full w-full"
                    alt="Beach house"
                />
            </div>

            <div className="mt-2">
                <p className="text-lg font-bold">{location.name}</p>
            </div>

        </div>
  )
}

export default LocationListItem
'use client';

import { axiosReq } from "@/app/services/axiosDefaults";

import { useEffect, useState } from "react";
import LocationListItem from "./LocationListItem"

export type LocationType = {
  id: string;
  name: string;
  image: string;
}

const LocationList = () => {
  const [locations, setLocations] = useState<LocationType[]>([]);

  const getLocations = async () => {
    try {
      const { data } = await axiosReq.get(
        '/api/location/locations/'
      );
      setLocations(data);
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getLocations();
  }, []);
  return(
    <>
    {locations.map((location) => {
      return(
        <LocationListItem
          key={location.id}
          location={location}
        />
      )
    })}
    </>
  )
}

export default LocationList
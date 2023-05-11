"use client";

import React from "react";
import { useLoadScript, LoadScriptProps } from "@react-google-maps/api";
import Map from "./Map";
import { getPinList } from "@/services/pinApi";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "@/redux/hooks";
import { setGroupId } from "@/redux/map/mapSlice";
import Loading from "../common/Loading";

const libraries: LoadScriptProps["libraries"] = ["places"];
interface Props {
  groupId: number;
}
const MapUpper = ({ groupId }: Props) => {
  const MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: MAP_API_KEY,
    libraries,
  });

  const getGroupPin = async () => {
    const pinList = await getPinList(groupId);
    return pinList;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["initial-map"],
    queryFn: async () => await getGroupPin(),
  });

  const dispatch = useAppDispatch();
  dispatch(setGroupId(groupId));

  return isLoaded ? (
    <Map markerList={data} />
  ) : (
    <div className=" h-[75%]  flex items-center justify-center">
      <Loading />
    </div>
  );
};

export default MapUpper;

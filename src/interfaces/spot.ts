import { SpotAddressDTO } from "@/interfaces/spotAddress";
import { CategoryDTO } from "./category";
export interface ISpot {
  id: string;
  title: string;
  street: string;
  street_number: string;
  postal_code: string;
  city: string;
  country_code: string;
  category_key: string;
  isShared: boolean;
}

export interface ISpotProps {
  spotData: ISpot;
}

export interface ISpotsListProps {
  spotListData: ISpot[];
}

export interface ISpotsState {
  availableSpots: SpotResDTO[];
  loading: boolean;
}

export interface SpotResDTO {
  id: string;
  created_at: Date;
  name: string;
  category: CategoryDTO;
  address: SpotAddressDTO;
  latitude: number;
  longitude: number;
}

export interface SpotPagingResDTO {
  page: number;
  size: number;
  nbPages: number;
  nbResults: number;
  data: SpotResDTO[];
}

export function isSpot(obj: any): obj is SpotResDTO {
  return (
    "id" in obj &&
    "created_at" in obj &&
    "name" in obj &&
    "category" in obj &&
    "address" in obj &&
    "latitude" in obj &&
    "longitude" in obj &&
    "min_auth_group" in obj &&
    Object.keys(obj).length == 4
  );
}

export function isSpotList(obj: any): obj is SpotResDTO[] {
  let check = true;
  if (obj.data) {
    obj.data.foreach((objItem: any) => {
      if (!isSpot(objItem)) {
        check = false;
      }
    });
  }
  return check;
}

export function isSpotPagingResDTO(obj: any): obj is SpotPagingResDTO {
  let isASpotList = false;
  if (obj.data) {
    isASpotList = isSpotList(obj.data);
  }
  return (
    "page" in obj &&
    "size" in obj &&
    "nb_pages" in obj &&
    "nb_results" in obj &&
    "data" in obj &&
    Object.keys(obj).length == 5 &&
    isASpotList
  );
}

export function isCreatedSpot(obj: any): obj is SpotResDTO {
  return (
    "id" in obj &&
    "created_at" in obj &&
    "name" in obj &&
    "category_id" in obj &&
    "address_id" in obj &&
    "latitude" in obj &&
    "longitude" in obj &&
    "min_auth_group" in obj &&
    Object.keys(obj).length == 8
  );
}

import { ISpot, SpotResDTO } from "@/src/interfaces/spot";

function mapSpotResDTOToISpot(spotDTO: SpotResDTO): ISpot {
    const spot: ISpot = {
      id: spotDTO.id,
      title: spotDTO.name,
      street: spotDTO.address.street,
      street_number: spotDTO.address.street_number,
      postal_code: spotDTO.address.postal_code,
      city: spotDTO.address.city,
      country_code: spotDTO.address.country_code,
      category_key: spotDTO.category.category_key,
      isShared: false,
    };
  return spot;
}

export default function mapSpotResDTOsToISpots(spotList: SpotResDTO[]): ISpot[] {
    let list = new Array<ISpot>(spotList.length);
    spotList.forEach((spotDTO) => {
        list.push(mapSpotResDTOToISpot(spotDTO));
    })
  return list;
}
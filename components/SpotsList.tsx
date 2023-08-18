import { ISpotsListProps } from "@/src/interfaces/spot";
import Spot from "./Spot";
import mapToSpotsList from "@/src/mappers/mapToSpotsList";

const SpotsList = (props: ISpotsListProps) => {
  const { spotListData } = props;

  return (
    <div className="spotList flex flex-col divide-y devide-mygrey">
      {spotListData.map((spotData, index) => {
        return (
          <div key={index} className="flex flex-col">
            <Spot spotData={spotData} />
          </div>
        );
      })}
    </div>
  );
};

export default SpotsList;

import { ISpotsListProps } from "@/src/interfaces/spot";
import Spot from "./Spot";

const SpotsList = (props: ISpotsListProps) => {
  const { spotListData } = props;

  return (
    <div className="spotList flex flex-col divide-y devide-mygrey">
      {spotListData.getList().map((spotData, index) => {
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

import Spot, { ISpot } from "./Spot";

export interface ISpotsListProps {
  spotListData: ISpot[];
}

const SpotsList = (props: ISpotsListProps) => {
  const { spotListData } = props;

  return (
    <div className="spotList flex flex-col divide-y devide-grey">
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

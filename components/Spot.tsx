import ToShareIcon from "@/icons/to-share.svg";
import ShareAdded from "@/icons/share-added.svg";
import addressToString from "@/helpers/addressToString";
import getCategoryIcon from "@/helpers/categoryIcon";

export interface ISpot {
  title: string;
  address: string;
  postal_code: string;
  city: string;
  country_code: string;
  category: string;
  isShared: boolean;
}

export interface ISpotProps {
  spotData: ISpot;
}

const Spot = (props: ISpotProps) => {
  const { spotData } = props;

  return (
    <div className="spot flex relative w-500 my-2 items-center">
      <div className="categoryIcon">{getCategoryIcon(spotData.category)}</div>
      <div className="spotInfo flex flex-col ml-3">
        <span className="text-lg text-extrabold">{spotData.title}</span>
        <span className="text-sm">{addressToString(spotData)}</span>
      </div>
      <div className="absolute right-2 top-3">
        {spotData.isShared ? <ShareAdded /> : <ToShareIcon />}
      </div>
    </div>
  );
};

export default Spot;

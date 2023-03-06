import ToShareIcon from "@/icons/to-share.svg";
import ShareAdded from "@/icons/share-added.svg";
import addressToString from "@/helpers/addressToString";
import getCategoryIcon from "@/helpers/categoryIcon";
import { useState } from "react";
import { ISpotProps } from "@/src/interfaces/spot";

const Spot = (props: ISpotProps) => {
  const { spotData } = props;
  const [isShared, setIsShared] = useState(false);

  const toggleSharedSpot = () => {
    setIsShared(!isShared);
    spotData.isShared = !spotData.isShared;
  };

  return (
    <div className="spot flex relative w-500 my-2 items-center">
      <div className="categoryIcon">{getCategoryIcon(spotData.category)}</div>
      <div className="spotInfo flex flex-col ml-3">
        <span className="text-lg text-extrabold">{spotData.title}</span>
        <span className="text-sm">{addressToString(spotData)}</span>
      </div>
      <div className="absolute right-2 top-3">
        {spotData.isShared ? (
          <button>
            <ShareAdded onClick={toggleSharedSpot} />
          </button>
        ) : (
          <button>
            <ToShareIcon onClick={toggleSharedSpot} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Spot;

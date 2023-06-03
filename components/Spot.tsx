import ToShareIcon from "@/icons/to-share.svg";
import ShareAdded from "@/icons/share-added.svg";
import addressToString from "@/helpers/addressToString";
import SvgLoader from "@/helpers/svgLoader";
import { CombinedState } from "@/src/interfaces/store";
import { useEffect, useState } from "react";
import { ISpotProps } from "@/src/interfaces/spot";
import { useSelector } from "react-redux";
import { CategoryDTO } from "@/src/interfaces/category";

const Spot = (props: ISpotProps) => {
  const { spotData } = props;
  const [isShared, setIsShared] = useState(false);
  const [category, setCategory] = useState<CategoryDTO>();

  let categories = useSelector(
    (state: CombinedState) => state.filters.categories.availableCategories
  );

  useEffect(() => {
    let categoryData = categories.find(
      (category) => category.category_key === spotData.getCategory()
    );
    setCategory(categoryData);
  }, [categories, setCategory, spotData]);

  const toggleSharedSpot = () => {
    setIsShared(!isShared);
    spotData.setIsShared(!spotData.getIsShared());
  };

  return (
    <div className="spot flex relative w-500 my-2 items-center">
      {category && <SvgLoader svgContent={category.svg_icon_content} />}
      <div className="spotInfo flex flex-col ml-3">
        <span className="text-lg text-extrabold">{spotData.getTitle()}</span>
        <span className="text-sm">{addressToString(spotData)}</span>
      </div>
      <div className="absolute right-2 top-3">
        {spotData.getIsShared() ? (
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

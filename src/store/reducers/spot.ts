import { ISpotsState } from "@/interfaces/spot";
import { SpotAction } from "@/store/actions/spot";
import { SpotActionType } from "@/store/actionTypes/spot";
import { start } from "repl";

const initialState: ISpotsState = {
  availableSpots: [
    {
      title: "Grand Place",
      address: "Grote Markt",
      postal_code: "1000",
      city: "Brussel",
      country_code: "BE",
      category: "tourism",
      isShared: false,
    },
    {
      title: "Docks Bruxsel",
      address: "Bd Lambermont 1",
      postal_code: "1000",
      city: "Brussel",
      country_code: "BE",
      category: "shopping",
      isShared: false,
    },
    {
      title: "Delirium Cafe",
      address: "Imp. de la Fidélité 4",
      postal_code: "1000",
      city: "Brussel",
      country_code: "BE",
      category: "cafe-bar",
      isShared: false,
    },
  ],
};

const spotReducer = (state: ISpotsState = initialState, action: SpotAction) => {
  switch (action.type) {
    case SpotActionType.GETSPOTS: {
      return state.availableSpots;
    }
    case SpotActionType.ADDSPOT: {
    }
    default:
      return state;
  }
};

export default spotReducer;

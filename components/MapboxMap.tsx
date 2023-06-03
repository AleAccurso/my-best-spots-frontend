import { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import the mapbox-gl styles so that the map is displayed correctly

const lat = 42.1923853;
const lng = 13.9530214;
const zoom = 18;

function MapboxMap() {
  // this is where the map instance will be stored after initialization
  const [map, setMap] = useState<mapboxgl.Map>();

  // React ref to store a reference to the DOM node that will be used
  // as a required parameter `container` when initializing the mapbox-gl
  // will contain `null` by default
  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    }).on("style.load", () => {
      mapboxMap.removeLayer("building-number-label");
      // console.log("Style:", mapboxMap.getStyle().layers);
    });

    // save the map object to React.useState
    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);

  return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
}

export default MapboxMap;

function setFog(arg0: {
  color: string; // Lower atmosphere
  "high-color": string; // Upper atmosphere
  "horizon-blend": number; // Atmosphere thickness (default 0.2 at low zooms)
  "space-color": string; // Background color
  "star-intensity": number;
}) {
  throw new Error("Function not implemented.");
}

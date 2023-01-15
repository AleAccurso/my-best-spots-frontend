import { useEffect, useRef, useState } from "react";

const Map = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const ref = useRef(null);
  // const [map, setMap] = useState<google.maps.Map | null>(null);

  // useEffect(() => {
  //   if (ref.current && !map) {
  //     setMap(
  //       new google.maps.Map(ref.current, {
  //         zoomControl: true,
  //         mapTypeControl: false,
  //         streetViewControl: false,
  //         center: {
  //           lat: latitude ?? 0,
  //           lng: longitude ?? 0,
  //         },
  //         zoom: 10,
  //       })
  //     );
  //   }
  // }, [ref, map, latitude, longitude]);

  return <div ref={ref} style={{ height: "100%", width: "100%" }} />;
};

export default Map;

import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api'

const MyMap = () => {

  const lat = 42.1923853;
  const lng = 13.9530214;

  if (typeof(process.env.GCP_API_KEY) == 'undefined') {
    return (
      <div>No API Key</div>
    )
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GCP_API_KEY
  })
  if (isLoaded) {
    return (
      <GoogleMap
        mapContainerStyle={
          { height: '450px', width: '100%' }
        }
        center={{ lat, lng }}
        zoom={16}
      >
        <MarkerF position={{ lat, lng }} />
      </GoogleMap>
    )
  } else {
    return <></>
  }
}

export default MyMap
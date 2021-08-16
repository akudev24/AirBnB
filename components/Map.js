import { useState } from 'react'
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import  getCenter  from 'geolib/es/getCenter'
function Map({searchResult}) {
    const [selectedLocation, setSelectedLocation] = useState({})
    const coordinates = searchResult.map((result)=>({
        longitude: result.long,
        latitude: result.lat,
    }))
    const center = getCenter(coordinates)
    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })
    return (
        <ReactMapGL
            mapStyle='mapbox://styles/akusei/cksagwto20iyx18p7zwqp0fc3'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport)=>setViewport(nextViewport)}
        >
            {searchResult.map(result=>(
                <div key={result.long}>
                    <Marker
                        longitude= {result.long}
                        latitude = {result.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p onClick={()=>setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        </p>
                    </Marker>
                    {selectedLocation.long ===result.long ? (
                        <Popup
                        closeOnClick={true}
                        onClose={()=>setSelectedLocation({})}
                        latitude={result.lat}
                        longitude={result.long}
                        >
                            {result.title}
                        </Popup>
                    ):false}
                </div>
            ))}
            
        </ReactMapGL>
    )
}

export default Map

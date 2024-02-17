import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const FixedLocationDisplay = ({ location }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APP_KEY,
    })

    const mapContainerStyle = {
        width: '1000px',
        height: '500px',
    }

    if (!isLoaded) return <div>Loading...</div>

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={location}>
            {location && <Marker position={location} />}
        </GoogleMap>
    )
}

export default FixedLocationDisplay

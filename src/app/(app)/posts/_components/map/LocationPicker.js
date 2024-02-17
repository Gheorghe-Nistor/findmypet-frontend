import { useState, useEffect } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const LocationPicker = ({ onLocationSelect }) => {
    const [currentLocation, setCurrentLocation] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState(null)

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_APP_KEY,
    })

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords
                    const location = { lat: latitude, lng: longitude }
                    setCurrentLocation(location)
                    setSelectedLocation(location)
                },
                () => {
                    console.error('Error: The Geolocation service failed.')
                },
            )
        } else {
            console.error("Error: Your browser doesn't support geolocation.")
        }
    }, [])

    const mapContainerStyle = {
        width: '1000px',
        height: '500px',
    }

    const handleMapClick = event => {
        const lat = event.latLng.lat()
        const lng = event.latLng.lng()
        setSelectedLocation({ lat, lng })
        onLocationSelect(selectedLocation)
    }

    if (!isLoaded) return <div>Loading...</div>

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={18}
            center={currentLocation}
            onClick={handleMapClick}>
            {selectedLocation && <Marker position={selectedLocation} />}
        </GoogleMap>
    )
}

export default LocationPicker

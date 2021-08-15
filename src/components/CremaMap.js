import React from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vs',
    height: '100vh',
};
const center = {
    lat: 47.6062,
    lng: -122.3321,
};
const options = {
    // disableDefaultUI: true,
    // zoomControl: true,
}

const CremaMap = () => {

    const {isLoaded, loadError} = useLoadScript ({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo(({lat, lng}));
        mapRef.current.setZoom(14);
    })

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";


    return (
        <div className="mapFormat">
            <h1>CremaRun Map ✈</h1>
            <br></br>
            <Search panTo={panTo}/>
            <br></br>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onLoad={onMapLoad}>
            </GoogleMap>

        </div>
    )

};


export default CremaMap;

function Search({ panTo }) {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete({
        requestOptions: {
            location: { lat: () => 47.6062, lng: () => -122.3321 },
            radius: 200 * 1000,
            },
        });

    return (
        <div className="mapSearchBar">
            <Combobox
                onSelect={async (address) => {
                    setValue(address, false);
                    clearSuggestions()

                    try {
                        const results = await getGeocode({address});
                        const { lat, lng } = await getLatLng(results[0]);
                        panTo({ lat, lng });
                    } catch(error) {
                        console.log("An error occurred")
                    }
                    
                    // console.log(address);
                }}
            >
            <ComboboxInput value={value} onChange={(event) => {
                setValue(event.target.value);
            }}
            disabled={!ready}
            placeholder="Search location"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" && data.map(({id, description}) => <ComboboxOption key={id} value={description}/>)}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    </div>
    )
}


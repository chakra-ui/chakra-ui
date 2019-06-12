import { useEffect, useRef } from "react";

const API_KEY = process.env.REACT_GOOGLEMAPS_API_KEY;

const GoogleAddress = ({ onChange, children, apiKey = API_KEY, options }) => {
  const ref = useRef();

  const handleChange = () => {
    onChange && onChange(ref.current.value);
  };

  useEffect(() => {
    const initAutocomplete = () => {
      if (ref.current && window.google) {
        let autocomplete = new window.google.maps.places.Autocomplete(
          ref.current,
          options
        );

        autocomplete.addListener("place_changed", () => {
          let { value } = ref.current;
          onChange && onChange(value);
        });
      }
    };

    if (!window.google) {
      let googleMaps = document.createElement("script");
      googleMaps.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      googleMaps.async = true;
      googleMaps.defer = true;
      document.body.appendChild(googleMaps);
      googleMaps.onload = () => {
        initAutocomplete();
      };
    } else {
      initAutocomplete();
    }
  }, [apiKey, onChange, options]);

  return children({ ref, onChange: handleChange });
};

export default GoogleAddress;

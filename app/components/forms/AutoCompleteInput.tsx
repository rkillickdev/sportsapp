import { useState } from "react";
import getPlaces from "@/app/services/getPlaces";

interface AutoCompleteInputProps {
  setAddress: (val: object) => void;
  handleManualInputChange: (event: React.ChangeEvent<HTMLInputElement>, stateProperty : string) => void;
  streetAndNumber: string;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({ setAddress, handleManualInputChange, streetAndNumber }) => {
  const [suggestions, setSuggestions] = useState<[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleManualInputChange(event, "streetAndNumber");
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query : string) => {
    const suggestions = await getPlaces(query);
    setSuggestions(suggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    const streetAndNumber = suggestion.place_name.split(",")[0];
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];

    const address = {
      streetAndNumber,
      place: "",
      region: "",
      postcode: "",
      country: "",
      latitude,
      longitude,
    };

    suggestion.context.forEach((element) => {
      const identifier = element.id.split(".")[0];

      address[identifier] = element.text;
    });

    console.log(address.longitude, address.latitude);

    setAddress(address);
    setSuggestions([]);
  };

  return (
    <div>
      <div className="autoCompleteInputContainer">
        <input
          id="address"
          type="text"
          placeholder="Address"
          value={streetAndNumber}
          onChange={handleChange}
        />
        <ul className="addressSuggestions">
          {suggestions?.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion.place_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AutoCompleteInput;
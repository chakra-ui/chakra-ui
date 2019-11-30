import React, { useState, useMemo } from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
import {
  Select,
  SelectButton,
  SelectMenu,
  Option,
  OptionGroup,
} from "./Select";
import { Box } from "@chakra-ui/layout";
import { useSelectionItem, useSelectionState } from "./hook";
import { useLogger, createCtx } from "@chakra-ui/hooks";

const stories = storiesOf("Select", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

export function SelectExample() {
  const [add, setAdd] = useState(false);
  const [val, setVal] = useState<React.ReactText>("Togo");
  return (
    <Box maxW="400px" mx="auto">
      <Select
        defaultValue={"Togo"}
        // onChange={value => {
        //   setVal(value);
        // }}
      >
        <SelectButton />
        <SelectMenu>
          <Option value="Niger">Niger</Option>
          <Option value="Nigeria">Nigeria</Option>
          <Option value="Togo">Togo</Option>
          <Option value="Germany">Germany</Option>
          {add && <Option value="Ghana">Ghana</Option>}
          <OptionGroup label="Other room">
            <Option value="Zambia">Zambia</Option>
            <Option value="Gerba">Gerba</Option>
            <Option value="Tunisia">Tunisia</Option>
          </OptionGroup>
        </SelectMenu>
      </Select>

      <button onClick={() => setAdd(!add)}>Add</button>
      <select defaultValue="Togo">
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Togo">Togo</option>
        <option value="Germany">Germany</option>
      </select>
    </Box>
  );
}

stories.add("Default", () => <SelectExample />);

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua &amp; Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia &amp; Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Kyrgyz Republic",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Norway",
  "Oman",
  "Pakistan",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre &amp; Miquelon",
  "Samoa",
  "San Marino",
  "Satellite",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "St Kitts &amp; Nevis",
  "St Lucia",
  "St Vincent",
  "St. Lucia",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad &amp; Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks &amp; Caicos",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "United States Minor Outlying Islands",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export function LotsExample() {
  // const [val, setVal] = useState<React.ReactText>("Togo");
  return (
    <Box maxW="400px" mx="auto">
      <Select
        defaultValue="Nigeria"
        // defaultIsOpen
        onChange={value => {
          console.log(value);
        }}
      >
        <SelectButton />
        <SelectMenu maxHeight="90vh" overflow="auto" width="auto">
          {countryList.map(country => (
            <Option id={country} value={country}>
              {country}
            </Option>
          ))}
        </SelectMenu>
      </Select>

      <select defaultValue="Nigeria">
        {countryList.map(country => (
          <option id={country} value={country}>
            {country}
          </option>
        ))}
      </select>
    </Box>
  );
}

stories.add("perf: with many options", () => <LotsExample />);

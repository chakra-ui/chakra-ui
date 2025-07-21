"use client"

import {
  Combobox,
  Portal,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef } from "react"
import { flushSync } from "react-dom"

export const ComboboxVirtualized = () => {
  const contentRef = useRef<HTMLDivElement>(null)

  const { startsWith } = useFilter({ sensitivity: "base" })

  const { collection, filter, reset } = useListCollection({
    initialItems: items,
    filter: startsWith,
  })

  const virtualizer = useVirtualizer({
    count: collection.size,
    getScrollElement: () => contentRef.current,
    estimateSize: () => 28,
    overscan: 10,
    scrollPaddingEnd: 32,
  })

  const handleScrollToIndexFn = (details: { index: number }) => {
    flushSync(() => {
      virtualizer.scrollToIndex(details.index, {
        align: "center",
        behavior: "auto",
      })
    })
  }

  return (
    <Combobox.Root
      collection={collection}
      onInputValueChange={(e) => filter(e.inputValue)}
      scrollToIndexFn={handleScrollToIndexFn}
      width="320px"
    >
      <Combobox.Label>Select framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input placeholder="Type to search" />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger onClick={reset} />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Portal>
        <Combobox.Positioner>
          <Combobox.Content ref={contentRef}>
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {virtualizer.getVirtualItems().map((virtualItem) => {
                const item = collection.items[virtualItem.index]
                return (
                  <Combobox.Item
                    key={item.value}
                    item={item}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualItem.size}px`,
                      transform: `translateY(${virtualItem.start}px)`,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Combobox.ItemText truncate>
                      <span aria-hidden style={{ marginRight: 4 }}>
                        {item.emoji}
                      </span>
                      {item.label}
                    </Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )
              })}
            </div>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

export const items = [
  { value: "AD", label: "Andorra", emoji: "🇦🇩" },
  { value: "AE", label: "United Arab Emirates", emoji: "🇦🇪" },
  { value: "AF", label: "Afghanistan", emoji: "🇦🇫" },
  { value: "AG", label: "Antigua and Barbuda", emoji: "🇦🇬" },
  { value: "AI", label: "Anguilla", emoji: "🇦🇮" },
  { value: "AL", label: "Albania", emoji: "🇦🇱" },
  { value: "AM", label: "Armenia", emoji: "🇦🇲" },
  { value: "AO", label: "Angola", emoji: "🇦🇴" },
  { value: "AQ", label: "Antarctica", emoji: "🇦🇶" },
  { value: "AR", label: "Argentina", emoji: "🇦🇷" },
  { value: "AS", label: "American Samoa", emoji: "🇦🇸" },
  { value: "AT", label: "Austria", emoji: "🇦🇹" },
  { value: "AU", label: "Australia", emoji: "🇦🇺" },
  { value: "AW", label: "Aruba", emoji: "🇦🇼" },
  { value: "AX", label: "Åland Islands", emoji: "🇦🇽" },
  { value: "AZ", label: "Azerbaijan", emoji: "🇦🇿" },
  { value: "BA", label: "Bosnia and Herzegovina", emoji: "🇧🇦" },
  { value: "BB", label: "Barbados", emoji: "🇧🇧" },
  { value: "BD", label: "Bangladesh", emoji: "🇧🇩" },
  { value: "BE", label: "Belgium", emoji: "🇧🇪" },
  { value: "BF", label: "Burkina Faso", emoji: "🇧🇫" },
  { value: "BG", label: "Bulgaria", emoji: "🇧🇬" },
  { value: "BH", label: "Bahrain", emoji: "🇧🇭" },
  { value: "BI", label: "Burundi", emoji: "🇧🇮" },
  { value: "BJ", label: "Benin", emoji: "🇧🇯" },
  { value: "BL", label: "Saint Barthélemy", emoji: "🇧🇱" },
  { value: "BM", label: "Bermuda", emoji: "🇧🇲" },
  { value: "BN", label: "Brunei Darussalam", emoji: "🇧🇳" },
  { value: "BO", label: "Bolivia, Plurinational State of", emoji: "🇧🇴" },
  { value: "BQ", label: "Bonaire, Sint Eustatius and Saba", emoji: "🇧🇶" },
  { value: "BR", label: "Brazil", emoji: "🇧🇷" },
  { value: "BS", label: "Bahamas", emoji: "🇧🇸" },
  { value: "BT", label: "Bhutan", emoji: "🇧🇹" },
  { value: "BV", label: "Bouvet Island", emoji: "🇧🇻" },
  { value: "BW", label: "Botswana", emoji: "🇧🇼" },
  { value: "BY", label: "Belarus", emoji: "🇧🇾" },
  { value: "BZ", label: "Belize", emoji: "🇧🇿" },
  { value: "CA", label: "Canada", emoji: "🇨🇦" },
  { value: "CC", label: "Cocos (Keeling) Islands", emoji: "🇨🇨" },
  { value: "CD", label: "Congo, Democratic Republic of the", emoji: "🇨🇩" },
  { value: "CF", label: "Central African Republic", emoji: "🇨🇫" },
  { value: "CG", label: "Congo", emoji: "🇨🇬" },
  { value: "CH", label: "Switzerland", emoji: "🇨🇭" },
  { value: "CI", label: "Côte d'Ivoire", emoji: "🇨🇮" },
  { value: "CK", label: "Cook Islands", emoji: "🇨🇰" },
  { value: "CL", label: "Chile", emoji: "🇨🇱" },
  { value: "CM", label: "Cameroon", emoji: "🇨🇲" },
  { value: "CN", label: "China", emoji: "🇨🇳" },
  { value: "CO", label: "Colombia", emoji: "🇨🇴" },
  { value: "CR", label: "Costa Rica", emoji: "🇨🇷" },
  { value: "CU", label: "Cuba", emoji: "🇨🇺" },
  { value: "CV", label: "Cabo Verde", emoji: "🇨🇻" },
  { value: "CW", label: "Curaçao", emoji: "🇨🇼" },
  { value: "CX", label: "Christmas Island", emoji: "🇨🇽" },
  { value: "CY", label: "Cyprus", emoji: "🇨🇾" },
  { value: "CZ", label: "Czechia", emoji: "🇨🇿" },
  { value: "DE", label: "Germany", emoji: "🇩🇪" },
  { value: "DJ", label: "Djibouti", emoji: "🇩🇯" },
  { value: "DK", label: "Denmark", emoji: "🇩🇰" },
  { value: "DM", label: "Dominica", emoji: "🇩🇲" },
  { value: "DO", label: "Dominican Republic", emoji: "🇩🇴" },
  { value: "DZ", label: "Algeria", emoji: "🇩🇿" },
  { value: "EC", label: "Ecuador", emoji: "🇪🇨" },
  { value: "EE", label: "Estonia", emoji: "🇪🇪" },
  { value: "EG", label: "Egypt", emoji: "🇪🇬" },
  { value: "EH", label: "Western Sahara", emoji: "🇪🇭" },
  { value: "ER", label: "Eritrea", emoji: "🇪🇷" },
  { value: "ES", label: "Spain", emoji: "🇪🇸" },
  { value: "ET", label: "Ethiopia", emoji: "🇪🇹" },
  { value: "FI", label: "Finland", emoji: "🇫🇮" },
  { value: "FJ", label: "Fiji", emoji: "🇫🇯" },
  { value: "FK", label: "Falkland Islands (Malvinas)", emoji: "🇫🇰" },
  { value: "FM", label: "Micronesia, Federated States of", emoji: "🇫🇲" },
  { value: "FO", label: "Faroe Islands", emoji: "🇫🇴" },
  { value: "FR", label: "France", emoji: "🇫🇷" },
  { value: "GA", label: "Gabon", emoji: "🇬🇦" },
  {
    value: "GB",
    label: "United Kingdom of Great Britain and Northern Ireland",
    emoji: "🇬🇧",
  },
  { value: "GD", label: "Grenada", emoji: "🇬🇩" },
  { value: "GE", label: "Georgia", emoji: "🇬🇪" },
  { value: "GF", label: "French Guiana", emoji: "🇬🇫" },
  { value: "GG", label: "Guernsey", emoji: "🇬🇬" },
  { value: "GH", label: "Ghana", emoji: "🇬🇭" },
  { value: "GI", label: "Gibraltar", emoji: "🇬🇮" },
  { value: "GL", label: "Greenland", emoji: "🇬🇱" },
  { value: "GM", label: "Gambia", emoji: "🇬🇲" },
  { value: "GN", label: "Guinea", emoji: "🇬🇳" },
  { value: "GP", label: "Guadeloupe", emoji: "🇬🇵" },
  { value: "GQ", label: "Equatorial Guinea", emoji: "🇬🇶" },
  { value: "GR", label: "Greece", emoji: "🇬🇷" },
  {
    value: "GS",
    label: "South Georgia and the South Sandwich Islands",
    emoji: "🇬🇸",
  },
  { value: "GT", label: "Guatemala", emoji: "🇬🇹" },
  { value: "GU", label: "Guam", emoji: "🇬🇺" },
  { value: "GW", label: "Guinea-Bissau", emoji: "🇬🇼" },
  { value: "GY", label: "Guyana", emoji: "🇬🇾" },
  { value: "HK", label: "Hong Kong", emoji: "🇭🇰" },
  { value: "HM", label: "Heard Island and McDonald Islands", emoji: "🇭🇲" },
  { value: "HN", label: "Honduras", emoji: "🇭🇳" },
  { value: "HR", label: "Croatia", emoji: "🇭🇷" },
  { value: "HT", label: "Haiti", emoji: "🇭🇹" },
  { value: "HU", label: "Hungary", emoji: "🇭🇺" },
  { value: "ID", label: "Indonesia", emoji: "🇮🇩" },
  { value: "IE", label: "Ireland", emoji: "🇮🇪" },
  { value: "IL", label: "Israel", emoji: "🇮🇱" },
  { value: "IM", label: "Isle of Man", emoji: "🇮🇲" },
  { value: "IN", label: "India", emoji: "🇮🇳" },
  { value: "IO", label: "British Indian Ocean Territory", emoji: "🇮🇴" },
  { value: "IQ", label: "Iraq", emoji: "🇮🇶" },
  { value: "IR", label: "Iran, Islamic Republic of", emoji: "🇮🇷" },
  { value: "IS", label: "Iceland", emoji: "🇮🇸" },
  { value: "IT", label: "Italy", emoji: "🇮🇹" },
  { value: "JE", label: "Jersey", emoji: "🇯🇪" },
  { value: "JM", label: "Jamaica", emoji: "🇯🇲" },
  { value: "JO", label: "Jordan", emoji: "🇯🇴" },
  { value: "JP", label: "Japan", emoji: "🇯🇵" },
  { value: "KE", label: "Kenya", emoji: "🇰🇪" },
  { value: "KG", label: "Kyrgyzstan", emoji: "🇰🇬" },
  { value: "KH", label: "Cambodia", emoji: "🇰🇭" },
  { value: "KI", label: "Kiribati", emoji: "🇰🇮" },
  { value: "KM", label: "Comoros", emoji: "🇰🇲" },
  { value: "KN", label: "Saint Kitts and Nevis", emoji: "🇰🇳" },
  { value: "KP", label: "Korea, Democratic People's Republic of", emoji: "🇰🇵" },
  { value: "KR", label: "Korea, Republic of", emoji: "🇰🇷" },
  { value: "KW", label: "Kuwait", emoji: "🇰🇼" },
  { value: "KY", label: "Cayman Islands", emoji: "🇰🇾" },
  { value: "KZ", label: "Kazakhstan", emoji: "🇰🇿" },
  { value: "LA", label: "Lao People's Democratic Republic", emoji: "🇱🇦" },
  { value: "LB", label: "Lebanon", emoji: "🇱🇧" },
  { value: "LC", label: "Saint Lucia", emoji: "🇱🇨" },
  { value: "LI", label: "Liechtenstein", emoji: "🇱🇮" },
  { value: "LK", label: "Sri Lanka", emoji: "🇱🇰" },
  { value: "LR", label: "Liberia", emoji: "🇱🇷" },
  { value: "LS", label: "Lesotho", emoji: "🇱🇸" },
  { value: "LT", label: "Lithuania", emoji: "🇱🇹" },
  { value: "LU", label: "Luxembourg", emoji: "🇱🇺" },
  { value: "LV", label: "Latvia", emoji: "🇱🇻" },
  { value: "LY", label: "Libya", emoji: "🇱🇾" },
  { value: "MA", label: "Morocco", emoji: "🇲🇦" },
  { value: "MC", label: "Monaco", emoji: "🇲🇨" },
  { value: "MD", label: "Moldova, Republic of", emoji: "🇲🇩" },
  { value: "ME", label: "Montenegro", emoji: "🇲🇪" },
  { value: "MF", label: "Saint Martin, (French part)", emoji: "🇲🇫" },
  { value: "MG", label: "Madagascar", emoji: "🇲🇬" },
  { value: "MH", label: "Marshall Islands", emoji: "🇲🇭" },
  { value: "MK", label: "North Macedonia", emoji: "🇲🇰" },
  { value: "ML", label: "Mali", emoji: "🇲🇱" },
  { value: "MM", label: "Myanmar", emoji: "🇲🇲" },
  { value: "MN", label: "Mongolia", emoji: "🇲🇳" },
  { value: "MO", label: "Macao", emoji: "🇲🇴" },
  { value: "MP", label: "Northern Mariana Islands", emoji: "🇲🇵" },
  { value: "MQ", label: "Martinique", emoji: "🇲🇶" },
  { value: "MR", label: "Mauritania", emoji: "🇲🇷" },
  { value: "MS", label: "Montserrat", emoji: "🇲🇸" },
  { value: "MT", label: "Malta", emoji: "🇲🇹" },
  { value: "MU", label: "Mauritius", emoji: "🇲🇺" },
  { value: "MV", label: "Maldives", emoji: "🇲🇻" },
  { value: "MW", label: "Malawi", emoji: "🇲🇼" },
  { value: "MX", label: "Mexico", emoji: "🇲🇽" },
  { value: "MY", label: "Malaysia", emoji: "🇲🇾" },
  { value: "MZ", label: "Mozambique", emoji: "🇲🇿" },
  { value: "NA", label: "Namibia", emoji: "🇳🇦" },
  { value: "NC", label: "New Caledonia", emoji: "🇳🇨" },
  { value: "NE", label: "Niger", emoji: "🇳🇪" },
  { value: "NF", label: "Norfolk Island", emoji: "🇳🇫" },
  { value: "NG", label: "Nigeria", emoji: "🇳🇬" },
  { value: "NI", label: "Nicaragua", emoji: "🇳🇮" },
  { value: "NL", label: "Netherlands", emoji: "🇳🇱" },
  { value: "NO", label: "Norway", emoji: "🇳🇴" },
  { value: "NP", label: "Nepal", emoji: "🇳🇵" },
  { value: "NR", label: "Nauru", emoji: "🇳🇷" },
  { value: "NU", label: "Niue", emoji: "🇳🇺" },
  { value: "NZ", label: "New Zealand", emoji: "🇳🇿" },
  { value: "OM", label: "Oman", emoji: "🇴🇲" },
  { value: "PA", label: "Panama", emoji: "🇵🇦" },
  { value: "PE", label: "Peru", emoji: "🇵🇪" },
  { value: "PF", label: "French Polynesia", emoji: "🇵🇫" },
  { value: "PG", label: "Papua New Guinea", emoji: "🇵🇬" },
  { value: "PH", label: "Philippines", emoji: "🇵🇭" },
  { value: "PK", label: "Pakistan", emoji: "🇵🇰" },
  { value: "PL", label: "Poland", emoji: "🇵🇱" },
  { value: "PM", label: "Saint Pierre and Miquelon", emoji: "🇵🇲" },
  { value: "PN", label: "Pitcairn", emoji: "🇵🇳" },
  { value: "PR", label: "Puerto Rico", emoji: "🇵🇷" },
  { value: "PS", label: "Palestine, State of", emoji: "🇵🇸" },
  { value: "PT", label: "Portugal", emoji: "🇵🇹" },
  { value: "PW", label: "Palau", emoji: "🇵🇼" },
  { value: "PY", label: "Paraguay", emoji: "🇵🇾" },
  { value: "QA", label: "Qatar", emoji: "🇶🇦" },
  { value: "RE", label: "Réunion", emoji: "🇷🇪" },
  { value: "RO", label: "Romania", emoji: "🇷🇴" },
  { value: "RS", label: "Serbia", emoji: "🇷🇸" },
  { value: "RU", label: "Russian Federation", emoji: "🇷🇺" },
  { value: "RW", label: "Rwanda", emoji: "🇷🇼" },
  { value: "SA", label: "Saudi Arabia", emoji: "🇸🇦" },
  { value: "SB", label: "Solomon Islands", emoji: "🇸🇧" },
  { value: "SC", label: "Seychelles", emoji: "🇸🇨" },
  { value: "SD", label: "Sudan", emoji: "🇸🇩" },
  { value: "SE", label: "Sweden", emoji: "🇸🇪" },
  { value: "SG", label: "Singapore", emoji: "🇸🇬" },
  {
    value: "SH",
    label: "Saint Helena, Ascension and Tristan da Cunha",
    emoji: "🇸🇭",
  },
  { value: "SI", label: "Slovenia", emoji: "🇸🇮" },
  { value: "SJ", label: "Svalbard and Jan Mayen", emoji: "🇸🇯" },
  { value: "SK", label: "Slovakia", emoji: "🇸🇰" },
  { value: "SL", label: "Sierra Leone", emoji: "🇸🇱" },
  { value: "SM", label: "San Marino", emoji: "🇸🇲" },
  { value: "SN", label: "Senegal", emoji: "🇸🇳" },
  { value: "SO", label: "Somalia", emoji: "🇸🇴" },
  { value: "SR", label: "Suriname", emoji: "🇸🇷" },
  { value: "SS", label: "South Sudan", emoji: "🇸🇸" },
  { value: "ST", label: "Sao Tome and Principe", emoji: "🇸🇹" },
  { value: "SV", label: "El Salvador", emoji: "🇸🇻" },
  { value: "SX", label: "Sint Maarten, (Dutch part)", emoji: "🇸🇽" },
  { value: "SY", label: "Syrian Arab Republic", emoji: "🇸🇾" },
  { value: "SZ", label: "Eswatini", emoji: "🇸🇿" },
  { value: "TC", label: "Turks and Caicos Islands", emoji: "🇹🇨" },
  { value: "TD", label: "Chad", emoji: "🇹🇩" },
  { value: "TF", label: "French Southern Territories", emoji: "🇹🇫" },
  { value: "TG", label: "Togo", emoji: "🇹🇬" },
  { value: "TH", label: "Thailand", emoji: "🇹🇭" },
  { value: "TJ", label: "Tajikistan", emoji: "🇹🇯" },
  { value: "TK", label: "Tokelau", emoji: "🇹🇰" },
  { value: "TL", label: "Timor-Leste", emoji: "🇹🇱" },
  { value: "TM", label: "Turkmenistan", emoji: "🇹🇲" },
  { value: "TN", label: "Tunisia", emoji: "🇹🇳" },
  { value: "TO", label: "Tonga", emoji: "🇹🇴" },
  { value: "TR", label: "Türkiye", emoji: "🇹🇷" },
  { value: "TT", label: "Trinidad and Tobago", emoji: "🇹🇹" },
  { value: "TV", label: "Tuvalu", emoji: "🇹🇻" },
  { value: "TW", label: "Taiwan, Province of China", emoji: "🇹🇼" },
  { value: "TZ", label: "Tanzania, United Republic of", emoji: "🇹🇿" },
  { value: "UA", label: "Ukraine", emoji: "🇺🇦" },
  { value: "UG", label: "Uganda", emoji: "🇺🇬" },
  { value: "UM", label: "United States Minor Outlying Islands", emoji: "🇺🇲" },
  { value: "US", label: "United States of America", emoji: "🇺🇸" },
  { value: "UY", label: "Uruguay", emoji: "🇺🇾" },
  { value: "UZ", label: "Uzbekistan", emoji: "🇺🇿" },
  { value: "VA", label: "Holy See", emoji: "🇻🇦" },
  { value: "VC", label: "Saint Vincent and the Grenadines", emoji: "🇻🇨" },
  { value: "VE", label: "Venezuela, Bolivarian Republic of", emoji: "🇻🇪" },
  { value: "VG", label: "Virgin Islands, British", emoji: "🇻🇬" },
  { value: "VI", label: "Virgin Islands, U.S.", emoji: "🇻🇮" },
  { value: "VN", label: "Viet Nam", emoji: "🇻🇳" },
  { value: "VU", label: "Vanuatu", emoji: "🇻🇺" },
  { value: "WF", label: "Wallis and Futuna", emoji: "🇼🇫" },
  { value: "WS", label: "Samoa", emoji: "🇼🇸" },
  { value: "YE", label: "Yemen", emoji: "🇾🇪" },
  { value: "YT", label: "Mayotte", emoji: "🇾🇹" },
  { value: "ZA", label: "South Africa", emoji: "🇿🇦" },
  { value: "ZM", label: "Zambia", emoji: "🇿🇲" },
  { value: "ZW", label: "Zimbabwe", emoji: "🇿🇼" },
]

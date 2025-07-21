"use client"

import {
  Combobox,
  HStack,
  Icon,
  Portal,
  Span,
  useFilter,
  useListCollection,
} from "@chakra-ui/react"

export const ComboboxWithDisabledItem = () => {
  const { contains } = useFilter({ sensitivity: "base" })

  const { collection, filter } = useListCollection({
    initialItems: companies,
    filter: contains,
    itemToValue: (item) => item.id,
    itemToString: (item) => item.name,
    isItemDisabled: (item) => !!item.disabled,
  })

  const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
    filter(details.inputValue)
  }

  return (
    <Combobox.Root
      width="320px"
      collection={collection}
      placeholder="Type to search companies"
      onInputValueChange={handleInputChange}
    >
      <Combobox.Label>Select a Company</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>

      <Portal>
        <Combobox.Positioner>
          <Combobox.Content>
            <Combobox.ItemGroup>
              <Combobox.ItemGroupLabel>Companies</Combobox.ItemGroupLabel>
              {collection.items.map((country) => {
                return (
                  <Combobox.Item item={country} key={country.id}>
                    <HStack gap="3">
                      <Icon>{country.logo}</Icon>
                      <Span fontWeight="medium">{country.name}</Span>
                    </HStack>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                )
              })}
            </Combobox.ItemGroup>
          </Combobox.Content>
        </Combobox.Positioner>
      </Portal>
    </Combobox.Root>
  )
}

interface Company {
  id: string
  name: string
  logo: React.ReactElement
  disabled?: boolean
}

const companies: Company[] = [
  {
    id: "airbnb",
    name: "Airbnb",
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#airbnb)">
          <path fill="#EB4C60" d="M0 0h18v18H0V0Z" />
          <path
            fill="#fff"
            d="m13.565 10.777.051.123c.133.372.173.724.092 1.076a2.142 2.142 0 0 1-1.33 1.672 2.095 2.095 0 0 1-1.096.141 2.737 2.737 0 0 1-1.023-.342c-.41-.231-.819-.564-1.269-1.047-.45.483-.85.816-1.27 1.047a2.73 2.73 0 0 1-1.29.362c-.286 0-.562-.05-.828-.16a2.146 2.146 0 0 1-1.33-1.673 2.211 2.211 0 0 1 .122-1.087c.051-.13.103-.252.153-.362l.112-.242.124-.271.011-.02a115.31 115.31 0 0 1 2.261-4.552l.03-.061c.083-.151.165-.312.246-.473a3.45 3.45 0 0 1 .37-.553 1.725 1.725 0 0 1 1.31-.605c.501 0 .972.221 1.299.625.15.167.25.342.344.51l.025.043c.081.161.163.322.246.473l.03.061a104.224 104.224 0 0 1 2.262 4.552l.01.01.124.271.112.242c.034.073.067.156.102.24Zm-5.6-1.227c.123.544.482 1.188 1.035 1.873.552-.695.911-1.339 1.034-1.873.05-.201.06-.41.03-.615a.968.968 0 0 0-.163-.422C9.715 8.232 9.379 8.07 9 8.07a1.092 1.092 0 0 0-.9.443.968.968 0 0 0-.165.423c-.03.205-.019.414.031.615l-.001-.001Zm4.187 3.524c.503-.201.86-.654.932-1.178.037-.26.013-.526-.071-.775a1.97 1.97 0 0 0-.088-.216 5.032 5.032 0 0 1-.046-.107 7.415 7.415 0 0 1-.118-.251 5.735 5.735 0 0 0-.117-.252v-.01a132.7 132.7 0 0 0-2.242-4.53l-.03-.061-.123-.232-.123-.232a2.211 2.211 0 0 0-.287-.443 1.078 1.078 0 0 0-.819-.372 1.078 1.078 0 0 0-.818.372c-.113.136-.21.284-.287.443-.042.077-.083.155-.123.232-.04.079-.082.157-.123.232l-.03.06a109.354 109.354 0 0 0-2.253 4.521l-.01.02a20.74 20.74 0 0 0-.281.61 1.951 1.951 0 0 0-.087.216 1.639 1.639 0 0 0-.092.785 1.5 1.5 0 0 0 .931 1.178c.235.09.502.13.778.1.257-.03.512-.11.778-.26.369-.202.748-.515 1.167-.978-.665-.816-1.084-1.57-1.239-2.235a2.058 2.058 0 0 1-.051-.855c.041-.253.134-.484.277-.685.317-.443.85-.716 1.442-.716.595 0 1.127.263 1.444.716.143.2.235.432.276.685.031.261.021.543-.051.855-.153.665-.563 1.41-1.239 2.225.43.464.8.776 1.167.977.266.15.522.231.778.262.267.03.533 0 .778-.101Z"
          />
        </g>
        <defs>
          <clipPath id="airbnb">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    id: "tesla",
    disabled: true,
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#tesla)">
          <path fill="#E31937" d="M0 0h18v18H0V0Z" />
          <path
            fill="#fff"
            d="m9 15 1.5-8c1.334 0 1.654.272 1.715.872 0 0 .894-.335 1.346-1.016C11.8 6.037 10 6 10 6L9 7.25 8 6s-1.8.037-3.56.856c.45.68 1.345 1.016 1.345 1.016.061-.6.39-.871 1.715-.872L9 15Z"
          />
          <path
            fill="#fff"
            d="M9 5.608a11.35 11.35 0 0 1 4.688.955C13.91 6.16 14 6 14 6c-1.823-.724-3.53-.994-5-1-1.47.006-3.177.276-5 1 0 0 .114.2.313.563A11.348 11.348 0 0 1 9 5.608Z"
          />
        </g>
        <defs>
          <clipPath id="tesla">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    name: "Tesla",
  },
  {
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#nvidia-a)">
          <path fill="url(#nvidia-b)" d="M0 0h18v18H0V0Z" />
          <path
            fill="#fff"
            d="M7.601 7.57v-.656c.065-.004.13-.008.195-.008 1.797-.057 2.975 1.547 2.975 1.547S9.5 10.218 8.136 10.218c-.183 0-.36-.029-.53-.085V8.14c.7.085.841.393 1.258 1.093l.936-.786s-.685-.894-1.834-.894a2.745 2.745 0 0 0-.365.016Zm0-2.17v.98l.195-.012c2.497-.086 4.13 2.048 4.13 2.048s-1.871 2.275-3.819 2.275c-.17 0-.336-.016-.502-.044v.607c.138.016.28.029.417.029 1.814 0 3.126-.928 4.397-2.02.21.17 1.073.578 1.251.756-1.206 1.012-4.02 1.826-5.615 1.826-.154 0-.3-.008-.446-.024v.854H14.5V5.4H7.601Zm0 4.733v.518c-1.676-.3-2.141-2.045-2.141-2.045s.805-.89 2.141-1.036v.567h-.004c-.7-.085-1.25.57-1.25.57s.31 1.106 1.254 1.426Zm-2.975-1.6s.991-1.465 2.98-1.619V6.38C5.402 6.558 3.5 8.42 3.5 8.42s1.077 3.118 4.101 3.401v-.567c-2.218-.275-2.975-2.72-2.975-2.72Z"
          />
        </g>
        <defs>
          <linearGradient
            id="nvidia-b"
            x1="16"
            x2="5.5"
            y1="-.5"
            y2="18"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#85B737" />
            <stop offset="1" stopColor="#597B20" />
          </linearGradient>
          <clipPath id="nvidia-a">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
    id: "nvida",
    name: "NVIDA",
  },
  {
    id: "amazon",
    name: "Amazon",
    logo: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
        <g clipPath="url(#amazon)">
          <path d="M0 0h18v18H0V0Z" />
          <path
            fill="#fff"
            d="M12.237 10.734c-.259-.327-.458-.56-.458-1.189V7.46c0-.88-.06-1.703-.708-2.306-.519-.478-1.373-.654-2.047-.654-1.425 0-2.698.58-3.01 2.137-.026.177.104.252.207.278l1.351.123c.13 0 .208-.125.234-.25.104-.529.572-.972 1.09-.972.285 0 .848.287.848.89v.754c-.83 0-1.757.056-2.483.357-.855.353-1.586 1.028-1.586 2.11 0 1.382 1.064 2.137 2.204 2.137.96 0 1.482-.25 2.232-.979.235.352.38.603.82.979.105.051.234.051.31-.024.26-.228.712-.703.996-.929.13-.102.104-.252 0-.377ZM9.744 8.775c0 .502-.098 1.756-1.368 1.756-.653 0-.666-.769-.666-.769 0-.988 1.049-1.317 2.034-1.317v.33Z"
          />
          <path
            fill="#FFB300"
            d="M12.917 12.952C11.862 13.601 10.284 14 9.005 14a7.818 7.818 0 0 1-4.713-1.551c-.101-.084 0-.168.1-.126 1.432.685 3 1.036 4.587 1.026 1.154 0 2.609-.209 3.787-.628.174-.042.325.126.15.231Zm.376-.44c-.125-.147-.878-.063-1.204-.043-.101 0-.125-.062-.025-.125.576-.357 1.554-.252 1.655-.126.1.126-.026.943-.577 1.32-.076.064-.176.021-.126-.04.126-.253.402-.84.276-.987Z"
          />
        </g>
        <defs>
          <clipPath id="amazon">
            <path fill="#fff" d="M0 0h18v18H0z" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
]

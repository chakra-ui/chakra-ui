"use client"

import { Portal, Select, createListCollection } from "@chakra-ui/react"

export const SelectWithClear = () => {
  return (
    <Select.Root
      collection={animeMovies}
      defaultValue={["spirited_away"]}
      size="sm"
      width="320px"
    >
      <Select.HiddenSelect />
      <Select.Label>Select fav. anime</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select anime" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.ClearTrigger />
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {animeMovies.items.map((anime) => (
              <Select.Item item={anime} key={anime.value}>
                {anime.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

const animeMovies = createListCollection({
  items: [
    { label: "Spirited Away", value: "spirited_away" },
    { label: "My Neighbor Totoro", value: "my_neighbor_totoro" },
    { label: "Akira", value: "akira" },
    { label: "Princess Mononoke", value: "princess_mononoke" },
    { label: "Grave of the Fireflies", value: "grave_of_the_fireflies" },
    { label: "Howl's Moving Castle", value: "howls_moving_castle" },
    { label: "Ghost in the Shell", value: "ghost_in_the_shell" },
    { label: "Naruto", value: "naruto" },
    { label: "Hunter x Hunter", value: "hunter_x_hunter" },
    { label: "The Wind Rises", value: "the_wind_rises" },
    { label: "Kiki's Delivery Service", value: "kikis_delivery_service" },
    { label: "Perfect Blue", value: "perfect_blue" },
    {
      label: "The Girl Who Leapt Through Time",
      value: "the_girl_who_leapt_through_time",
    },
    { label: "Weathering with You", value: "weathering_with_you" },
    { label: "Ponyo", value: "ponyo" },
    { label: "5 Centimeters per Second", value: "5_centimeters_per_second" },
    { label: "A Silent Voice", value: "a_silent_voice" },
    { label: "Paprika", value: "paprika" },
    { label: "Wolf Children", value: "wolf_children" },
    { label: "Redline", value: "redline" },
    {
      label: "The Tale of the Princess Kaguya",
      value: "the_tale_of_the_princess_kaguya",
    },
  ],
})

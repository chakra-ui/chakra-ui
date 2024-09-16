"use client"

import { createListCollection } from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "compositions/ui/select"

export const SelectWithOverflow = () => {
  return (
    <SelectRoot collection={animeMovies} size="sm" width="240px">
      <SelectLabel>Select anime</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder="Select movie" />
      </SelectTrigger>
      <SelectContent>
        {animeMovies.items.map((movie) => (
          <SelectItem item={movie} key={movie.value}>
            {movie.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
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

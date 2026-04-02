"use client"

import { Icon, Input, InputGroup } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { LuSearch } from "react-icons/lu"

interface Props {
  defaultValue: string
}

export const SearchInput = ({ defaultValue }: Props) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  return (
    <InputGroup
      startElement={
        <Icon size="md" color="fg.muted">
          <LuSearch />
        </Icon>
      }
    >
      <Input
        size="lg"
        placeholder="Search documentation..."
        defaultValue={defaultValue}
        autoFocus
        opacity={isPending ? 0.6 : 1}
        onChange={(e) => {
          const value = e.target.value
          startTransition(() => {
            const url = new URL(window.location.href)
            if (value) {
              url.searchParams.set("q", value)
            } else {
              url.searchParams.delete("q")
            }
            router.push(url.pathname + url.search)
          })
        }}
      />
    </InputGroup>
  )
}

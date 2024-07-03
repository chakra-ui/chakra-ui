import { defaultSystem } from "@chakra-ui/react"
import type { NextRequest } from "next/server"
import componentJson from "public/types/components.json"
import { pascalCase } from "scule"
import { getRecipeProps } from "./get-recipe-types"

interface Params {
  component: string
}

export const GET = async (
  _req: NextRequest,
  { params }: { params: Params },
) => {
  const { component } = params

  const recipeProps = getRecipeProps(defaultSystem, component)
  const res = await fetch(`https://ark-ui.com/api/types/react/${component}`)

  let json: Record<string, any> = {
    props: (componentJson as any)[pascalCase(component)] ?? {},
  }

  if (res.ok) {
    json = await res.json()
    Object.assign(json.Root.props, recipeProps)
  } else {
    Object.assign(json.props, recipeProps)
  }

  return Response.json(json)
}

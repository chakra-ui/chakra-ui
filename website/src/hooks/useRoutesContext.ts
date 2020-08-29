import React, { useState } from "react"
import constate from "constate"

const useSidebarRoutes = ({ routes }) => {
  const [sidebarRoutes, setSidebarRoutes] = useState(routes)
  return { sidebarRoutes }
}

export const [SidebarRoutesProvider, useSidebarRoutesContext] = constate(
  useSidebarRoutes,
)

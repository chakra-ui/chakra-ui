"use client"

import { Box } from "@chakra-ui/react"
import { Component, ReactNode } from "react"

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static defaultProps = {
    fallback: (
      <Box
        bg="bg.error"
        color="fg.error"
        px="4"
        py="2"
        textStyle="sm"
        fontWeight="medium"
      >
        Error Rendering Example
      </Box>
    ),
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(): void {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

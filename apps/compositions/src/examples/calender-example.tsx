import {
  Box,
  Button,
  Card,
  Grid,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react"
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  startOfMonth,
  subMonths,
} from "date-fns"
import * as React from "react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

export function DatePickerExample() {
  const [selected, setSelected] = React.useState<Date | null>(new Date())
  const [currentMonth, setCurrentMonth] = React.useState<Date>(new Date())
  const { open, onOpen, onClose } = useDisclosure()
  const inputRef = React.useRef<HTMLDivElement>(null)

  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const blanks = Array.from({ length: getDay(monthStart) })

  const handlePrev = () => setCurrentMonth((m) => subMonths(m, 1))
  const handleNext = () => setCurrentMonth((m) => addMonths(m, 1))
  const handleSelect = (day: Date) => {
    setSelected(day)
    onClose()
  }

  // Detect click outside to close
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [onClose])

  return (
    <Box ref={inputRef} position="relative" maxW="sm">
      <Input
        readOnly
        onClick={open ? onClose : onOpen}
        value={selected ? format(selected, "PPP") : ""}
        placeholder="Select a date"
        cursor="pointer"
      />

      {open && (
        <Card.Root
          position="absolute"
          top="100%"
          left={0}
          mt={2}
          zIndex={1}
          boxShadow="md"
          width="100%"
        >
          <Card.Body>
            <VStack gap={2} align="stretch">
              <HStack justify="space-between" align="center" mb={2}>
                <IconButton
                  aria-label="Previous month"
                  variant="ghost"
                  size="sm"
                  onClick={handlePrev}
                >
                  <LuChevronLeft />
                </IconButton>

                <Text fontWeight="bold">
                  {format(currentMonth, "MMMM yyyy")}
                </Text>

                <IconButton
                  aria-label="Next month"
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                >
                  <LuChevronRight />
                </IconButton>
              </HStack>

              <Grid templateColumns="repeat(7, 1fr)" gap={1} textAlign="center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <Text key={d} fontSize="xs" color="gray.500">
                    {d}
                  </Text>
                ))}

                {blanks.map((_, i) => (
                  <Box key={`b-${i}`} height="36px" />
                ))}

                {daysInMonth.map((day) => {
                  const isSelected = selected ? isSameDay(day, selected) : false
                  return (
                    <Button
                      key={day.toISOString()}
                      size="sm"
                      variant={isSelected ? "solid" : "ghost"}
                      colorScheme={isSelected ? "blue" : undefined}
                      onClick={() => handleSelect(day)}
                      height="36px"
                      minW="0"
                    >
                      {format(day, "d")}
                    </Button>
                  )
                })}
              </Grid>

              <HStack gap={2} pt={2}>
                <Button size="sm" onClick={() => handleSelect(new Date())}>
                  Today
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelected(null)}
                >
                  Clear
                </Button>
              </HStack>
            </VStack>
          </Card.Body>
        </Card.Root>
      )}
    </Box>
  )
}

export default function DatePickerExampleWrapper() {
  return (
    <Box p={6}>
      <DatePickerExample />
    </Box>
  )
}

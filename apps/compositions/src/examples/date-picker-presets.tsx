"use client"

import { Button, DatePicker, Flex, Portal, VStack } from "@chakra-ui/react"
import { LuCalendar } from "react-icons/lu"

export const DatePickerPresets = () => {
  return (
    <DatePicker.Root selectionMode="range" maxWidth="32rem">
      <DatePicker.Label>Select range</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Input index={1} />
        <DatePicker.IndicatorGroup>
          <DatePicker.Trigger>
            <LuCalendar />
          </DatePicker.Trigger>
        </DatePicker.IndicatorGroup>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <Flex px="4" py="4" gap="6">
              <VStack align="stretch" gap="2" minW="140px" height="100%">
                <DatePicker.PresetTrigger value="last7Days" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    Last 7 days
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="last30Days" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    Last 30 days
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="thisMonth" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    This month
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="lastMonth" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    Last month
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="thisYear" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    This year
                  </Button>
                </DatePicker.PresetTrigger>
                <DatePicker.PresetTrigger value="lastYear" asChild>
                  <Button variant="surface" size="sm" width="100%">
                    Last year
                  </Button>
                </DatePicker.PresetTrigger>
              </VStack>
              <Flex direction="column" flex="1" minW={0}>
                <DatePicker.View view="day">
                  <DatePicker.Header />
                  <DatePicker.DayTable />
                </DatePicker.View>
                <DatePicker.View view="month">
                  <DatePicker.Header />
                  <DatePicker.MonthTable />
                </DatePicker.View>
                <DatePicker.View view="year">
                  <DatePicker.Header />
                  <DatePicker.YearTable />
                </DatePicker.View>
              </Flex>
            </Flex>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

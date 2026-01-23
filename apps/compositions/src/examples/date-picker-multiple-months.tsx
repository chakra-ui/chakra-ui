"use client"

import { Button, DatePicker } from "@chakra-ui/react"
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../../../../packages/react/src/components/icons"

export const DatePickerMultipleMonths = () => {
  return (
    <DatePicker.Root numOfMonths={2}>
      <DatePicker.Label>Label</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input index={0} />
        <DatePicker.Trigger>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger asChild>
          <Button variant="outline" size="sm">
            Clear
          </Button>
        </DatePicker.ClearTrigger>
      </DatePicker.Control>
      <DatePicker.Positioner>
        <DatePicker.Content>
          <DatePicker.ViewControl>
            <DatePicker.PrevTrigger>
              <ChevronLeftIcon />
            </DatePicker.PrevTrigger>
            <DatePicker.RangeText />
            <DatePicker.NextTrigger>
              <ChevronRightIcon />
            </DatePicker.NextTrigger>
          </DatePicker.ViewControl>
          <div>
            <DatePicker.Context>
              {(datePicker) => (
                <DatePicker.Table>
                  <DatePicker.TableHead>
                    <DatePicker.TableRow>
                      {datePicker.weekDays.map((weekDay, id) => (
                        <DatePicker.TableHeader key={id}>
                          {weekDay.short}
                        </DatePicker.TableHeader>
                      ))}
                    </DatePicker.TableRow>
                  </DatePicker.TableHead>
                  <DatePicker.TableBody>
                    {datePicker.weeks.map((week, id) => (
                      <DatePicker.TableRow key={id}>
                        {week.map((day, id) => (
                          <DatePicker.TableCell key={id} value={day}>
                            <DatePicker.TableCellTrigger>
                              {day.day}
                            </DatePicker.TableCellTrigger>
                          </DatePicker.TableCell>
                        ))}
                      </DatePicker.TableRow>
                    ))}
                  </DatePicker.TableBody>
                </DatePicker.Table>
              )}
            </DatePicker.Context>
            <DatePicker.Context>
              {(datePicker) => {
                const offset = datePicker.getOffset({ months: 1 })
                return (
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {datePicker.weekDays.map((weekDay, id) => (
                          <DatePicker.TableHeader key={id}>
                            {weekDay.short}
                          </DatePicker.TableHeader>
                        ))}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {offset.weeks.map((week, id) => (
                        <DatePicker.TableRow key={id}>
                          {week.map((day, id) => (
                            <DatePicker.TableCell
                              key={id}
                              value={day}
                              visibleRange={offset.visibleRange}
                            >
                              <DatePicker.TableCellTrigger>
                                {day.day}
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>
                          ))}
                        </DatePicker.TableRow>
                      ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                )
              }}
            </DatePicker.Context>
          </div>
        </DatePicker.Content>
      </DatePicker.Positioner>
    </DatePicker.Root>
  )
}

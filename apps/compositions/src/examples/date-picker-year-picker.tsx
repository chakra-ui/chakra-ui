"use client"

import { DatePicker, Portal, parseDate } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import type { DateValue } from "@internationalized/date"
import { CalendarIcon } from "../../../../packages/react/src/components/icons"

const format = (date: DateValue) => date.year.toString()

const parse = (string: string | undefined) => {
  if (string === "" || !string) return
  const year = Number(string)
  if (year < 100) {
    const currentYear = new Date().getFullYear()
    const currentCentury = Math.floor(currentYear / 100) * 100
    return parseDate(new Date(currentCentury + year, 0))
  }
  return parseDate(new Date(Number(string), 0))
}

export const DatePickerYearPicker = () => {
  return (
    <DatePicker.Root
      format={format}
      parse={parse}
      defaultView="year"
      minView="year"
      placeholder="yyyy"
    >
      <DatePicker.Label>Label</DatePicker.Label>
      <DatePicker.Control>
        <DatePicker.Input />
        <DatePicker.Trigger>
          <CalendarIcon />
        </DatePicker.Trigger>
        <DatePicker.ClearTrigger asChild>
          <Button variant="outline" size="sm">
            Open Dialog
          </Button>
        </DatePicker.ClearTrigger>
      </DatePicker.Control>
      <Portal>
        <DatePicker.Positioner>
          <DatePicker.Content>
            <DatePicker.View view="year">
              <DatePicker.Context>
                {(datePicker) => (
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {datePicker
                        .getYearsGrid({ columns: 4 })
                        .map((years, id) => (
                          <DatePicker.TableRow key={id}>
                            {years.map((year, id) => (
                              <DatePicker.TableCell key={id} value={year.value}>
                                <DatePicker.TableCellTrigger>
                                  {year.label}
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            ))}
                          </DatePicker.TableRow>
                        ))}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                )}
              </DatePicker.Context>
            </DatePicker.View>
          </DatePicker.Content>
        </DatePicker.Positioner>
      </Portal>
    </DatePicker.Root>
  )
}

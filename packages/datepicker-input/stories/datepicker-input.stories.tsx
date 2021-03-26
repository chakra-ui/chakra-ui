import { Button } from "@chakra-ui/button"
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/form-control"
import { CheckIcon } from "@chakra-ui/icons"
import { Box, Container, Flex, HStack, Stack } from "@chakra-ui/layout"
import { PortalManager } from "@chakra-ui/portal"
import { Select } from "@chakra-ui/select"
import { chakra } from "@chakra-ui/system"
import React, { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import {
  Datepicker,
  DatepickerButtonsContainer,
  DatepickerCloseButton,
  DatepickerFooter,
  DatepickerInput,
  DatepickerInputField,
  DatepickerInputFieldEndDate,
  DatepickerInputFieldStartDate,
  DatepickerInputsRow,
  DatepickerMonth,
  DatepickerNextButton,
  DatepickerPrevButton,
  DatepickerRangeInput,
  DatepickerResetButton,
  DatepickerTodayButton,
  defaultDisplayFormat,
  END_DATE,
  FocusedInput,
  getInputValue,
  parseDate,
  START_DATE,
} from "../src"

export default {
  title: "DatepickerInput",
  decorators: [
    (StoryFn: Function) => (
      <PortalManager>
        <Container>
          <StoryFn />
        </Container>
      </PortalManager>
    ),
  ],
}

export const DateRange = () => (
  <DatepickerRangeInput>
    <DatepickerInputsRow>
      <DatepickerInputFieldStartDate placeholder="Start Date" />
      <DatepickerInputFieldEndDate placeholder="End Date" />
    </DatepickerInputsRow>
    <Datepicker />
  </DatepickerRangeInput>
)

export const SingleDate = () => (
  <DatepickerInput>
    <DatepickerInputsRow>
      <DatepickerInputFieldStartDate placeholder="Date" />
    </DatepickerInputsRow>
    <Datepicker />
  </DatepickerInput>
)

export const UnavailableDates = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [unavailableDate, setUnavailableDate] = useState(tomorrow)

  const formattedDate = useMemo(
    () => getInputValue(unavailableDate, defaultDisplayFormat, ""),
    [unavailableDate],
  )

  return (
    <Stack>
      <Box>
        <chakra.input
          defaultValue={formattedDate}
          onChange={(e) => {
            const parsedDate = parseDate(
              e.target.value,
              defaultDisplayFormat,
              new Date(),
            )
            if (!Number.isNaN(parsedDate.getDate())) {
              setUnavailableDate(parsedDate)
            }
          }}
        />
      </Box>
      <Box>
        <DatepickerRangeInput unavailableDates={[unavailableDate]}>
          <DatepickerInputsRow>
            <DatepickerInputFieldStartDate placeholder="Start Date" />
            <DatepickerInputFieldEndDate placeholder="End Date" />
          </DatepickerInputsRow>
          <Datepicker />
        </DatepickerRangeInput>
      </Box>
    </Stack>
  )
}

export const MinBookingDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <DatepickerRangeInput minBookingDate={tomorrow}>
      <DatepickerInputsRow>
        <DatepickerInputFieldStartDate placeholder="Start Date" />
        <DatepickerInputFieldEndDate placeholder="End Date" />
      </DatepickerInputsRow>
      <Datepicker />
    </DatepickerRangeInput>
  )
}

export const MinMaxBookingDates = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  const weekFromTomorrow = new Date()
  weekFromTomorrow.setDate(tomorrow.getDate() + 7)

  return (
    <DatepickerRangeInput
      minBookingDate={tomorrow}
      maxBookingDate={weekFromTomorrow}
    >
      <DatepickerInputsRow>
        <DatepickerInputFieldStartDate placeholder="Start Date" />
        <DatepickerInputFieldEndDate placeholder="End Date" />
      </DatepickerInputsRow>
      <Datepicker />
    </DatepickerRangeInput>
  )
}

export const MinBookingDays = () => {
  return (
    <DatepickerRangeInput minBookingDays={5}>
      <DatepickerInputsRow>
        <DatepickerInputFieldStartDate placeholder="Start Date" />
        <DatepickerInputFieldEndDate placeholder="End Date" />
      </DatepickerInputsRow>
      <Datepicker />
    </DatepickerRangeInput>
  )
}

export const WithMultipleMonths = () => (
  <DatepickerRangeInput numberOfMonths={2}>
    <DatepickerInputsRow>
      <DatepickerInputFieldStartDate placeholder="Start Date" />
      <DatepickerInputFieldEndDate placeholder="End Date" />
    </DatepickerInputsRow>
    <Datepicker />
  </DatepickerRangeInput>
)

export const CustomDisplayFormat = () => {
  const [displayFormat, setDisplayFormat] = useState("dd/MM/yyyy")
  const [inputMaskChar, setInputMaskChar] = useState("*")

  return (
    <>
      <Flex direction="row" gridGap={4} mb={6}>
        <Select
          defaultValue={displayFormat}
          onChange={(e) => setDisplayFormat(e.currentTarget.value)}
        >
          <option>MM-dd-yyyy</option>
          <option>dd/MM/yyyy</option>
          <option>dd/MM/yy</option>
        </Select>
        <Select
          defaultValue={inputMaskChar}
          onChange={(e) => setInputMaskChar(e.currentTarget.value)}
        >
          <option>*</option>
          <option>_</option>
          <option>#</option>
        </Select>
      </Flex>
      <DatepickerRangeInput
        displayFormat={displayFormat}
        inputMaskChar={inputMaskChar}
      >
        <DatepickerInputsRow>
          <DatepickerInputFieldStartDate placeholder="Start Date" />
          <DatepickerInputFieldEndDate placeholder="End Date" />
        </DatepickerInputsRow>
        <Datepicker />
      </DatepickerRangeInput>
    </>
  )
}

export const WithAllButtons = () => (
  <DatepickerRangeInput>
    <DatepickerInputsRow>
      <DatepickerInputFieldStartDate placeholder="Start Date" />
      <DatepickerInputFieldEndDate placeholder="End Date" />
    </DatepickerInputsRow>
    <Datepicker>
      <chakra.div
        __css={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <DatepickerButtonsContainer>
          <DatepickerPrevButton />
          <DatepickerNextButton />
        </DatepickerButtonsContainer>
        <DatepickerCloseButton />
      </chakra.div>
      <DatepickerMonth />
      <DatepickerFooter>
        <DatepickerResetButton />
        <DatepickerTodayButton />
      </DatepickerFooter>
    </Datepicker>
  </DatepickerRangeInput>
)

export const WithSomeButtons = () => (
  <DatepickerRangeInput>
    <DatepickerInputsRow>
      <DatepickerInputFieldStartDate placeholder="Start Date" />
      <DatepickerInputFieldEndDate placeholder="End Date" />
    </DatepickerInputsRow>
    <Datepicker>
      <chakra.div
        __css={{
          display: "flex",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <DatepickerButtonsContainer>
          <DatepickerPrevButton />
          <DatepickerNextButton />
        </DatepickerButtonsContainer>
        <DatepickerCloseButton />
      </chakra.div>
      <DatepickerMonth />
    </Datepicker>
  </DatepickerRangeInput>
)

export const WithCustomStyles = () => (
  <DatepickerRangeInput>
    <DatepickerInputsRow>
      <DatepickerInputFieldStartDate placeholder="Start Date" />
      <DatepickerInputFieldEndDate placeholder="End Date" />
    </DatepickerInputsRow>
    <Datepicker>
      <DatepickerMonth />
      <chakra.div position="absolute" top={4} left={4}>
        <DatepickerPrevButton />
      </chakra.div>
      <chakra.div position="absolute" top={4} right={4}>
        <DatepickerNextButton />
      </chakra.div>
      <DatepickerFooter>
        <DatepickerResetButton />
      </DatepickerFooter>
    </Datepicker>
  </DatepickerRangeInput>
)

export const InputSizes = () => (
  <Stack>
    {["xs", "sm", "md", "lg"].map((size) => (
      <DatepickerInput key={size}>
        <DatepickerInputField placeholder="Date" size={size} />
        <Datepicker />
      </DatepickerInput>
    ))}
  </Stack>
)

export const WithReactHookForm = () => {
  const { register, handleSubmit } = useForm<{
    startDate: Date
    endDate: Date
  }>({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  })

  const [formData, setFormData] = useState({})

  const onSubmit = (data: any) => {
    setFormData(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={5}>
          <DatepickerRangeInput>
            <DatepickerInputsRow>
              <DatepickerInputFieldStartDate
                placeholder="Start Date"
                ref={register({ required: true })}
              />
              <DatepickerInputFieldEndDate
                placeholder="End Date"
                ref={register({ required: true })}
              />
            </DatepickerInputsRow>
            <Datepicker />
          </DatepickerRangeInput>
          <Button type="submit">Submit</Button>
          <Box>
            <b>Form Data:</b>
            <pre>{JSON.stringify(formData)}</pre>
          </Box>
        </Stack>
      </form>
    </>
  )
}

export const WithFormControl = () => {
  const { register, handleSubmit, errors } = useForm<{
    startDate: Date
    endDate: Date
  }>({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  })

  const [formData, setFormData] = useState({})

  const onSubmit = (data: any) => {
    setFormData(data)
  }

  const startDateError = errors["startDate"]?.message
  const endDateError = errors["startDate"]?.message

  const onFocus = (focusedInput: FocusedInput) => () => {
    console.log(`You focused on the ${focusedInput}`)
  }

  const onBlur = (focusedInput: FocusedInput) => () => {
    console.log(`You blurred on the ${focusedInput}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <DatepickerRangeInput>
          <Stack align="start" isInline>
            <FormControl
              isRequired
              isInvalid={!!startDateError}
              onFocus={onFocus(START_DATE)}
              onBlur={onBlur(START_DATE)}
            >
              <FormLabel>Start Date</FormLabel>
              <DatepickerInputFieldStartDate
                placeholder="Start Date"
                ref={register({ required: true })}
              />
              <FormErrorMessage>{startDateError}</FormErrorMessage>
              {!startDateError && (
                <FormHelperText>Enter a start date</FormHelperText>
              )}
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!endDateError}
              onFocus={onFocus(END_DATE)}
              onBlur={onBlur(END_DATE)}
            >
              <FormLabel>End Date</FormLabel>
              <DatepickerInputFieldEndDate
                placeholder="End Date"
                ref={register({ required: true })}
              />
              <FormErrorMessage>{endDateError}</FormErrorMessage>
              {!endDateError && (
                <FormHelperText>Enter an end date</FormHelperText>
              )}
            </FormControl>
          </Stack>
          <Datepicker />
        </DatepickerRangeInput>
        <Button type="submit">Submit</Button>
        <Box>
          <b>Form Data:</b>
          <pre>{JSON.stringify(formData)}</pre>
        </Box>
      </Stack>
    </form>
  )
}

export const WithFormControlValues = () => {
  const onFocus = (focusedInput: FocusedInput) => () => {
    console.log(`You focused on the ${focusedInput}`)
  }

  const onBlur = (focusedInput: FocusedInput) => () => {
    console.log(`You blurred on the ${focusedInput}`)
  }

  const [isDisabled, setIsDisabled] = useState(false)
  const [isReadOnly, setIsReadOnly] = useState(false)
  const [isRequired, setIsRequired] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)

  return (
    <>
      <DatepickerRangeInput>
        <DatepickerInputsRow>
          <FormControl
            isRequired={isRequired}
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            onFocus={onFocus(START_DATE)}
            onBlur={onBlur(START_DATE)}
            id="startDateId"
          >
            <FormLabel>Start Date</FormLabel>
            <DatepickerInputFieldStartDate
              placeholder="Start Date"
              data-testid="start-input"
            />
            <FormHelperText>Select a start date</FormHelperText>
          </FormControl>

          <FormControl
            isRequired={isRequired}
            isInvalid={isInvalid}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            onFocus={onFocus(END_DATE)}
            onBlur={onBlur(END_DATE)}
            id="endDateId"
          >
            <FormLabel>End Date</FormLabel>
            <DatepickerInputFieldEndDate
              placeholder="End Date"
              data-testid="end-input"
            />
            <FormHelperText>Select a end date</FormHelperText>
          </FormControl>
        </DatepickerInputsRow>
        {!isReadOnly ? <Datepicker data-testid="datepicker" /> : null}
      </DatepickerRangeInput>
      <HStack mt={4}>
        <Button size="sm" onClick={() => setIsRequired((s) => !s)}>
          {isRequired && <CheckIcon />} isRequired
        </Button>
        <Button size="sm" onClick={() => setIsInvalid((s) => !s)}>
          {isInvalid && <CheckIcon />} isInvalid
        </Button>
        <Button size="sm" onClick={() => setIsReadOnly((s) => !s)}>
          {isReadOnly && <CheckIcon />} isReadOnly
        </Button>
        <Button size="sm" onClick={() => setIsDisabled((s) => !s)}>
          {isDisabled && <CheckIcon />} isDisabled
        </Button>
      </HStack>
    </>
  )
}

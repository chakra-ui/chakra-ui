import React from "react"
import { Grid, Flex, Text } from "@chakra-ui/core"
import * as chakraIcons from "@chakra-ui/icons"

const icons = {
  AddIcon: chakraIcons.AddIcon,
  ArrowBackIcon: chakraIcons.ArrowBackIcon,
  ArrowDownIcon: chakraIcons.ArrowDownIcon,
  ArrowForwardIcon: chakraIcons.ArrowForwardIcon,
  ArrowLeftIcon: chakraIcons.ArrowLeftIcon,
  ArrowRightIcon: chakraIcons.ArrowRightIcon,
  ArrowUpIcon: chakraIcons.ArrowUpIcon,
  ArrowUpDownIcon: chakraIcons.ArrowUpDownIcon,
  AtSignIcon: chakraIcons.AtSignIcon,
  AttachmentIcon: chakraIcons.AttachmentIcon,
  BellIcon: chakraIcons.BellIcon,
  CalendarIcon: chakraIcons.CalendarIcon,
  ChatIcon: chakraIcons.ChatIcon,
  CheckIcon: chakraIcons.CheckIcon,
  CheckCircleIcon: chakraIcons.CheckCircleIcon,
  ChevronDownIcon: chakraIcons.ChevronDownIcon,
  ChevronLeftIcon: chakraIcons.ChevronLeftIcon,
  ChevronRightIcon: chakraIcons.ChevronRightIcon,
  ChevronUpIcon: chakraIcons.ChevronUpIcon,
  CloseIcon: chakraIcons.CloseIcon,
  CopyIcon: chakraIcons.CopyIcon,
  DeleteIcon: chakraIcons.DeleteIcon,
  DownloadIcon: chakraIcons.DownloadIcon,
  DragHandleIcon: chakraIcons.DragHandleIcon,
  EditIcon: chakraIcons.EditIcon,
  EmailIcon: chakraIcons.EmailIcon,
  ExternalLinkIcon: chakraIcons.ExternalLinkIcon,
  InfoIcon: chakraIcons.InfoIcon,
  InfoOutlineIcon: chakraIcons.InfoOutlineIcon,
  LinkIcon: chakraIcons.LinkIcon,
  LockIcon: chakraIcons.LockIcon,
  MinusIcon: chakraIcons.MinusIcon,
  MoonIcon: chakraIcons.MoonIcon,
  NotAllowedIcon: chakraIcons.NotAllowedIcon,
  PhoneIcon: chakraIcons.PhoneIcon,
  PlusSquareIcon: chakraIcons.PlusSquareIcon,
  QuestionIcon: chakraIcons.QuestionIcon,
  QuestionOutlineIcon: chakraIcons.QuestionOutlineIcon,
  RepeatIcon: chakraIcons.RepeatIcon,
  RepeatClockIcon: chakraIcons.RepeatClockIcon,
  SearchIcon: chakraIcons.SearchIcon,
  Search2Icon: chakraIcons.Search2Icon,
  SettingsIcon: chakraIcons.SettingsIcon,
  SmallAddIcon: chakraIcons.SmallAddIcon,
  SmallCloseIcon: chakraIcons.SmallCloseIcon,
  SpinnerIcon: chakraIcons.SpinnerIcon,
  StarIcon: chakraIcons.StarIcon,
  SunIcon: chakraIcons.SunIcon,
  TimeIcon: chakraIcons.TimeIcon,
  TriangleDownIcon: chakraIcons.TriangleDownIcon,
  TriangleUpIcon: chakraIcons.TriangleUpIcon,
  UnlockIcon: chakraIcons.UnlockIcon,
  UpDownIcon: chakraIcons.UpDownIcon,
  ViewIcon: chakraIcons.ViewIcon,
  ViewOffIcon: chakraIcons.ViewOffIcon,
  WarningIcon: chakraIcons.WarningIcon,
  WarningTwoIcon: chakraIcons.WarningTwoIcon,
}

const IconsList = () => {
  return (
    <Grid
      mt={7}
      gap={5}
      templateColumns="repeat( auto-fit, minmax(150px, 1fr) )"
    >
      {Object.keys(icons).map((key, i) => {
        const Icon = icons[key]
        return (
          <Flex
            p={3}
            key={i}
            align="center"
            borderRadius="md"
            borderWidth="1px"
            flexDir="column"
            justify="center"
          >
            <Icon />
            <Text mt={2} fontSize="sm" textAlign="center">
              {`<${key}/>`}
            </Text>
          </Flex>
        )
      })}
    </Grid>
  )
}

export default IconsList

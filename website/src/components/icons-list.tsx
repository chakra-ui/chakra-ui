import React from "react"
import { Grid, Flex, Text } from "@chakra-ui/react"
import * as icons from "@chakra-ui/icons"

const iconList = {
  AddIcon: icons.AddIcon,
  ArrowBackIcon: icons.ArrowBackIcon,
  ArrowDownIcon: icons.ArrowDownIcon,
  ArrowForwardIcon: icons.ArrowForwardIcon,
  ArrowLeftIcon: icons.ArrowLeftIcon,
  ArrowRightIcon: icons.ArrowRightIcon,
  ArrowUpIcon: icons.ArrowUpIcon,
  ArrowUpDownIcon: icons.ArrowUpDownIcon,
  AtSignIcon: icons.AtSignIcon,
  AttachmentIcon: icons.AttachmentIcon,
  BellIcon: icons.BellIcon,
  CalendarIcon: icons.CalendarIcon,
  ChatIcon: icons.ChatIcon,
  CheckIcon: icons.CheckIcon,
  CheckCircleIcon: icons.CheckCircleIcon,
  ChevronDownIcon: icons.ChevronDownIcon,
  ChevronLeftIcon: icons.ChevronLeftIcon,
  ChevronRightIcon: icons.ChevronRightIcon,
  ChevronUpIcon: icons.ChevronUpIcon,
  CloseIcon: icons.CloseIcon,
  CopyIcon: icons.CopyIcon,
  DeleteIcon: icons.DeleteIcon,
  DownloadIcon: icons.DownloadIcon,
  DragHandleIcon: icons.DragHandleIcon,
  EditIcon: icons.EditIcon,
  EmailIcon: icons.EmailIcon,
  ExternalLinkIcon: icons.ExternalLinkIcon,
  HamburgerIcon: icons.HamburgerIcon,
  InfoIcon: icons.InfoIcon,
  InfoOutlineIcon: icons.InfoOutlineIcon,
  LinkIcon: icons.LinkIcon,
  LockIcon: icons.LockIcon,
  MinusIcon: icons.MinusIcon,
  MoonIcon: icons.MoonIcon,
  NotAllowedIcon: icons.NotAllowedIcon,
  PhoneIcon: icons.PhoneIcon,
  PlusSquareIcon: icons.PlusSquareIcon,
  QuestionIcon: icons.QuestionIcon,
  QuestionOutlineIcon: icons.QuestionOutlineIcon,
  RepeatIcon: icons.RepeatIcon,
  RepeatClockIcon: icons.RepeatClockIcon,
  SearchIcon: icons.SearchIcon,
  Search2Icon: icons.Search2Icon,
  SettingsIcon: icons.SettingsIcon,
  SmallAddIcon: icons.SmallAddIcon,
  SmallCloseIcon: icons.SmallCloseIcon,
  SpinnerIcon: icons.SpinnerIcon,
  StarIcon: icons.StarIcon,
  SunIcon: icons.SunIcon,
  TimeIcon: icons.TimeIcon,
  TriangleDownIcon: icons.TriangleDownIcon,
  TriangleUpIcon: icons.TriangleUpIcon,
  UnlockIcon: icons.UnlockIcon,
  UpDownIcon: icons.UpDownIcon,
  ViewIcon: icons.ViewIcon,
  ViewOffIcon: icons.ViewOffIcon,
  WarningIcon: icons.WarningIcon,
  WarningTwoIcon: icons.WarningTwoIcon,
}

const IconsList = () => {
  return (
    <Grid
      mt={7}
      gap={5}
      templateColumns="repeat( auto-fit, minmax(150px, 1fr) )"
    >
      {Object.keys(iconList).map((key, i) => {
        const Icon = iconList[key]
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
              {key}
            </Text>
          </Flex>
        )
      })}
    </Grid>
  )
}

export default IconsList

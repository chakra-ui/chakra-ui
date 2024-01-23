import * as icons from '@chakra-ui/icons'
import { Button, Grid, Text, useClipboard, useToast } from '@chakra-ui/react'
import React from 'react'

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
  const toast = useToast()

  return (
    <Grid
      mt={7}
      gap={5}
      templateColumns='repeat( auto-fit, minmax(150px, 1fr) )'
    >
      {Object.keys(iconList).map((key, i) => {
        const Icon = iconList[key]
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { onCopy } = useClipboard(key)

        const onCopyIcon = () => {
          onCopy()

          toast({
            title: `'${key}' copied to clipboard`,
            status: 'success',
            duration: 2000,
            isClosable: false,
          })
        }

        return (
          <Button
            pt={9}
            pb={9}
            onClick={() => onCopyIcon()}
            key={i}
            textAlign='center'
            variant='outline'
            flexDir='column'
            justifyContent='center'
          >
            <Icon />
            <Text
              as='span'
              mt={3}
              fontSize='sm'
              fontWeight='normal'
              textAlign='center'
            >
              {key}
            </Text>
          </Button>
        )
      })}
    </Grid>
  )
}

export default IconsList

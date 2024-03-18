import * as ChakraHooks from '@chakra-ui/hooks'
import * as Chakra from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import * as Formik from 'formik'
import React from 'react'
import FocusLock from 'react-focus-lock'
import { AiOutlineUser } from 'react-icons/ai'
import { BiChat, BiLike, BiShare } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import {
  FiMinus,
  FiPlus,
  FiFigma,
  FiMail,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiExternalLink,
} from 'react-icons/fi'
import {
  MdArrowDropDown,
  MdBuild,
  MdCall,
  MdCheckCircle,
  MdArrowForward,
  MdGraphicEq,
  MdGroupWork,
  MdPhone,
  MdReceipt,
  MdSettings,
} from 'react-icons/md'
import Lorem from 'react-lorem-component'
import * as Loaders from 'react-spinners'
import * as ReactTable from 'react-table'
import CircleIcon from '../../docs/icon'

const reactIcons = {
  MdSettings,
  MdReceipt,
  MdGroupWork,
  MdCheckCircle,
  MdGraphicEq,
  MdBuild,
  MdCall,
  MdPhone,
  MdArrowForward,
  MdArrowDropDown,
  AiOutlineUser,
  FaFacebook,
  FaTwitter,
  BsThreeDotsVertical,
  BiLike,
  BiShare,
  BiChat,
  FiMail,
  FiMinus,
  FiPlus,
  FiFigma,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiMenu,
  FiExternalLink,
}

const StarIcon = (props) => (
  <chakra.svg m='2px' fill='current' boxSize='3' viewBox='0 0 24 24' {...props}>
    <path d='M23.555 8.729a1.505 1.505 0 0 0-1.406-.98h-6.087a.5.5 0 0 1-.472-.334l-2.185-6.193a1.5 1.5 0 0 0-2.81 0l-.005.016-2.18 6.177a.5.5 0 0 1-.471.334H1.85A1.5 1.5 0 0 0 .887 10.4l5.184 4.3a.5.5 0 0 1 .155.543l-2.178 6.531a1.5 1.5 0 0 0 2.31 1.684l5.346-3.92a.5.5 0 0 1 .591 0l5.344 3.919a1.5 1.5 0 0 0 2.312-1.683l-2.178-6.535a.5.5 0 0 1 .155-.543l5.194-4.306a1.5 1.5 0 0 0 .433-1.661z' />
  </chakra.svg>
)

const ReactLiveScope = {
  React,
  ...React,
  ...Formik,
  ...ReactTable,
  ...Loaders,
  ...reactIcons,
  ...ChakraHooks,
  ...Chakra,
  StarIcon,
  FocusLock,
  Lorem,
  CircleIcon,
}

export default ReactLiveScope

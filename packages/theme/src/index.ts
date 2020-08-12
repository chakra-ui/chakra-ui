import foundations from "./foundations"
import styles from "./styles"
import { ColorModeOptions } from "@chakra-ui/system"

import { Accordion } from "./components/accordion"
import { Alert } from "./components/alert"
import { Avatar } from "./components/avatar"
import { Badge } from "./components/badge"
import { Button } from "./components/button"
import { Checkbox } from "./components/checkbox"
import { CloseButton } from "./components/close-button"
import { Code } from "./components/code"
import { Modal } from "./components/modal"
import { Drawer } from "./components/drawer"
import { Heading } from "./components/heading"
import { Input } from "./components/input"
import { Link } from "./components/link"
import { FormLabel } from "./components/form-label"
import { Menu } from "./components/menu"
import { NumberInput } from "./components/number-input"
import { Radio } from "./components/radio"
import { Slider } from "./components/slider"
import { Select } from "./components/select"
import { Spinner } from "./components/spinner"
import { Switch } from "./components/switch"
import { Tabs } from "./components/tabs"
import { Tag } from "./components/tag"
import { Tooltip } from "./components/tooltip"
import { Kbd } from "./components/kbd"
import { PinInput } from "./components/pin-input"
import { Popover } from "./components/popover"
import { Form } from "./components/form"
import { Editable } from "./components/editable"
import { Progress } from "./components/progress"
import { Textarea } from "./components/textarea"
import { Stat } from "./components/stat"
import { Skeleton } from "./components/skeleton"
import { Breadcrumb } from "./components/breadcumb"
import { SkipLink } from "./components/skip-link"

/**
 * Color mode config
 */
const config: ColorModeOptions = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

export const theme = {
  ...foundations,
  components: {
    Accordion,
    Alert,
    Avatar,
    Badge,
    Button,
    Checkbox,
    CloseButton,
    Code,
    Modal,
    Drawer,
    Heading,
    Input,
    Link,
    FormLabel,
    Menu,
    NumberInput,
    Radio,
    Slider,
    Select,
    Spinner,
    Switch,
    Tabs,
    Tag,
    Tooltip,
    Kbd,
    PinInput,
    Popover,
    Form,
    Editable,
    Progress,
    Textarea,
    Stat,
    Skeleton,
    Breadcrumb,
    SkipLink,
  },
  styles,
  config,
}

export type Theme = typeof theme

export default theme

export {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  Checkbox,
  CloseButton,
  Code,
  Modal,
  Drawer,
  Heading,
  Input,
  Link,
  FormLabel,
  Menu,
  NumberInput,
  Radio,
  Slider,
  Select,
  Spinner,
  Switch,
  Tabs,
  Tag,
  Tooltip,
  Kbd,
  PinInput,
  Popover,
  Form,
  Editable,
  Progress,
  Textarea,
  Stat,
  Skeleton,
  Breadcrumb,
  SkipLink,
}

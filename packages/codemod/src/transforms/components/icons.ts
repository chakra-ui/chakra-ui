import type { API, FileInfo, Options } from "jscodeshift"
import { createParserFromPath } from "../../utils/parser"

/**
 * Transforms @chakra-ui/icons to react-icons/lu (Lucide icons)
 *
 * @example
 * // Before
 * import { AddIcon, CheckIcon } from '@chakra-ui/icons'
 * <AddIcon boxSize={6} color="blue.500" />
 *
 * // After
 * import { Icon } from '@chakra-ui/react'
 * import { LuPlus, LuCheck } from 'react-icons/lu'
 * <Icon as={LuPlus} boxSize={6} color="blue.500" />
 */

interface IconMapping {
  icon: string
  library: string
}

const ICON_MAPPING: Record<string, IconMapping> = {
  AddIcon: { icon: "LuPlus", library: "react-icons/lu" },
  ArrowBackIcon: { icon: "LuArrowLeft", library: "react-icons/lu" },
  ArrowDownIcon: { icon: "LuArrowDown", library: "react-icons/lu" },
  ArrowForwardIcon: { icon: "LuArrowRight", library: "react-icons/lu" },
  ArrowLeftIcon: { icon: "LuArrowLeft", library: "react-icons/lu" },
  ArrowRightIcon: { icon: "LuArrowRight", library: "react-icons/lu" },
  ArrowUpIcon: { icon: "LuArrowUp", library: "react-icons/lu" },
  ArrowUpDownIcon: { icon: "LuArrowUpDown", library: "react-icons/lu" },
  AtSignIcon: { icon: "LuAtSign", library: "react-icons/lu" },
  AttachmentIcon: { icon: "LuPaperclip", library: "react-icons/lu" },
  BellIcon: { icon: "LuBell", library: "react-icons/lu" },
  CalendarIcon: { icon: "LuCalendar", library: "react-icons/lu" },
  ChatIcon: { icon: "LuMessageCircle", library: "react-icons/lu" },
  CheckIcon: { icon: "LuCheck", library: "react-icons/lu" },
  CheckCircleIcon: { icon: "LuCheckCircle", library: "react-icons/lu" },
  ChevronDownIcon: { icon: "LuChevronDown", library: "react-icons/lu" },
  ChevronLeftIcon: { icon: "LuChevronLeft", library: "react-icons/lu" },
  ChevronRightIcon: { icon: "LuChevronRight", library: "react-icons/lu" },
  ChevronUpIcon: { icon: "LuChevronUp", library: "react-icons/lu" },
  CloseIcon: { icon: "LuX", library: "react-icons/lu" },
  CopyIcon: { icon: "LuCopy", library: "react-icons/lu" },
  DeleteIcon: { icon: "LuTrash2", library: "react-icons/lu" },
  DownloadIcon: { icon: "LuDownload", library: "react-icons/lu" },
  DragHandleIcon: { icon: "LuGripVertical", library: "react-icons/lu" },
  EditIcon: { icon: "LuPencil", library: "react-icons/lu" },
  EmailIcon: { icon: "LuMail", library: "react-icons/lu" },
  ExternalLinkIcon: { icon: "LuExternalLink", library: "react-icons/lu" },
  HamburgerIcon: { icon: "LuMenu", library: "react-icons/lu" },
  InfoIcon: { icon: "LuInfo", library: "react-icons/lu" },
  InfoOutlineIcon: { icon: "LuInfo", library: "react-icons/lu" },
  LinkIcon: { icon: "LuLink", library: "react-icons/lu" },
  LockIcon: { icon: "LuLock", library: "react-icons/lu" },
  MinusIcon: { icon: "LuMinus", library: "react-icons/lu" },
  MoonIcon: { icon: "LuMoon", library: "react-icons/lu" },
  NotAllowedIcon: { icon: "LuBan", library: "react-icons/lu" },
  PhoneIcon: { icon: "LuPhone", library: "react-icons/lu" },
  PlusSquareIcon: { icon: "LuSquarePlus", library: "react-icons/lu" },
  QuestionIcon: { icon: "LuHelpCircle", library: "react-icons/lu" },
  QuestionOutlineIcon: { icon: "LuHelpCircle", library: "react-icons/lu" },
  RepeatIcon: { icon: "LuRepeat", library: "react-icons/lu" },
  RepeatClockIcon: { icon: "LuRepeat", library: "react-icons/lu" },
  SearchIcon: { icon: "LuSearch", library: "react-icons/lu" },
  Search2Icon: { icon: "LuSearch", library: "react-icons/lu" },
  SettingsIcon: { icon: "LuSettings", library: "react-icons/lu" },
  SmallAddIcon: { icon: "LuPlus", library: "react-icons/lu" },
  SmallCloseIcon: { icon: "LuX", library: "react-icons/lu" },
  SpinnerIcon: { icon: "LuLoader2", library: "react-icons/lu" },
  StarIcon: { icon: "LuStar", library: "react-icons/lu" },
  SunIcon: { icon: "LuSun", library: "react-icons/lu" },
  TimeIcon: { icon: "LuClock", library: "react-icons/lu" },
  TriangleDownIcon: { icon: "LuTriangle", library: "react-icons/lu" },
  TriangleUpIcon: { icon: "LuTriangle", library: "react-icons/lu" },
  UnlockIcon: { icon: "LuUnlock", library: "react-icons/lu" },
  UpDownIcon: { icon: "LuArrowUpDown", library: "react-icons/lu" },
  ViewIcon: { icon: "LuEye", library: "react-icons/lu" },
  ViewOffIcon: { icon: "LuEyeOff", library: "react-icons/lu" },
  WarningIcon: { icon: "LuAlertTriangle", library: "react-icons/lu" },
  WarningTwoIcon: { icon: "LuAlertCircle", library: "react-icons/lu" },
}

export default function transformer(
  file: FileInfo,
  _api: API,
  _options: Options,
) {
  const j = createParserFromPath(file.path)
  const root = j(file.source)

  // Track which icons from @chakra-ui/icons are used
  const usedChakraIcons = new Set<string>()
  let needsIconComponent = false

  // Step 1: Find all imports from @chakra-ui/icons
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/icons" },
    })
    .forEach((path) => {
      path.node.specifiers?.forEach((spec) => {
        if (spec.type === "ImportSpecifier") {
          usedChakraIcons.add(spec.imported.name)
        }
      })
    })

  if (usedChakraIcons.size === 0) return file.source

  // Step 2: Transform JSX elements for each icon
  usedChakraIcons.forEach((iconName) => {
    const mapping = ICON_MAPPING[iconName]
    if (!mapping) return

    root
      .find(j.JSXElement, {
        openingElement: { name: { name: iconName } },
      })
      .forEach((path) => {
        const usedWrapper = transformIconElement(j, path, mapping.icon)
        if (usedWrapper) {
          needsIconComponent = true
        }
      })
  })

  // Step 3: Update imports
  updateIconImports(j, root, usedChakraIcons, needsIconComponent)

  return root.toSource({ quote: "single" })
}

/**
 * Transform icon element. If icon has props, wrap in Icon component with as prop.
 * If no props, use the react-icon directly. Icons are self-closing for conciseness.
 * @returns {boolean} Whether Icon wrapper was used
 */
function transformIconElement(
  j: any,
  path: any,
  lucideIconName: string,
): boolean {
  const attrs = path.node.openingElement.attributes || []

  // If icon has no attributes, use react-icon directly (self-closing)
  if (attrs.length === 0) {
    const directIcon = j.jsxElement(
      j.jsxOpeningElement(j.jsxIdentifier(lucideIconName), [], true),
    )
    directIcon.closingElement = null
    j(path).replaceWith(directIcon)
    return false
  }

  // If icon has attributes, wrap in Icon component to preserve style props (self-closing)
  const asProp = j.jsxAttribute(
    j.jsxIdentifier("as"),
    j.jsxExpressionContainer(j.identifier(lucideIconName)),
  )

  const iconWrapper = j.jsxElement(
    j.jsxOpeningElement(j.jsxIdentifier("Icon"), [asProp, ...attrs], true),
  )
  iconWrapper.closingElement = null

  j(path).replaceWith(iconWrapper)
  return true
}

/**
 * Update imports - add Icon from @chakra-ui/react (if needed) and react-icons
 */
function updateIconImports(
  j: any,
  root: any,
  usedChakraIcons: Set<string>,
  needsIconComponent: boolean,
) {
  // Add Icon to @chakra-ui/react imports if needed and not present
  if (needsIconComponent) {
    let hasIconImport = false

    root
      .find(j.ImportDeclaration, {
        source: { value: "@chakra-ui/react" },
      })
      .forEach((path) => {
        const specifiers = path.node.specifiers || []
        hasIconImport = specifiers.some(
          (spec: any) =>
            spec.type === "ImportSpecifier" && spec.imported.name === "Icon",
        )

        // Add Icon import if missing
        if (!hasIconImport) {
          path.node.specifiers.push(j.importSpecifier(j.identifier("Icon")))
          hasIconImport = true
        }
      })

    // If no @chakra-ui/react import exists, create one
    if (!hasIconImport) {
      const chakraImport = j.importDeclaration(
        [j.importSpecifier(j.identifier("Icon"))],
        j.stringLiteral("@chakra-ui/react"),
      )
      const firstImport = root.find(j.ImportDeclaration).at(0)
      if (firstImport.length > 0) {
        firstImport.insertBefore(chakraImport)
      } else {
        root.get().node.program.body.unshift(chakraImport)
      }
    }
  }

  // Remove @chakra-ui/icons import
  root
    .find(j.ImportDeclaration, {
      source: { value: "@chakra-ui/icons" },
    })
    .forEach((path) => {
      j(path).remove()
    })

  // Group icons by library
  const iconsByLibrary = new Map<string, Set<string>>()

  Array.from(usedChakraIcons).forEach((iconName) => {
    const mapping = ICON_MAPPING[iconName]
    if (!mapping) return

    const { icon, library } = mapping
    if (!iconsByLibrary.has(library)) {
      iconsByLibrary.set(library, new Set())
    }
    iconsByLibrary.get(library)!.add(icon)
  })

  // Create import statements for each library
  const lastImport = root.find(j.ImportDeclaration).at(-1)
  const insertionPoint = lastImport.length > 0 ? lastImport : null

  iconsByLibrary.forEach((icons, library) => {
    const uniqueIcons = Array.from(icons).sort()

    const newImport = j.importDeclaration(
      uniqueIcons.map((name: string) => j.importSpecifier(j.identifier(name))),
      j.stringLiteral(library),
    )

    if (insertionPoint) {
      insertionPoint.insertAfter(newImport)
    } else {
      root.get().node.program.body.unshift(newImport)
    }
  })
}

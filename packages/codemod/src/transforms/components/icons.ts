import { Node, SyntaxKind } from "ts-morph"
import type { Transform } from "../../transform"
import { getJsxBaseName } from "../../utils/chakra-tracker"

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

const transform: Transform = (sourceFile) => {
  // Step 1: Find all icons imported from @chakra-ui/icons
  const usedChakraIcons = new Set<string>()
  for (const importDecl of sourceFile.getImportDeclarations()) {
    if (importDecl.getModuleSpecifierValue() !== "@chakra-ui/icons") continue
    for (const named of importDecl.getNamedImports()) {
      usedChakraIcons.add(named.getName())
    }
  }
  if (usedChakraIcons.size === 0) return

  // Step 2: Transform JSX elements for each mapped icon.
  let needsIconComponent = false

  const targets: Node[] = []
  for (const el of sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement)) {
    const base = getJsxBaseName(el.getOpeningElement().getTagNameNode())
    if (usedChakraIcons.has(base) && ICON_MAPPING[base]) targets.push(el)
  }
  for (const el of sourceFile.getDescendantsOfKind(
    SyntaxKind.JsxSelfClosingElement,
  )) {
    const base = getJsxBaseName(el.getTagNameNode())
    if (usedChakraIcons.has(base) && ICON_MAPPING[base]) targets.push(el)
  }

  targets.sort((a, b) => b.getStart() - a.getStart())

  for (const el of targets) {
    const isSelfClosing = Node.isJsxSelfClosingElement(el)
    const opening = isSelfClosing ? el : (el as any).getOpeningElement()
    const base = getJsxBaseName(opening.getTagNameNode())
    const lucide = ICON_MAPPING[base].icon
    const attrs = opening.getAttributes().map((a: Node) => a.getText())

    if (attrs.length === 0) {
      el.replaceWithText(`<${lucide} />`)
    } else {
      needsIconComponent = true
      el.replaceWithText(`<Icon as={${lucide}} ${attrs.join(" ")} />`)
    }
  }

  // Step 3: Update imports.
  updateIconImports(sourceFile, usedChakraIcons, needsIconComponent)
}

function updateIconImports(
  sourceFile: import("ts-morph").SourceFile,
  usedChakraIcons: Set<string>,
  needsIconComponent: boolean,
) {
  // Add Icon to @chakra-ui/react imports if needed.
  if (needsIconComponent) {
    const chakraImport = sourceFile.getImportDeclaration(
      (d) => d.getModuleSpecifierValue() === "@chakra-ui/react",
    )
    if (chakraImport) {
      const hasIcon = chakraImport
        .getNamedImports()
        .some((n) => n.getName() === "Icon")
      if (!hasIcon) chakraImport.addNamedImport("Icon")
    } else {
      sourceFile.insertImportDeclaration(0, {
        namedImports: ["Icon"],
        moduleSpecifier: "@chakra-ui/react",
      })
    }
  }

  // Remove @chakra-ui/icons imports.
  for (const importDecl of [...sourceFile.getImportDeclarations()]) {
    if (importDecl.getModuleSpecifierValue() === "@chakra-ui/icons") {
      importDecl.remove()
    }
  }

  // Group icons by library and add imports.
  const iconsByLibrary = new Map<string, Set<string>>()
  for (const iconName of usedChakraIcons) {
    const mapping = ICON_MAPPING[iconName]
    if (!mapping) continue
    if (!iconsByLibrary.has(mapping.library)) {
      iconsByLibrary.set(mapping.library, new Set())
    }
    iconsByLibrary.get(mapping.library)!.add(mapping.icon)
  }

  for (const [library, icons] of iconsByLibrary) {
    sourceFile.addImportDeclaration({
      namedImports: Array.from(icons).sort(),
      moduleSpecifier: library,
    })
  }
}

export default transform

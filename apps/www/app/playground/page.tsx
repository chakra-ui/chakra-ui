import * as Playground from "@/components/playground"
import { Container } from "@chakra-ui/react"
import { AlertWithStatus } from "compositions/examples/alert-with-status"
import { AvatarWithColors } from "compositions/examples/avatar-with-colors"
import { BadgeWithColors } from "compositions/examples/badge-with-colors"
import { BlockquoteWithColors } from "compositions/examples/blockquote-with-colors"
import { BreadcrumbWithSeparator } from "compositions/examples/breabcrumb-with-separator"
import { BreadcrumbBasic } from "compositions/examples/breadcrumb-basic"
import { ButtonWithColors } from "compositions/examples/button-with-colors"
import { CardWithVariants } from "compositions/examples/card-with-variants"
import { CheckboxCardBasic } from "compositions/examples/checkbox-card-basic"
import { CheckboxWithColors } from "compositions/examples/checkbox-with-colors"
import { CircularProgressWithColors } from "compositions/examples/circular-progress-with-colors"
import { CodeWithColors } from "compositions/examples/code-with-colors"
import { DataListBasic } from "compositions/examples/data-list-basic"
import { DataListWithInfo } from "compositions/examples/data-list-with-info"
import { DialogSizes } from "compositions/examples/dialog-sizes"
import { DrawerBasic } from "compositions/examples/drawer-basic"
import { EmptyStateWithAction } from "compositions/examples/empty-state-with-action"
import { HeadingWithSizes } from "compositions/examples/heading-with-sizes"
import { InputWithDescription } from "compositions/examples/input-with-description"
import { InputWithError } from "compositions/examples/input-with-error"
import { InputWithField } from "compositions/examples/input-with-field"
import { MenuBasic } from "compositions/examples/menu-basic"
import { MenuNested } from "compositions/examples/menu-nested"
import { MenuWithCommand } from "compositions/examples/menu-with-command"
import { MenuWithContextTrigger } from "compositions/examples/menu-with-context-trigger"
import { MenuWithRadioItems } from "compositions/examples/menu-with-radio-items"
import { PopoverSizes } from "compositions/examples/popover-sizes"
import { ProgressWithColors } from "compositions/examples/progress-with-colors"
import { ProseBasic } from "compositions/examples/prose-basic"
import { RadioCardBasic } from "compositions/examples/radio-card-basic"
import { RadioCardCentered } from "compositions/examples/radio-card-centered"
import { RadioGroupWithColors } from "compositions/examples/radio-group-with-colors"
import { RatingWithColors } from "compositions/examples/rating-with-colors"
import { SegmentControlSizes } from "compositions/examples/segment-control-sizes"
import { SliderWithColors } from "compositions/examples/slider-with-colors"
import { SpinnerWithColors } from "compositions/examples/spinner-with-colors"
import { StatBasic } from "compositions/examples/stat-basic"
import { StatusWithSizes } from "compositions/examples/status-with-sizes"
import { SwitchWithColors } from "compositions/examples/switch-with-colors"
import { TagWithColors } from "compositions/examples/tag-with-colors"
import { TextareaWithDescription } from "compositions/examples/textarea-with-description"
import { TextareaWithError } from "compositions/examples/textarea-with-error"
import { TextareaWithField } from "compositions/examples/textarea-with-field"
import { TooltipBasic } from "compositions/examples/tooltip-basic"
import { Button } from "compositions/ui/button"
import { FileButton, FileDropzone } from "compositions/ui/file-button"
import { Pagination, SimplePagination } from "compositions/ui/pagination"
import { StepperInput } from "compositions/ui/stepper-input"
import { HiUpload } from "react-icons/hi"

export default function Page() {
  return (
    <Container py="20" fontSize="sm" maxW="4xl">
      <Playground.Section>
        <Playground.SectionTitle id="StepperInput">
          StepperInput
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <StepperInput defaultValue="12" min={0} />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Dialog">Dialog</Playground.SectionTitle>
        <Playground.SectionContent>
          <DialogSizes />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Drawer">Drawer</Playground.SectionTitle>
        <Playground.SectionContent>
          <DrawerBasic />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="CheckboxCard">
          CheckboxCard
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <CheckboxCardBasic />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="RadioCard">
          RadioCard
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <RadioCardBasic />
          <RadioCardCentered />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Breadcrumb">
          Breadcrumb
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <BreadcrumbBasic />
          <BreadcrumbWithSeparator />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Menu">Menu</Playground.SectionTitle>
        <Playground.SectionContent direction="row">
          <MenuWithRadioItems />
          <MenuBasic />
          <MenuWithCommand />
          <MenuNested />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="ContextMenu">
          ContextMenu
        </Playground.SectionTitle>
        <Playground.SectionContent direction="row">
          <MenuWithContextTrigger />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="DataList">
          DataList
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <DataListBasic />
          <DataListWithInfo />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Input">Input</Playground.SectionTitle>
        <Playground.SectionContent>
          <InputWithField />
          <InputWithDescription />
          <InputWithError />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Textarea">
          Textarea
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <TextareaWithField />
          <TextareaWithDescription />
          <TextareaWithError />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Popover">Popover</Playground.SectionTitle>
        <Playground.SectionContent>
          <PopoverSizes />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Tag">Tag</Playground.SectionTitle>
        <Playground.SectionContent>
          <TagWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="stat">Stat</Playground.SectionTitle>
        <Playground.SectionContent>
          <StatBasic />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="avatar">Avatar</Playground.SectionTitle>
        <Playground.SectionContent>
          <AvatarWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="alert">Alert</Playground.SectionTitle>
        <Playground.SectionContent>
          <AlertWithStatus />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="badge">Badge</Playground.SectionTitle>
        <Playground.SectionContent>
          <BadgeWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Blockquote">
          Blockquote
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <BlockquoteWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Card">Card</Playground.SectionTitle>
        <Playground.SectionContent>
          <CardWithVariants />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="code">Code</Playground.SectionTitle>
        <Playground.SectionContent>
          <CodeWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Checkbox">
          Checkbox
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <CheckboxWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="button">Button</Playground.SectionTitle>
        <Playground.SectionContent>
          <ButtonWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="progress">
          Linear Progress
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <ProgressWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Pagination">
          Pagination
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <Pagination count={100} pageSize={10} />
          <SimplePagination showPageText count={100} pageSize={10} />
          <SimplePagination count={100} pageSize={10} />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="circular-progress">
          Circular Progress
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <CircularProgressWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="radio">
          Radio Group
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <RadioGroupWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="rating">Rating</Playground.SectionTitle>
        <Playground.SectionContent>
          <RatingWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Spinner">Spinner</Playground.SectionTitle>
        <Playground.SectionContent>
          <SpinnerWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="Status">Status</Playground.SectionTitle>
        <Playground.SectionContent>
          <StatusWithSizes />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="switch">Switch</Playground.SectionTitle>
        <Playground.SectionContent>
          <SwitchWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="heading">Heading</Playground.SectionTitle>
        <Playground.SectionContent>
          <HeadingWithSizes />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="prose">Prose</Playground.SectionTitle>
        <Playground.SectionContent>
          <ProseBasic />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="segment-control">
          Segment Control
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <SegmentControlSizes />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="empty-state">
          Empty State
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <EmptyStateWithAction />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="file-button">
          File Button
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <FileButton width="auto">
            <Button variant="outline" startIcon={<HiUpload />}>
              Upload file
            </Button>
          </FileButton>
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="FileDropzone">
          File Dropzone
        </Playground.SectionTitle>
        <Playground.SectionContent>
          <FileDropzone />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="slider">Slider</Playground.SectionTitle>
        <Playground.SectionContent>
          <SliderWithColors />
        </Playground.SectionContent>
      </Playground.Section>

      <Playground.Section>
        <Playground.SectionTitle id="tooltip">Tooltip</Playground.SectionTitle>
        <Playground.SectionContent>
          <TooltipBasic />
        </Playground.SectionContent>
      </Playground.Section>
    </Container>
  )
}

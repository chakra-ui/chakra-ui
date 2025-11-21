import { HoverCard, LocaleProvider, Portal } from "@chakra-ui/react"

export const HoverCardRTL = () => {
  return (
    <LocaleProvider locale="ar-AE">
      <HoverCard.Root>
        <HoverCard.Trigger cursor="pointer">@chakra_ui</HoverCard.Trigger>
        <Portal>
          <HoverCard.Positioner>
            <HoverCard.Content>
              <HoverCard.Arrow />
              <h4>واجهة المستخدم شاكرا</h4>
              <p>مكتبة مكونات React الحديثة</p>
              <p>يجب أن يشير السهم بشكل صحيح إلى الزناد</p>
            </HoverCard.Content>
          </HoverCard.Positioner>
        </Portal>
      </HoverCard.Root>
    </LocaleProvider>
  )
}

import { LocaleProvider, ScrollArea } from "@chakra-ui/react"

const arabicText = [
  "مرحباً بكم في نظام التمرير المخصص",
  "هذا مثال على النص العربي في منطقة التمرير",
  "يدعم النظام اللغات التي تُكتب من اليمين إلى اليسار",
  "التمرير الأفقي يعمل بشكل صحيح مع النصوص العربية",
  "يمكنك رؤية كيف تتكيف أشرطة التمرير مع اتجاه النص",
  "النظام يدعم التمرير العمودي والأفقي في نفس الوقت",
  "يمكن تخصيص مظهر أشرطة التمرير حسب التصميم المطلوب",
  "التفاعل مع أشرطة التمرير سهل ومريح للمستخدم",
  "يعمل النظام بسلاسة على جميع المتصفحات الحديثة",
  "يمكن دمج هذا المكون مع مكونات أخرى بسهولة",
  "الأداء محسّن للتعامل مع كميات كبيرة من المحتوى",
]

export const ScrollAreaWithRtl = () => {
  return (
    <LocaleProvider locale="ar-AE">
      <ScrollArea.Root height="8rem" width="24rem" size="sm">
        <ScrollArea.Viewport>
          <ScrollArea.Content p="2">
            {arabicText.map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar />
        <ScrollArea.Corner />
      </ScrollArea.Root>
    </LocaleProvider>
  )
}

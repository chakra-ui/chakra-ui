import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider withRegistry={process.env.USE_EMOTION_REGISTRY === "1"}>
          {props.children}
        </Provider>
      </body>
    </html>
  )
}

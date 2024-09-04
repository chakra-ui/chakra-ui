import { Header } from "@/components/docs/header"
import { Container, SkipNavContent, SkipNavLink } from "@chakra-ui/react"
import { MobileSidebarNav, SidebarStart } from "./sidebar"

// import { docs } from ".velite"

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string }
// }) {
//   const page = docs.find(
//     (doc) => doc.slug === ["docs", ...params.slug].join("/"),
//   )

//   return {
//     title: docs.title,
//     description: blog.description,
//     openGraph: {
//       images: `http://localhost:3000/og?title=${blog.title}&category=${blog.type}`,
//     },
//   }
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SkipNavLink>Skip to Content</SkipNavLink>
      <Header />
      <main>
        <MobileSidebarNav />
        <Container display="flex">
          <SidebarStart />
          <SkipNavContent />
          {children}
        </Container>
      </main>
    </>
  )
}

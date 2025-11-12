import { Span, TagsInput } from "@chakra-ui/react"

export const TagsInputWithLongTags = () => {
  return (
    <TagsInput.Root
      maxW="md"
      defaultValue={[
        "verylongemailaddressthatdoesnthavespaces@example.com",
        "anothersuperlongemailaddresswithoutanyspaceswhatsoever@verylongdomainname.com",
        "short@email.com",
        "mediumlengthemail@domain.co.uk",
        "extremelylongemailaddressthatshouldtruncateproperly@verylongdomainname.example.com",
      ]}
    >
      <TagsInput.Label>Email Addresses</TagsInput.Label>
      <TagsInput.Control>
        <TagsInput.Items />
        <TagsInput.Input placeholder="Add email address..." />
      </TagsInput.Control>
      <Span textStyle="xs" color="fg.muted" ms="auto">
        Long tags should truncate with ellipsis
      </Span>
    </TagsInput.Root>
  )
}

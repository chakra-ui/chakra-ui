"use client"

import {
  Button,
  FileUpload,
  Float,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { LuUpload, LuX } from "react-icons/lu"

export const FileUploadExplorer = () => {
  const createFile = (name: string, color: string) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
      <rect width="100" height="100" fill="${color}" />
      <text x="50%" y="50%" font-size="12" fill="white" text-anchor="middle" alignment-baseline="middle">
        ${name.split(".")[0].slice(0, 6)}
      </text>
    </svg>`
    const blob = new Blob([svg], { type: "image/svg+xml" })
    return new File([blob], name, { type: "image/svg+xml" })
  }

  const [files, setFiles] = useState<File[]>(() => [
    createFile("uzumaki_naruto.svg", "#f97316"),
  ])
  const maxFiles = 6

  return (
    <VStack p="8" maxW="600px" mx="auto" gap="8" align="stretch">
      <VStack gap="1" align="start">
        <Text fontSize="xl" fontWeight="bold">
          Let’s Add Some Naruto Images
        </Text>
        <Text fontSize="sm" color="gray.600">
          You can upload up to {maxFiles} images by dragging them here or
          browsing.
        </Text>
      </VStack>

      <FileUpload.Root
        accept="image/*"
        maxFiles={maxFiles}
        onFileAccept={(accepted) =>
          setFiles((prev) => [...prev, ...(accepted.files ?? [])])
        }
        onFileReject={(rejected) => {
          console.warn("Rejected files:", rejected)
        }}
      >
        <FileUpload.Label fontWeight="semibold" mb="2">
          Upload Your Favorite Naruto Characters
        </FileUpload.Label>

        <FileUpload.HiddenInput />

        <FileUpload.Dropzone w="full">
          <FileUpload.DropzoneContent w="full">
            <VStack
              gap="4"
              p="8"
              borderWidth="2px"
              borderStyle="dashed"
              borderRadius="md"
              transition="all 0.2s"
              w="full"
            >
              <LuUpload size={36} />
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Drag & drop files here
              </Text>
              <Text fontSize="sm" color="gray.500" textAlign="center">
                or click below to browse files
              </Text>

              <FileUpload.Trigger asChild>
                <Button size="sm" colorScheme="blue">
                  Browse Files
                </Button>
              </FileUpload.Trigger>
              <FileUpload.FileText fontSize="xs" color="gray.500" />
            </VStack>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>

        {files.length > 0 && (
          <VStack mt="6" gap="3" align="stretch" w="full">
            <Text fontSize="md" fontWeight="semibold">
              Uploaded Files
            </Text>
            <FileUpload.ItemGroup gap="3">
              {files.map((file, i) => (
                <FileUpload.Item key={i} file={file} w="full">
                  <HStack
                    gap="3"
                    p="3"
                    borderWidth="1px"
                    borderRadius="md"
                    w="full"
                  >
                    <FileUpload.ItemPreview>
                      <FileUpload.ItemPreviewImage
                        boxSize="16"
                        borderRadius="md"
                      />
                    </FileUpload.ItemPreview>

                    <FileUpload.ItemContent flex="1">
                      <FileUpload.ItemName fontWeight="medium" />
                      <FileUpload.ItemSizeText fontSize="xs" color="gray.500" />
                    </FileUpload.ItemContent>

                    <Float placement="top-end">
                      <FileUpload.ItemDeleteTrigger
                        onClick={() =>
                          setFiles((prev) => prev.filter((_, idx) => idx !== i))
                        }
                      >
                        <LuX />
                      </FileUpload.ItemDeleteTrigger>
                    </Float>
                  </HStack>
                </FileUpload.Item>
              ))}
            </FileUpload.ItemGroup>
          </VStack>
        )}
      </FileUpload.Root>
    </VStack>
  )
}

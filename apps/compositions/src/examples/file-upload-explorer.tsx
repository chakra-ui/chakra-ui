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
  const [files, setFiles] = useState<File[]>([])
  const maxFiles = 3

  return (
    <VStack p="8" maxW="600px" mx="auto" gap="8" align="stretch">
      <VStack gap="1" align="start">
        <Text fontSize="lg" fontWeight="bold">
          Let’s Add Some Images
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
        <FileUpload.Label srOnly>Upload your images</FileUpload.Label>
        <FileUpload.HiddenInput />

        <FileUpload.Dropzone>
          <FileUpload.DropzoneContent>
            <VStack
              gap="3"
              p="8"
              borderWidth="2px"
              borderStyle="dashed"
              borderRadius="md"
              transition="all 0.2s"
              w="full"
            >
              <LuUpload size={32} />
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Drag & drop files here, or click below to browse
              </Text>
              <FileUpload.Trigger asChild>
                <Button size="sm" colorScheme="blue">
                  Browse Files
                </Button>
              </FileUpload.Trigger>
              {files.length > 0 && (
                <Button
                  size="xs"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => setFiles([])}
                >
                  Clear All
                </Button>
              )}
            </VStack>
          </FileUpload.DropzoneContent>
        </FileUpload.Dropzone>

        {files.length > 0 && (
          <FileUpload.ItemGroup mt="6" gap="3">
            {files.map((file, i) => (
              <FileUpload.Item key={i} file={file}>
                <HStack gap="3" p="2" borderRadius="md" w="full">
                  <FileUpload.ItemPreview>
                    <FileUpload.ItemPreviewImage
                      boxSize="12"
                      borderRadius="md"
                    />
                  </FileUpload.ItemPreview>

                  <VStack align="start" gap="0" flex="1">
                    <FileUpload.ItemName fontWeight="medium" />
                    <FileUpload.ItemSizeText fontSize="xs" color="gray.500" />
                  </VStack>

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
        )}
      </FileUpload.Root>
    </VStack>
  )
}

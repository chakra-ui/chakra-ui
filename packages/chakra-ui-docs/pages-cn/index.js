/** @jsx jsx */
import { jsx } from "@emotion/core";
import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  Divider,
  Flex,
  Stack,
  Link,
} from "@chakra-ui/core";
import Header from "../components/Header";
import { DiGithubBadge } from "react-icons/di";
import { MdAccessibility, MdPalette, MdGrain, MdEmail } from "react-icons/md";
import { IoLogoTwitter, IoLogoLinkedin } from "react-icons/io";
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import theme from "prism-react-renderer/themes/nightOwl";
import * as Chakra from "@chakra-ui/core";
import * as ReactMdIcons from "react-icons/md";
import NextLink from "next/link";

export const Container = props => (
  <Box width="full" maxWidth="1280px" mx="auto" px={6} {...props} />
);

const Feature = ({ title, icon, children, ...props }) => {
  return (
    <Box {...props}>
      <Flex
        rounded="full"
        size={12}
        bg="teal.500"
        align="center"
        justify="center"
      >
        <Box size={6} color="white" as={icon} />
      </Flex>
      <Heading as="h2" size="md" fontWeight="semibold" mt="1em" mb="0.5em">
        {title}
      </Heading>
      <Text>{children}</Text>
    </Box>
  );
};

const sampleCode = `
// airbnb.com样例组件

<Box>
  <Image rounded="md" src="https://bit.ly/2k1H1t6"/>
  <Flex align="baseline" mt={2}>
    <Badge variantColor="pink">Plus</Badge>
    <Text
      ml={2}
      textTransform="uppercase"
      fontSize="sm"
      fontWeight="bold"
      color="pink.800"
    >
    Verified &bull; Cape Town
    </Text>
  </Flex>
  <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
    Modern, Chic Penthouse with Mountain, City & Sea Views
  </Text>
  <Text mt={2}>$119/night</Text>
  <Flex mt={2} align="center">
    <Box as={MdStar} color="orange.400" />
    <Text ml={1} fontsize="sm"><b>4.84</b> (190)</Text>
  </Flex>
</Box>
`;

const FooterLink = ({ icon, href }) => (
  <Link display="inline-block" href={href} isExternal>
    <Box as={icon} size="6" color="gray.400" />
  </Link>
);

export default () => {
  return (
    <Box mb={20}>
      <Header />
      <Box as="section" pt={40} pb={24}>
        <Container>
          <Box maxW="xl" mx="auto" textAlign="center">
            <Heading as="h1" size="xl" fontWeight="semibold">
              <Box as="span" color="teal.500">
                快速
              </Box>
              搭建React应用
            </Heading>

            <Text opacity="0.7" fontSize="xl" mt="6">
              查克拉UI提供简易、模块化、易操纵的组件，
              满足你搭建React应用的一切需求。
            </Text>

            <Box mt="6">
              <NextLink href="/getting-started" passHref>
                <Button size="lg" as="a" variantColor="teal">
                  开始上手
                </Button>
              </NextLink>
              <Button
                as="a"
                size="lg"
                ml={4}
                href="https://github.com/chakra-ui/chakra-ui/"
                target="__blank"
                leftIcon={props => <DiGithubBadge size="1.5em" {...props} />}
              >
                GitHub
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Divider my={16} />

      <Container>
        <Grid
          templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={10}
          px={{ md: 12 }}
        >
          <Feature icon={MdAccessibility} title="无障碍">
            查克拉UI严格遵从WAI-ARIA无障碍标准。
            所有组件配有标准属性和键盘适配。
          </Feature>
          <Feature icon={MdPalette} title="主题化">
            在任何组件上，轻松引用主题文件变量。
          </Feature>
          <Feature icon={MdGrain} title="模块化">
            你可以利用任何组件，组合创新。
          </Feature>
        </Grid>
      </Container>

      <Divider my={16} />

      <Container>
        <Box maxW="xl" mx="auto">
          <Heading fontWeight="semibold" textAlign="center" mb="2em">
            <Box as="span" color="teal.500">
              用查克拉UI
            </Box>
            快速写出你想要的React应用
          </Heading>
        </Box>

        <Box>
          <LiveProvider
            theme={theme}
            language="jsx"
            scope={{ ...Chakra, ...ReactMdIcons }}
            disabled
            code={sampleCode.trim()}
          >
            <Box d={{ md: "flex" }} alignItems="flex-start">
              <LiveEditor
                padding={20}
                style={{
                  fontFamily: "Menlo,monospace",
                  borderRadius: 10,
                  flex: 2,
                }}
              />
              <Box size={8} />
              <Box
                p={6}
                flex="1"
                rounded="10px"
                as={LivePreview}
                borderWidth="1px"
              />
            </Box>
            <Box
              as={LiveError}
              mt={4}
              bg="red.400"
              fontFamily="Menlo, monospace"
              color="white"
              p="1em"
            />
          </LiveProvider>
        </Box>
      </Container>

      <Divider my={16} />

      <Box as="footer" mt={12} textAlign="center">
        <Text fontSize="sm">由Segun Adebayo设计并开发</Text>
        <Stack
          shouldWrapChildren
          mt={4}
          isInline
          spacing="12px"
          justify="center"
        >
          <FooterLink
            href="https://github.com/segunadebayo"
            icon={DiGithubBadge}
          />
          <FooterLink
            href="https://twitter.com/thesegunadebayo"
            icon={IoLogoTwitter}
          />
          <FooterLink
            href="https://linkedin.com/in/thesegunadebayo/"
            icon={IoLogoLinkedin}
          />
          <FooterLink href="mailto:sage@adebayosegun.com" icon={MdEmail} />
        </Stack>
      </Box>
    </Box>
  );
};

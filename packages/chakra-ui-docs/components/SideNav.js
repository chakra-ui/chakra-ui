import { Box, Heading } from "@chakra-ui/core";
import React from "react";
import components from "./components";
import {
  BookIcon,
  DownloadIcon,
  ResponsiveIcon,
  ThemeIcon,
} from "./custom-icons";
import { ComponentLink, stringToUrl, TopNavLink } from "./NavLink";

// export default function Navigation({ isDrawerOpen, onDrawerClose }) {
//   const [isMobile, setIsMobile] = useState(null);
//   const theme = useTheme();

//   useEffect(() => {
//     let mobile = window.matchMedia(`(max-width: ${theme.breakpoints[2]})`)
//       .matches;
//     setIsMobile(mobile);
//   }, [theme.breakpoints]);

//   return isMobile ? (
//     <NavigationDrawer isOpen={isDrawerOpen} onClose={onDrawerClose} />
//   ) : (
//     <NavigationBox />
//   );
// }

const topNavLinks = [
  {
    label: "Motivation",
    icon: <BookIcon />,
    href: "/motivation",
  },
  {
    label: "Installation",
    icon: <DownloadIcon />,
    href: "/installation",
  },
  {
    label: "Responsive Design",
    icon: <ResponsiveIcon />,
    href: "/responsive-design",
  },
  {
    label: "Theming",
    icon: <ThemeIcon />,
    href: "/theme",
  },
];

const NavGroupHeading = props => (
  <Heading
    fontSize="xs"
    color="gray.400"
    letterSpacing="wide"
    mb={2}
    textTransform="uppercase"
    {...props}
  />
);

const SideNav = props => {
  return (
    <Box
      position="fixed"
      left="0"
      width="100%"
      height="100%"
      top="0"
      right="0"
      {...props}
    >
      <Box
        top="4rem"
        position="relative"
        overflowY="auto"
        borderRightWidth="1px"
      >
        <Box
          as="nav"
          height="calc(100vh - 4rem)"
          aria-label="Main navigation"
          fontSize="sm"
          p="6"
        >
          <Box mb="8">
            {topNavLinks.map(link => (
              <TopNavLink key={link.label} href={link.href} icon={link.icon}>
                {link.label}
              </TopNavLink>
            ))}
          </Box>

          <Box>
            <NavGroupHeading>Components</NavGroupHeading>
            {components.map(link => (
              <ComponentLink key={link} href={stringToUrl(link)}>
                {link}
              </ComponentLink>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideNav;

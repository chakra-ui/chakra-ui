/* eslint-disable jsx-a11y/no-autofocus */
import { storiesOf } from "@storybook/react";
import React, { useRef, useState } from "react";
import FocusLock from "react-focus-lock";
import Popover, {
  PopoverCloseButton,
  PopoverContent,
  PopoverArrow,
  PopoverTrigger,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
} from ".";
import Button from "../Button";
import Avatar from "../Avatar";
import Box from "../Box";
import Text from "../Text";
import Badge from "../Badge";
import Link from "../Link";
import ButtonGroup from "../ButtonGroup";
import { DarkMode } from "../ColorModeProvider";
import Stack from "../Stack";
import FormControl from "../FormControl";
import FormLabel from "../FormLabel";
import Input from "../Input";
import IconButton from "../IconButton";

const stories = storiesOf("Popover", module);

const Example = () => {
  const initRef = useRef();
  return (
    <>
      <Popover
        defaultIsOpen
        closeOnBlur={false}
        placement="right"
        initialFocusRef={initRef}
      >
        <PopoverTrigger>
          <Button mt="180px">Trigger</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button variantColor="blue" ref={initRef}>
              Button
            </Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Popover>
      <button>Welcome home</button>
    </>
  );
};

stories.add("Default", () => <Example />);

const PortalEx = () => {
  const initRef = useRef();
  return (
    <Popover usePortal initialFocusRef={initRef}>
      <PopoverTrigger>
        <Button float="right">Trigger</Button>
      </PopoverTrigger>
      <PopoverContent hasArrow={false}>
        <PopoverHeader>Header</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Button variantColor="blue" ref={initRef}>
            Close
          </Button>
        </PopoverBody>
        <PopoverFooter>This is the footer</PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

stories.add("with portal", () => <PortalEx />);

const PortalAndFocusLockEx = () => (
  <Popover usePortal closeOnBlur={false}>
    <PopoverTrigger>
      <Button float="right">Trigger</Button>
    </PopoverTrigger>
    <PopoverContent>
      <FocusLock returnFocus persistentFocus={false}>
        <PopoverHeader>Header</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          <Button variantColor="blue">Close</Button>
        </PopoverBody>
        <PopoverFooter>This is the footer</PopoverFooter>
      </FocusLock>
    </PopoverContent>
  </Popover>
);

stories.add("with focus lock", () => <PortalAndFocusLockEx />);

function Card() {
  return (
    <DarkMode>
      <Box p={5}>
        <Avatar
          name="swyx"
          src="https://pbs.twimg.com/profile_images/990728399873232896/CMPn3IxT_reasonably_small.jpg"
        />
        <Text mt={4} fontWeight="bold">
          swyx
          <Badge ml={3} fontSize="xs">
            Follows you
          </Badge>
        </Text>
        <Text mt={3}>
          Infinite Builder working on DX @Netlify. Helping people #LearnInPublic
        </Text>
      </Box>
    </DarkMode>
  );
}

function TwitterEx() {
  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <Link href="#" color="blue.500">
          Hover to see @swyx profile
        </Link>
      </PopoverTrigger>

      <PopoverContent bg="#15202b" color="white" width="400px">
        <Card></Card>
      </PopoverContent>
    </Popover>
  );
}

stories.add("twitter hover card", () => <TwitterEx />);

const FeedbackEx = () => (
  <Popover usePortal defaultIsOpen closeOnBlur={false} placement="right">
    <PopoverTrigger>
      <Button>Trigger</Button>
    </PopoverTrigger>
    <PopoverContent border="0">
      <PopoverHeader borderBottom="0" bg="red.600" color="white">
        Header
        <PopoverCloseButton />
      </PopoverHeader>
      <PopoverBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.
        <Link color="blue.500"> Learn More</Link>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

stories.add("feedback", () => <FeedbackEx />);

const WalkthroughEx = () => (
  <Popover placement="bottom" isOpen closeOnBlur={false}>
    <PopoverTrigger>
      <Button float="right">Trigger</Button>
    </PopoverTrigger>
    <PopoverContent color="white" bg="#032e61" borderColor="#032e61">
      <PopoverHeader pt={4} fontWeight="bold" border="0">
        Manage Your Channels
      </PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore.
      </PopoverBody>
      <PopoverFooter
        border="0"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        pb={4}
      >
        <Box fontSize="sm">Step 2 of 4</Box>
        <ButtonGroup size="sm">
          <Button variantColor="green">Setup Email</Button>
          <Button variantColor="blue">Next</Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  </Popover>
);

stories.add("walkthrough", () => <WalkthroughEx />);

const ConfirmationEx = () => (
  <Popover usePortal placement="right" closeOnBlur={false}>
    <PopoverTrigger>
      <Button>Delete Customer</Button>
    </PopoverTrigger>
    <PopoverContent>
      <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverBody>
        Are you sure you want to continue with your action?
      </PopoverBody>
      <PopoverFooter d="flex" justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button variant="outline">Cancel</Button>
          <Button variantColor="red">Apply</Button>
        </ButtonGroup>
      </PopoverFooter>
    </PopoverContent>
  </Popover>
);

stories.add("confirmation", () => <ConfirmationEx />);

const CustomTargetEx = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)}>Trigger Popover</Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={open}
        placement="right"
        closeOnBlur={false}
        usePortal
      >
        <PopoverTrigger>
          <Button>Popover Target</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button variant="outline">Cancel</Button>
              <Button variantColor="red">Apply</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </>
  );
};

stories.add("custom target", () => <CustomTargetEx />);

function Form({ initField, ...props }) {
  return (
    <Stack {...props}>
      <FormControl>
        <FormLabel htmlFor="fname">First name</FormLabel>
        <Input ref={initField} id="fname" defaultValue="John" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="lname">Last name</FormLabel>
        <Input id="lname" defaultValue="Smith" />
      </FormControl>
    </Stack>
  );
}

const DialogForm = () => {
  const [open, setOpen] = useState(false);
  const firstField = useRef(null);
  return (
    <>
      <Box d="inline-block" mr={3}>
        John Smith
      </Box>
      <Popover
        isOpen={open}
        initialFocusRef={firstField}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <IconButton size="sm" icon="edit" />
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form initField={firstField} />
            <ButtonGroup mt={5} d="flex" justifyContent="flex-end">
              <Button variant="outline">Cancel</Button>
              <Button isDisabled variantColor="teal">
                Save
              </Button>
            </ButtonGroup>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

stories.add("form with focus lock", () => <DialogForm />);

const PortalBug = () => {
  const initRef = useRef();
  return (
    <>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Proin fermentum leo
        vel orci porta non pulvinar neque laoreet. Nec ullamcorper sit amet
        risus nullam eget felis eget nunc. Elit pellentesque habitant morbi
        tristique senectus et netus et malesuada. Sed arcu non odio euismod
        lacinia at. Orci sagittis eu volutpat odio facilisis mauris. Dui vivamus
        arcu felis bibendum ut tristique. Nullam eget felis eget nunc lobortis
        mattis aliquam. Suspendisse interdum consectetur libero id faucibus nisl
        tincidunt eget nullam. At varius vel pharetra vel turpis nunc eget
        lorem. Vestibulum lorem sed risus ultricies tristique nulla aliquet
        enim. Massa tempor nec feugiat nisl pretium fusce id. Lorem ipsum dolor
        sit amet consectetur adipiscing. Quisque sagittis purus sit amet. Mauris
        rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Quis
        vel eros donec ac odio. Morbi non arcu risus quis varius quam quisque.
        Purus sit amet luctus venenatis lectus magna fringilla urna. At risus
        viverra adipiscing at in tellus integer. Adipiscing bibendum est
        ultricies integer quis auctor. Sed tempus urna et pharetra pharetra
        massa massa ultricies mi. Consectetur libero id faucibus nisl.
        Parturient montes nascetur ridiculus mus mauris vitae ultricies. Pretium
        viverra suspendisse potenti nullam ac tortor vitae. Sed cras ornare arcu
        dui vivamus arcu felis. Risus ultricies tristique nulla aliquet. Vitae
        tempus quam pellentesque nec nam. Suspendisse ultrices gravida dictum
        fusce ut placerat orci. Neque viverra justo nec ultrices dui sapien eget
        mi proin. Venenatis a condimentum vitae sapien pellentesque. Augue ut
        lectus arcu bibendum at varius vel pharetra vel. Vitae justo eget magna
        fermentum iaculis eu non diam phasellus. Ullamcorper eget nulla facilisi
        etiam. Mus mauris vitae ultricies leo integer malesuada nunc vel.
        Pellentesque habitant morbi tristique senectus et netus et. Ac tortor
        vitae purus faucibus ornare. A diam maecenas sed enim ut. Posuere ac ut
        consequat semper viverra. Nibh praesent tristique magna sit amet purus.
        Scelerisque varius morbi enim nunc faucibus a. Maecenas accumsan lacus
        vel facilisis volutpat est velit egestas. Ut lectus arcu bibendum at
        varius vel pharetra vel. Id aliquet lectus proin nibh nisl.
      </p>
      <br />
      <Popover closeOnBlur={false} initialFocusRef={initRef}>
        <PopoverTrigger>
          <Button>Trigger</Button>
        </PopoverTrigger>
        <PopoverContent hasArrow={false}>
          <PopoverHeader>Header</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <Button variantColor="blue" ref={initRef}>
              Close
            </Button>
          </PopoverBody>
          <PopoverFooter>This is the footer</PopoverFooter>
        </PopoverContent>
      </Popover>
      <br />
      <br />
      <p>
        Enim eu turpis egestas pretium. Dolor sit amet consectetur adipiscing
        elit ut aliquam purus. Morbi tristique senectus et netus et malesuada
        fames ac turpis. Tincidunt vitae semper quis lectus nulla at volutpat
        diam ut. Aenean pharetra magna ac placerat vestibulum lectus. Ut
        porttitor leo a diam sollicitudin tempor. Velit aliquet sagittis id
        consectetur. Massa ultricies mi quis hendrerit dolor magna eget est
        lorem. Pharetra massa massa ultricies mi quis hendrerit dolor magna.
        Eget mi proin sed libero enim sed faucibus turpis in. Adipiscing elit ut
        aliquam purus sit. Orci a scelerisque purus semper eget. Tempus egestas
        sed sed risus. Aliquet risus feugiat in ante metus. In mollis nunc sed
        id semper risus in. Semper risus in hendrerit gravida rutrum quisque
        non. Turpis egestas maecenas pharetra convallis posuere morbi leo urna.
        Potenti nullam ac tortor vitae purus faucibus ornare suspendisse. Ornare
        arcu odio ut sem. Amet justo donec enim diam vulputate ut pharetra sit
        amet. Augue interdum velit euismod in pellentesque massa. Id diam
        maecenas ultricies mi eget mauris pharetra. Tellus elementum sagittis
        vitae et leo duis ut. Semper viverra nam libero justo laoreet sit. Ipsum
        suspendisse ultrices gravida dictum fusce ut placerat orci. Neque
        volutpat ac tincidunt vitae semper quis lectus. Iaculis at erat
        pellentesque adipiscing commodo. Viverra vitae congue eu consequat ac
        felis donec et odio. Tortor aliquam nulla facilisi cras fermentum odio.
        Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi
        tristique. Morbi tincidunt ornare massa eget egestas purus viverra.
        Lacus vel facilisis volutpat est velit egestas dui id ornare. Urna
        molestie at elementum eu facilisis sed. Maecenas volutpat blandit
        aliquam etiam erat. Id faucibus nisl tincidunt eget nullam non nisi est.
        Sed velit dignissim sodales ut eu sem integer vitae justo. Ultrices
        gravida dictum fusce ut placerat. Phasellus egestas tellus rutrum tellus
        pellentesque eu tincidunt tortor. Eu facilisis sed odio morbi. Sed
        libero enim sed faucibus turpis. Aliquam faucibus purus in massa tempor
        nec feugiat nisl pretium. Magna etiam tempor orci eu lobortis elementum
        nibh tellus molestie. Tempor nec feugiat nisl pretium fusce id. Diam
        volutpat commodo sed egestas egestas fringilla phasellus. Viverra
        adipiscing at in tellus integer feugiat. Et odio pellentesque diam
        volutpat. Sed vulputate mi sit amet mauris commodo quis. Pharetra
        convallis posuere morbi leo urna molestie at elementum. Sed turpis
        tincidunt id aliquet risus feugiat in. Nulla facilisi etiam dignissim
        diam quis enim. Sed sed risus pretium quam vulputate dignissim. Velit ut
        tortor pretium viverra suspendisse potenti nullam ac. In arcu cursus
        euismod quis viverra. At tempor commodo ullamcorper a. Nunc non blandit
        massa enim nec. Est lorem ipsum dolor sit amet consectetur adipiscing.
        Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices.
        Libero id faucibus nisl tincidunt. Lorem mollis aliquam ut porttitor.
        Nam aliquam sem et tortor consequat id porta nibh. Et pharetra pharetra
        massa massa ultricies mi quis. Vitae congue eu consequat ac felis donec.
        Tempus egestas sed sed risus pretium quam vulputate dignissim. Sed augue
        lacus viverra vitae congue eu consequat. Faucibus vitae aliquet nec
        ullamcorper sit amet risus nullam. Purus faucibus ornare suspendisse sed
        nisi lacus. Vulputate enim nulla aliquet porttitor lacus luctus
        accumsan. Auctor eu augue ut lectus arcu. Commodo ullamcorper a lacus
        vestibulum sed. Volutpat commodo sed egestas egestas fringilla. Morbi
        enim nunc faucibus a pellentesque. Quam quisque id diam vel quam
        elementum. Auctor eu augue ut lectus arcu bibendum at varius. Massa
        tempor nec feugiat nisl pretium fusce. Orci dapibus ultrices in iaculis.
        Nunc aliquet bibendum enim facilisis gravida neque convallis a cras.
        Purus non enim praesent elementum. Consectetur lorem donec massa sapien
        faucibus et molestie. Nisl vel pretium lectus quam id leo in vitae. Non
        arcu risus quis varius quam quisque. Vestibulum sed arcu non odio
        euismod lacinia at. Aliquam nulla facilisi cras fermentum. Morbi leo
        urna molestie at elementum eu. Cras tincidunt lobortis feugiat vivamus
        at augue eget arcu dictum. Adipiscing enim eu turpis egestas pretium.
        Quis ipsum suspendisse ultrices gravida dictum. Porta lorem mollis
        aliquam ut. Eu facilisis sed odio morbi quis commodo. Elementum pulvinar
        etiam non quam. Est sit amet facilisis magna etiam tempor. Eget sit amet
        tellus cras adipiscing enim eu. Elementum nisi quis eleifend quam
        adipiscing. Aliquam etiam erat velit scelerisque in dictum non. Quis
        lectus nulla at volutpat diam ut venenatis tellus. Habitant morbi
        tristique senectus et netus et malesuada fames ac. Cursus in hac
        habitasse platea. Metus aliquam eleifend mi in nulla posuere. Cras
        pulvinar mattis nunc sed blandit. Augue interdum velit euismod in. Odio
        pellentesque diam volutpat commodo sed. Congue nisi vitae suscipit
        tellus mauris. Dictum sit amet justo donec enim diam vulputate. Aenean
        et tortor at risus viverra adipiscing at in tellus. Nisl nunc mi ipsum
        faucibus vitae aliquet nec ullamcorper sit. Sodales neque sodales ut
        etiam sit amet nisl. Nisi porta lorem mollis aliquam ut porttitor leo a
        diam. Lobortis elementum nibh tellus molestie. Nisi est sit amet
        facilisis magna. At ultrices mi tempus imperdiet. Aliquam id diam
        maecenas ultricies mi eget mauris pharetra et. Bibendum ut tristique et
        egestas. Consectetur adipiscing elit pellentesque habitant. Mus mauris
        vitae ultricies leo integer malesuada nunc vel risus. Tortor dignissim
        convallis aenean et tortor at risus viverra adipiscing. Ultricies leo
        integer malesuada nunc vel risus commodo viverra. Fermentum odio eu
        feugiat pretium nibh ipsum consequat. Vitae semper quis lectus nulla at.
        Elementum sagittis vitae et leo duis ut diam. Placerat orci nulla
        pellentesque dignissim enim sit amet. Lorem sed risus ultricies
        tristique. Facilisis sed odio morbi quis commodo odio aenean. Viverra
        maecenas accumsan lacus vel facilisis volutpat est velit egestas.
      </p>
    </>
  );
};

stories.add("with portal bug", () => <PortalBug />);

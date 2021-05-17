import { useDisclosure } from "@chakra-ui/hooks"
import React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
  DrawerHeader,
} from "../src/drawer"

export default {
  title: "Modal / Drawer",
}

export const DrawerExample = () => {
  const [open, setOpen] = React.useState(false)
  return (
    <>
      <button onClick={() => setOpen(!open)}>Open</button>
      <Drawer isOpen={open} onClose={() => setOpen(false)}>
        <DrawerOverlay />
        <DrawerContent>
          <div>This is the drawer content</div>
          <button>This is a button</button>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export const WithLongContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <button onClick={onOpen}>Open</button>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
            <DrawerBody>
              <input placeholder="Type here..." />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                suscipit, ligula sit amet pharetra accumsan, nulla augue
                fermentum dui, eget finibus diam sapien eget nisi. Fusce posuere
                tempus cursus. Nulla cursus dapibus ligula, sit amet facilisis
                libero tempor non. Quisque pharetra porttitor volutpat. Nulla eu
                volutpat tellus, a luctus neque. Duis at finibus ipsum. Nam
                gravida, eros vel auctor gravida, ipsum ante elementum ipsum,
                eget mattis purus justo et risus. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nunc faucibus tellus vel justo
                venenatis ultrices. Nam tincidunt felis quis gravida
                condimentum. Suspendisse non est ac nibh egestas consequat
                vehicula vitae odio. Fusce auctor metus ac mi elementum, non
                volutpat tortor luctus. Integer ultricies metus sed urna
                vestibulum, at dignissim diam condimentum. Etiam non diam
                iaculis, consectetur metus euismod, scelerisque purus. Maecenas
                pellentesque urna sit amet massa pretium congue. Mauris est
                justo, porttitor sed vestibulum at, efficitur in nulla. Ut nec
                dolor finibus augue pulvinar rhoncus. Aliquam auctor, nibh eget
                euismod vulputate, ante sem facilisis purus, at viverra libero
                velit bibendum lacus. Aenean blandit lorem urna, ut condimentum
                sapien cursus sit amet. Fusce augue ligula, suscipit nec pretium
                ut, venenatis ac ligula. Ut interdum, ipsum at tincidunt
                ultricies, mi est ultrices dui, eu pulvinar purus lorem eget ex.
                Praesent non eros felis. Donec ac elementum arcu. Praesent
                rutrum cursus ante, quis ornare mauris placerat eu. Cras auctor
                lacinia tincidunt. Integer dapibus felis quis urna fermentum,
                quis gravida dolor finibus. Sed non sapien urna. Nunc mattis
                enim eget enim consequat sodales. Aliquam pretium est ante, nec
                posuere lectus tempus sit amet. Fusce mattis tempor vulputate.
                Maecenas volutpat nunc nec ante sagittis fringilla. Etiam nec
                augue sed lacus faucibus tristique vitae id dolor. Sed posuere
                tortor et volutpat vulputate. Mauris ut sodales mauris. Nunc
                nulla risus, euismod eget fermentum vitae, mollis ac elit. Morbi
                ullamcorper, est ut tristique ultrices, enim augue commodo eros,
                ac aliquet quam ex quis lorem. Aenean vehicula tortor justo,
                suscipit consectetur libero tempus id. Vivamus sit amet
                pellentesque risus, ac mollis orci. Vestibulum accumsan, neque
                ac imperdiet cursus, nisi turpis luctus nulla, vitae ullamcorper
                nisi sem quis erat. Proin ullamcorper metus nec dui elementum,
                ut dapibus nisi tempus. Ut malesuada tellus eu commodo
                vulputate. Proin tristique, nulla nec finibus commodo, urna
                libero posuere purus, eu dictum dui felis pretium sapien.
                Vestibulum felis enim, pharetra tristique molestie id, viverra
                quis ante. Ut nulla ipsum, commodo ac ornare non, lobortis
                hendrerit dolor. Quisque quis pellentesque nunc. Donec varius
                quam massa. Vestibulum maximus urna id laoreet consequat.
                Phasellus ut pulvinar ex. Suspendisse vitae placerat dolor, vel
                elementum quam. Maecenas vestibulum felis sed metus posuere
                ultricies. Nulla sodales erat eros. Etiam elit ligula, elementum
                molestie maximus vel, condimentum id urna. Pellentesque molestie
                ut justo vel rhoncus. Duis sed quam varius, aliquet libero a,
                facilisis ante. Aliquam eget quam erat. Duis dictum odio in nunc
                bibendum pharetra. Aenean accumsan dui sit amet nibh
                condimentum, eget suscipit nisl blandit. Suspendisse potenti.
                Donec vel eleifend mauris. Morbi a tellus commodo, porta urna
                ac, aliquam tellus. Sed finibus facilisis neque sit amet
                fringilla. Pellentesque aliquam placerat nisi. Mauris quam
                risus, feugiat ac nibh et, aliquet mattis sapien. Nullam
                pharetra orci id nisi ultrices, et rhoncus dolor lobortis.
                Suspendisse venenatis ipsum eu sem facilisis, non fermentum
                lectus porttitor. Nunc tristique augue non dui tempor, venenatis
                pharetra nisi commodo. Aenean bibendum nisl scelerisque ligula
                egestas tincidunt. Aliquam fringilla blandit nunc at interdum.
                Maecenas tempus sed ipsum et iaculis. Pellentesque cursus elit
                velit, sed vulputate augue euismod a. Vivamus imperdiet
                scelerisque purus, at ultricies enim elementum sed. Suspendisse
                potenti. Suspendisse suscipit vulputate lacus. Donec auctor
                tincidunt lorem, in volutpat dolor pretium ut. Maecenas sed erat
                id sem dignissim aliquam. Fusce bibendum augue est, et dapibus
                sem molestie ac. Pellentesque nec arcu vehicula, faucibus mi
                vel, porta quam. Nunc scelerisque tristique varius. Mauris
                tristique enim diam, id hendrerit lacus euismod ac. Curabitur
                posuere dui nunc, at lacinia sem porttitor in. Sed facilisis dui
                vitae enim commodo, vel auctor purus sodales. Nam dictum quam
                non urna pretium, a commodo est luctus. Nulla pellentesque elit
                in justo elementum, feugiat malesuada nibh venenatis. Nunc ac
                pharetra mauris, non luctus orci. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nullam quis iaculis lorem. Donec id
                nunc mattis, pellentesque magna vel, scelerisque justo.
                Suspendisse potenti. Ut non lacus sapien. Quisque eget venenatis
                tellus. Cras ipsum felis, facilisis sagittis enim a, ultrices
                volutpat tellus. Vestibulum sed luctus orci, eget tincidunt
                nibh. Aenean suscipit tortor nec felis suscipit, et suscipit
                turpis finibus. Morbi aliquam ligula in nunc euismod, ac
                fermentum est dignissim. Cras elit dolor, aliquet a ligula eu,
                vulputate ultricies nisi. In a ullamcorper purus. Nulla
                consectetur in neque ut dapibus. Nullam eu lobortis leo. Integer
                eget dui dapibus, accumsan nisl sit amet, cursus ligula. Nam
                iaculis volutpat dui, sit amet aliquam odio aliquam vel. Morbi
                consectetur augue ornare, iaculis magna facilisis, fringilla
                lacus. Etiam in tempor elit, eu pulvinar nunc. Praesent quis
                lectus mollis, interdum sem sed, hendrerit justo. Nunc nec urna
                vehicula, posuere nisl id, tincidunt tortor. Sed porttitor
                maximus turpis, convallis sodales nunc vestibulum nec. Nulla sed
                venenatis enim, et iaculis nisi. In eros neque, suscipit vitae
                porta ut, auctor nec massa. Vivamus gravida, neque pharetra
                auctor facilisis, sapien eros eleifend purus, convallis sagittis
                sem diam a leo. Nam sit amet pulvinar sapien. Cras tempor
                volutpat dolor vitae tincidunt. Pellentesque rutrum elit vitae
                turpis elementum, a lacinia ligula mattis. Nulla sit amet augue
                vitae odio auctor feugiat quis eu nibh. Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Mauris mi lacus, elementum id
                ante in, porta rutrum lorem. Suspendisse tempus convallis mi
                vitae tempor. Donec nec tortor rhoncus, ornare lectus at,
                lobortis nibh. Suspendisse potenti. Proin ac tortor eu nulla
                iaculis blandit. Donec enim purus, egestas sed elit sit amet,
                tempor elementum elit. Donec in viverra purus. Phasellus quam
                odio, hendrerit et magna sit amet, tincidunt sagittis dolor.
                Vestibulum feugiat quis libero eget rhoncus. Maecenas tempus,
                nisl varius dictum rhoncus, nisl neque feugiat est, non
                ultricies mi augue non mauris. Generated 10 paragraphs, 996
                words, 6777 bytes of Lorem Ipsum
              </p>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

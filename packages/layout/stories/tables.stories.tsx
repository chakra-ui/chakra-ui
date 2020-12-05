import * as React from "react"
import { Box, Table, THead, TH, TD, TR, TBody, Caption } from "../src"

export default {
  title: "Table",
}

export const Default = () => (
  <Box mt={6}>
    <Table>
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const Hover = () => (
  <Box mt={6}>
    <Table isHoverable>
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const Responsive = () => (
  <Box mt={6}>
    <Table isResponsive>
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
          <TH scope="col">Email</TH>
          <TH scope="col">Gender</TH>
          <TH scope="col">Age</TH>
          <TH scope="col">Street</TH>
          <TH scope="col">City</TH>
          <TH scope="col">ZIP</TH>
          <TH scope="col">State</TH>
          <TH scope="col">Country</TH>
          <TH scope="col">Registered</TH>
          <TH scope="col">Phone</TH>
          <TH scope="col">Server</TH>
          <TH scope="col">UUID</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">0</TH>
          <TD>Niklas</TD>
          <TD>Kalm</TD>
          <TD>@HETU</TD>
          <TD>niklas.kalm@example.com</TD>
          <TD>male</TD>
          <TD>56</TD>
          <TD>Reijolankatu 2137</TD>
          <TD>Sauvo</TD>
          <TD>53496</TD>
          <TD>Tavastia Proper</TD>
          <TD>Finland</TD>
          <TD>2012-10-28T09:01:08.990Z</TD>
          <TD>02-429-780</TD>
          <TD>049-875-88-57</TD>
          <TD>a4e3bce7-651b-4eea-8a45-7593173ece1f</TD>
        </TR>
        <TR>
          <TH scope="row">1</TH>
          <TD>Yolanda</TD>
          <TD>Carrasco</TD>
          <TD>@DNI</TD>
          <TD>yolanda.carrasco@example.com</TD>
          <TD>female</TD>
          <TD>63</TD>
          <TD>Calle del Barquillo 3425</TD>
          <TD>Gandía</TD>
          <TD>42731</TD>
          <TD>Castilla la Mancha</TD>
          <TD>Spain</TD>
          <TD>2014-06-23T12:51:00.023Z</TD>
          <TD>946-327-788</TD>
          <TD>643-056-393</TD>
          <TD>8dd9bd87-5cf2-42f5-8445-847c59f1a297</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Tina</TD>
          <TD>Valderhaug</TD>
          <TD>@FN</TD>
          <TD>tina.valderhaug@example.com</TD>
          <TD>female</TD>
          <TD>31</TD>
          <TD>Gjøkbakken 8838</TD>
          <TD>Årås</TD>
          <TD>0319</TD>
          <TD>Troms - Romsa</TD>
          <TD>Norway</TD>
          <TD>2017-01-06T05:54:38.457Z</TD>
          <TD>61216252</TD>
          <TD>98561429</TD>
          <TD>27a64bce-c760-48a4-b4d3-fdaca91c8ee7</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Ellie</TD>
          <TD>Caldwell</TD>
          <TD>@PPS</TD>
          <TD>ellie.caldwell@example.com</TD>
          <TD>female</TD>
          <TD>34</TD>
          <TD>George Street 3230</TD>
          <TD>Kinsealy-Drinan</TD>
          <TD>98838</TD>
          <TD>Wexford</TD>
          <TD>Ireland</TD>
          <TD>2013-03-30T20:01:47.512Z</TD>
          <TD>041-337-7547</TD>
          <TD>081-322-3480</TD>
          <TD>4fd365ac-9762-4b6e-8dd4-92319494ee89</TD>
        </TR>
        <TR>
          <TH scope="row">4</TH>
          <TD>یلدا</TD>
          <TD>موسوی</TD>
          <TD>@</TD>
          <TD>yld.mwswy@example.com</TD>
          <TD>female</TD>
          <TD>39</TD>
          <TD>دیباجی 8293</TD>
          <TD>آبادان</TD>
          <TD>14927</TD>
          <TD>آذربایجان شرقی</TD>
          <TD>United Arab Emirates</TD>
          <TD>2006-07-15T16:03:01.418Z</TD>
          <TD>089-36595206</TD>
          <TD>0912-143-1207</TD>
          <TD>3eb09e51-9f53-48ff-83aa-4f0ebef5ca77</TD>
        </TR>
        <TR>
          <TH scope="row">5</TH>
          <TD>Alice</TD>
          <TD>Dupont</TD>
          <TD>@INSEE</TD>
          <TD>alice.dupont@example.com</TD>
          <TD>female</TD>
          <TD>56</TD>
          <TD>Place Paul-Duquaire 8938</TD>
          <TD>Nanterre</TD>
          <TD>19597</TD>
          <TD>Aube</TD>
          <TD>France</TD>
          <TD>2005-06-02T16:44:44.120Z</TD>
          <TD>03-31-00-26-26</TD>
          <TD>06-22-42-00-55</TD>
          <TD>cb87c633-56d0-4445-a562-adfad0d40008</TD>
        </TR>
        <TR>
          <TH scope="row">6</TH>
          <TD>Candice</TD>
          <TD>Johnson</TD>
          <TD>@TFN</TD>
          <TD>candice.johnson@example.com</TD>
          <TD>female</TD>
          <TD>42</TD>
          <TD>Edwards Rd 9526</TD>
          <TD>Albury</TD>
          <TD>2920</TD>
          <TD>Australian Capital Territory</TD>
          <TD>Australia</TD>
          <TD>2017-10-17T13:47:43.852Z</TD>
          <TD>09-5475-5359</TD>
          <TD>0412-218-453</TD>
          <TD>002411f0-1a3f-4ee5-a8f8-31a14175341b</TD>
        </TR>
        <TR>
          <TH scope="row">7</TH>
          <TD>زهرا</TD>
          <TD>کریمی</TD>
          <TD>@</TD>
          <TD>zhr.khrymy@example.com</TD>
          <TD>female</TD>
          <TD>50</TD>
          <TD>پارک شریعتی 2347</TD>
          <TD>کرمانشاه</TD>
          <TD>23847</TD>
          <TD>فارس</TD>
          <TD>United Arab Emirates</TD>
          <TD>2008-01-11T03:29:44.187Z</TD>
          <TD>047-10926672</TD>
          <TD>0903-597-1974</TD>
          <TD>0380e491-14d0-42c0-a1ed-0d52a6520149</TD>
        </TR>
        <TR>
          <TH scope="row">8</TH>
          <TD>Solano</TD>
          <TD>Moreira</TD>
          <TD>@</TD>
          <TD>solano.moreira@example.com</TD>
          <TD>male</TD>
          <TD>37</TD>
          <TD>Rua João Xxiii 4250</TD>
          <TD>Tatuí</TD>
          <TD>99402</TD>
          <TD>Sergipe</TD>
          <TD>Brazil</TD>
          <TD>2019-06-08T11:40:47.365Z</TD>
          <TD>(17) 6745-0163</TD>
          <TD>(26) 7854-7735</TD>
          <TD>43630088-e390-42a4-b880-c27e9f400620</TD>
        </TR>
        <TR>
          <TH scope="row">9</TH>
          <TD>Ermin</TD>
          <TD>Ozinga</TD>
          <TD>@BSN</TD>
          <TD>ermin.ozinga@example.com</TD>
          <TD>male</TD>
          <TD>71</TD>
          <TD>Ikoon 7964</TD>
          <TD>Surhuizum</TD>
          <TD>78977</TD>
          <TD>Groningen</TD>
          <TD>Netherlands</TD>
          <TD>2011-02-14T13:39:49.413Z</TD>
          <TD>(668)-176-9551</TD>
          <TD>(651)-447-9397</TD>
          <TD>a3698b39-ae6f-497c-9959-f1331d785187</TD>
        </TR>
        <TR>
          <TH scope="row">10</TH>
          <TD>ماهان</TD>
          <TD>زارعی</TD>
          <TD>@</TD>
          <TD>mhn.zraay@example.com</TD>
          <TD>male</TD>
          <TD>59</TD>
          <TD>میدان شهید نامجو 2840</TD>
          <TD>مشهد</TD>
          <TD>19382</TD>
          <TD>خراسان جنوبی</TD>
          <TD>United Arab Emirates</TD>
          <TD>2013-06-08T06:38:21.151Z</TD>
          <TD>065-76079256</TD>
          <TD>0983-608-6003</TD>
          <TD>937e4af6-d7d3-4ee7-aecc-74c58a7df75d</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const ColorScheme = () => (
  <>
    {[
      "red",
      "blue",
      "purple",
      "cyan",
      "teal",
      "green",
      "yellow",
      "orange",
      "gray",
    ].map((color) => (
      <Box key={color} mt={6}>
        <Table colorScheme={color}>
          <THead>
            <TR>
              <TH scope="col">#</TH>
              <TH scope="col">First</TH>
              <TH scope="col">Last</TH>
              <TH scope="col">Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope="row">1</TH>
              <TD>Mark</TD>
              <TD>Otto</TD>
              <TD>@mdo</TD>
            </TR>
            <TR>
              <TH scope="row">2</TH>
              <TD>Jacob</TD>
              <TD>Thornton</TD>
              <TD>@fat</TD>
            </TR>
            <TR>
              <TH scope="row">3</TH>
              <TD>Larry</TD>
              <TD>The Bird</TD>
              <TD>@twitter</TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    ))}
  </>
)

export const ColorSchemeHover = () => (
  <>
    {[
      "red",
      "blue",
      "purple",
      "cyan",
      "teal",
      "green",
      "yellow",
      "orange",
      "gray",
    ].map((color) => (
      <Box key={color} mt={6}>
        <Table isHoverable colorScheme={color}>
          <THead>
            <TR>
              <TH scope="col">#</TH>
              <TH scope="col">First</TH>
              <TH scope="col">Last</TH>
              <TH scope="col">Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope="row">1</TH>
              <TD>Mark</TD>
              <TD>Otto</TD>
              <TD>@mdo</TD>
            </TR>
            <TR>
              <TH scope="row">2</TH>
              <TD>Jacob</TD>
              <TD>Thornton</TD>
              <TD>@fat</TD>
            </TR>
            <TR>
              <TH scope="row">3</TH>
              <TD>Larry</TD>
              <TD>The Bird</TD>
              <TD>@twitter</TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    ))}
  </>
)

export const Striped = () => (
  <Box mt={6}>
    <Table variant="striped">
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const StripedHover = () => (
  <Box mt={6}>
    <Table variant="striped" isHoverable>
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const StripedColorScheme = () => (
  <>
    {[
      "red",
      "blue",
      "purple",
      "cyan",
      "teal",
      "green",
      "yellow",
      "orange",
      "gray",
    ].map((color) => (
      <Box key={color} mt={6}>
        <Table variant="striped" colorScheme={color}>
          <THead>
            <TR>
              <TH scope="col">#</TH>
              <TH scope="col">First</TH>
              <TH scope="col">Last</TH>
              <TH scope="col">Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope="row">1</TH>
              <TD>Mark</TD>
              <TD>Otto</TD>
              <TD>@mdo</TD>
            </TR>
            <TR>
              <TH scope="row">2</TH>
              <TD>Jacob</TD>
              <TD>Thornton</TD>
              <TD>@fat</TD>
            </TR>
            <TR>
              <TH scope="row">3</TH>
              <TD>Larry</TD>
              <TD>The Bird</TD>
              <TD>@twitter</TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    ))}
  </>
)

export const StripedColorSchemeHover = () => (
  <>
    {[
      "red",
      "blue",
      "purple",
      "cyan",
      "teal",
      "green",
      "yellow",
      "orange",
      "gray",
    ].map((color) => (
      <Box key={color} mt={6}>
        <Table variant="striped" isHoverable colorScheme={color}>
          <THead>
            <TR>
              <TH scope="col">#</TH>
              <TH scope="col">First</TH>
              <TH scope="col">Last</TH>
              <TH scope="col">Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope="row">1</TH>
              <TD>Mark</TD>
              <TD>Otto</TD>
              <TD>@mdo</TD>
            </TR>
            <TR>
              <TH scope="row">2</TH>
              <TD>Jacob</TD>
              <TD>Thornton</TD>
              <TD>@fat</TD>
            </TR>
            <TR>
              <TH scope="row">3</TH>
              <TD>Larry</TD>
              <TD>The Bird</TD>
              <TD>@twitter</TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    ))}
  </>
)

export const Bordered = () => (
  <Box mt={6}>
    <Table variant="bordered">
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const ColorSchemeBordered = () => (
  <>
    {[
      "red",
      "blue",
      "purple",
      "cyan",
      "teal",
      "green",
      "yellow",
      "orange",
      "gray",
    ].map((color) => (
      <Box key={color} mt={6}>
        <Table variant="bordered" colorScheme={color}>
          <THead>
            <TR>
              <TH scope="col">#</TH>
              <TH scope="col">First</TH>
              <TH scope="col">Last</TH>
              <TH scope="col">Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope="row">1</TH>
              <TD>Mark</TD>
              <TD>Otto</TD>
              <TD>@mdo</TD>
            </TR>
            <TR>
              <TH scope="row">2</TH>
              <TD>Jacob</TD>
              <TD>Thornton</TD>
              <TD>@fat</TD>
            </TR>
            <TR>
              <TH scope="row">3</TH>
              <TD>Larry</TD>
              <TD>The Bird</TD>
              <TD>@twitter</TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    ))}
  </>
)

export const Borderless = () => (
  <Box mt={6}>
    <Table variant="borderless">
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const ColorSchemeBorderless = () => (
  <>
    {[
      "red",
      "blue",
      "purple",
      "cyan",
      "teal",
      "green",
      "yellow",
      "orange",
      "gray",
    ].map((color) => (
      <Box key={color} mt={6}>
        <Table variant="borderless" colorScheme={color}>
          <THead>
            <TR>
              <TH scope="col">#</TH>
              <TH scope="col">First</TH>
              <TH scope="col">Last</TH>
              <TH scope="col">Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope="row">1</TH>
              <TD>Mark</TD>
              <TD>Otto</TD>
              <TD>@mdo</TD>
            </TR>
            <TR>
              <TH scope="row">2</TH>
              <TD>Jacob</TD>
              <TD>Thornton</TD>
              <TD>@fat</TD>
            </TR>
            <TR>
              <TH scope="row">3</TH>
              <TD>Larry</TD>
              <TD>The Bird</TD>
              <TD>@twitter</TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    ))}
  </>
)

export const BorderedStriped = () => (
  <Box mt={6}>
    <Table variant="bordered-striped">
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const ColorSchemeBorderedStriped = () => (
  <>
    {[
      "red",
      "blue",
      "purple",
      "cyan",
      "teal",
      "green",
      "yellow",
      "orange",
      "gray",
    ].map((color) => (
      <Box key={color} mt={6}>
        <Table variant="bordered-striped" colorScheme={color}>
          <THead>
            <TR>
              <TH scope="col">#</TH>
              <TH scope="col">First</TH>
              <TH scope="col">Last</TH>
              <TH scope="col">Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope="row">1</TH>
              <TD>Mark</TD>
              <TD>Otto</TD>
              <TD>@mdo</TD>
            </TR>
            <TR>
              <TH scope="row">2</TH>
              <TD>Jacob</TD>
              <TD>Thornton</TD>
              <TD>@fat</TD>
            </TR>
            <TR>
              <TH scope="row">3</TH>
              <TD>Larry</TD>
              <TD>The Bird</TD>
              <TD>@twitter</TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    ))}
  </>
)

export const BorderlessStriped = () => (
  <Box mt={6}>
    <Table variant="borderless-striped">
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const ColorSchemeBorderlessStriped = () => (
  <>
    {[
      "red",
      "blue",
      "purple",
      "cyan",
      "teal",
      "green",
      "yellow",
      "orange",
      "gray",
    ].map((color) => (
      <Box key={color} mt={6}>
        <Table variant="borderless-striped" colorScheme={color}>
          <THead>
            <TR>
              <TH scope="col">#</TH>
              <TH scope="col">First</TH>
              <TH scope="col">Last</TH>
              <TH scope="col">Handle</TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <TH scope="row">1</TH>
              <TD>Mark</TD>
              <TD>Otto</TD>
              <TD>@mdo</TD>
            </TR>
            <TR>
              <TH scope="row">2</TH>
              <TD>Jacob</TD>
              <TD>Thornton</TD>
              <TD>@fat</TD>
            </TR>
            <TR>
              <TH scope="row">3</TH>
              <TD>Larry</TD>
              <TD>The Bird</TD>
              <TD>@twitter</TD>
            </TR>
          </TBody>
        </Table>
      </Box>
    ))}
  </>
)

export const SmallTable = () => (
  <Box mt={6}>
    <Table size="sm">
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const RedSmallHoveredBorderedStripedResponsiveTable = () => (
  <Box mt={6}>
    <Table
      size="sm"
      colorScheme="red"
      variant="bordered-striped"
      isHoverable
      isResponsive
    >
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const TableWithCaption = () => (
  <Box mt={6}>
    <Table>
      <Caption>List of users</Caption>
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

export const TableWithCaptionOnTop = () => (
  <Box mt={6}>
    <Table captionSide="top">
      <Caption>List of users</Caption>
      <THead>
        <TR>
          <TH scope="col">#</TH>
          <TH scope="col">First</TH>
          <TH scope="col">Last</TH>
          <TH scope="col">Handle</TH>
        </TR>
      </THead>
      <TBody>
        <TR>
          <TH scope="row">1</TH>
          <TD>Mark</TD>
          <TD>Otto</TD>
          <TD>@mdo</TD>
        </TR>
        <TR>
          <TH scope="row">2</TH>
          <TD>Jacob</TD>
          <TD>Thornton</TD>
          <TD>@fat</TD>
        </TR>
        <TR>
          <TH scope="row">3</TH>
          <TD>Larry</TD>
          <TD>The Bird</TD>
          <TD>@twitter</TD>
        </TR>
      </TBody>
    </Table>
  </Box>
)

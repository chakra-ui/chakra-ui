import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { ThemeProvider, CSSReset } from "@chakra-ui/theme";
import {
  Select,
  SelectControl,
  SelectMenu,
  Option,
  OptionGroup,
} from "./Select";
import { Box } from "@chakra-ui/layout";
import { useSelectionItem, useSelectionState } from "./hook";
import { useLogger } from "@chakra-ui/hooks";

const stories = storiesOf("Select", module).addDecorator(story => (
  <ThemeProvider>
    <CSSReset />
    {story()}
  </ThemeProvider>
));

export function SelectExample() {
  const [add, setAdd] = useState(false);
  const [val, setVal] = useState<React.ReactText>("Togo");
  return (
    <Box maxW="400px" mx="auto">
      <Select
        value={val}
        onChange={value => {
          setVal(value);
        }}
      >
        <SelectControl />
        <SelectMenu>
          <Option value="Niger">Niger</Option>
          <Option value="Nigeria">Nigeria</Option>
          <Option value="Togo">Togo</Option>
          <Option value="Germany">Germany</Option>
          {add && <Option value="Ghana">Ghana</Option>}
          <OptionGroup label="Other room">
            <Option value="Zambia">Zambia</Option>
            <Option value="Gerba">Gerba</Option>
            <Option value="Tunisia">Tunisia</Option>
          </OptionGroup>
        </SelectMenu>
      </Select>

      <button onClick={() => setAdd(!add)}>Add</button>
      <select defaultValue="Togo">
        <option value="Niger">Niger</option>
        <option value="Nigeria">Nigeria</option>
        <option value="Togo">Togo</option>
        <option value="Germany">Germany</option>
      </select>
    </Box>
  );
}

stories.add("Default", () => <SelectExample />);

const sample = [
  {
    id: 1,
    first_name: "Chester",
    last_name: "Simester",
    email: "csimester0@i2i.jp",
    gender: "Male",
    ip_address: "255.170.161.122",
  },
  {
    id: 2,
    first_name: "Spence",
    last_name: "Gladwish",
    email: "sgladwish1@360.cn",
    gender: "Male",
    ip_address: "118.185.61.71",
  },
  {
    id: 3,
    first_name: "Jules",
    last_name: "Nouch",
    email: "jnouch2@csmonitor.com",
    gender: "Male",
    ip_address: "43.250.193.221",
  },
  {
    id: 4,
    first_name: "Richmound",
    last_name: "Thurlbourne",
    email: "rthurlbourne3@narod.ru",
    gender: "Male",
    ip_address: "212.121.157.1",
  },
  {
    id: 5,
    first_name: "Ferrell",
    last_name: "Arnolds",
    email: "farnolds4@ucoz.ru",
    gender: "Male",
    ip_address: "141.31.77.184",
  },
  {
    id: 6,
    first_name: "Zora",
    last_name: "Barneveld",
    email: "zbarneveld5@japanpost.jp",
    gender: "Female",
    ip_address: "164.114.136.8",
  },
  {
    id: 7,
    first_name: "Cary",
    last_name: "Springthorp",
    email: "cspringthorp6@ask.com",
    gender: "Male",
    ip_address: "170.186.126.37",
  },
  {
    id: 8,
    first_name: "Dorey",
    last_name: "Zamorano",
    email: "dzamorano7@examiner.com",
    gender: "Male",
    ip_address: "138.237.80.24",
  },
  {
    id: 9,
    first_name: "Waylon",
    last_name: "Cabral",
    email: "wcabral8@craigslist.org",
    gender: "Male",
    ip_address: "226.251.165.249",
  },
  {
    id: 10,
    first_name: "Dew",
    last_name: "Balwin",
    email: "dbalwin9@mac.com",
    gender: "Male",
    ip_address: "205.29.28.190",
  },
  {
    id: 11,
    first_name: "Rheta",
    last_name: "Tayler",
    email: "rtaylera@wikia.com",
    gender: "Female",
    ip_address: "120.237.147.142",
  },
  {
    id: 12,
    first_name: "Jerad",
    last_name: "Ridhole",
    email: "jridholeb@ca.gov",
    gender: "Male",
    ip_address: "196.8.235.234",
  },
  {
    id: 13,
    first_name: "Sunny",
    last_name: "Speller",
    email: "sspellerc@qq.com",
    gender: "Female",
    ip_address: "52.54.199.156",
  },
  {
    id: 14,
    first_name: "Drona",
    last_name: "Guyot",
    email: "dguyotd@si.edu",
    gender: "Female",
    ip_address: "63.224.250.107",
  },
  {
    id: 15,
    first_name: "Murdoch",
    last_name: "Doorly",
    email: "mdoorlye@irs.gov",
    gender: "Male",
    ip_address: "211.189.0.230",
  },
  {
    id: 16,
    first_name: "Ludwig",
    last_name: "Nancekivell",
    email: "lnancekivellf@unicef.org",
    gender: "Male",
    ip_address: "161.214.247.174",
  },
  {
    id: 17,
    first_name: "Kaitlyn",
    last_name: "Walkden",
    email: "kwalkdeng@pcworld.com",
    gender: "Female",
    ip_address: "214.85.105.132",
  },
  {
    id: 18,
    first_name: "Brandy",
    last_name: "McAreavey",
    email: "bmcareaveyh@usnews.com",
    gender: "Male",
    ip_address: "51.2.180.55",
  },
  {
    id: 19,
    first_name: "Fey",
    last_name: "Fulloway",
    email: "ffullowayi@shinystat.com",
    gender: "Female",
    ip_address: "136.181.221.144",
  },
  {
    id: 20,
    first_name: "Stillmann",
    last_name: "Teffrey",
    email: "steffreyj@businesswire.com",
    gender: "Male",
    ip_address: "69.197.50.39",
  },
  {
    id: 21,
    first_name: "Bertina",
    last_name: "Bloyes",
    email: "bbloyesk@sphinn.com",
    gender: "Female",
    ip_address: "161.20.125.203",
  },
  {
    id: 22,
    first_name: "Moreen",
    last_name: "Denholm",
    email: "mdenholml@xing.com",
    gender: "Female",
    ip_address: "69.59.221.111",
  },
  {
    id: 23,
    first_name: "Christi",
    last_name: "Copp",
    email: "ccoppm@cmu.edu",
    gender: "Female",
    ip_address: "82.54.184.95",
  },
  {
    id: 24,
    first_name: "Jake",
    last_name: "Rebeiro",
    email: "jrebeiron@google.co.uk",
    gender: "Male",
    ip_address: "170.49.165.67",
  },
  {
    id: 25,
    first_name: "Dedra",
    last_name: "Buckston",
    email: "dbuckstono@buzzfeed.com",
    gender: "Female",
    ip_address: "186.228.27.88",
  },
  {
    id: 26,
    first_name: "Irwinn",
    last_name: "Rojahn",
    email: "irojahnp@examiner.com",
    gender: "Male",
    ip_address: "79.153.5.93",
  },
  {
    id: 27,
    first_name: "Theodore",
    last_name: "Granham",
    email: "tgranhamq@usgs.gov",
    gender: "Male",
    ip_address: "147.210.205.158",
  },
  {
    id: 28,
    first_name: "Corette",
    last_name: "Liversage",
    email: "cliversager@intel.com",
    gender: "Female",
    ip_address: "86.13.220.218",
  },
  {
    id: 29,
    first_name: "Moyra",
    last_name: "McLernon",
    email: "mmclernons@sohu.com",
    gender: "Female",
    ip_address: "99.90.170.16",
  },
  {
    id: 30,
    first_name: "Reynard",
    last_name: "Eary",
    email: "rearyt@indiatimes.com",
    gender: "Male",
    ip_address: "203.31.183.157",
  },
  {
    id: 31,
    first_name: "Georgi",
    last_name: "Patington",
    email: "gpatingtonu@ucoz.com",
    gender: "Male",
    ip_address: "241.88.252.250",
  },
  {
    id: 32,
    first_name: "Donavon",
    last_name: "Kew",
    email: "dkewv@hc360.com",
    gender: "Male",
    ip_address: "171.183.71.200",
  },
  {
    id: 33,
    first_name: "Eugenio",
    last_name: "Rouby",
    email: "eroubyw@acquirethisname.com",
    gender: "Male",
    ip_address: "205.221.231.139",
  },
  {
    id: 34,
    first_name: "Burke",
    last_name: "Smye",
    email: "bsmyex@eepurl.com",
    gender: "Male",
    ip_address: "217.86.204.147",
  },
  {
    id: 35,
    first_name: "Angeli",
    last_name: "Landy",
    email: "alandyy@weather.com",
    gender: "Male",
    ip_address: "97.104.227.102",
  },
  {
    id: 36,
    first_name: "Engelbert",
    last_name: "Greeves",
    email: "egreevesz@theglobeandmail.com",
    gender: "Male",
    ip_address: "73.78.222.237",
  },
  {
    id: 37,
    first_name: "Maryanne",
    last_name: "Atcherley",
    email: "matcherley10@naver.com",
    gender: "Female",
    ip_address: "204.5.174.77",
  },
  {
    id: 38,
    first_name: "Angelica",
    last_name: "Mantle",
    email: "amantle11@prweb.com",
    gender: "Female",
    ip_address: "231.181.38.3",
  },
  {
    id: 39,
    first_name: "Lona",
    last_name: "Carette",
    email: "lcarette12@globo.com",
    gender: "Female",
    ip_address: "117.208.220.54",
  },
  {
    id: 40,
    first_name: "Nicolle",
    last_name: "Reed",
    email: "nreed13@mail.ru",
    gender: "Female",
    ip_address: "185.239.222.164",
  },
  {
    id: 41,
    first_name: "Selina",
    last_name: "Veart",
    email: "sveart14@hexun.com",
    gender: "Female",
    ip_address: "79.5.107.136",
  },
  {
    id: 42,
    first_name: "Maxine",
    last_name: "Knightsbridge",
    email: "mknightsbridge15@epa.gov",
    gender: "Female",
    ip_address: "69.53.193.107",
  },
  {
    id: 43,
    first_name: "Jamal",
    last_name: "Tire",
    email: "jtire16@wordpress.com",
    gender: "Male",
    ip_address: "155.58.21.84",
  },
  {
    id: 44,
    first_name: "Huntlee",
    last_name: "Mockford",
    email: "hmockford17@squarespace.com",
    gender: "Male",
    ip_address: "255.149.50.216",
  },
  {
    id: 45,
    first_name: "Damita",
    last_name: "Morrell",
    email: "dmorrell18@blogspot.com",
    gender: "Female",
    ip_address: "29.168.61.35",
  },
  {
    id: 46,
    first_name: "Dari",
    last_name: "Zmitrovich",
    email: "dzmitrovich19@scientificamerican.com",
    gender: "Female",
    ip_address: "217.215.119.63",
  },
  {
    id: 47,
    first_name: "Stephannie",
    last_name: "Malzard",
    email: "smalzard1a@ustream.tv",
    gender: "Female",
    ip_address: "111.218.203.22",
  },
  {
    id: 48,
    first_name: "Daren",
    last_name: "Heilds",
    email: "dheilds1b@prweb.com",
    gender: "Male",
    ip_address: "188.66.61.171",
  },
  {
    id: 49,
    first_name: "Lisa",
    last_name: "Eastcott",
    email: "leastcott1c@cyberchimps.com",
    gender: "Female",
    ip_address: "27.196.87.25",
  },
  {
    id: 50,
    first_name: "Marcos",
    last_name: "Pahl",
    email: "mpahl1d@sfgate.com",
    gender: "Male",
    ip_address: "14.28.253.122",
  },
  {
    id: 51,
    first_name: "Danie",
    last_name: "Carwithen",
    email: "dcarwithen1e@gnu.org",
    gender: "Male",
    ip_address: "52.112.62.125",
  },
  {
    id: 52,
    first_name: "Sharron",
    last_name: "Trouncer",
    email: "strouncer1f@economist.com",
    gender: "Female",
    ip_address: "150.15.127.181",
  },
  {
    id: 53,
    first_name: "Stephen",
    last_name: "Dessaur",
    email: "sdessaur1g@angelfire.com",
    gender: "Male",
    ip_address: "224.14.94.195",
  },
  {
    id: 54,
    first_name: "Margeaux",
    last_name: "Gencke",
    email: "mgencke1h@delicious.com",
    gender: "Female",
    ip_address: "132.30.129.182",
  },
  {
    id: 55,
    first_name: "Sacha",
    last_name: "Leckie",
    email: "sleckie1i@tamu.edu",
    gender: "Female",
    ip_address: "195.110.197.148",
  },
  {
    id: 56,
    first_name: "Skipton",
    last_name: "Fanton",
    email: "sfanton1j@virginia.edu",
    gender: "Male",
    ip_address: "104.85.113.38",
  },
  {
    id: 57,
    first_name: "Gwenore",
    last_name: "Skepper",
    email: "gskepper1k@behance.net",
    gender: "Female",
    ip_address: "96.131.218.69",
  },
  {
    id: 58,
    first_name: "Kev",
    last_name: "Devin",
    email: "kdevin1l@ebay.com",
    gender: "Male",
    ip_address: "216.27.156.154",
  },
  {
    id: 59,
    first_name: "Troy",
    last_name: "McComiskie",
    email: "tmccomiskie1m@theguardian.com",
    gender: "Male",
    ip_address: "58.72.27.66",
  },
  {
    id: 60,
    first_name: "Arleyne",
    last_name: "Tull",
    email: "atull1n@over-blog.com",
    gender: "Female",
    ip_address: "32.227.221.20",
  },
  {
    id: 61,
    first_name: "Cyrillus",
    last_name: "Kayley",
    email: "ckayley1o@devhub.com",
    gender: "Male",
    ip_address: "188.232.10.99",
  },
  {
    id: 62,
    first_name: "Immanuel",
    last_name: "Saffen",
    email: "isaffen1p@posterous.com",
    gender: "Male",
    ip_address: "246.121.183.122",
  },
  {
    id: 63,
    first_name: "Marlon",
    last_name: "Ollerton",
    email: "mollerton1q@weibo.com",
    gender: "Male",
    ip_address: "154.155.164.182",
  },
  {
    id: 64,
    first_name: "Leonelle",
    last_name: "Rebanks",
    email: "lrebanks1r@hibu.com",
    gender: "Female",
    ip_address: "225.90.217.28",
  },
  {
    id: 65,
    first_name: "Beitris",
    last_name: "Sacker",
    email: "bsacker1s@artisteer.com",
    gender: "Female",
    ip_address: "219.70.118.97",
  },
  {
    id: 66,
    first_name: "Augy",
    last_name: "Curran",
    email: "acurran1t@scientificamerican.com",
    gender: "Male",
    ip_address: "18.232.85.56",
  },
  {
    id: 67,
    first_name: "Marleah",
    last_name: "Wennington",
    email: "mwennington1u@mediafire.com",
    gender: "Female",
    ip_address: "252.140.173.35",
  },
  {
    id: 68,
    first_name: "Theodore",
    last_name: "Hegg",
    email: "thegg1v@businessinsider.com",
    gender: "Male",
    ip_address: "17.18.10.223",
  },
  {
    id: 69,
    first_name: "Madelin",
    last_name: "Shirtcliffe",
    email: "mshirtcliffe1w@seattletimes.com",
    gender: "Female",
    ip_address: "235.29.57.119",
  },
  {
    id: 70,
    first_name: "Francis",
    last_name: "Kaysor",
    email: "fkaysor1x@stumbleupon.com",
    gender: "Male",
    ip_address: "123.32.85.32",
  },
  {
    id: 71,
    first_name: "Aurore",
    last_name: "Fairburn",
    email: "afairburn1y@yahoo.com",
    gender: "Female",
    ip_address: "2.203.95.199",
  },
  {
    id: 72,
    first_name: "Eduino",
    last_name: "Duchesne",
    email: "educhesne1z@jigsy.com",
    gender: "Male",
    ip_address: "19.21.108.249",
  },
  {
    id: 73,
    first_name: "Dunn",
    last_name: "Markham",
    email: "dmarkham20@tripadvisor.com",
    gender: "Male",
    ip_address: "245.163.135.28",
  },
  {
    id: 74,
    first_name: "Newton",
    last_name: "Khan",
    email: "nkhan21@bloglines.com",
    gender: "Male",
    ip_address: "217.93.214.107",
  },
  {
    id: 75,
    first_name: "Warner",
    last_name: "Ingarfield",
    email: "wingarfield22@pbs.org",
    gender: "Male",
    ip_address: "11.252.46.133",
  },
  {
    id: 76,
    first_name: "Marje",
    last_name: "Jimenez",
    email: "mjimenez23@skyrock.com",
    gender: "Female",
    ip_address: "114.172.79.191",
  },
  {
    id: 77,
    first_name: "Sherrie",
    last_name: "de Castelain",
    email: "sdecastelain24@flavors.me",
    gender: "Female",
    ip_address: "33.224.183.123",
  },
  {
    id: 78,
    first_name: "Sherline",
    last_name: "Vignaux",
    email: "svignaux25@telegraph.co.uk",
    gender: "Female",
    ip_address: "112.4.148.102",
  },
  {
    id: 79,
    first_name: "Bay",
    last_name: "Baud",
    email: "bbaud26@yellowpages.com",
    gender: "Male",
    ip_address: "86.115.246.132",
  },
  {
    id: 80,
    first_name: "Arlyne",
    last_name: "Pahlsson",
    email: "apahlsson27@adobe.com",
    gender: "Female",
    ip_address: "115.94.68.152",
  },
  {
    id: 81,
    first_name: "Wang",
    last_name: "Mullally",
    email: "wmullally28@live.com",
    gender: "Male",
    ip_address: "182.54.150.51",
  },
  {
    id: 82,
    first_name: "Lancelot",
    last_name: "Pitcaithly",
    email: "lpitcaithly29@blogger.com",
    gender: "Male",
    ip_address: "42.190.70.121",
  },
  {
    id: 83,
    first_name: "Danyelle",
    last_name: "Eatttok",
    email: "deatttok2a@gizmodo.com",
    gender: "Female",
    ip_address: "159.154.159.163",
  },
  {
    id: 84,
    first_name: "Claudius",
    last_name: "Sleigh",
    email: "csleigh2b@chron.com",
    gender: "Male",
    ip_address: "199.10.185.158",
  },
  {
    id: 85,
    first_name: "Randene",
    last_name: "Stivani",
    email: "rstivani2c@taobao.com",
    gender: "Female",
    ip_address: "184.68.222.160",
  },
  {
    id: 86,
    first_name: "Culley",
    last_name: "Merali",
    email: "cmerali2d@cbc.ca",
    gender: "Male",
    ip_address: "36.34.169.135",
  },
  {
    id: 87,
    first_name: "Hillary",
    last_name: "Fredson",
    email: "hfredson2e@infoseek.co.jp",
    gender: "Female",
    ip_address: "169.131.165.59",
  },
  {
    id: 88,
    first_name: "Peggy",
    last_name: "Heath",
    email: "pheath2f@google.com.br",
    gender: "Female",
    ip_address: "252.72.23.129",
  },
  {
    id: 89,
    first_name: "Rafaellle",
    last_name: "Mizzi",
    email: "rmizzi2g@va.gov",
    gender: "Male",
    ip_address: "66.105.52.120",
  },
  {
    id: 90,
    first_name: "Judy",
    last_name: "Childes",
    email: "jchildes2h@scribd.com",
    gender: "Female",
    ip_address: "159.135.113.239",
  },
  {
    id: 91,
    first_name: "Mayor",
    last_name: "Hinkens",
    email: "mhinkens2i@mail.ru",
    gender: "Male",
    ip_address: "40.162.175.183",
  },
  {
    id: 92,
    first_name: "Cad",
    last_name: "Haigh",
    email: "chaigh2j@europa.eu",
    gender: "Male",
    ip_address: "198.113.80.192",
  },
  {
    id: 93,
    first_name: "Deeann",
    last_name: "Cropton",
    email: "dcropton2k@oakley.com",
    gender: "Female",
    ip_address: "136.11.59.52",
  },
  {
    id: 94,
    first_name: "Erma",
    last_name: "O'Collopy",
    email: "eocollopy2l@about.me",
    gender: "Female",
    ip_address: "130.55.19.187",
  },
  {
    id: 95,
    first_name: "Giana",
    last_name: "Eilhersen",
    email: "geilhersen2m@fda.gov",
    gender: "Female",
    ip_address: "155.160.244.14",
  },
  {
    id: 96,
    first_name: "Blake",
    last_name: "Klewi",
    email: "bklewi2n@nature.com",
    gender: "Female",
    ip_address: "177.30.126.17",
  },
  {
    id: 97,
    first_name: "Lucita",
    last_name: "Breslau",
    email: "lbreslau2o@smugmug.com",
    gender: "Female",
    ip_address: "91.230.177.83",
  },
  {
    id: 98,
    first_name: "Thea",
    last_name: "Croney",
    email: "tcroney2p@hubpages.com",
    gender: "Female",
    ip_address: "26.168.236.200",
  },
  {
    id: 99,
    first_name: "Ulberto",
    last_name: "Revie",
    email: "urevie2q@slideshare.net",
    gender: "Male",
    ip_address: "22.188.2.20",
  },
  {
    id: 100,
    first_name: "Amble",
    last_name: "Hairon",
    email: "ahairon2r@dailymotion.com",
    gender: "Male",
    ip_address: "7.6.62.210",
  },
];

export function LotsExample() {
  const [val, setVal] = useState<React.ReactText>("Togo");
  return (
    <Box maxW="400px" mx="auto">
      <Select
        value={val}
        onChange={value => {
          setVal(value);
        }}
      >
        <SelectControl />
        <SelectMenu maxHeight="90vh" overflow="auto" width="auto">
          {sample.map(item => (
            <Option id={String(item.id)} value={item.email}>
              {item.email}
            </Option>
          ))}
        </SelectMenu>
      </Select>
    </Box>
  );
}

stories.add("perf: with many options", () => <LotsExample />);

function Item(props: any) {
  const { id, ref, isSelected, isHighlighted } = useSelectionItem(props);
  const { next, highlight } = props;
  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        highlight(id);
      }}
      style={{ background: isHighlighted ? "pink" : "white" }}
    >
      {props.children}
    </div>
  );
}

function Test() {
  const select = useSelectionState();
  useLogger(select.highlightedId);
  return (
    <div
      tabIndex={0}
      role="listbox"
      style={{ maxWidth: 400, padding: 40 }}
      onKeyDown={e => {
        e.preventDefault();
        // requestAnimationFrame(() => {
        // });
        select.next("highlight");
      }}
    >
      {sample.map(item => (
        <Item
          {...select}
          key={item.email}
          id={String(item.id)}
          value={item.email}
        >
          {item.email}
        </Item>
      ))}
    </div>
  );
}

stories.add("test2", () => <Test />);

import {
  getMergedPrs,
  getPrByNumber,
  getPrData,
  writePrFile,
  writeReadme,
  manifest,
  getLatestPr,
  PrData,
} from "./utils/changelog-utils"

async function sync() {
  const prs = await getMergedPrs()
  const data = prs.map(getPrData).filter(Boolean) as PrData[]
  await Promise.all([...data.map(writePrFile), manifest.write(data)])
  await writeReadme()
}

async function updateFiles(data: PrData) {
  await writePrFile(data)
  await manifest.update(data)
  await writeReadme()
}

async function syncByNumber(prNumber: number) {
  const data = getPrData(await getPrByNumber(prNumber))
  if (!data) return
  await updateFiles(data)
}

async function syncLatest() {
  const pr = await getLatestPr()
  const data = getPrData(pr)
  if (!data) return
  await updateFiles(data)
}

const arg = process.argv[2] ?? ""

if (arg.includes("--latest")) {
  syncLatest()
} else if (arg.includes("--number")) {
  const prNumber = +arg.replace("--number=", "")
  syncByNumber(prNumber)
} else {
  sync()
}

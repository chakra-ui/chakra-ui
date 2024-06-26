import path from 'path'
import fs from 'fs'

/**
 * Read the profile/bio of each member from `.all-membersrc` file
 * to avoid overfetching from Github
 */
export function getAllMembers() {
  const membersRcPath = path.resolve('.all-membersrc')
  const { members } = JSON.parse(fs.readFileSync(membersRcPath, 'utf-8'))
  return members
}

export function getMember(login: string) {
  return getAllMembers().find((member) => member.login === login)
}

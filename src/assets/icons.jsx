import { createIcon } from "@chakra-ui/icon";

export const PlusIcon = createIcon({
  displayName: 'PlusIcon',
  viewBox: '0 0 200 200',
  d: "M7.5 1v13M1 7.5h13"
})

export const UserIcon = () => {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15"><path d="M7.5 0a3.499 3.499 0 100 6.996A3.499 3.499 0 107.5 0zm-2 8.994a3.5 3.5 0 00-3.5 3.5v2.497h11v-2.497a3.5 3.5 0 00-3.5-3.5h-4z" fill="currentColor"></path></svg>
  )
}
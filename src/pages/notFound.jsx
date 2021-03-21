import { Box, Heading, Link } from "@chakra-ui/layout"
import {Link as RouterLink} from 'react-router-dom'

const NotFound = () => {
  return (
    <Box>
      <Heading mx='auto' as='h2'>404</Heading>
      <Heading mx='auto' as='h3'>Page Not Found</Heading>
      <Link mx='auto' as={RouterLink} to='/'>Go to home</Link>
    </Box>
  )
}

export default NotFound
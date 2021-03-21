import { Avatar } from "@chakra-ui/avatar"
import { Button, IconButton } from "@chakra-ui/react"
import { Image } from "@chakra-ui/image"
import { Flex } from "@chakra-ui/layout"
import { Box } from "@chakra-ui/layout"
import { useState } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

const EventBig = ({id, name, description, imgs, maxSlot, currSlot, user, startDate, isGoing, handleToggle}) => {

  const [currImg, setCurrImg] = useState(0)

  const handleCarousel = (isRight) => {
    if(isRight){
      if(currImg!==imgs.length-1){
        setCurrImg(currImg+1);
      }else{
        setCurrImg(0);
      }
    }else{
      if(currImg!==0){
        setCurrImg(currImg-1);
      }else{
        setCurrImg(imgs.length-1);
      }
    }
  }

  return(
    <Box w='800px' mx='auto' my='20px' borderRadius='10px'>
      <Flex color='gray.700' bg='gray.300' borderRadius='10px 10px 0 0' p='15px' alignItems='center' justifyContent='space-between'>
        <Box fontWeight='semibold' color='black' as={Link} to={'/event/' + id}>{name}</Box>
        <Flex alignItems='center'>
          <Box fontWeight='semibold' color='indigo'>{startDate}</Box>
          {isGoing ? 
          <Button px='5px' ml='15px' colorScheme='gray' color='black' onClick={()=>handleToggle(id)}><Box>CANCEL</Box></Button>:
          <Button w='70px' ml='15px' colorScheme='red' onClick={()=>handleToggle(id)}><Box>GO</Box></Button>
          }
          
        </Flex>
        
      </Flex>
      <Box bg='azure'>
        {(description) &&
          <Box p='15px'>
            {description}
          </Box>
        }
        {imgs && (
          <Box position='relative'>
            <Flex position='absolute' px='10px' w='full' h='full' justifyContent='space-between' alignItems='center'>
              <IconButton icon={<ChevronLeftIcon />} onClick={()=>handleCarousel(false)} />
              <IconButton icon={<ChevronRightIcon />} onClick={()=>handleCarousel(true)} />
            </Flex>
            <Image py='10px' mx='auto' maxH='300px' h='300px' src={imgs[currImg]}/>
          </Box>
        )}
      </Box>
      <Flex p='15px' bg='gray.700' color='white' borderRadius='0 0 10px 10px' justifyContent='space-between'>
        <Flex alignItems='center' gridGap='5px'>
          <Avatar size='xs' name={user.username} /> <Box pb='1px'>{user.username}</Box>
        </Flex>
        <Flex alignItems='center'>
          {currSlot===0 ? (
            <Box>Be the first to go!{maxSlot && ' (' + maxSlot + '  Max People)'}</Box>
          ) : (
            <Box>{currSlot}/{maxSlot} Going</Box>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default EventBig
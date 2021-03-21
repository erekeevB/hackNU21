import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { Input } from "@chakra-ui/input"
import { Box, Flex } from "@chakra-ui/layout"
import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSingleEventThunk, sendMessageThunk } from "../redux/event/reducer"
import { toggleEventGoThunk } from "../redux/events/reducer"

const SingleEvent = ({id}) => {

  const dispatch = useDispatch()

  const [msgInput, setMsgInput] = useState('')

  const {event: {messageGroup: {messages}, maxPeople, attendingPeople, ...event}, loading, error} = useSelector(state=>state.event)

  console.log(maxPeople)

  const {user: {id: username}, isAuth} = useSelector(state=>state.user)

  useLayoutEffect(()=>{
    dispatch(getSingleEventThunk(id))
  }, [])

  const handleChange = (e) => {
    setMsgInput(e.target.value)
  }

  const handleSend = () => {
    dispatch(sendMessageThunk({eventID: id, text: msgInput}))
    setMsgInput('')
  }

  const toggleEventGo = () => {
    dispatch(toggleEventGoThunk(id))
  }

  console.log(event)

  return (
    <Box mt='30px' w='800px' mx='auto'>
      <Box>
        <Flex justifyContent='space-between' alignItems='center'>
          <Box>
            <Flex alignItems='center'>
              <Avatar size='xs' name={event.ownerUser.username} />
              <Box ml='5px' pb='2px'>{event.ownerUser.username}</Box>
            </Flex>
            <Box fontSize='1.5rem' fontWeight='bold'>{event.name}</Box>
          </Box>
          <Box>
            <Flex justifyContent='end'>
              <Box fontWeight='semibold'>Start Date: {new Date(event.startDate).toLocaleDateString()}</Box>
            </Flex>
            <Flex justifyContent='end'>
              <Box>{attendingPeople.length}/{maxPeople}</Box>
            </Flex>
            {event.going ? 
            <>
              <Flex justifyContent='space-between' alignItems='center'>
                <Box>
                  You are going to attend this event!
                </Box>
                <Button ml='15px' px='5px' colorScheme='gray' color='black' onClick={toggleEventGo}>Cancel</Button>
              </Flex>
            </> : 
            <>
              <Flex mt='10px' justifyContent='space-between' alignItems='center'>
                <Box>
                  Attend event now!
                </Box>
                <Button ml='15px' w='70px' colorScheme='red' onClick={toggleEventGo}>GO</Button>
              </Flex>
            </>
          }</Box>
        </Flex>
        {event.description && <Box py='15px'>{event.description}</Box>}
      </Box>
      <Box>
        <Box font-size='1.2rem'>Messages</Box>
        <Box borderRadius='15px' bg='white' w='full' minH='150px' maxH='350px' overflow='scroll'>
          {(messages && messages.length > 0) ? messages.map((el)=>{
            return (
              <Flex key={el.id} alignItems='center'>
                {el.username !== username && <Flex alignItems='end'><Avatar size='sm' name={el.username} /></Flex>}
                <Box ml='5px'>{el.text}</Box>
                {el.sentDate && <Flex h='full' ml='5px' alignItems='end'><Box fontSize='0.7rem'>{new Date(el.sentDate).toLocaleDateString()}</Box></Flex>}
                {el.username === username && <Flex alignItems='end'><Avatar size='sm' name={el.username} /></Flex>}
              </Flex>
            )
          }) : null}
          <Flex>
            <Input value={msgInput} onChange={handleChange}/><Button onClick={handleSend}>Send</Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default SingleEvent
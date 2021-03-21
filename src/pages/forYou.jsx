import { Button } from "@chakra-ui/button"
import { CloseIcon } from "@chakra-ui/icons"
import { Input } from "@chakra-ui/input"
import { Badge, Box, Flex, Wrap, WrapItem } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/modal"
import { Spinner } from "@chakra-ui/spinner"
import { Tag, TagLabel, TagRightIcon } from "@chakra-ui/tag"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import EventBig from "../components/eventBig"
import EventInputSmall from "../components/eventInputSmall"
import { getEventsThunk } from "../redux/events/reducer"
import { setLoadingIdle, setPreferenceThunk } from "../redux/user/reducer"

const CustomModal = () => {

  const dispatch = useDispatch()
  const {user: {preferenceTags}, error, loading} = useSelector(state=>state.user)

  const [preferences, setPreferences] = useState((preferenceTags && preferenceTags.length > 0) ? preferenceTags : [])
  const [isOpen, setIsOpen] = useState(!(preferenceTags && preferenceTags.length > 0))
  const [inputValue, setInputValue] = useState('')

  useEffect(()=>{
    if(loading==='complete' && !error){
      dispatch(setLoadingIdle())
      setIsOpen(!(preferenceTags && preferenceTags.length > 0))
    }
  }, [loading, error, dispatch])

  const addTag = () => {
    setPreferences(prev=>[...prev.filter(el=>el!==inputValue), inputValue])
    setInputValue('')
  }
  const removeTag = (tag) => {
    setPreferences(prev=>prev.filter(el=>el!==tag))
  }

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(setPreferenceThunk(preferences))
  }

  return (
    <Modal isOpen={isOpen} >
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Box>
              Seems like you do not have any preferences set. Would you like to add some?
            </Box>
            <Box>
              <Wrap>
                {preferences.map((el, i)=>{
                  return (
                    <WrapItem key={i}>
                      <Badge variant="outline" colorScheme="green">{el} <CloseIcon onClick={()=>removeTag(el)} /></Badge>
                    </WrapItem>
                  )
                })}
              </Wrap>
            </Box>
            <Flex><Input value={inputValue} onChange={handleChange}/><Button onClick={()=>addTag()}>Add</Button></Flex>
            <Button onClick={handleSubmit}>Send</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
  )

}

const SearchInput = ({setSearchTags}) => {

  const dispatch = useDispatch()

  const [tags, setTags] = useState([])

  const [input, setInput] = useState('')

  const addTag = (values) => {
    setTags(prev=>[...prev.filter(el=>el!==input), input])
    setInput('')
  }

  const removeTag = (tag) => {
    setTags(prev=>prev.filter(el=>el!==tag))
  }

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  return (
    <Box mb='30px' w='800'>
      {(tags && tags.length > 0) && 
        <Wrap>
        {tags.map((el)=>{
        return (
          <WrapItem key={el}>
            <Tag size='md' variant="subtle" colorScheme="cyan">
              <TagLabel>{el}</TagLabel>
              <TagRightIcon boxSize="12px" as={CloseIcon} onClick={()=>removeTag(el)} />
            </Tag>
          </WrapItem>
        )})}
        </Wrap>
      }
      <Flex mt='10px'>
        <Input
          bg='white' 
          name='tag' 
          value={input} 
          onChange={handleChange}
          placeholder="Tags"
          _placeholder={{color: 'black'}}
        />
        <Button ml='5px' bg='gray.300' _hover={{bg: 'gray.400'}} onClick={()=>addTag(input)}>Add</Button>
        <Button ml='10px' bg='gray.300' _hover={{bg: 'gray.400'}} onClick={()=>dispatch(getEventsThunk(tags))}>Search</Button>
      </Flex>
    </Box>
  )

}

const ForYou = () => {

  const dispatch = useDispatch()
  const {user: {preferenceTags}, isAuth} = useSelector(state=>state.user)
  const {events, eventsLoading, createEventLoading, createEventError} = useSelector(state=>state.events)

  useEffect(()=>{
    dispatch(getEventsThunk(preferenceTags))
  }, [])

  return (
    <Box>
      {!isAuth ? 
      <Redirect to='/' /> :
      <>
      <SearchInput />
      <EventInputSmall />
      <CustomModal />
      {eventsLoading==='pending' ? 
        <Flex justifyContent='center' alignItems='center'>
          AAA
          <Spinner size='md'/>
        </Flex> 
        : 
        (events && events.length > 0) && events.map((event)=>{
          return (
            <EventBig
              isGoing={event.going}
              key={event.event_id}
              id={event.event_id}
              name={event.name} 
              description={event.description} 
              user={event.ownerUser} 
              maxSlot={event.maxPeople} 
              currSlot={event.goingPeopleSize}
              postedDate={event.postedDate}
              startDate={event.startDate}
            />
          )
      })}
      </>}
    </Box>
  )
}

export default ForYou
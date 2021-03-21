import { Box, Flex } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import { useEffect, useLayoutEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router"
import EventBig from "../components/eventBig"
import EventInputSmall from "../components/eventInputSmall"
import { getEventsThunk, setCreateEventLoadingIdle, toggleEventGoThunk } from "../redux/events/reducer"

const AllEvents = () => {

  const dispatch = useDispatch()
  const {isAuth} = useSelector(state=>state.user)
  const {events, eventsLoading, createEventLoading, createEventError} = useSelector(state=>state.events)

  useLayoutEffect(()=>{
    dispatch(getEventsThunk())
  }, [])

  useEffect(()=>{
    if(createEventLoading==='completed' && !createEventError){
      dispatch(setCreateEventLoadingIdle())
      dispatch(getEventsThunk())
    }
  }, [createEventLoading, createEventError])

  const handleToggle = (id) => {
    dispatch(toggleEventGoThunk(id))
  }

  return (
    <Box>
      {!isAuth ? 
      <Redirect to='/' /> :
      <> 
      <EventInputSmall />
      {eventsLoading==='pending' ? 
        <Flex justifyContent='center' alignItems='center'>
          AAA
          <Spinner size='md'/>
        </Flex> 
        : 
        (events && events.length > 0) && events.map((event)=>{
          return (
            <EventBig
              handleToggle={handleToggle}
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

export default AllEvents
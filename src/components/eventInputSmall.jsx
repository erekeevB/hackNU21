import { Avatar } from "@chakra-ui/avatar"
import { Button } from "@chakra-ui/button"
import { FormLabel } from "@chakra-ui/form-control"
import { CloseIcon } from "@chakra-ui/icons"
import { Input } from "@chakra-ui/input"
import { Box, Flex, Wrap, WrapItem } from "@chakra-ui/layout"
import { NumberInput, NumberInputField } from "@chakra-ui/number-input"
import { Tag, TagLabel, TagLeftIcon, TagRightIcon } from "@chakra-ui/tag"
import { Textarea } from "@chakra-ui/textarea"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createEventThunk } from "../redux/events/reducer"

const EventInputSmall = () => {

  const [currDate, setCurrDate] = useState(()=>{
    const date = new Date()
    return {
      date: date.getDate(),
      month: date.getMonth()+1,
      year: date.getFullYear()
    } 
  })

  const [tags, setTags] = useState([])

  const addTag = (values) => {
    setTags(prev=>[...prev.filter(el=>el!==values.tag), values.tag])
  }

  const removeTag = (tag) => {
    setTags(prev=>prev.filter(el=>el!==tag))
  }

  const {user: {username}} = useSelector(state=>state.user)

  const dispatch = useDispatch()

  const {values, handleSubmit, handleChange, handleBlur} = useFormik({
    initialValues: {
      name: '',
      description: '',
      startDate: {
        date: '',
        month: '',
        year: ''
      },
      maxPeople: '',
      tag: ''
    },
    validate: values=>{
      const errors = []
      if(!values.name){
        errors.name = 'Required!'
      }
      if(!values.tags){
        errors.tags = 'Required!'
      }
      if(!values.startDate.date || !values.startDate.month || !values.startDate.year){
        errors.startDate = 'Required!'
      }else if(
        (values.startDate.year < currDate.year)
        || (values.startDate.month < currDate.month) 
        || (values.startDate.date < currDate.date)
      ){
        errors.startDate = 'Date must be in future!'
      }
      if(!values.maxPeople){
        errors.maxPeople = 'Required!'
      }
      if(tags.length === 0){
        errors.tag = 'Required!'
      }
      return errors
    },
    onSubmit: values=>{
      let startDate = values.startDate.year + '-' + values.startDate.month + '-' + values.startDate.date
      dispatch(createEventThunk({...values, tags, startDate}))
    }
  })

  return (
    <Box bg='whiteAlpha.600' p='15px' borderRadius='10px' as='form' w='800px' mx='auto' onSubmit={handleSubmit}>
        <Flex w='full'>
          <Avatar mr='10px' size='md' name={username} />
          <Input mt='5px' w='full' bg='white'
            value={values.name}
            placeholder='Title'
            _placeholder={{color: 'black'}}
            name='name'
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Flex>
        <Textarea mt='10px' bg='white'
          value={values.description} 
          placeholder="Description"
          _placeholder={{color: 'black'}}
          name='description'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Box mt='10px'>
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
              value={values.tag} 
              onChange={handleChange} 
              onBlur={handleBlur}
              placeholder="Tags"
              _placeholder={{color: 'black'}}
            />
            <Button ml='5px' bg='gray.300' _hover={{bg: 'gray.400'}} onClick={()=>addTag(values)}>Add</Button>
          </Flex>
        </Box>
        <Flex justifyContent='end' mt='10px' justifyContent='space-between'>
          <Flex>
            <NumberInput 
              value={values.startDate.date}
              name='startDate.date'
            >
              <NumberInputField
                w='80px' bg='white' mr='10px'
                placeholder='Day'
                _placeholder={{color: 'black'}}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </NumberInput>
            <NumberInput 
              value={values.startDate.month}
              name='startDate.month'
            >
              <NumberInputField
                w='80px' bg='white' mr='10px'
                placeholder='Month'
                _placeholder={{color: 'black'}}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </NumberInput>
            <NumberInput 
              value={values.startDate.year}
              name='startDate.year'
            >
              <NumberInputField
                w='100px' bg='white'
                placeholder='Year'
                _placeholder={{color: 'black'}}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </NumberInput>
          </Flex>
          <NumberInput 
            value={values.maxPeople}
            name='maxPeople'
          >
            <NumberInputField
              bg='white'
              placeholder='Max People'
              _placeholder={{color: 'black'}}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </NumberInput>
          <Button bg='teal.300' _hover={{bg: 'teal.500'}} type='submit'>Add Event</Button>
        </Flex>
    </Box>
  )
}

export default EventInputSmall;

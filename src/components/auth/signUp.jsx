import { Button } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Box } from "@chakra-ui/layout"
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from "@chakra-ui/modal"
import { Radio, RadioGroup } from "@chakra-ui/radio"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLoadingIdle, signUpThunk } from "../../redux/user/reducer"

const SignUp = ({switchModal, closeModal}) => {

  const [showPassword, setShowPassword] = useState(false)
  const handleClick = () => setShowPassword(!showPassword)

  const [showGenderInput, setShowGenderInput] = useState(false)

  const dispatch = useDispatch()
  const {values, handleSubmit, handleChange, handleBlur} = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      gender: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
    validate: values=>{
      const errors = []
      if(!values.username){
        errors.username = 'Required!'
      }
      if(!values.firstName){
        errors.firstName = 'Required!'
      }
      if(!values.lastName){
        errors.lastName = 'Required!'
      }
      if(!values.password){
        errors.password = 'Required!'
      }
      if(!values.confirmPassword){
        errors.confirmPassword = 'Required!'
      }
      if(values.password !== values.confirmPassword){
        errors.confirmPassword = 'Passwords do not match!'
      }
      if(!values.city){
        errors.city = 'Required!'
      }
      if(!values.gender){
        errors.gender = 'Required!'
      }
      return errors
    },
    onSubmit: values=>{
      dispatch(signUpThunk(values))
    }
  })
  const {loading, error} = useSelector(state=>state.user)

  useEffect(()=>{
    if(loading==='completed' && !error){
      dispatch(setLoadingIdle())
      closeModal()
    }
  }, [loading, error, dispatch, closeModal])

  return (
    <Box>
      <ModalHeader>Sign Up</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit}>
        <InputGroup mb='10px'>
          <Input 
            mr='5px' 
            name='firstName' 
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            placeholder="first name" 
          />
          <Input 
            ml='5px' 
            name='lastName'
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            placeholder="last name" 
          />
        </InputGroup>
        <Input 
          mb='10px' 
          name='username'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          placeholder="username" 
        />
        <Input 
          mb='10px'
          name='city'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.city}
          placeholder="city" 
        />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            mb='10px'
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Input
          pr="4.5rem"
          mb='10px'
          type={showPassword ? "text" : "password"}
          placeholder="confirm password"
          name='confirmPassword'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <RadioGroup mb='10px' name="form-name">
          <Radio 
            ml='5px' 
            onChange={(e)=>{
              setShowGenderInput(false)
              handleChange(e)
            }}
            onBlur={handleBlur}
            name='gender' 
            value='female'
          >Female</Radio>
          <Radio 
            mr='5px' 
            ml='5px'
            onChange={(e)=>{
              setShowGenderInput(false)
              handleChange(e)
            }}
            onBlur={handleBlur}
            name='gender' 
            value='male'
          >Male</Radio>
          <Radio 
            mr='5px'
            onChange={(e)=>{
              setShowGenderInput(true)
              handleChange(e)
            }}
            onBlur={handleBlur}
            name='gender'
            value='other'
          >Other</Radio>
        </RadioGroup>
        <Input
          display = {showGenderInput ? 'block' : 'none'}
          mb='10px'
          name='gender'
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder='specify your gender here' 
        />
        <Button bg='purple.700' color='white' _hover={{bg:'purple.300'}} type='submit'>Sign Up</Button>
        </form>
      </ModalBody>

      <ModalFooter>
        <Box>Already have an account?{' '}</Box>
        <Box ml='5px' color='blue' cursor='pointer' onClick={switchModal}>Sign In</Box>
      </ModalFooter>
    </Box>
  )
}

export default SignUp;
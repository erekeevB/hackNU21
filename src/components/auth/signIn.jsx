import { Button } from "@chakra-ui/button"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input"
import { Box } from "@chakra-ui/layout"
import { ModalBody, ModalCloseButton, ModalFooter, ModalHeader } from "@chakra-ui/modal"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setLoadingIdle, signInThunk } from "../../redux/user/reducer"

const SignIn = ({switchModal, closeModal}) => {

  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const dispatch = useDispatch()
  const {values, handleSubmit, handleChange, handleBlur} = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: values=>{
      const errors = []
      if(!values.username){
        errors.username = 'Required!'
      }
      if(!values.password){
        errors.password = 'Required!'
      }
      return errors
    },
    onSubmit: values=>{
      dispatch(signInThunk(values))
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
      <ModalHeader>Sign In</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <form onSubmit={handleSubmit}>
        <Input 
          mb='10px' 
          placeholder="username" 
          value={values.username} 
          name='username'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <InputGroup mb='10px' size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            value={values.password}
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button bg='purple.700' color='white' _hover={{bg:'purple.300'}} type='submit'>Sign In</Button>
        </form>
      </ModalBody>

      <ModalFooter>
        <Box>Do not have an account?</Box>
        <Box ml='5px' color='blue' cursor='pointer' onClick={switchModal}>Sign Up</Box>
      </ModalFooter>
    </Box>
  )
}

export default SignIn;
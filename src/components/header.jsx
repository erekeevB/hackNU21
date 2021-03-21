import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuDivider, MenuItem, MenuList } from "@chakra-ui/menu";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { UserIcon } from "../assets/icons";
import { logoutThunk } from "../redux/user/reducer";
import SignIn from "./auth/signIn";
import SignUp from "./auth/signUp";

const Header = (props) => {

  const dispatch = useDispatch()

  const [isAuthOpen, setIsAuthOpen] = useState({
    isLogin: true,
    isOpen: false
  })

  const closeModal = useCallback(()=>setIsAuthOpen({isOpen: false, isLogin: false}), [])

  const {user: {username}, isAuth} = useSelector(state=>state.user)

  return (
    <header>
      <Flex {...props} h='60px' flex justifyContent='space-between' w='full' mx='auto' alignItems='center'>
        <Flex color='black' h='max' w='fit-content' fontSize='1.3rem' fontWeight='semibold'>
          <Link textAlign='center' color='black' textDecor='none' as={RouterLink} to='/'>
            eventure
          </Link>
        </Flex>
        <Flex gridGap='20px' alignItems='center'>
          <Link fontSize='1.1rem' color='black' as={RouterLink} to='/all'>All Events</Link>
          <Link fontSize='1.1rem' color='black' as={RouterLink} to='/foryou'>For You</Link>
          <Menu>
            <MenuButton w='40px' h='40px' bg='gray.300' borderRadius='md' color='gray'><Flex justifyContent='center' alignItems='center'><UserIcon /></Flex></MenuButton>
            <MenuList>
              {isAuth ? 
                <>
                <MenuItem onClick={()=>{/*history.push('/myaccount')*/}}>
                  <Avatar name={username} size='sm' />
                  <Box ml='10px'>{username}</Box>
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={()=>dispatch(logoutThunk())}>Logout</MenuItem>
                </>
                :
                <>
                <MenuItem onClick={()=>setIsAuthOpen({isOpen: true, isLogin: true})}>Login</MenuItem>
                <MenuItem onClick={()=>setIsAuthOpen({isOpen: true, isLogin: false})}>Register</MenuItem>
                <MenuDivider />
                <MenuItem>About Us</MenuItem>
                <MenuItem>FAQ</MenuItem>
                </>
              }
              
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      <Modal isOpen={isAuthOpen.isOpen} onClose={()=>setIsAuthOpen({isOpen: false, isLogin: false})}>
      <ModalOverlay />
      <ModalContent>
        {isAuthOpen.isLogin ? 
          <SignIn 
            switchModal={()=>setIsAuthOpen({isOpen: true, isLogin: false})} 
            closeModal={closeModal} 
          /> :
          <SignUp 
            switchModal={()=>setIsAuthOpen({isOpen: true, isLogin: true})} 
            closeModal={closeModal} 
          />
        }
      </ModalContent>
    </Modal>
    </header>
  )
}

export default Header;
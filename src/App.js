import { Box, Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import Header from "./components/header";
import ForYou from "./pages/forYou";
import { getUserThunk } from "./redux/user/reducer";
import NotFound from "./pages/notFound";
import Main from "./pages/main";
import AllEvents from "./pages/allEvents";
import SingleEvent from "./pages/signelEvent";


function App() {

  const dispatch = useDispatch()

  const {isInitialized} = useSelector(state=>state.user)

  useLayoutEffect(()=>{
    dispatch(getUserThunk())
  }, [])

	return (
		<div>
      {isInitialized ? 
      <Box minH='100vh' h='1000px'>
        <Header maxW='1200px' mx='auto'/>
        <Box bg='gray.200' pt='20px' h='1000px'>
          <Box maxW='1200px' mx='auto'>
            <Switch>
              <Route exact path='/' component={Main} />
              <Route exact path='/all' component={AllEvents} />
              <Route exact path='/foryou' component={ForYou} />
              <Route exact path='/event/:id' render={(match)=><SingleEvent id={match.match.params.id} />} />
              <Route path='*' component={NotFound} />
            </Switch>
          </Box>
        </Box>
      </Box>
      :
      <Flex minH='100vh' w='max' justifyContent='center' alignItems='center'>
        <Spinner mx='auto' size='lg' />
      </Flex>
      }
      
		</div>
	);
}

export default App;

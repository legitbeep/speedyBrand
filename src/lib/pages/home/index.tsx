'use client';
import { Flex, useEditable } from '@chakra-ui/react';
import ImageEditor from '~/lib/components/ImageEditor/ImageEditor';

import './home.css';
import { useEffect, useState } from 'react';
import LoginForm from '~/lib/components/auth/Login';
import SignupForm from '~/lib/components/auth/Signup';

const Home = () => {
  const [activeScreen, setActiveScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage?.getItem('isLoggedIn') || 'false')
  );

  useEffect(() => {
    setIsLoggedIn(
      JSON.parse(localStorage?.getItem('isLoggedIn') || 'false')
    )
  },[])
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      {isLoggedIn ? (
        <ImageEditor setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <>
          {activeScreen == 'login' ? (
            <LoginForm
              setActiveScreen={setActiveScreen}
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <SignupForm
              setActiveScreen={setActiveScreen}
              setIsLoggedIn={setIsLoggedIn}
            />
          )}
        </>
      )}
    </Flex>
  );
};

export default Home;

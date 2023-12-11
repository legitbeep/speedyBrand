import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  FormErrorMessage,
  Heading,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';

const LoginForm = ({ setIsLoggedIn, setActiveScreen }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve data from local storage
    const storedData = JSON.parse(localStorage.getItem('userData'));

    // Check if the stored data matches the login credentials
    if (
      storedData &&
      storedData.email === loginData.email &&
      storedData.password === loginData.password
    ) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', true);
      console.log('Login successful!', loginData);
    } else {
      setErrors({ res: 'Invalid email or password' });
    }
  };

  return (
    <Stack width={'100%'}>
      <Heading>Sign In</Heading>
      <form onSubmit={handleLogin} style={{ width: '100%' }}>
        <Stack spacing={6} width={'100%'} marginTop={8}>
          <FormControl isInvalid={!!errors.login}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.login}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.login}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.login}</FormErrorMessage>
          </FormControl>
          {errors.res && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{errors.res}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" colorScheme="blue">
            Log In
          </Button>
          <Link onClick={() => setActiveScreen('signup')}>
            Dont have an account ? Sign Up
          </Link>
        </Stack>
      </form>
    </Stack>
  );
};

export default LoginForm;

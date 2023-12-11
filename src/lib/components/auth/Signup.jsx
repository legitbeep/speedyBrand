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
} from '@chakra-ui/react';

const SignupForm = ({ setActiveScreen, setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    let errors = {};
    if (!formData.username) {
      errors.username = 'Username is required';
    }
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length === 0) {
      // Store data in local storage
      setIsLoggedIn(true);
      localStorage.setItem('userData', JSON.stringify(formData));
      localStorage.setItem('isLoggedIn', true);
      console.log('Signup successful!', formData);
    } else {
      setErrors(errors);
    }
  };

  return (
    <Stack width={'100%'}>
      <Heading>Sign Up</Heading>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack spacing={6} width={'100%'} marginTop={8}>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Sign Up
          </Button>
          <Link onClick={() => setActiveScreen('login')}>
            Already have an account ? Log In
          </Link>
        </Stack>
      </form>
    </Stack>
  );
};

export default SignupForm;

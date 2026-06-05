import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../schemas/authSchemas'
import { useToast } from '../../contexts/ToastContext'
import { useLogin } from '../../hooks/queries/useAuth'
import { useAuth } from '../../contexts/AuthContext'

import {
  LoginContainer,
  LoginCard,
  CardBody,
  BrandName,
  LoginTitle,
  LoginSubtitle,
  LoginForm,
  CardFooter,
  LinkSignup
} from './style'

import {
  InputGroup,
  InputError,
  BtnPrimaryFull
} from '../../components/common/styles/shared'

const Login = () => {
  const { showToast } = useToast()
  const navigate = useNavigate();
  // query hook
  const { mutate: login } = useLogin();
  // global context
  const { saveLoginData } = useAuth();

  // RHF
  const {
    formState: { errors, touchedFields: touched },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'all',
    defaultValues: { email: '', password: '' }
  })

  const onValidSubmit = (data) => {
    login(data, {
      onSuccess: (response) => {
        // guardar userData en localstorage
        saveLoginData(response.data)
        showToast(response.message)
        setTimeout(() => {
          navigate('/')
        }, 500)
      },
      onError: (error) => {
        showToast(error.response?.data?.message || 'Login failed')
        reset()
      }
    })
  }

  return (
    <LoginContainer>
      <LoginCard>
        <CardBody>
          <BrandName>STEEL</BrandName>

          <>
            <LoginTitle>Sign in to your account</LoginTitle>
            <LoginSubtitle>Welcome back! Please enter your details.</LoginSubtitle>

            <LoginForm onSubmit={handleSubmit(onValidSubmit)}>
              <InputGroup $hasError={touched.email && !!errors.email} $isValid={touched.email && !errors.email}>
                <label htmlFor="login-email">Email address</label>
                <input
                  type="email"
                  id="login-email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  {...register('email')}
                />
                {touched.email && errors.email && (
                  <InputError>{errors.email.message}</InputError>
                )}
              </InputGroup>

              <InputGroup $hasError={touched.password && !!errors.password} $isValid={touched.password && !errors.password}>
                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  {...register('password')}
                />
                {touched.password && errors.password && (
                  <InputError>{errors.password.message}</InputError>
                )}
              </InputGroup>

              <BtnPrimaryFull type="submit">Continue &rarr;</BtnPrimaryFull>
            </LoginForm>
          </>
        </CardBody>

        <CardFooter>
          <p>
            Don't have an account?{' '}
            <Link to={'/sign-up'}>
              <LinkSignup>Sign up</LinkSignup>
            </Link>
          </p>
        </CardFooter>
      </LoginCard>
    </LoginContainer>
  )
}

export default Login

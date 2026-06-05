import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '../../schemas/authSchemas'
import { useToast } from '../../contexts/ToastContext'
import { useRegister } from '../../hooks/queries/useAuth'
import { useNavigate } from 'react-router-dom'


import {
  LoginContainer,
  LoginCard,
  CardBody,
  BrandName,
  LoginTitle,
  LoginSubtitle,
  LoginForm,
  CardFooter,
  LinkSignup,
} from '../login/style'

import {
  InputGroup,
  FormRow,
  InputError,
  BtnPrimaryFull,
  SuccessBanner,
} from '../../components/common/styles/shared'



const SignUp = () => {
  const { showToast } = useToast()
  const [showSuccess, setShowSuccess] = useState(false)

  const navigate = useNavigate();
  // query hook
  const { mutate: registerMutation } = useRegister()

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields: touched },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: { name: '', lastName: '', email: '', password: '', confirmPassword: '' }
  })

  const onValidSubmit = (data) => {
    registerMutation(data, {
      onSuccess: (response) => {
        showToast(response.message)
        setTimeout(() => {
          navigate('/login')
        }, 500)
      },
      onError: (error) => {
        showToast(error.response?.data?.message || 'Registration failed')
        reset()
      },
    })
  }

  return (
    <LoginContainer>
      <LoginCard>
        <CardBody>
          <BrandName>STEEL</BrandName>

          {showSuccess ? (
            <SuccessBanner>
              <h3>Account created!</h3>
              <p>Welcome to STEEL.</p>
            </SuccessBanner>
          ) : (
            <>
              <LoginTitle>Create your account</LoginTitle>
              <LoginSubtitle>Welcome! Please enter your details.</LoginSubtitle>

              <LoginForm onSubmit={handleSubmit(onValidSubmit)}>


                <FormRow>
                  <InputGroup $hasError={touched.name && !!errors.name} $isValid={touched.name && !errors.name}>
                    <label htmlFor="signup-name">Name</label>
                    <input
                      type="text"
                      id="signup-name"
                      placeholder="Enter your name"
                      autoComplete="given-name"
                      {...register('name')}
                    />
                    {touched.name && errors.name && (
                      <InputError>{errors.name.message}</InputError>
                    )}
                  </InputGroup>

                  <InputGroup $hasError={touched.lastName && !!errors.lastName} $isValid={touched.lastName && !errors.lastName}>
                    <label htmlFor="signup-lastname">Last Name</label>
                    <input
                      type="text"
                      id="signup-lastname"
                      placeholder="Enter your last name"
                      autoComplete="family-name"
                      {...register('lastName')}
                    />
                    {touched.lastName && errors.lastName && (
                      <InputError>{errors.lastName.message}</InputError>
                    )}
                  </InputGroup>
                </FormRow>

                <InputGroup $hasError={touched.email && !!errors.email} $isValid={touched.email && !errors.email}>
                  <label htmlFor="signup-email">Email address</label>
                  <input
                    type="email"
                    id="signup-email"
                    placeholder="Enter your email address"
                    autoComplete="email"
                    {...register('email')}
                  />
                  {touched.email && errors.email && (
                    <InputError>{errors.email.message}</InputError>
                  )}
                </InputGroup>


                <InputGroup $hasError={touched.password && !!errors.password} $isValid={touched.password && !errors.password}>
                  <label htmlFor="signup-password">Password</label>
                  <input
                    type="password"
                    id="signup-password"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                    {...register('password')}
                  />
                  {touched.password && errors.password && (
                    <InputError>{errors.password.message}</InputError>
                  )}
                </InputGroup>

                <InputGroup $hasError={touched.confirmPassword && !!errors.confirmPassword} $isValid={touched.confirmPassword && !errors.confirmPassword}>
                  <label htmlFor="signup-confirm">Confirm your password</label>
                  <input
                    type="password"
                    id="signup-confirm"
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    {...register('confirmPassword')}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <InputError>{errors.confirmPassword.message}</InputError>
                  )}
                </InputGroup>

                <BtnPrimaryFull type="submit" disabled={registerMutation.isPending}>
                  {registerMutation.isPending ? 'Creating...' : 'Continue →'}
                </BtnPrimaryFull>
              </LoginForm>
            </>
          )}
        </CardBody>

        <CardFooter>
          <p>
            Already have an account?{' '}
            <Link to={'/login'}>
              <LinkSignup>Login</LinkSignup>
            </Link>
          </p>
        </CardFooter>
      </LoginCard>
    </LoginContainer>
  )
}

export default SignUp

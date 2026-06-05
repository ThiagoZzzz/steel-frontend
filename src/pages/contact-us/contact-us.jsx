import { useState } from 'react'
import { MapPinIcon, PhoneIcon } from '@phosphor-icons/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema } from '../../schemas/contactSchemas'
import { useToast } from '../../contexts/ToastContext'

import {
  ContactUsContainer,
  InfoColumn,
  ContactCard,
  InfoTitle,
  InfoText,
  InfoIcon,
  CardBody,
  BrandName,
  ContactSubtitle,
  ContactForm,
} from './style'

import {
  InputGroup,
  InputError,
  BtnPrimary,
  SuccessBanner,
} from '../../components/common/styles/shared'



const ContactUs = () => {
  const { showToast } = useToast()
  const [showSuccess, setShowSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields: touched },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: { name: '', lastname: '', email: '', message: '' }
  })

  const onValidSubmit = (data) => {
    setShowSuccess(true)
    showToast('Message sent successfully!')
    setTimeout(() => {
      setShowSuccess(false)
      reset()
    }, 2500)
  }

  return (
    <ContactUsContainer>
      <ContactCard>
        <InfoColumn>
          <InfoIcon>
            <MapPinIcon size={18} color="var(--gold)" weight="regular" />
          </InfoIcon>
          <div>
            <InfoTitle>Visit us</InfoTitle>
            <InfoText>Av. Catamarca 2501</InfoText>
          </div>
        </InfoColumn>

        <InfoColumn>
          <InfoIcon>
            <PhoneIcon size={18} color="var(--gold)" weight="regular" />
          </InfoIcon>
          <div>
            <InfoTitle>Chat with us</InfoTitle>
            <InfoText>+54 0926-7533</InfoText>
          </div>
        </InfoColumn>
      </ContactCard>

      <CardBody>
        <BrandName>CONTACT US</BrandName>
        <ContactSubtitle>Send us an email.</ContactSubtitle>

        {showSuccess ? (
          <SuccessBanner>
            <h3>Message sent!</h3>
            <p>We'll get back to you shortly.</p>
          </SuccessBanner>
        ) : (
          <ContactForm onSubmit={handleSubmit(onValidSubmit)}>
            <InputGroup $hasError={touched.name && !!errors.name} $isValid={touched.name && !errors.name}>
              <label htmlFor="contact-name">Name</label>
              <input
                type="text"
                id="contact-name"
                placeholder="Enter your name"
                {...register('name')}
              />
              {touched.name && errors.name && (
                <InputError>{errors.name.message}</InputError>
              )}
            </InputGroup>

            <InputGroup $hasError={touched.lastname && !!errors.lastname} $isValid={touched.lastname && !errors.lastname}>
              <label htmlFor="contact-lastname">Lastname</label>
              <input
                type="text"
                id="contact-lastname"
                placeholder="Enter your lastname"
                {...register('lastname')}
              />
              {touched.lastname && errors.lastname && (
                <InputError>{errors.lastname.message}</InputError>
              )}
            </InputGroup>

            <InputGroup $hasError={touched.email && !!errors.email} $isValid={touched.email && !errors.email}>
              <label htmlFor="contact-email">Email address</label>
              <input
                type="email"
                id="contact-email"
                placeholder="Enter your contact email"
                {...register('email')}
              />
              {touched.email && errors.email && (
                <InputError>{errors.email.message}</InputError>
              )}
            </InputGroup>

            <InputGroup $hasError={touched.message && !!errors.message} $isValid={touched.message && !errors.message}>
              <label htmlFor="contact-msg">Message</label>
              <textarea
                id="contact-msg"
                placeholder="Enter your message"
                {...register('message')}
              />
              {touched.message && errors.message && (
                <InputError>{errors.message.message}</InputError>
              )}
            </InputGroup>

            <BtnPrimary type="submit">Send &rarr;</BtnPrimary>
          </ContactForm>
        )}
      </CardBody>
    </ContactUsContainer>
  )
}

export default ContactUs

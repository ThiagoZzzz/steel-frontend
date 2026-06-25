import { Link, useNavigate } from 'react-router-dom'
import { XIcon, LockSimpleIcon } from '@phosphor-icons/react'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'
// form, schemas
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { billingDetailsSchema } from '../../schemas/checkoutSchemas'

import { useCreateOrder } from '../../hooks/queries/useOrders'
import {
  PageWrapper, PageHeader, Eyebrow,
  InputGroup, InputError, FormRow, EmptyState,
} from '../../components/common/styles/shared'
import { QtyBtn, QtyValue, QuantityRow } from '../../components/common/styles/layout'
import {
  CheckoutGrid, CheckoutColumn, ColumnTitle,
  CheckoutItemList, CheckoutItem, CheckoutItemImage,
  CheckoutItemInfo, CheckoutItemPrice, CheckoutItemRemove,
  TotalsBlock, TotalRow,
  BillingCard, SubmitBtn, SecureNotice,
} from './style'

const Checkout = () => {
  const { cartItems, subtotal, changeQuantity, removeFromCart, clearCart } = useCart()
  const isEmpty = cartItems.length === 0

  const { showToast } = useToast()
  const { mutate: orderMutation, isError } = useCreateOrder();
  const navigate = useNavigate();

  const {
    formState: { errors, touchedFields: touched, isDirty, isValid },
    register: register,
    handleSubmit: handleSubmit,
    reset: reset
  } = useForm({
    resolver: zodResolver(billingDetailsSchema),
    mode: 'all',
    defaultValues: { name: '', lastName: '', email: '', phone: '', address: '', city: '', postalCode: '', paymentMethod: '' }
  })

  const finishCheckout = (data) => {
    orderMutation({ billing_details: data, items: cartItems }, {
      onSuccess: (response) => {
        console.log(data)
        showToast(response.message || 'Finished your order. Thank you!')
        clearCart()
        navigate('/profile', { state: { currentTab: 'My Orders' } })
      },
      onError: (error) => showToast(error.message || 'Error trying to finish order. Please, try again.'),
      onSettled: () => reset()
    })
  }

  const disableSubmitButton = !isDirty || !isValid;

  return (
    <PageWrapper>
      <PageHeader>
        <Eyebrow>— Checkout</Eyebrow>
        <h1>Complete Your Order.</h1>
      </PageHeader>

      {isEmpty ? (
        <EmptyState>
          <h3>Your cart is empty</h3>
          <p>Add some timepieces to your collection before checking out.</p>
          <Link to="/products" style={{
            fontFamily: "'Jost', sans-serif",
            fontSize: '0.72rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--gold)',
            borderBottom: '1px solid var(--gold-border)',
            paddingBottom: '2px',
          }}>
            Browse Collection →
          </Link>
        </EmptyState>
      ) : (
        <CheckoutGrid>
          {/* ── Left column: Cart summary ── */}
          <CheckoutColumn>
            <ColumnTitle>Your Cart ({cartItems.length})</ColumnTitle>

            <CheckoutItemList>
              {cartItems.map((item) => (
                <CheckoutItem key={item.id}>
                  <CheckoutItemImage>
                    <img src={item.image} alt={item.name} />
                  </CheckoutItemImage>
                  <CheckoutItemInfo>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <QuantityRow style={{ marginTop: '0.4rem' }}>
                      <QtyBtn onClick={() => changeQuantity(item.id, -1)}>−</QtyBtn>
                      <QtyValue>{item.quantity}</QtyValue>
                      <QtyBtn onClick={() => changeQuantity(item.id, +1)}>+</QtyBtn>
                    </QuantityRow>
                  </CheckoutItemInfo>
                  <CheckoutItemPrice>${item.price * item.quantity}</CheckoutItemPrice>
                  <CheckoutItemRemove onClick={() => removeFromCart(item.id)}>
                    <XIcon size={16} />
                  </CheckoutItemRemove>
                </CheckoutItem>
              ))}
            </CheckoutItemList>

            <TotalsBlock>
              <TotalRow>
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </TotalRow>
              <TotalRow>
                <span>Shipping</span>
                <span>Free</span>
              </TotalRow>
              <TotalRow $isTotal>
                <span>Total</span>
                <span>${subtotal}</span>
              </TotalRow>
            </TotalsBlock>
          </CheckoutColumn>

          {/* ── Right column: Billing form ── */}
          <CheckoutColumn>
            <ColumnTitle>Billing Details</ColumnTitle>

            <BillingCard>
              <FormRow>
                <InputGroup $hasError={touched.name && !!errors.name} $isValid={touched.name && !errors.name}>
                  <label htmlFor="billing-firstname">First Name</label>
                  <input id="billing-firstname" {...register('name')} />
                  {touched.name && errors.name && (
                    <InputError>{errors.name.message}</InputError>
                  )}
                </InputGroup>
                <InputGroup $hasError={touched.lastName && !!errors.lastName} $isValid={touched.lastName && !errors.lastName}>
                  <label htmlFor="billing-lastname">Last Name</label>
                  <input id="billing-lastname" {...register('lastName')} />
                  {touched.lastName && errors.lastName && (
                    <InputError>{errors.lastName.message}</InputError>
                  )}
                </InputGroup>
              </FormRow>

              <InputGroup $hasError={touched.email && !!errors.email} $isValid={touched.email && !errors.email}>
                <label htmlFor="billing-email">Email</label>
                <input id="billing-email" type="email" {...register('email')} />
                {touched.email && errors.email && (
                  <InputError>{errors.email.message}</InputError>
                )}
              </InputGroup>

              <InputGroup $hasError={touched.phone && !!errors.phone} $isValid={touched.phone && !errors.phone}>
                <label htmlFor="billing-phone">Phone</label>
                <input id="billing-phone" type="text" {...register('phone')} />
                {touched.phone && errors.phone && (
                  <InputError>{errors.phone.message}</InputError>
                )}
              </InputGroup>

              <InputGroup $hasError={touched.address && !!errors.address} $isValid={touched.address && !errors.address}>
                <label htmlFor="billing-address">Address</label>
                <input id="billing-address" {...register('address')} />
                {touched.address && errors.address && (
                  <InputError>{errors.address.message}</InputError>
                )}
              </InputGroup>

              <FormRow>
                <InputGroup $hasError={touched.city && !!errors.city} $isValid={touched.city && !errors.city}>
                  <label htmlFor="billing-city">City</label>
                  <input id="billing-city" {...register('city')} />
                  {touched.city && errors.city && (
                    <InputError>{errors.city.message}</InputError>
                  )}
                </InputGroup>
                <InputGroup $hasError={touched.postalCode && !!errors.postalCode} $isValid={touched.postalCode && !errors.postalCode}>
                  <label htmlFor="billing-zip">Postal Code</label>
                  <input id="billing-zip" {...register('postalCode')} />
                  {touched.postalCode && errors.postalCode && (
                    <InputError>{errors.postalCode.message}</InputError>
                  )}
                </InputGroup>
              </FormRow>

              <InputGroup $hasError={touched.paymentMethod && !!errors.paymentMethod} $isValid={touched.paymentMethod && !errors.paymentMethod}>
                <label htmlFor="billing-payment-method">Payment Method</label>
                <select id="billing-payment-method" {...register('paymentMethod')}>
                  <option value="" disabled hidden>Select a payment method</option>

                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                  <option value="virtual_wallet">Virtual Wallet</option>
                </select>
                {touched.paymentMethod && errors.paymentMethod && (
                  <InputError>{errors.paymentMethod.message}</InputError>
                )}
              </InputGroup>

              <SubmitBtn onClick={handleSubmit(data => finishCheckout(data))} disabled={disableSubmitButton}>
                Confirm Order — ${subtotal}
              </SubmitBtn>

              <SecureNotice>
                <LockSimpleIcon size={12} />
                Secure checkout — no real payment will be processed
              </SecureNotice>
            </BillingCard>
          </CheckoutColumn>
        </CheckoutGrid>
      )}
    </PageWrapper>
  )
}

export default Checkout

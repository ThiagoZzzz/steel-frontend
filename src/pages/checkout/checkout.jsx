import { Link } from 'react-router-dom'
import { XIcon, LockSimpleIcon } from '@phosphor-icons/react'
import { useCart } from '../../contexts/CartContext'
import { useToast } from '../../contexts/ToastContext'
import { useCreateOrder } from '../../hooks/queries/useOrders'
import {
  PageWrapper, PageHeader, Eyebrow,
  InputGroup, FormRow, EmptyState,
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
  const { cartItems, subtotal, changeQuantity, removeFromCart } = useCart()
  const isEmpty = cartItems.length === 0

  const { mutate: orderMutation, isError } = useCreateOrder();

  const finishCheckout = () => {
    // TODO
    // if (isError) {
    //   useToast('Error trying to finish order. Please, try again.')  
    // }
    orderMutation(cartItems)
    useToast('Finished your order. Thank you!')
  }

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
                <InputGroup>
                  <label htmlFor="billing-firstname">First Name</label>
                  <input id="billing-firstname" />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="billing-lastname">Last Name</label>
                  <input id="billing-lastname" />
                </InputGroup>
              </FormRow>

              <InputGroup>
                <label htmlFor="billing-email">Email</label>
                <input id="billing-email" type="email" />
              </InputGroup>

              <InputGroup>
                <label htmlFor="billing-phone">Phone</label>
                <input id="billing-phone" />
              </InputGroup>

              <InputGroup>
                <label htmlFor="billing-address">Address</label>
                <input id="billing-address" />
              </InputGroup>

              <FormRow>
                <InputGroup>
                  <label htmlFor="billing-city">City</label>
                  <input id="billing-city" />
                </InputGroup>
                <InputGroup>
                  <label htmlFor="billing-zip">Postal Code</label>
                  <input id="billing-zip" />
                </InputGroup>
              </FormRow>

              <SubmitBtn onClick={() => finishCheckout()}>
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

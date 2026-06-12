import { useState, useEffect } from 'react'
import { CaretDownIcon, SignOutIcon } from '@phosphor-icons/react'
import {
  PageWrapper, PageHeader, Eyebrow,
  TabBar, TabButton, AvatarCircle, StatusBadge,
  InputGroup, BtnPrimary, EmptyState,
  InputError
} from '../../components/common/styles/shared'
import {
  ProfileHeaderCard, ProfileInfo, LogoutBtn,
  SectionCard, SectionTitle,
  OrdersList, OrderCard, OrderSummary,
  OrderId, OrderDate, OrderTotal, OrderChevron,
  OrderDetails, OrderItemRow, OrderItemName, OrderItemMeta,
} from './style'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileUpdateSchema, passwordUpdateSchema } from '../../schemas/authSchemas'

import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'
import { useUserOrders, useUserProfile, useUpdateUser } from '../../hooks/queries/useUsers'
import { useUpdatePassword } from '../../hooks/queries/useAuth'
import { useOrderItems } from '../../hooks/queries/useOrders'
import { useLogout } from '../../hooks/queries/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import Spinner from '../../components/common/Spinner'

const TABS = ['Profile', 'Password', 'My Orders']

/* ─── OrderRow Helper Component ─── */
const OrderRow = ({ order, isOpen, onToggle }) => {
  const [hasBeenOpened, setHasBeenOpened] = useState(false)

  if (isOpen && !hasBeenOpened) {
    setHasBeenOpened(true)
  }

  const { data: orderItems, isError, error } = useOrderItems(hasBeenOpened ? order.id : null)

  return (
    <OrderCard>
      <OrderSummary onClick={onToggle}>
        <OrderId>#{order.order_number}</OrderId>
        <OrderDate>{order.created_at?.slice(0, 10)}</OrderDate>
        <StatusBadge $status={order.state}>{order.state}</StatusBadge>
        <OrderTotal>${order.total}</OrderTotal>
        <OrderChevron $open={isOpen}>
          <CaretDownIcon size={16} />
        </OrderChevron>
      </OrderSummary>

      <OrderDetails $open={isOpen}>
        <div>
          {isError ? (
            <p style={{ color: '#e53e3e', fontSize: '0.82rem', padding: '1.5rem 1.5rem' }}>
              Error: {error.message}
            </p>
          ) : (
            orderItems?.map((item, idx) => (
              <OrderItemRow key={idx}>
                <OrderItemName>{item.product_name} × {item.quantity}</OrderItemName>
                <OrderItemMeta>${item.sub_total}</OrderItemMeta>
              </OrderItemRow>
            ))
          )}
        </div>
      </OrderDetails>
    </OrderCard>
  )
}

/* ─── Component ─── */
const UserProfile = ({ currentTab }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(location.state?.currentTab || currentTab || 'Profile')
  const [expandedOrder, setExpandedOrder] = useState(null)
  const { showToast } = useToast()

  useEffect(() => {
    if (location.state?.currentTab) {
      setActiveTab(location.state.currentTab)
    }
  }, [location.state?.currentTab])

  const toggleOrder = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id)
  }

  // user data 
  const { isAuthenticated, user, logout } = useAuth()
  const { mutate: logoutMutation } = useLogout()
  // profile
  const { data: profile, isPending: isPendingProfile, isError: isErrorProfile, error: errorProfile } = useUserProfile(user.id);
  const { mutate: updateUserMutation } = useUpdateUser()
  // password
  const { mutate: updatePasswordMutation, isPending: isPendingPassword } = useUpdatePassword();
  // orders
  const { data: orders, isPending: isPendingOrders, isError: isErrorOrders, error: errorOrders } = useUserOrders(user?.id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = () => {
    logoutMutation(undefined, {
      onSettled: () => logout(),
    })
  }

  const handleUpdateProfile = (data) => {
    updateUserMutation(
      { id: user.id, updateData: data },
      {
        onSuccess: (response) => {
          showToast(response.message)
        },
        onError: (error) => {
          showToast('Failed to update profile. Please try again.');
        },
        onSettled: () => {
          resetProfile()
        }
      });
  }

  const handleUpdatePassword = (data) => {
    updatePasswordMutation(
      { id: user.id, password: data.newPassword, confirmPassword: data.confirmNewPassword },
      {
        onSuccess: (response) => {
          showToast(response.message)
        },
        onError: (error) => {
          showToast('Failed to update password. Please try again.');
        },
        onSettled: () => {
          resetPassword()
        }
      });
  }

  // form profile
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, touchedFields: touchedProfile, dirtyFields: dirtyProfileFields },
    reset: resetProfile
  } = useForm({
    resolver: zodResolver(profileUpdateSchema),
    mode: 'all',
    defaultValues: { name: '', lastName: '' }
  })

  // form password
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, touchedFields: touchedPassword, dirtyFields: dirtyPasswordFields },
    reset: resetPassword
  } = useForm({
    resolver: zodResolver(passwordUpdateSchema),
    mode: 'all',
    defaultValues: { currentPassword: '', newPassword: '', confirmNewPassword: '' }
  })

  // Sincronizar defaultValues del formulario cuando llega la data del perfil
  useEffect(() => {
    if (profile) {
      resetProfile({ name: profile.name, lastName: profile.last_name })
    }
  }, [profile, resetProfile])


  if (isPendingProfile || isPendingOrders) {
    return (
      <PageWrapper style={{ justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Spinner size="40px" />
      </PageWrapper>
    )
  }
  if (isErrorProfile || isErrorOrders) return <p>Error: {errorProfile?.message || errorOrders?.message}</p>

  return (
    <PageWrapper>
      <PageHeader>
        <Eyebrow>— My Account</Eyebrow>
        <h1>Welcome back.</h1>
      </PageHeader>

      <ProfileHeaderCard>
        <AvatarCircle $size="56px">
          <span>{profile.name.charAt(0)}</span>
        </AvatarCircle>
        <ProfileInfo>
          <h2>{profile.name} {profile.last_name}</h2>
          <p>{profile.email}</p>
        </ProfileInfo>
        <LogoutBtn onClick={handleLogout} aria-label="Sign out" id="profile-logout-btn">
          <SignOutIcon size={15} weight="regular" />
          Sign Out
        </LogoutBtn>
      </ProfileHeaderCard>

      <TabBar>
        {TABS.map((tab) => (
          <TabButton key={tab} $active={tab === activeTab} onClick={() => setActiveTab(tab)}>
            {tab}
          </TabButton>
        ))}
      </TabBar>

      {/* ── Profile Section ── */}
      {activeTab === 'Profile' && (
        <SectionCard>
          <SectionTitle>Personal Information</SectionTitle>

          <InputGroup $hasError={touchedProfile.name && !!profileErrors.name} $isValid={touchedProfile.name && !profileErrors.name} >
            <label htmlFor="profile-firstname">First Name</label>
            <input id="profile-firstname" placeholder="First name" {...registerProfile('name')} />
            {touchedProfile.name && profileErrors.name && (
              <InputError>{profileErrors.name.message}</InputError>
            )}
          </InputGroup>

          <InputGroup $hasError={touchedProfile.lastName && !!profileErrors.lastName} $isValid={touchedProfile.lastName && !profileErrors.lastName} >
            <label htmlFor="profile-lastname">Last Name</label>
            <input id="profile-lastname" placeholder="Last name" {...registerProfile('lastName')} />
            {touchedProfile.lastName && profileErrors.lastName && (
              <InputError>{profileErrors.lastName.message}</InputError>
            )}
          </InputGroup>

          <InputGroup>
            <label htmlFor="profile-email">Email</label>
            <input id="profile-email" defaultValue={profile.email} disabled style={{ opacity: 0.5 }} />
          </InputGroup>

          <BtnPrimary style={{ marginTop: '0.5rem' }} disabled={(!dirtyProfileFields.name && !dirtyProfileFields.lastName) || profileErrors.name || profileErrors.lastName} onClick={handleSubmitProfile(data => handleUpdateProfile(data))}>Save Changes</BtnPrimary>
        </SectionCard>
      )}

      {/* ── Password Section ── */}
      {activeTab === 'Password' && (
        <SectionCard>
          <SectionTitle>Change Password</SectionTitle>

          <InputGroup $hasError={touchedPassword.currentPassword && !!passwordErrors.currentPassword} $isValid={touchedPassword.currentPassword && !passwordErrors.currentPassword}>
            <label htmlFor="pw-current">Current Password</label>
            <input id="pw-current" type="password" placeholder="Enter current password" {...registerPassword('currentPassword')} />
            {touchedPassword.currentPassword && passwordErrors.currentPassword && (
              <InputError>{passwordErrors.currentPassword.message}</InputError>
            )}
          </InputGroup>

          <InputGroup $hasError={touchedPassword.newPassword && !!passwordErrors.newPassword} $isValid={touchedPassword.newPassword && !passwordErrors.newPassword}>
            <label htmlFor="pw-new">New Password</label>
            <input id="pw-new" type="password" placeholder="Enter new password" {...registerPassword('newPassword')} />
            {touchedPassword.newPassword && passwordErrors.newPassword && (
              <InputError>{passwordErrors.newPassword.message}</InputError>
            )}
          </InputGroup>

          <InputGroup $hasError={touchedPassword.confirmNewPassword && !!passwordErrors.confirmNewPassword} $isValid={touchedPassword.confirmNewPassword && !passwordErrors.confirmNewPassword}>
            <label htmlFor="pw-confirm">Confirm New Password</label>
            <input id="pw-confirm" type="password" placeholder="Repeat new password" {...registerPassword('confirmNewPassword')} />
            {touchedPassword.confirmNewPassword && passwordErrors.confirmNewPassword && (
              <InputError>{passwordErrors.confirmNewPassword.message}</InputError>
            )}
          </InputGroup>

          <BtnPrimary style={{ marginTop: '0.5rem' }} disabled={!dirtyPasswordFields.newPassword || !dirtyPasswordFields.confirmNewPassword || isPendingPassword || Object.keys(passwordErrors).length > 0} onClick={handleSubmitPassword(data => handleUpdatePassword(data))}> {isPendingPassword ? 'Updating...' : 'Update Password'}</BtnPrimary>
        </SectionCard>
      )}

      {/* ── My Orders Section ── */}
      {activeTab === 'My Orders' && (
        <>
          {orders.length === 0 ? (
            <EmptyState>
              <h3>No orders yet</h3>
              <p>Start exploring our collection to place your first order.</p>
            </EmptyState>
          ) : (
            <OrdersList>
              {console.log(orders)}
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  isOpen={expandedOrder === order.id}
                  onToggle={() => toggleOrder(order.id)}
                />
              ))}
            </OrdersList>
          )}
        </>
      )}
    </PageWrapper>
  )
}

export default UserProfile

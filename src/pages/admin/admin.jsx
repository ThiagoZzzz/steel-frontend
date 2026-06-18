import { useState, useEffect } from 'react'
import { XIcon, UploadSimpleIcon, TrashIcon } from '@phosphor-icons/react'
import {
  PageWrapper, PageHeader, Eyebrow,
  TabBar, TabButton,
  DataTable, TableHead, TableBody,
  ActionBtn, ActionGroup,
  StatusBadge, AvatarCircle,
  ModalOverlay, ModalBox, ModalTitle, ModalCloseBtn, ModalActions,
  InputGroup, FormRow, BtnPrimary, BtnSecondary, EmptyState,
  InputError,
} from '../../components/common/styles/shared'
import {
  AdminGrid, StatCard, ToolbarRow, SearchInput,
  TableResponsive, AdminProductGrid, AdminProductCard,
  AdminCardImage, AdminCardBody, AdminCardActions,
  StatusSelect,
  UploadZone, UploadPreviewContainer, UploadPreviewThumb, UploadPreviewInfo, UploadClearBtn,
  DetailGrid, DetailSectionTitle, DetailList, DetailItem, DetailLabel, DetailValue,
  CheckboxGroup, CheckboxLabel,
} from './style'
import OrdersSkeleton from '../../components/skeletons/OrdersSkeleton'

// form, schemas
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, updateOrderSchema } from '../../schemas/adminSchemas'

// Query hooks
import { useUsers, useDeleteUser, useUpdateUserRole, useRevokeUserRole } from '../../hooks/queries/useUsers'
import { useProducts, useDeleteProduct, useCreateProduct, useUpdateProduct } from '../../hooks/queries/useProducts'
import { useOrders, useDeleteOrder, useUpdateOrder } from '../../hooks/queries/useOrders'

// Toast
import { useToast } from '../../contexts/ToastContext'

const TABS = ['Users', 'Products', 'Orders']

// ─ Debounce hook ────────────────────────────────────────────
function useDebounce(value, delay = 350) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

/* ─── Component ─── */
const Admin = () => {
  const [activeTab, setActiveTab] = useState('Users')
  const [showProductModal, setShowProductModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingOrder, setEditingOrder] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [selectedRole, setSelectedRole] = useState('user')
  const [confirmDelete, setConfirmDelete] = useState(null)

  // ─ Search inputs (raw, con debounce) ─
  const [userSearch, setUserSearch] = useState('')
  const [productSearch, setProductSearch] = useState('')
  const [orderSearch, setOrderSearch] = useState('')

  // ─ Order filters ─
  const [orderState, setOrderState] = useState('')
  const [orderPayment, setOrderPayment] = useState('')

  const debouncedUserSearch = useDebounce(userSearch)
  const debouncedProductSearch = useDebounce(productSearch)
  const debouncedOrderSearch = useDebounce(orderSearch)

  const { showToast } = useToast()

  // ─ Params por entidad ─
  const usersParams = {}
  if (debouncedUserSearch) usersParams.search = debouncedUserSearch

  const productsParams = {}
  if (debouncedProductSearch) productsParams.search = debouncedProductSearch

  const ordersParams = {}
  if (debouncedOrderSearch) ordersParams.search = debouncedOrderSearch
  if (orderState) ordersParams.state = orderState
  if (orderPayment) ordersParams.payment_method = orderPayment

  // ── Query hooks ──
  const { data: usersData, isPending: isPendingUsers } = useUsers(usersParams);
  const { data: productsData, isPending: isPendingProducts } = useProducts(productsParams);
  const { data: ordersData, isPending: isPendingOrders } = useOrders(ordersParams);

  // Extraer arrays y meta
  const users = usersData?.users ?? []
  const products = productsData?.products ?? []
  const orders = ordersData?.orders ?? []
  const usersMeta = usersData?.meta ?? {}
  const productsMeta = productsData?.meta ?? {}
  const ordersMeta = ordersData?.meta ?? {}

  // ── Mutations ──
  // Users
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: updateUserRoleMutation } = useUpdateUserRole();
  const { mutate: revokeUserRoleMutation } = useRevokeUserRole();
  // Products
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: createProductMutation, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProductMutation, isPending: isUpdating } = useUpdateProduct();
  // Orders
  const { mutate: deleteOrder } = useDeleteOrder();
  const { mutate: updateOrderMutation } = useUpdateOrder();

  // ── RHF: Product Form ──
  const {
    register: registerProduct,
    handleSubmit: handleSubmitProduct,
    formState: { errors: productErrors, touchedFields: touchedProduct, isDirty: isDirtyProduct, isValid: isValidProduct },
    reset: resetProduct,
    watch: watchProduct,
    setValue: setValueProduct,
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: 'all',
    defaultValues: { name: '', description: '', price: '', stock: '', category: '', image: null, discount: false, featured: false }
  })

  const selectedImage = watchProduct('image')
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (selectedImage && selectedImage[0] instanceof File) {
      const url = URL.createObjectURL(selectedImage[0])
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [selectedImage])


  // ── RHF: Order Form ──
  const {
    register: registerOrder,
    handleSubmit: handleSubmitOrder,
    reset: resetOrder,
    formState: { errors: orderErrors, touchedFields: touchedOrder, isDirty: isDirtyOrder, isValid: isValidOrder },
  } = useForm({
    resolver: zodResolver(updateOrderSchema),
    mode: 'all',
    defaultValues: {
      state: 'pending',
      billing_details: {
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
      }
    }
  })

  useEffect(() => {
    if (editingProduct) {
      resetProduct({
        name: editingProduct.name || '',
        description: editingProduct.description || '',
        price: editingProduct.price || '',
        stock: editingProduct.stock || '',
        category: editingProduct.category || '',
        image: null,
        discount: editingProduct.discount ?? false,
        featured: editingProduct.featured ?? false,
      })
    }
  }, [editingProduct, resetProduct])

  useEffect(() => {
    if (editingOrder) {
      resetOrder({
        state: editingOrder.state || 'pending',
        billing_details: {
          name: editingOrder.billing_details?.name || '',
          lastName: editingOrder.billing_details?.lastName || '',
          email: editingOrder.billing_details?.email || '',
          phone: editingOrder.billing_details?.phone || '',
          address: editingOrder.billing_details?.address || '',
          city: editingOrder.billing_details?.city || '',
          postalCode: editingOrder.billing_details?.postalCode || '',
        }
      })
    }
  }, [editingOrder, resetOrder])

  // ── Product Modal helpers ──
  const openCreateProduct = () => {
    setEditingProduct(null)
    resetProduct({ name: '', description: '', price: '', stock: '', category: '', image: null, discount: false, featured: false })
    setShowProductModal(true)
  }
  const openEditProduct = (p) => { setEditingProduct(p); setShowProductModal(true) }
  const closeProductModal = () => { setShowProductModal(false); setEditingProduct(null); resetProduct() }

  // ── Order Modal helpers ──
  const openEditOrder = (order) => { setEditingOrder(order); setShowOrderModal(true) }
  const closeOrderModal = () => { setShowOrderModal(false); setEditingOrder(null); resetOrder() }

  // ── Role Modal helpers ──
  const openEditRole = (user) => { setEditingUser(user); setSelectedRole('user'); setShowRoleModal(true) }
  const closeRoleModal = () => { setShowRoleModal(false); setEditingUser(null); setSelectedRole('user') }

  // ── Handlers ──
  const handleProductSubmit = (data) => {
    // formData para multer
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    if (data.stock !== undefined && data.stock !== '') formData.append('stock', data.stock)
    if (data.description) formData.append('description', data.description)
    if (data.category) formData.append('category', data.category)
    if (data.image?.[0]) formData.append('image', data.image[0])
    formData.append('discount', data.discount ?? false)
    formData.append('featured', data.featured ?? false)

    if (editingProduct) {
      updateProductMutation(
        { id: editingProduct.id, updateData: formData },
        {
          onSuccess: (response) => showToast(response.message || 'Product updated'),
          onError: (error) => showToast('Error updating product'),
          onSettled: () => closeProductModal(),
        }
      )
    } else {
      createProductMutation(formData, {
        onSuccess: (response) => showToast(response.message || 'Product created'),
        onError: (error) => showToast('Error creating product'),
        onSettled: () => closeProductModal(),
      })
    }
  }

  const handleOrderSubmit = (data) => {
    updateOrderMutation(
      { id: editingOrder.id, updateData: data },
      {
        onSuccess: (response) => showToast(response.message || 'Order updated'),
        onError: (error) => showToast('Error updating order'),
        onSettled: () => closeOrderModal(),
      }
    )
  }

  const handleOrderStatusInline = (orderId, newState) => {
    updateOrderMutation(
      { id: orderId, updateData: { state: newState } },
      {
        onSuccess: (response) => showToast(response.message || 'Status updated'),
        onError: (error) => showToast('Error updating status'),
      }
    )
  }

  const handleAssignRole = () => {
    if (!editingUser || editingUser.roles.includes(selectedRole)) {
      showToast('User already has this role')
      return
    }
    updateUserRoleMutation(
      { id: editingUser.id, role: selectedRole },
      {
        onSuccess: (response) => showToast(response.message || 'Role assigned'),
        onError: (error) => showToast('Error assigning role'),
        onSettled: () => closeRoleModal(),
      }
    )
  }

  const handleRevokeRole = () => {
    if (!editingUser || !editingUser.roles.includes(selectedRole)) {
      showToast('User does not have this role')
      return
    }
    revokeUserRoleMutation(
      { id: editingUser.id, role: selectedRole },
      {
        onSuccess: (response) => showToast(response.message || 'Role revoked'),
        onError: (error) => showToast('Error revoking role'),
        onSettled: () => closeRoleModal(),
      }
    )
  }

  const handleConfirmDelete = () => {
    const callbacks = {
      onSuccess: (response) => showToast(response.message || 'Deleted successfully'),
      onError: (error) => showToast('Error deleting'),
      onSettled: () => setConfirmDelete(null),
    }

    if (confirmDelete.type === 'user') deleteUser(confirmDelete.id, callbacks)
    if (confirmDelete.type === 'product') deleteProduct(confirmDelete.id, callbacks)
    if (confirmDelete.type === 'order') deleteOrder(confirmDelete.id, callbacks)
  }

  if (isPendingUsers || isPendingProducts || isPendingOrders) return <OrdersSkeleton />
  return (
    <PageWrapper>
      <PageHeader>
        <Eyebrow>— Control Panel</Eyebrow>
        <h1>Admin Dashboard</h1>
        <p>Manage your store</p>
      </PageHeader>

      <AdminGrid>
        <StatCard>
          <span>Total Users</span>
          <h2>{usersMeta.total ?? users.length}</h2>
        </StatCard>
        <StatCard>
          <span>Products</span>
          <h2>{productsMeta.total ?? products.length}</h2>
        </StatCard>
        <StatCard>
          <span>Orders</span>
          <h2>{ordersMeta.total ?? orders.length}</h2>
        </StatCard>
      </AdminGrid>

      <TabBar>
        {TABS.map((tab) => (
          <TabButton key={tab} $active={tab === activeTab} onClick={() => setActiveTab(tab)}>
            {tab}
          </TabButton>
        ))}
      </TabBar>

      {/* ── Users Section ── */}
      {activeTab === 'Users' && (
        <>
          <ToolbarRow>
            <SearchInput
              placeholder="Search users by name, last name or email…"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </ToolbarRow>

          <TableResponsive>
            <DataTable>
              <TableHead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th>Actions</th>
                </tr>
              </TableHead>
              <TableBody>
                {users
                  .map((user) => (
                    <tr key={user.id}>
                      <td>
                        <AvatarCircle $size="32px">
                          <span>{user.name.charAt(0)}</span>
                        </AvatarCircle>
                      </td>
                      <td>{user.name}</td>
                      <td style={{ color: 'var(--text-dim)' }}>{user.email}</td>
                      <td>
                        {user.roles.map((r) => (
                          <StatusBadge key={r} $status={r}>
                            {r}
                          </StatusBadge>
                        ))}
                      </td>
                      <td>
                        <ActionGroup>
                          <ActionBtn onClick={() => openEditRole(user)}>Edit Role</ActionBtn>
                          <ActionBtn $variant="danger" onClick={() => setConfirmDelete({ type: 'user', id: user.id, name: user.name })}>
                            Delete
                          </ActionBtn>
                        </ActionGroup>
                      </td>
                    </tr>
                  ))}
              </TableBody>
            </DataTable>
          </TableResponsive>
        </>
      )}

      {/* ── Products Section ── */}
      {activeTab === 'Products' && (
        <>
          <ToolbarRow>
            <SearchInput
              placeholder="Search products…"
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
            />
            <BtnPrimary onClick={openCreateProduct}>+ Add Product</BtnPrimary>
          </ToolbarRow>

          <AdminProductGrid>
            {products
              .map((product) => (
                <AdminProductCard key={product.id}>
                  <AdminCardImage>
                    <img src={product.image} alt={product.name} />
                  </AdminCardImage>
                  <AdminCardBody>
                    <h4>{product.name}</h4>
                    <p>{product.description}</p>
                    <span className="price">${product.price}</span>
                  </AdminCardBody>
                  <AdminCardActions>
                    <ActionBtn onClick={() => openEditProduct(product)}>Edit</ActionBtn>
                    <ActionBtn $variant="danger" onClick={() => setConfirmDelete({ type: 'product', id: product.id, name: product.name })}>
                      Delete
                    </ActionBtn>
                  </AdminCardActions>
                </AdminProductCard>
              ))}
          </AdminProductGrid>
        </>
      )}

      {/* ── Orders Section ── */}
      {activeTab === 'Orders' && (
        <>
          <ToolbarRow>
            <SearchInput
              placeholder="Filter by customer email…"
              value={orderSearch}
              onChange={(e) => setOrderSearch(e.target.value)}
            />
            <StatusSelect
              value={orderState}
              onChange={(e) => setOrderState(e.target.value)}
              aria-label="Filter by status"
            >
              <option value="">All statuses</option>
              <option value="pending">Pending</option>
              <option value="ready">Ready</option>
              <option value="cancel">Cancelled</option>
            </StatusSelect>
            <StatusSelect
              value={orderPayment}
              onChange={(e) => setOrderPayment(e.target.value)}
              aria-label="Filter by payment"
            >
              <option value="">All payments</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="virtual_wallet">Virtual Wallet</option>
            </StatusSelect>
          </ToolbarRow>
          <TableResponsive>
            <DataTable>
              <TableHead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td style={{ color: 'var(--gold)', fontWeight: 500 }}>#{order.order_number || order.id}</td>
                    <td>{order.user_email}</td>
                    <td style={{ color: 'var(--text-dim)' }}>{order.created_at?.slice(0, 10)}</td>
                    <td>
                      <StatusSelect
                        defaultValue={order.state}
                        onChange={(e) => handleOrderStatusInline(order.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="ready">Ready</option>
                        <option value="cancel">Cancel</option>
                      </StatusSelect>
                    </td>
                    <td style={{ color: 'var(--gold)', fontWeight: 500 }}>{order.payment_method.replaceAll('_', ' ')}</td>
                    <td style={{ color: 'var(--gold)', fontWeight: 500 }}>${order.total}</td>
                    <td>
                      <ActionGroup>
                        <ActionBtn onClick={() => openEditOrder(order)}>Edit</ActionBtn>
                        <ActionBtn $variant="danger" onClick={() => setConfirmDelete({ type: 'order', id: order.id, name: order.order_number || order.id })}>
                          Delete
                        </ActionBtn>
                      </ActionGroup>
                    </td>
                  </tr>
                ))}
              </TableBody>
            </DataTable>
          </TableResponsive>
        </>
      )}

      {/* ── Product Modal (Create / Edit) ── */}
      {showProductModal && (
        <ModalOverlay onClick={closeProductModal}>
          <ModalBox $size="lg" onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={closeProductModal}>
              <XIcon size={20} />
            </ModalCloseBtn>
            <ModalTitle>{editingProduct ? 'Edit Product' : 'New Product'}</ModalTitle>

            <InputGroup $hasError={touchedProduct.name && !!productErrors.name} $isValid={touchedProduct.name && !productErrors.name}>
              <label htmlFor="product-name">Name</label>
              <input id="product-name" placeholder="Product name" {...registerProduct('name')} />
              {touchedProduct.name && productErrors.name && (
                <InputError>{productErrors.name.message}</InputError>
              )}
            </InputGroup>

            <InputGroup $hasError={touchedProduct.description && !!productErrors.description} $isValid={touchedProduct.description && !productErrors.description}>
              <label htmlFor="product-desc">Description</label>
              <textarea id="product-desc" placeholder="Brief description" {...registerProduct('description')} />
              {touchedProduct.description && productErrors.description && (
                <InputError>{productErrors.description.message}</InputError>
              )}
            </InputGroup>

            <FormRow>
              <InputGroup $hasError={touchedProduct.price && !!productErrors.price} $isValid={touchedProduct.price && !productErrors.price}>
                <label htmlFor="product-price">Price ($)</label>
                <input id="product-price" type="number" placeholder="0" {...registerProduct('price')} />
                {touchedProduct.price && productErrors.price && (
                  <InputError>{productErrors.price.message}</InputError>
                )}
              </InputGroup>
              <InputGroup $hasError={touchedProduct.stock && !!productErrors.stock} $isValid={touchedProduct.stock && !productErrors.stock}>
                <label htmlFor="product-stock">Stock</label>
                <input id="product-stock" type="number" placeholder="0" {...registerProduct('stock')} />
                {touchedProduct.stock && productErrors.stock && (
                  <InputError>{productErrors.stock.message}</InputError>
                )}
              </InputGroup>
            </FormRow>

            <InputGroup>
              <label htmlFor="product-category">Category</label>
              <select id="product-category" {...registerProduct('category')}>
                <option value="">Select category</option>
                <option value="classic">Classic</option>
                <option value="sport">Sport</option>
                <option value="premium">Premium</option>
              </select>
            </InputGroup>

            <CheckboxGroup>
              <CheckboxLabel htmlFor="product-discount">
                <input id="product-discount" type="checkbox" {...registerProduct('discount')} />
                Discount Available
              </CheckboxLabel>
              <CheckboxLabel htmlFor="product-featured">
                <input id="product-featured" type="checkbox" {...registerProduct('featured')} />
                Featured Product
              </CheckboxLabel>
            </CheckboxGroup>

            <InputGroup>
              <label>Product Image</label>
              <input
                id="product-image"
                type="file"
                accept="image/*"
                {...registerProduct('image')}
                style={{ display: 'none' }}
              />

              <UploadZone htmlFor="product-image">
                <UploadSimpleIcon size={22} />
                <span className="title">Choose Product Image</span>
                <span className="subtitle">PNG, JPG or WEBP (Max. 2MB)</span>
              </UploadZone>

              {(previewUrl || editingProduct?.image) && (
                <UploadPreviewContainer>
                  <UploadPreviewThumb>
                    <img
                      src={previewUrl || editingProduct.image}
                      alt="Preview"
                    />
                  </UploadPreviewThumb>
                  <UploadPreviewInfo>
                    <span className="name">
                      {previewUrl
                        ? selectedImage?.[0]?.name
                        : editingProduct.image.split('/').pop()}
                    </span>
                    <span className="meta">
                      {previewUrl
                        ? `${(selectedImage?.[0]?.size / 1024).toFixed(1)} KB`
                        : 'Current Product Image'}
                    </span>
                  </UploadPreviewInfo>
                  <UploadClearBtn
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      setValueProduct('image', null)
                      if (!previewUrl && editingProduct) {
                        setEditingProduct(prev => ({ ...prev, image: null }))
                      }
                    }}
                    title="Clear selected image"
                  >
                    <TrashIcon size={16} />
                  </UploadClearBtn>
                </UploadPreviewContainer>
              )}
            </InputGroup>

            <ModalActions>
              <BtnSecondary onClick={closeProductModal}>Cancel</BtnSecondary>
              <BtnPrimary
                onClick={handleSubmitProduct(handleProductSubmit)}
                disabled={isCreating || isUpdating || !isDirtyProduct || !isValidProduct}
              >
                {isCreating || isUpdating
                  ? 'Saving...'
                  : editingProduct ? 'Save Changes' : 'Create Product'}
              </BtnPrimary>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* ── Order Modal (Edit) ── */}
      {showOrderModal && editingOrder && (
        <ModalOverlay onClick={closeOrderModal}>
          <ModalBox $size="lg" onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={closeOrderModal}>
              <XIcon size={20} />
            </ModalCloseBtn>
            <ModalTitle>Order Details #{editingOrder.order_number}</ModalTitle>

            <DetailGrid>
              {/* Left Column: General Read-only Info & Status Edit */}
              <div>
                <DetailSectionTitle>General Information</DetailSectionTitle>

                <DetailList>
                  <DetailItem>
                    <DetailLabel>Customer Email</DetailLabel>
                    <DetailValue>{editingOrder.user_email}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Date / Time</DetailLabel>
                    <DetailValue>{new Date(editingOrder.created_at).toLocaleString()}</DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Payment Method</DetailLabel>
                    <DetailValue $capitalize={true}>
                      {editingOrder.payment_method?.replace(/_/g, ' ')}
                    </DetailValue>
                  </DetailItem>
                  <DetailItem>
                    <DetailLabel>Total Amount</DetailLabel>
                    <DetailValue $highlight={true}>${editingOrder.total}</DetailValue>
                  </DetailItem>
                </DetailList>

                <DetailSectionTitle>Update Status</DetailSectionTitle>
                <InputGroup $hasError={!!orderErrors.state}>
                  <label htmlFor="order-state">Status</label>
                  <StatusSelect id="order-state" {...registerOrder('state')}>
                    <option value="pending">Pending</option>
                    <option value="ready">Ready</option>
                    <option value="cancel">Cancel</option>
                  </StatusSelect>
                  {orderErrors.state && <InputError>{orderErrors.state.message}</InputError>}
                </InputGroup>
              </div>

              {/* Right Column: Editable Billing Details */}
              <div>
                <DetailSectionTitle>Billing Details</DetailSectionTitle>

                <FormRow>
                  <InputGroup
                    $hasError={!!orderErrors.billing_details?.name}
                    $isValid={touchedOrder.billing_details?.name && !orderErrors.billing_details?.name}
                  >
                    <label>First Name</label>
                    <input {...registerOrder('billing_details.name')} placeholder="First name" />
                    {orderErrors.billing_details?.name && (
                      <InputError>{orderErrors.billing_details.name.message}</InputError>
                    )}
                  </InputGroup>
                  <InputGroup
                    $hasError={!!orderErrors.billing_details?.lastName}
                    $isValid={touchedOrder.billing_details?.lastName && !orderErrors.billing_details?.lastName}
                  >
                    <label>Last Name</label>
                    <input {...registerOrder('billing_details.lastName')} placeholder="Last name" />
                    {orderErrors.billing_details?.lastName && (
                      <InputError>{orderErrors.billing_details.lastName.message}</InputError>
                    )}
                  </InputGroup>
                </FormRow>

                <InputGroup
                  $hasError={!!orderErrors.billing_details?.email}
                  $isValid={touchedOrder.billing_details?.email && !orderErrors.billing_details?.email}
                >
                  <label>Email</label>
                  <input type="email" {...registerOrder('billing_details.email')} placeholder="Email address" />
                  {orderErrors.billing_details?.email && (
                    <InputError>{orderErrors.billing_details.email.message}</InputError>
                  )}
                </InputGroup>

                <InputGroup
                  $hasError={!!orderErrors.billing_details?.phone}
                  $isValid={touchedOrder.billing_details?.phone && !orderErrors.billing_details?.phone}
                >
                  <label>Phone</label>
                  <input {...registerOrder('billing_details.phone')} placeholder="Phone number" />
                  {orderErrors.billing_details?.phone && (
                    <InputError>{orderErrors.billing_details.phone.message}</InputError>
                  )}
                </InputGroup>

                <InputGroup
                  $hasError={!!orderErrors.billing_details?.address}
                  $isValid={touchedOrder.billing_details?.address && !orderErrors.billing_details?.address}
                >
                  <label>Address</label>
                  <input {...registerOrder('billing_details.address')} placeholder="Address" />
                  {orderErrors.billing_details?.address && (
                    <InputError>{orderErrors.billing_details.address.message}</InputError>
                  )}
                </InputGroup>

                <FormRow>
                  <InputGroup
                    $hasError={!!orderErrors.billing_details?.city}
                    $isValid={touchedOrder.billing_details?.city && !orderErrors.billing_details?.city}
                  >
                    <label>City</label>
                    <input {...registerOrder('billing_details.city')} placeholder="City" />
                    {orderErrors.billing_details?.city && (
                      <InputError>{orderErrors.billing_details.city.message}</InputError>
                    )}
                  </InputGroup>
                  <InputGroup
                    $hasError={!!orderErrors.billing_details?.postalCode}
                    $isValid={touchedOrder.billing_details?.postalCode && !orderErrors.billing_details?.postalCode}
                  >
                    <label>Postal Code</label>
                    <input {...registerOrder('billing_details.postalCode')} placeholder="Postal code" />
                    {orderErrors.billing_details?.postalCode && (
                      <InputError>{orderErrors.billing_details.postalCode.message}</InputError>
                    )}
                  </InputGroup>
                </FormRow>
              </div>
            </DetailGrid>

            <ModalActions>
              <BtnSecondary onClick={closeOrderModal}>Cancel</BtnSecondary>
              <BtnPrimary
                onClick={handleSubmitOrder(handleOrderSubmit)}
                disabled={!isDirtyOrder || !isValidOrder}
              >
                Save Changes
              </BtnPrimary>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* ── Role Modal ── */}
      {showRoleModal && editingUser && (
        <ModalOverlay onClick={closeRoleModal}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={closeRoleModal}>
              <XIcon size={20} />
            </ModalCloseBtn>
            <ModalTitle>Manage Roles — {editingUser.name}</ModalTitle>

            <InputGroup>
              <label>Current Roles</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                {editingUser.roles.map((r) => (
                  <StatusBadge key={r} $status={r}>{r}</StatusBadge>
                ))}
              </div>
            </InputGroup>

            <InputGroup>
              <label htmlFor="user-role">Role</label>
              <StatusSelect
                id="user-role"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </StatusSelect>
            </InputGroup>

            <ModalActions>
              <BtnSecondary onClick={closeRoleModal}>Cancel</BtnSecondary>
              <ActionBtn $variant="danger" onClick={handleRevokeRole} style={{ padding: '0.85rem 1.5rem' }}>
                Revoke
              </ActionBtn>
              <BtnPrimary onClick={handleAssignRole}>
                Assign
              </BtnPrimary>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* ── Confirm Delete Modal ── */}
      {confirmDelete && (
        <ModalOverlay onClick={() => setConfirmDelete(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={() => setConfirmDelete(null)}>
              <XIcon size={20} />
            </ModalCloseBtn>
            <ModalTitle>Confirm Deletion</ModalTitle>
            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '0.88rem', color: 'var(--text-dim)', lineHeight: 1.7, marginBottom: '0.5rem' }}>
              Are you sure you want to delete <strong style={{ color: 'var(--text)' }}>{confirmDelete.name}</strong>?
              This action cannot be undone.
            </p>
            <ModalActions>
              <BtnSecondary onClick={() => setConfirmDelete(null)}>Cancel</BtnSecondary>
              <ActionBtn $variant="danger" onClick={handleConfirmDelete} style={{ padding: '0.85rem 2rem' }}>
                Delete
              </ActionBtn>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}
    </PageWrapper>
  )
}

export default Admin

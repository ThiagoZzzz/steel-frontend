import { useState } from 'react'
import { XIcon } from '@phosphor-icons/react'
import {
  PageWrapper, PageHeader, Eyebrow,
  TabBar, TabButton,
  DataTable, TableHead, TableBody,
  ActionBtn, ActionGroup,
  StatusBadge, AvatarCircle,
  ModalOverlay, ModalBox, ModalTitle, ModalCloseBtn, ModalActions,
  InputGroup, FormRow, BtnPrimary, BtnSecondary, EmptyState,
} from '../../components/common/styles/shared'
import {
  AdminGrid, StatCard, ToolbarRow, SearchInput,
  TableResponsive, AdminProductGrid, AdminProductCard,
  AdminCardImage, AdminCardBody, AdminCardActions,
  StatusSelect,
} from './style'
import OrdersSkeleton from '../../components/skeletons/OrdersSkeleton'
import { useUsers, useDeleteUser, useUpdateUserRole } from '../../hooks/queries/useUsers'
import { useProducts, useDeleteProduct, useUpdateProduct } from '../../hooks/queries/useProducts'
import { useOrders, useDeleteOrder } from '../../hooks/queries/useOrders'

const TABS = ['Users', 'Products', 'Orders']

/* ─── Component ─── */
const Admin = () => {
  const [activeTab, setActiveTab] = useState('Users')
  const [showProductModal, setShowProductModal] = useState(false)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingOrder, setEditingOrder] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [search, setSearch] = useState('')

  const openCreateProduct = () => { setEditingProduct(null); setShowProductModal(true) }
  const openEditProduct = (p) => { setEditingProduct(p); setShowProductModal(true) }

  // hook queries
  const { data: users, isPending: isPendingUsers } = useUsers();
  const { data: products, isPending: isPendingProducts } = useProducts();
  const { data: orders, isPending: isPendingOrders } = useOrders();
  // mutations
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: deleteOrder } = useDeleteOrder();

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
          <h2>{users?.length}</h2>
        </StatCard>
        <StatCard>
          <span>Products</span>
          <h2>{products?.length}</h2>
        </StatCard>
        <StatCard>
          <span>Orders</span>
          <h2>{orders?.length}</h2>
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
              placeholder="Search users…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                  .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()))
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
                          <ActionBtn>Edit Role</ActionBtn>
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <BtnPrimary onClick={openCreateProduct}>+ Add Product</BtnPrimary>
          </ToolbarRow>

          <AdminProductGrid>
            {products
              .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
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
        <TableResponsive>
          <DataTable>
            <TableHead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td style={{ color: 'var(--gold)', fontWeight: 500 }}>#{order.id}</td>
                  <td>{order.user_email}</td>
                  <td style={{ color: 'var(--text-dim)' }}>{order.created_at.slice(0, 10)}</td>
                  <td>
                    <StatusSelect defaultValue={order.status}>
                      <option value="pending">Pending</option>
                      <option value="ready">Ready</option>
                      <option value="cancel">Cancel</option>
                    </StatusSelect>
                  </td>
                  <td style={{ color: 'var(--gold)', fontWeight: 500 }}>${order.total}</td>
                  <td>
                    <ActionGroup>
                      {/* TODO implementar modal */}
                      <ActionBtn onClick={() => openEditOrder(order)}>Edit</ActionBtn>
                      <ActionBtn $variant="danger" onClick={() => setConfirmDelete({ type: 'order', id: order.id, name: order.user_id })}>
                        Delete
                      </ActionBtn>
                    </ActionGroup>
                  </td>
                </tr>
              ))}
            </TableBody>
          </DataTable>
        </TableResponsive>
      )}

      {/* ── Product Modal (Create / Edit) ── */}
      {showProductModal && (
        <ModalOverlay onClick={() => setShowProductModal(false)}>
          <ModalBox $size="lg" onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={() => setShowProductModal(false)}>
              <XIcon size={20} />
            </ModalCloseBtn>
            <ModalTitle>{editingProduct ? 'Edit Product' : 'New Product'}</ModalTitle>

            <InputGroup>
              <label htmlFor="product-name">Name</label>
              <input id="product-name" placeholder="Product name" defaultValue={editingProduct?.name || ''} />
            </InputGroup>

            <InputGroup>
              <label htmlFor="product-desc">Description</label>
              <textarea id="product-desc" placeholder="Brief description" defaultValue={editingProduct?.description || ''} />
            </InputGroup>

            <FormRow>
              <InputGroup>
                <label htmlFor="product-price">Price ($)</label>
                <input id="product-price" type="number" placeholder="0" defaultValue={editingProduct?.price || ''} />
              </InputGroup>
              <InputGroup>
                <label htmlFor="product-stock">Stock</label>
                <input id="product-stock" type="number" placeholder="0" defaultValue={editingProduct?.stock || ''} />
              </InputGroup>
            </FormRow>

            <InputGroup>
              <label htmlFor="product-category">Category</label>
              <select id="product-category" defaultValue={editingProduct?.category || ''}>
                <option value="">Select category</option>
                <option value="classic">Classic</option>
                <option value="sport">Sport</option>
                <option value="premium">Premium</option>
              </select>
            </InputGroup>

            <InputGroup>
              <label htmlFor="product-image">Image URL</label>
              <input id="product-image" placeholder="/reloj1.png" defaultValue={editingProduct?.image || ''} />
            </InputGroup>

            <ModalActions>
              <BtnSecondary onClick={() => setShowProductModal(false)}>Cancel</BtnSecondary>
              <BtnPrimary onClick={() => setShowProductModal(false)}>
                {editingProduct ? 'Save Changes' : 'Create Product'}
              </BtnPrimary>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}

      {/* ── Order Modal (Edit) ── */}
      {showOrderModal && (
        <ModalOverlay onClick={() => setShowOrderModal(false)}>
          <ModalBox $size="lg" onClick={(e) => e.stopPropagation()}>
            <ModalCloseBtn onClick={() => setShowOrderModal(false)}>
              <XIcon size={20} />
            </ModalCloseBtn>
            <ModalTitle>{'Edit Order'}</ModalTitle>

            <InputGroup>
              <label htmlFor="product-name">Name</label>
              <input id="product-name" placeholder="Product name" defaultValue={editingOrder?.name || ''} />
            </InputGroup>

            <InputGroup>
              <label htmlFor="product-desc">Description</label>
              <textarea id="product-desc" placeholder="Brief description" defaultValue={editingProduct?.description || ''} />
            </InputGroup>

            <FormRow>
              <InputGroup>
                <label htmlFor="product-price">Price ($)</label>
                <input id="product-price" type="number" placeholder="0" defaultValue={editingProduct?.price || ''} />
              </InputGroup>
              <InputGroup>
                <label htmlFor="product-stock">Stock</label>
                <input id="product-stock" type="number" placeholder="0" defaultValue={editingProduct?.stock || ''} />
              </InputGroup>
            </FormRow>

            <InputGroup>
              <label htmlFor="product-category">Category</label>
              <select id="product-category" defaultValue={editingProduct?.category || ''}>
                <option value="">Select category</option>
                <option value="classic">Classic</option>
                <option value="sport">Sport</option>
                <option value="premium">Premium</option>
              </select>
            </InputGroup>

            <InputGroup>
              <label htmlFor="product-image">Image URL</label>
              <input id="product-image" placeholder="/reloj1.png" defaultValue={editingProduct?.image || ''} />
            </InputGroup>

            <ModalActions>
              <BtnSecondary onClick={() => setShowProductModal(false)}>Cancel</BtnSecondary>
              <BtnPrimary onClick={() => setShowProductModal(false)}>
                {editingProduct ? 'Save Changes' : 'Create Product'}
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
              <ActionBtn $variant="danger" onClick={
                () => {
                  if (confirmDelete.type === 'user') deleteUser(confirmDelete.id)
                  if (confirmDelete.type === 'product') deleteProduct(confirmDelete.id)
                  if (confirmDelete.type === 'order') deleteOrder(confirmDelete.id)
                  setConfirmDelete(null)
                }
              } style={{ padding: '0.85rem 2rem' }}>
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

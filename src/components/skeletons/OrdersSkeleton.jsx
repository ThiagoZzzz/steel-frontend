import { OrdersList, OrderCard, OrderSummary } from '../../pages/user-profile/style'
import { SkeletonBlock } from '../common/styles/skeleton'

/* ─── Skeleton para una fila de orden ─── */
const OrderCardSkeleton = () => (
  <OrderCard style={{ pointerEvents: 'none' }}>
    <OrderSummary as="div" style={{ cursor: 'default' }}>
      {/* Order ID */}
      <SkeletonBlock $height="0.85rem" $width="4rem" />
      {/* Date */}
      <SkeletonBlock $height="0.75rem" $width="6rem" />
      {/* Status badge */}
      <SkeletonBlock $height="1.25rem" $width="4.5rem" />
      {/* Total */}
      <SkeletonBlock $height="0.9rem" $width="3.5rem" />
      {/* Chevron */}
      <SkeletonBlock $height="0.85rem" $width="1rem" />
    </OrderSummary>
  </OrderCard>
)

/* ─── Lista de orders skeleton ─── */
const OrdersSkeleton = ({ count = 3 }) => (
  <OrdersList>
    {Array.from({ length: count }, (_, i) => (
      <OrderCardSkeleton key={i} />
    ))}
  </OrdersList>
)

export default OrdersSkeleton

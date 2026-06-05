import { SectionCard } from '../../pages/user-profile/style'
import { SkeletonBlock } from '../common/styles/skeleton'

/* ─── Skeleton para la sección Profile (formulario) ─── */

const FormFieldSkeleton = () => (
  <div style={{ marginBottom: '1.25rem' }}>
    {/* Label */}
    <SkeletonBlock $height="0.6rem" $width="5rem" style={{ marginBottom: '0.6rem' }} />
    {/* Input */}
    <SkeletonBlock $height="2.6rem" $width="100%" />
  </div>
)

const ProfileSkeleton = () => (
  <SectionCard style={{ pointerEvents: 'none' }}>
    {/* Section title */}
    <SkeletonBlock $height="1.2rem" $width="11rem" style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }} />

    {/* First Name */}
    <FormFieldSkeleton />
    {/* Last Name */}
    <FormFieldSkeleton />
    {/* Email */}
    <FormFieldSkeleton />

    {/* Save button */}
    <SkeletonBlock $height="2.8rem" $width="9rem" style={{ marginTop: '0.5rem' }} />
  </SectionCard>
)

export default ProfileSkeleton

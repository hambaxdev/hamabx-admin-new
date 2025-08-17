import SideNav from '@/components/template/SideNav'
import Header from '@/components/template/Header'
import SideNavToggle from '@/components/template/SideNavToggle'
import MobileNav from '@/components/template/MobileNav'
import Search from '@/components/template/Search'
import Notification from '@/components/template/Notification'
import UserProfileDropdown from '@/components//template/UserProfileDropdown'
import LayoutBase from '@/components//template/LayoutBase'
import useResponsive from '@/utils/hooks/useResponsive'
import { LAYOUT_COLLAPSIBLE_SIDE } from '@/constants/theme.constant'
import { useSessionUser } from '@/store/authStore'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import { useLocation } from 'react-router'

const CollapsibleSide = ({ children }) => {
    const { larger, smaller } = useResponsive()
    const user = useSessionUser((state) => state.user)

    const location = useLocation()

    const isOnCompleteRegistrationPage = location.pathname === '/complete-registration'

    return (
        <LayoutBase
            type={LAYOUT_COLLAPSIBLE_SIDE}
            className="app-layout-collapsible-side flex flex-auto flex-col"
        >
            <div className="flex flex-auto min-w-0">
                {larger.lg && <SideNav />}
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        className="shadow-sm dark:shadow-2xl"
                        headerStart={
                            <>
                                {smaller.lg && <MobileNav />}
                                {larger.lg && <SideNavToggle />}
                                <Search />
                            </>
                        }
                        headerEnd={
                            <>
                                <Notification />
                                <UserProfileDropdown hoverable={false} />
                            </>
                        }
                    />
                    <div className="h-full flex flex-auto flex-col">
                        {/* Глобальное предупреждение */}
                        {!user?.basicRegistrationComplete && !isOnCompleteRegistrationPage && (
                            <div className="p-4">
                                <Alert type="warning" showIcon>
                                    <div className="flex flex-col gap-2">
                                        <span>
                                            Your registration is not complete yet. Please finish your registration to continue using all features.
                                        </span>
                                        <ActionLink
                                            to="/complete-registration"
                                            className="text-sm font-semibold"
                                            themeColor
                                        >
                                            Complete registration now
                                        </ActionLink>
                                    </div>
                                </Alert>
                            </div>
                        )}
                        {/* Контент страницы */}
                        {children}
                    </div>
                </div>
            </div>
        </LayoutBase>
    )
}

export default CollapsibleSide

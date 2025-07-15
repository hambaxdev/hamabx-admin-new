export const apiPrefix = '/api'

const endpointConfig = {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    signUp: '/auth/sign-up',
    forgotPassword: '/auth/reset-password-request',
    resetPassword: '/auth/reset-password-confirm',
    resendVerificationEmail: '/auth/resend-verification',
    verifyEmailCode: '/auth/verify-email',
    getCurrentUser: '/auth/me',
}

export default endpointConfig

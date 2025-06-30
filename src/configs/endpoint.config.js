export const apiPrefix = '/api'

const endpointConfig = {
    signIn: '/auth/login',
    signOut: '/auth/sign-out',
    signUp: '/auth/registration/register',
    forgotPassword: '/auth/password/reset-password/request',
    resetPassword: '/auth/password/reset-password/confirm',
    resendVerificationEmail: '/auth/verification/resend',
    verifyEmailCode: '/auth/verification/verify-email'
}

export default endpointConfig

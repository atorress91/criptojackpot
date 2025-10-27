export interface ResetPasswordWithCodeRequest {
    email: string;
    securityCode: string;
    password: string;
    confirmPassword: string;
}
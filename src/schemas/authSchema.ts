import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .email('Định dạng email không hợp lệ')
    .min(1, 'Số điện thoại không được để trống'),

  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
})

// Schema đăng ký
export const registrationSchema = z
  .object({
    fullname: z.string().min(1, 'Họ và tên không được để trống'),
    email: z
      .string()
      .email('Địa chỉ email không hợp lệ')
      .min(1, 'Email không được để trống'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    retype_password: z.string(),
  })
  .refine((data) => data.password === data.retype_password, {
    message: 'Mật khẩu và nhập lại mật khẩu phải trùng khớp',
    path: ['retype_password'],
  })

export const forgotPasswordSchema = z
  .object({
    email: z
      .string()
      .email('Địa chỉ email không hợp lệ')
      .min(1, 'Email không được để trống'),
    token: z.string().min(1, 'Token không được bỏ trống'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    retypePassword: z.string(),
  })
  .refine((data) => data.password === data.retypePassword, {
    message: 'Mật khẩu và nhập lại mật khẩu phải trùng khớp',
    path: ['retype_password'],
  })

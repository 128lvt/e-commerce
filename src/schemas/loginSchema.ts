import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email không được để trống'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
})

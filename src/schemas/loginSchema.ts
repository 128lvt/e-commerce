import { z } from 'zod'

export const loginSchema = z.object({
  phone_number: z.string().min(1, 'Số điện thoại không được để trống'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
})

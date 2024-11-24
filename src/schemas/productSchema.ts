import { z } from 'zod'

export const productSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Tên phải có độ dài từ 3 đến 200 ký tự' })
    .max(200, { message: 'Tên phải có độ dài từ 3 đến 200 ký tự' })
    .min(1, { message: 'Tên là bắt buộc' }),

  price: z
    .union([z.string(), z.number()])
    .transform((val) => {
      return typeof val === 'string' ? parseInt(val) : val
    })
    .refine((val) => !isNaN(val), { message: 'Giá phải là một số hợp lệ' }),

  description: z.string().optional(),

  category_id: z
    .union([z.string(), z.number()])
    .refine((val) => val !== '' && val !== null, {
      message: 'Danh mục không được để trống',
    })
    .transform((val) => {
      return typeof val === 'string' ? parseInt(val, 10) : val
    }),
})

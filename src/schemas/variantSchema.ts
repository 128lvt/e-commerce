import { z } from 'zod'

const variantSchema = z.object({
  product_id: z
    .union([z.string(), z.number()])
    .refine((val) => val !== '' && val !== null, {
      message: 'Danh mục không được để trống',
    })
    .transform((val) => {
      return typeof val === 'string' ? parseInt(val) : val
    })
    .refine((val) => !isNaN(val), {
      message: 'Danh mục phải là một số hợp lệ',
    }),

  color: z
    .string()
    .max(50, { message: 'Màu sắc không được quá 50 ký tự' })
    .refine((val) => val.trim().length > 0, {
      message: 'Màu sắc không được để trống',
    }),

  size: z
    .string()
    .max(50, { message: 'Kích thước không được quá 50 ký tự' })
    .refine((val) => val.trim().length > 0, {
      message: 'Kích thước không được để trống',
    }),

  stock: z
    .union([z.number(), z.string()])
    .transform((val) => {
      return typeof val === 'string' ? parseInt(val) : val
    })
    .refine((val) => !isNaN(val), { message: 'Stock phải là một số hợp lệ' })
    .refine((val) => val >= 0, {
      message: 'Số lượng phải là một số dương hoặc 0',
    }),
})

export { variantSchema }

import { z } from 'zod'

const OrderDetailSchema = z.object({
  order_id: z.number(),
  product_id: z.number(),
  number_of_products: z.number(),
  variant_id: z.number(),
})

const OrderSchema = z.object({
  user_id: z.number().int().positive('User ID phải là một số dương.'), // Kiểm tra user_id là số nguyên dương
  fullname: z
    .string()
    .min(1, 'Họ và tên không được để trống.')
    .max(100, 'Họ và tên không được vượt quá 100 ký tự.'), // Kiểm tra độ dài cho fullname
  email: z.string().email('Địa chỉ email không hợp lệ.'),
  phone_number: z
    .string()
    .min(1, 'Số điện thoại phải có ít nhất 10 ký tự.')
    .max(15, 'Số điện thoại không được vượt quá 15 ký tự.'), // Kiểm tra độ dài cho phone_number
  address: z
    .string()
    .min(1, 'Địa chỉ không được để trống.')
    .max(255, 'Địa chỉ không được vượt quá 255 ký tự.'), // Kiểm tra độ dài cho address
  note: z.string().optional(), // Chỉ định ghi chú là tùy chọn
  total_money: z.number().positive('Tổng tiền phải là một số dương.'), // Kiểm tra total_money là số dương
  shipping_method: z.enum(['standard', 'express'], {
    errorMap: () => ({ message: 'Phương thức giao hàng không hợp lệ.' }),
  }), // Kiểm tra shipping_method có trong danh sách đã định nghĩa
  payment_method: z.enum(['cod', 'momo'], {
    errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ.' }),
  }),
})

export { OrderSchema, OrderDetailSchema }

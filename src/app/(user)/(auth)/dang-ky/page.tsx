import FormRegister from './form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function RegistrationPage() {
  return (
    <div className="flex items-center justify-center sm:p-6 lg:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Đăng ký tài khoản
          </CardTitle>
          <CardDescription className="text-center">
            Nhập thông tin của bạn để tạo tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormRegister />
        </CardContent>
      </Card>
    </div>
  )
}

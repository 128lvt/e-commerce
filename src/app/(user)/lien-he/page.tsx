import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Users, Briefcase, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function IntroductionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex h-[60vh] items-center justify-center bg-[#422717] from-primary to-primary-foreground text-primary-foreground">
        <div className="space-y-4 text-center">
          <h1 className="mb-5 text-4xl font-bold sm:text-5xl md:text-6xl">
            Chào mừng đến với 6AE Shop
          </h1>

          <Link
            href={'/san-pham'}
            className="relative rounded-sm bg-white px-4 py-2 text-black"
          >
            Mua sắm ngay
          </Link>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-[#805b45] px-4 py-16 md:px-8">
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-3xl font-bold">Về chúng tôi</h2>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <p className="text-lg">
                We are a forward-thinking company dedicated to creating
                innovative solutions for businesses and individuals alike. With
                years of experience and a passionate team, we strive to make a
                positive impact in everything we do.
              </p>
              <p className="text-lg">
                Our mission is to empower our clients with cutting-edge
                technology and exceptional service, helping them achieve their
                goals and stay ahead in today's fast-paced world.
              </p>
            </div>
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Our team working together"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="bg-muted px-4 py-16 md:px-8">
        <div className="container mx-auto">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Dịch vụ của chúng tôi
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Users className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Consulting</CardTitle>
                <CardDescription>
                  Expert advice for your business needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                Our experienced consultants provide tailored solutions to help
                your business grow and succeed in today's competitive market.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Briefcase className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Project Management</CardTitle>
                <CardDescription>
                  Efficient handling of your projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                We ensure your projects are completed on time and within budget,
                using the latest project management methodologies and tools.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Globe className="mb-2 h-10 w-10 text-primary" />
                <CardTitle>Global Solutions</CardTitle>
                <CardDescription>
                  Worldwide reach for your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                Our global network allows us to provide solutions that transcend
                borders, helping your business expand into new markets.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Medal } from 'lucide-react'
import { Pie, PieChart, Cell, Sector, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin((-midAngle * Math.PI) / 180)
  const cos = Math.cos((-midAngle * Math.PI) / 180)
  const sx = cx + (outerRadius + 10) * cos
  const sy = cy + (outerRadius + 10) * sin
  const mx = cx + (outerRadius + 30) * cos
  const my = cy + (outerRadius + 30) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 22
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.categoryName}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${value} (${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

interface IProps {
  chartData: { categoryName: string; totalSold: number }[]
}

export default function CategorySalesChart({ chartData }: IProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const totalSales = chartData.reduce((sum, item) => sum + item.totalSold, 0)
  const sortedData = [...chartData].sort((a, b) => b.totalSold - a.totalSold)

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Thống kê theo danh mục
          </CardTitle>
        </div>
        <CardDescription className="text-lg">
          Tổng sản phẩm đã bán:{' '}
          <span className="font-semibold text-primary">
            {totalSales.toLocaleString()}
          </span>{' '}
          sản phẩm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              dataKey="totalSold"
              onMouseEnter={(_, index) => setActiveIndex(index)}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <h3 className="mb-4 text-lg font-semibold">
            Bảng xếp hạng danh mục:
          </h3>
          <div className="space-y-3">
            {sortedData.map((item, index) => (
              <motion.div
                key={item.categoryName}
                className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-muted/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 flex-shrink-0 text-center">
                    {index < 3 ? (
                      <Medal
                        className={`h-5 w-5 ${
                          index === 0
                            ? 'text-yellow-500'
                            : index === 1
                              ? 'text-gray-400'
                              : 'text-amber-600'
                        }`}
                      />
                    ) : (
                      <span className="text-muted-foreground">{index + 1}</span>
                    )}
                  </div>
                  <div className="font-medium" style={{ color: COLORS[index] }}>
                    {item.categoryName}
                  </div>
                </div>
                <span className="text-lg font-semibold">
                  {item.totalSold.toLocaleString()}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

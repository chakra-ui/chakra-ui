import { Box, Card, CardBody, CardHeader, Heading, Text, Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, useColorModeValue } from '@chakra-ui/react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ReactNode } from 'react';

// 定义卡片的状态类型
export type CardStatus = 'normal' | 'warning' | 'error' | 'success';

// 定义卡片的类型
export type CardType = 'kpi' | 'chart' | 'combined';

// 定义图表类型
export type ChartType = 'line' | 'bar' | 'pie';

// 定义KPI卡片的props
interface KpiCardProps {
  title: string;
  value: string | number;
  helpText?: string;
  trend?: number;
  status?: CardStatus;
  icon?: ReactNode;
  description?: string;
  isLoading?: boolean;
  updateInterval?: number;
}

// 定义图表卡片的props
interface ChartCardProps {
  title: string;
  chartType: ChartType;
  data: any[];
  xAxisKey: string;
  yAxisKey: string | string[];
  status?: CardStatus;
  description?: string;
  isLoading?: boolean;
  colors?: string[];
}

// 定义组合卡片的props
interface CombinedCardProps {
  title: string;
  kpiValue: string | number;
  kpiHelpText?: string;
  kpiTrend?: number;
  chartType: ChartType;
  chartData: any[];
  chartXAxisKey: string;
  chartYAxisKey: string | string[];
  status?: CardStatus;
  description?: string;
  isLoading?: boolean;
  icon?: ReactNode;
}

// 数据概览卡片组的props
export interface DataOverviewCardsProps {
  children: ReactNode;
  columns?: number;
  spacing?: number;
}

// 状态颜色映射
const statusColors = {
  normal: {
    bg: 'bg.surface',
    border: 'border.color',
    text: 'text.primary',
  },
  warning: {
    bg: 'yellow.50',
    border: 'yellow.200',
    text: 'yellow.800',
  },
  error: {
    bg: 'red.50',
    border: 'red.200',
    text: 'red.800',
  },
  success: {
    bg: 'green.50',
    border: 'green.200',
    text: 'green.800',
  },
};

// KPI卡片组件
const KpiCard = ({ 
  title, 
  value, 
  helpText, 
  trend, 
  status = 'normal', 
  icon, 
  description, 
  isLoading = false,
  updateInterval 
}: KpiCardProps) => {
  // 根据状态获取颜色
  const bgColor = useColorModeValue(statusColors[status].bg, `${statusColors[status].bg}.dark`);
  const borderColor = useColorModeValue(statusColors[status].border, `${statusColors[status].border}.dark`);
  const textColor = useColorModeValue(statusColors[status].text, `${statusColors[status].text}.dark`);
  const trendColor = trend && trend > 0 ? 'green.500' : trend && trend < 0 ? 'red.500' : 'gray.500';
  const trendIcon = trend && trend > 0 ? '↑' : trend && trend < 0 ? '↓' : '';

  return (
    <Card 
      bg={bgColor} 
      borderColor={borderColor} 
      borderWidth={1} 
      borderRadius="lg"
      boxShadow={useColorModeValue('md', 'md.dark')}
      position="relative"
    >
      <CardHeader paddingY={4} paddingX={6}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            {icon && <Box mr={3} color={textColor}>{icon}</Box>}
            <Heading size="md" color={textColor}>{title}</Heading>
          </Flex>
          {status !== 'normal' && (
            <Text fontSize="xs" fontWeight="medium" color={textColor}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          )}
        </Flex>
      </CardHeader>
      <CardBody paddingX={6} paddingBottom={6}>
        <Stat>
          <StatLabel fontSize="lg" color="text.secondary">{helpText}</StatLabel>
          <StatNumber fontSize="4xl" fontWeight="bold" color={textColor}>
            {isLoading ? 'Loading...' : value}
          </StatNumber>
          {trend !== undefined && (
            <StatHelpText>
              <StatArrow type={trend > 0 ? 'increase' : 'decrease'} color={trendColor} />
              {Math.abs(trend)}%
            </StatHelpText>
          )}
        </Stat>
        {description && (
          <Text fontSize="sm" color="text.secondary" marginTop={4}>
            {description}
          </Text>
        )}
      </CardBody>
    </Card>
  );
};

// 图表卡片组件
const ChartCard = ({ 
  title, 
  chartType, 
  data, 
  xAxisKey, 
  yAxisKey, 
  status = 'normal', 
  description, 
  isLoading = false,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
}: ChartCardProps) => {
  // 根据状态获取颜色
  const bgColor = useColorModeValue(statusColors[status].bg, `${statusColors[status].bg}.dark`);
  const borderColor = useColorModeValue(statusColors[status].border, `${statusColors[status].border}.dark`);
  const textColor = useColorModeValue(statusColors[status].text, `${statusColors[status].text}.dark`);

  // 渲染图表
  const renderChart = () => {
    if (isLoading) {
      return (
        <Box height={300} display="flex" justifyContent="center" alignItems="center">
          <Text>Loading chart...</Text>
        </Box>
      );
    }

    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Line type="monotone" dataKey={yAxisKey as string} stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {Array.isArray(yAxisKey) ? 
              yAxisKey.map((key, index) => (
                <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
              )) : 
              <Bar dataKey={yAxisKey} fill="#8884d8" />
            }
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey={yAxisKey as string}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      bg={bgColor} 
      borderColor={borderColor} 
      borderWidth={1} 
      borderRadius="lg"
      boxShadow={useColorModeValue('md', 'md.dark')}
    >
      <CardHeader paddingY={4} paddingX={6}>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="md" color={textColor}>{title}</Heading>
          {status !== 'normal' && (
            <Text fontSize="xs" fontWeight="medium" color={textColor}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          )}
        </Flex>
      </CardHeader>
      <CardBody paddingX={6} paddingBottom={6}>
        <Box height={300}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Box>
        {description && (
          <Text fontSize="sm" color="text.secondary" marginTop={4}>
            {description}
          </Text>
        )}
      </CardBody>
    </Card>
  );
};

// 组合卡片组件
const CombinedCard = ({ 
  title, 
  kpiValue, 
  kpiHelpText, 
  kpiTrend, 
  chartType, 
  chartData, 
  chartXAxisKey, 
  chartYAxisKey, 
  status = 'normal', 
  description, 
  isLoading = false,
  icon,
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
}: CombinedCardProps) => {
  // 根据状态获取颜色
  const bgColor = useColorModeValue(statusColors[status].bg, `${statusColors[status].bg}.dark`);
  const borderColor = useColorModeValue(statusColors[status].border, `${statusColors[status].border}.dark`);
  const textColor = useColorModeValue(statusColors[status].text, `${statusColors[status].text}.dark`);
  const trendColor = kpiTrend && kpiTrend > 0 ? 'green.500' : kpiTrend && kpiTrend < 0 ? 'red.500' : 'gray.500';
  const trendIcon = kpiTrend && kpiTrend > 0 ? '↑' : kpiTrend && kpiTrend < 0 ? '↓' : '';

  // 渲染图表
  const renderChart = () => {
    if (isLoading) {
      return (
        <Box height={200} display="flex" justifyContent="center" alignItems="center">
          <Text>Loading chart...</Text>
        </Box>
      );
    }

    switch (chartType) {
      case 'line':
        return (
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Line type="monotone" dataKey={chartYAxisKey as string} stroke="#8884d8" strokeWidth={2} dot={{ r: 2 }} />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            {Array.isArray(chartYAxisKey) ? 
              chartYAxisKey.map((key, index) => (
                <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
              )) : 
              <Bar dataKey={chartYAxisKey} fill="#8884d8" />
            }
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={60}
              fill="#8884d8"
              dataKey={chartYAxisKey as string}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <Card 
      bg={bgColor} 
      borderColor={borderColor} 
      borderWidth={1} 
      borderRadius="lg"
      boxShadow={useColorModeValue('md', 'md.dark')}
    >
      <CardHeader paddingY={4} paddingX={6}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            {icon && <Box mr={3} color={textColor}>{icon}</Box>}
            <Heading size="md" color={textColor}>{title}</Heading>
          </Flex>
          {status !== 'normal' && (
            <Text fontSize="xs" fontWeight="medium" color={textColor}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          )}
        </Flex>
      </CardHeader>
      <CardBody paddingX={6} paddingBottom={6}>
        <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
          <Box flex={1}>
            <Stat>
              <StatLabel fontSize="lg" color="text.secondary">{kpiHelpText}</StatLabel>
              <StatNumber fontSize="4xl" fontWeight="bold" color={textColor}>
                {isLoading ? 'Loading...' : kpiValue}
              </StatNumber>
              {kpiTrend !== undefined && (
                <StatHelpText>
                  <StatArrow type={kpiTrend > 0 ? 'increase' : 'decrease'} color={trendColor} />
                  {Math.abs(kpiTrend)}%
                </StatHelpText>
              )}
            </Stat>
          </Box>
          <Box flex={2} height={200}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </Box>
        </Flex>
        {description && (
          <Text fontSize="sm" color="text.secondary" marginTop={4}>
            {description}
          </Text>
        )}
      </CardBody>
    </Card>
  );
};

// 数据概览卡片组组件
const DataOverviewCards = ({ children, columns = 3, spacing = 6 }: DataOverviewCardsProps) => {
  return (
    <Flex flexWrap="wrap" gap={spacing}>
      {React.Children.map(children, (child) => (
        <Box flex={1} minW={{ base: '100%', sm: '300px', md: `calc(${100 / columns}% - ${spacing}px)` }}>
          {child}
        </Box>
      ))}
    </Flex>
  );
};

// 导出组件
export { DataOverviewCards, KpiCard, ChartCard, CombinedCard };
export default DataOverviewCards;
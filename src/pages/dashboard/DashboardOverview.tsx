import { motion } from "framer-motion";
import {
  Route,
  Shield,
  BarChart3,
  Globe,
  Truck,
  TrendingUp,
  TrendingDown,
  Package,
  Clock,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const statsCards = [
  {
    title: "Active Shipments",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Package,
    color: "from-cyber-primary to-cyber-secondary",
  },
  {
    title: "Routes Optimized",
    value: "15,234",
    change: "+8.2%",
    trend: "up",
    icon: Route,
    color: "from-accent to-orange-400",
  },
  {
    title: "Cost Savings",
    value: "$1.2M",
    change: "+23.1%",
    trend: "up",
    icon: DollarSign,
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Avg. Delivery Time",
    value: "2.3 days",
    change: "-15.4%",
    trend: "down",
    icon: Clock,
    color: "from-purple-500 to-violet-400",
  },
];

const shipmentData = [
  { name: "Mon", shipments: 245, optimized: 220 },
  { name: "Tue", shipments: 312, optimized: 290 },
  { name: "Wed", shipments: 287, optimized: 268 },
  { name: "Thu", shipments: 356, optimized: 340 },
  { name: "Fri", shipments: 398, optimized: 385 },
  { name: "Sat", shipments: 234, optimized: 225 },
  { name: "Sun", shipments: 178, optimized: 172 },
];

const regionData = [
  { name: "North America", value: 35, color: "#7fd8dc" },
  { name: "Europe", value: 28, color: "#10879d" },
  { name: "Asia Pacific", value: 22, color: "#ec6216" },
  { name: "Latin America", value: 10, color: "#04435c" },
  { name: "Other", value: 5, color: "#c8e2e1" },
];

const recentActivity = [
  {
    id: 1,
    type: "route",
    message: "Route LA-NYC optimized, saving 23% fuel cost",
    time: "2 min ago",
    icon: Route,
  },
  {
    id: 2,
    type: "compliance",
    message: "EU shipment #EU-4521 cleared customs",
    time: "15 min ago",
    icon: Shield,
  },
  {
    id: 3,
    type: "fleet",
    message: "Vehicle #TR-2845 completed delivery",
    time: "32 min ago",
    icon: Truck,
  },
  {
    id: 4,
    type: "alert",
    message: "Weather delay predicted for Midwest routes",
    time: "1 hour ago",
    icon: Activity,
  },
  {
    id: 5,
    type: "analytics",
    message: "Weekly performance report generated",
    time: "2 hours ago",
    icon: BarChart3,
  },
];

const topRoutes = [
  { route: "Los Angeles → New York", shipments: 1245, efficiency: 94 },
  { route: "Shanghai → Rotterdam", shipments: 892, efficiency: 91 },
  { route: "London → Dubai", shipments: 756, efficiency: 89 },
  { route: "Tokyo → Singapore", shipments: 634, efficiency: 92 },
  { route: "Mumbai → Frankfurt", shipments: 521, efficiency: 87 },
];

export const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your logistics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="px-3 py-2 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20 text-sm text-foreground">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-5 border border-cyber-primary/20"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm text-green-500">{stat.change}</span>
                  <span className="text-xs text-muted-foreground">
                    vs last week
                  </span>
                </div>
              </div>
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipments Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">
            Shipment Activity
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={shipmentData}>
                <defs>
                  <linearGradient id="shipments" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7fd8dc" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7fd8dc" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="optimized" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec6216" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ec6216" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
                <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#04435c",
                    border: "1px solid #10879d",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="shipments"
                  stroke="#7fd8dc"
                  strokeWidth={2}
                  fill="url(#shipments)"
                />
                <Area
                  type="monotone"
                  dataKey="optimized"
                  stroke="#ec6216"
                  strokeWidth={2}
                  fill="url(#optimized)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Region Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">
            Shipments by Region
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#04435c",
                    border: "1px solid #10879d",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {regionData.map((region) => (
              <div
                key={region.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: region.color }}
                  />
                  <span className="text-muted-foreground">{region.name}</span>
                </div>
                <span className="font-medium text-foreground">
                  {region.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-cyber-primary/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-cyber-primary/20 flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-4 h-4 text-cyber-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Routes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Top Routes</h3>
          <div className="space-y-3">
            {topRoutes.map((route, index) => (
              <div
                key={route.route}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-cyber-primary/5 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {route.route}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {route.shipments.toLocaleString()} shipments
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-cyber-primary">
                    {route.efficiency}%
                  </p>
                  <p className="text-xs text-muted-foreground">efficiency</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;

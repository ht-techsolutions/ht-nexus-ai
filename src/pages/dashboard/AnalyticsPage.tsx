import { motion } from "framer-motion";
import { BarChart3, TrendingUp, DollarSign, Package } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const monthlyData = [
  { month: "Jan", shipments: 4200, revenue: 125000 },
  { month: "Feb", shipments: 4800, revenue: 142000 },
  { month: "Mar", shipments: 5100, revenue: 156000 },
  { month: "Apr", shipments: 4900, revenue: 148000 },
  { month: "May", shipments: 5600, revenue: 178000 },
  { month: "Jun", shipments: 6200, revenue: 195000 },
];

export const AnalyticsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Real-Time Analytics</h1>
      <p className="text-muted-foreground mt-1">Live dashboards with actionable insights</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {[
        { label: "Total Revenue", value: "$1.2M", change: "+18%", icon: DollarSign },
        { label: "Total Shipments", value: "31,247", change: "+24%", icon: Package },
        { label: "Avg. Performance", value: "94.2%", change: "+5%", icon: TrendingUp },
        { label: "Cost Efficiency", value: "87.5%", change: "+12%", icon: BarChart3 },
      ].map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 border border-cyber-primary/20">
          <stat.icon className="w-5 h-5 text-cyber-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <span className="text-xs text-green-400">{stat.change}</span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="glass rounded-xl p-5 border border-cyber-primary/20">
        <h3 className="font-semibold text-foreground mb-4">Monthly Shipments</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
              <Bar dataKey="shipments" fill="#7fd8dc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="glass rounded-xl p-5 border border-cyber-primary/20">
        <h3 className="font-semibold text-foreground mb-4">Revenue Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ec6216" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ec6216" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="revenue" stroke="#ec6216" strokeWidth={2} fill="url(#revenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticsPage;

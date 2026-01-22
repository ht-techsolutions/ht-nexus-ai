import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, DollarSign, Package, Download, Filter, RefreshCw, Calendar, ArrowUpRight, ArrowDownRight, Brain, Zap, Target, Users, Clock, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ComposedChart } from "recharts";

const monthlyData = [
  { month: "Jan", shipments: 4200, revenue: 125000, costs: 98000, profit: 27000 },
  { month: "Feb", shipments: 4800, revenue: 142000, costs: 105000, profit: 37000 },
  { month: "Mar", shipments: 5100, revenue: 156000, costs: 112000, profit: 44000 },
  { month: "Apr", shipments: 4900, revenue: 148000, costs: 108000, profit: 40000 },
  { month: "May", shipments: 5600, revenue: 178000, costs: 125000, profit: 53000 },
  { month: "Jun", shipments: 6200, revenue: 195000, costs: 138000, profit: 57000 },
];

const hourlyData = [
  { hour: "00:00", requests: 1200, latency: 45 },
  { hour: "04:00", requests: 800, latency: 38 },
  { hour: "08:00", requests: 2400, latency: 52 },
  { hour: "12:00", requests: 3100, latency: 48 },
  { hour: "16:00", requests: 2800, latency: 55 },
  { hour: "20:00", requests: 1900, latency: 42 },
];

const topMetrics = [
  { region: "North America", shipments: 12450, revenue: 845000, growth: 18.5 },
  { region: "Europe", shipments: 9870, revenue: 678000, growth: 15.2 },
  { region: "Asia Pacific", shipments: 15230, revenue: 1120000, growth: 24.8 },
  { region: "Latin America", shipments: 3450, revenue: 234000, growth: 12.1 },
];

const channelDistribution = [
  { name: "Air Freight", value: 35, color: "#7fd8dc" },
  { name: "Sea Freight", value: 40, color: "#10879d" },
  { name: "Ground", value: 20, color: "#ec6216" },
  { name: "Rail", value: 5, color: "#04435c" },
];

const aiInsights = [
  { type: "trend", message: "Revenue up 24% YoY - outperforming market by 12%", impact: "+$450K", positive: true },
  { type: "forecast", message: "Q4 demand surge predicted: +34% volume expected", impact: "Plan ahead", positive: true },
  { type: "alert", message: "Rising fuel costs impacting margins in EU routes", impact: "-2.3%", positive: false },
  { type: "opportunity", message: "Asia Pacific expansion could yield 28% growth", impact: "+$1.2M", positive: true },
];

export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("6m");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveStats, setLiveStats] = useState({
    totalRevenue: 1200000,
    totalShipments: 31247,
    avgPerformance: 94.2,
    costEfficiency: 87.5,
    customerSatisfaction: 96.8,
    onTimeDelivery: 98.2
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
        totalShipments: prev.totalShipments + Math.floor(Math.random() * 5),
        avgPerformance: Math.min(99, prev.avgPerformance + (Math.random() - 0.5) * 0.2),
        costEfficiency: Math.min(95, prev.costEfficiency + (Math.random() - 0.5) * 0.3),
        customerSatisfaction: Math.min(99, prev.customerSatisfaction + (Math.random() - 0.5) * 0.1),
        onTimeDelivery: Math.min(99.5, prev.onTimeDelivery + (Math.random() - 0.5) * 0.1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Real-Time Analytics</h1>
          <p className="text-muted-foreground mt-1">Live dashboards with AI-powered actionable insights</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-cyber-primary/10 border border-cyber-primary/20">
            {["24h", "7d", "30d", "6m", "1y"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  timeRange === range ? "bg-cyber-primary text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-primary to-accent text-white font-semibold text-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Revenue", value: `$${(liveStats.totalRevenue / 1000000).toFixed(2)}M`, change: "+18%", icon: DollarSign, positive: true },
          { label: "Total Shipments", value: liveStats.totalShipments.toLocaleString(), change: "+24%", icon: Package, positive: true },
          { label: "Performance", value: liveStats.avgPerformance.toFixed(1) + "%", change: "+5%", icon: TrendingUp, positive: true },
          { label: "Cost Efficiency", value: liveStats.costEfficiency.toFixed(1) + "%", change: "+12%", icon: BarChart3, positive: true },
          { label: "Satisfaction", value: liveStats.customerSatisfaction.toFixed(1) + "%", change: "+3%", icon: Users, positive: true },
          { label: "On-Time", value: liveStats.onTimeDelivery.toFixed(1) + "%", change: "+2%", icon: Clock, positive: true },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 border border-cyber-primary/20"
          >
            <stat.icon className="w-5 h-5 text-cyber-primary mb-2" />
            <motion.p 
              key={String(stat.value)}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-foreground"
            >
              {stat.value}
            </motion.p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-muted-foreground">{stat.label}</span>
              <span className={`flex items-center text-xs font-medium ${stat.positive ? "text-green-400" : "text-red-400"}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Insights Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5 border border-cyber-primary/20"
      >
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-cyber-primary" />
          <h3 className="font-semibold text-foreground">AI-Powered Insights</h3>
          <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">Live</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiInsights.map((insight, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                insight.positive ? "bg-green-500/5 border-green-500/20 hover:border-green-500/40" : "bg-accent/5 border-accent/20 hover:border-accent/40"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  insight.positive ? "bg-green-500/20 text-green-400" : "bg-accent/20 text-accent"
                }`}>
                  {insight.type}
                </span>
                <span className={`text-sm font-bold ${insight.positive ? "text-green-400" : "text-accent"}`}>
                  {insight.impact}
                </span>
              </div>
              <p className="text-sm text-foreground">{insight.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Profit Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Revenue & Profit Trend</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyber-primary" /> Revenue</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-400" /> Profit</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthlyData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7fd8dc" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7fd8dc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#7fd8dc" strokeWidth={2} fill="url(#revenueGrad)" />
                <Bar dataKey="profit" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Shipments Volume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
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
        </motion.div>
      </div>

      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Channel Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Shipment Channels</h3>
          <div className="flex items-center gap-4">
            <div className="h-40 w-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={channelDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {channelDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {channelDistribution.map((channel) => (
                <div key={channel.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: channel.color }} />
                    <span className="text-sm text-foreground">{channel.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{channel.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Regional Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Regional Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyber-primary/20">
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Region</th>
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Shipments</th>
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Revenue</th>
                  <th className="text-left py-3 text-xs font-medium text-muted-foreground uppercase">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyber-primary/10">
                {topMetrics.map((metric) => (
                  <tr key={metric.region} className="hover:bg-cyber-primary/5">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-cyber-primary" />
                        <span className="font-medium text-foreground">{metric.region}</span>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{metric.shipments.toLocaleString()}</td>
                    <td className="py-3 font-medium text-foreground">${(metric.revenue / 1000).toFixed(0)}K</td>
                    <td className="py-3">
                      <span className="flex items-center gap-1 text-green-400 font-medium">
                        <ArrowUpRight className="w-3 h-3" />
                        {metric.growth}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
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
  Brain,
  Zap,
  RefreshCw,
  Eye,
  Play,
  Pause,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  MapPin,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Initial data
const initialStatsCards = [
  { title: "Active Shipments", value: 2847, change: 12.5, trend: "up", icon: Package, color: "from-cyber-primary to-cyber-secondary" },
  { title: "Routes Optimized", value: 15234, change: 8.2, trend: "up", icon: Route, color: "from-accent to-orange-400" },
  { title: "Cost Savings", value: 1200000, change: 23.1, trend: "up", icon: DollarSign, color: "from-green-500 to-emerald-400" },
  { title: "Avg. Delivery Time", value: 2.3, change: -15.4, trend: "down", icon: Clock, color: "from-purple-500 to-violet-400" },
];

const initialShipmentData = [
  { name: "Mon", shipments: 245, optimized: 220, predicted: 250 },
  { name: "Tue", shipments: 312, optimized: 290, predicted: 315 },
  { name: "Wed", shipments: 287, optimized: 268, predicted: 295 },
  { name: "Thu", shipments: 356, optimized: 340, predicted: 360 },
  { name: "Fri", shipments: 398, optimized: 385, predicted: 405 },
  { name: "Sat", shipments: 234, optimized: 225, predicted: 240 },
  { name: "Sun", shipments: 178, optimized: 172, predicted: 185 },
];

const regionData = [
  { name: "North America", value: 35, color: "#7fd8dc" },
  { name: "Europe", value: 28, color: "#10879d" },
  { name: "Asia Pacific", value: 22, color: "#ec6216" },
  { name: "Latin America", value: 10, color: "#04435c" },
  { name: "Other", value: 5, color: "#c8e2e1" },
];

const aiInsights = [
  { type: "optimization", message: "AI detected 23% fuel savings opportunity on LA-NYC corridor", priority: "high", icon: Zap },
  { type: "prediction", message: "Demand surge predicted for Q4 holiday season (+34%)", priority: "medium", icon: Brain },
  { type: "alert", message: "Weather disruption expected in Midwest - 3 routes affected", priority: "high", icon: AlertTriangle },
  { type: "success", message: "Compliance check passed for EU shipments", priority: "low", icon: CheckCircle },
];

const liveShipments = [
  { id: "SHP-2847", origin: "Los Angeles", destination: "New York", progress: 67, eta: "2h 15m", status: "on-time" },
  { id: "SHP-2848", origin: "Shanghai", destination: "Rotterdam", progress: 34, eta: "12d 4h", status: "on-time" },
  { id: "SHP-2849", origin: "London", destination: "Dubai", progress: 89, eta: "45m", status: "delayed" },
  { id: "SHP-2850", origin: "Tokyo", destination: "Singapore", progress: 12, eta: "3d 8h", status: "on-time" },
];

export const DashboardOverview = () => {
  const [statsCards, setStatsCards] = useState(initialStatsCards);
  const [shipmentData, setShipmentData] = useState(initialShipmentData);
  const [isLiveUpdating, setIsLiveUpdating] = useState(true);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [currentInsight, setCurrentInsight] = useState(0);
  const [shipments, setShipments] = useState(liveShipments);
  const [realtimeMetrics, setRealtimeMetrics] = useState({ predictions: 0, optimizations: 0, alerts: 0 });

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLiveUpdating) return;

    const interval = setInterval(() => {
      // Update stats with small random changes
      setStatsCards(prev => prev.map(stat => ({
        ...stat,
        value: stat.title === "Cost Savings" 
          ? stat.value + Math.floor(Math.random() * 1000)
          : stat.title === "Avg. Delivery Time"
          ? Math.max(1.5, stat.value + (Math.random() - 0.5) * 0.1)
          : stat.value + Math.floor(Math.random() * 5),
        change: stat.change + (Math.random() - 0.5) * 0.5
      })));

      // Update shipment progress
      setShipments(prev => prev.map(s => ({
        ...s,
        progress: Math.min(100, s.progress + Math.random() * 2)
      })));

      // Update realtime metrics
      setRealtimeMetrics(prev => ({
        predictions: prev.predictions + Math.floor(Math.random() * 10),
        optimizations: prev.optimizations + Math.floor(Math.random() * 5),
        alerts: prev.alerts + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveUpdating]);

  // Rotate AI insights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight(prev => (prev + 1) % aiInsights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const runAIOptimization = useCallback(() => {
    setAiProcessing(true);
    setTimeout(() => {
      setShipmentData(prev => prev.map(d => ({
        ...d,
        optimized: Math.min(d.shipments, d.optimized + Math.floor(Math.random() * 20))
      })));
      setAiProcessing(false);
    }, 2000);
  }, []);

  const formatValue = (title: string, value: number) => {
    if (title === "Cost Savings") return `$${(value / 1000000).toFixed(2)}M`;
    if (title === "Avg. Delivery Time") return `${value.toFixed(1)} days`;
    return value.toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Header with Live Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            AI-powered logistics intelligence at your fingertips
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLiveUpdating(!isLiveUpdating)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isLiveUpdating 
                ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                : "bg-muted text-muted-foreground border border-border"
            }`}
          >
            {isLiveUpdating ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isLiveUpdating ? "Live" : "Paused"}
          </button>
          <button
            onClick={runAIOptimization}
            disabled={aiProcessing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-primary to-accent text-white font-semibold text-sm disabled:opacity-50"
          >
            {aiProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
            {aiProcessing ? "Optimizing..." : "Run AI Optimization"}
          </button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentInsight}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={`glass rounded-xl p-4 border flex items-center gap-4 ${
            aiInsights[currentInsight].priority === "high" 
              ? "border-accent/50 bg-accent/5" 
              : "border-cyber-primary/30"
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            aiInsights[currentInsight].priority === "high" ? "bg-accent/20" : "bg-cyber-primary/20"
          }`}>
            {(() => { const Icon = aiInsights[currentInsight].icon; return <Icon className={`w-5 h-5 ${aiInsights[currentInsight].priority === "high" ? "text-accent" : "text-cyber-primary"}`} />; })()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyber-primary" />
              <span className="text-xs font-semibold text-cyber-primary uppercase">AI Insight</span>
            </div>
            <p className="text-sm text-foreground">{aiInsights[currentInsight].message}</p>
          </div>
          <button className="px-4 py-2 rounded-lg bg-cyber-primary/10 text-cyber-primary text-sm font-medium hover:bg-cyber-primary/20 transition-colors">
            Take Action
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Realtime Metrics Bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "AI Predictions Today", value: realtimeMetrics.predictions, icon: Brain, color: "text-cyber-primary" },
          { label: "Routes Optimized", value: realtimeMetrics.optimizations, icon: Route, color: "text-accent" },
          { label: "Active Alerts", value: realtimeMetrics.alerts, icon: AlertTriangle, color: "text-yellow-400" },
        ].map((metric, i) => (
          <motion.div
            key={metric.label}
            className="glass rounded-xl p-3 border border-cyber-primary/20 flex items-center gap-3"
            animate={{ scale: isLiveUpdating ? [1, 1.02, 1] : 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <metric.icon className={`w-5 h-5 ${metric.color}`} />
            <div>
              <p className="text-lg font-bold text-foreground">{metric.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-5 border border-cyber-primary/20 relative overflow-hidden group"
          >
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <motion.p 
                  key={stat.value}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="text-2xl font-bold text-foreground mt-1"
                >
                  {formatValue(stat.title, stat.value)}
                </motion.p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.change > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  )}
                  <span className="text-sm text-green-500">{stat.change > 0 ? "+" : ""}{stat.change.toFixed(1)}%</span>
                  <span className="text-xs text-muted-foreground">vs last week</span>
                </div>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </motion.div>
        ))}
      </div>

      {/* Live Shipments Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5 border border-cyber-primary/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-foreground">Live Shipment Tracker</h3>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
          </div>
          <button className="flex items-center gap-2 text-sm text-cyber-primary hover:text-accent transition-colors">
            <Eye className="w-4 h-4" />
            View All
          </button>
        </div>
        <div className="space-y-3">
          {shipments.map((shipment) => (
            <div key={shipment.id} className="p-3 rounded-lg bg-cyber-primary/5 hover:bg-cyber-primary/10 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-cyber-primary" />
                  <span className="font-medium text-foreground">{shipment.id}</span>
                  <span className="text-sm text-muted-foreground">{shipment.origin} → {shipment.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    shipment.status === "on-time" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {shipment.status}
                  </span>
                  <span className="text-sm text-muted-foreground">ETA: {shipment.eta}</span>
                </div>
              </div>
              <div className="relative h-2 bg-cyber-primary/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyber-primary to-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${shipment.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipments Chart with AI Predictions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Shipment Activity & AI Predictions</h3>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-cyber-primary" /> Actual</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-accent" /> Optimized</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-400" /> AI Predicted</span>
            </div>
          </div>
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
                <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="shipments" stroke="#7fd8dc" strokeWidth={2} fill="url(#shipments)" />
                <Area type="monotone" dataKey="optimized" stroke="#ec6216" strokeWidth={2} fill="url(#optimized)" />
                <Line type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={2} strokeDasharray="5 5" dot={false} />
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
          <h3 className="font-semibold text-foreground mb-4">Shipments by Region</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={regionData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value">
                  {regionData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {regionData.map((region) => (
              <div key={region.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                  <span className="text-muted-foreground">{region.name}</span>
                </div>
                <span className="font-medium text-foreground">{region.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Insights Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass rounded-xl p-5 border border-cyber-primary/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyber-primary" />
            <h3 className="font-semibold text-foreground">AI Decision Engine Insights</h3>
          </div>
          <span className="text-xs text-muted-foreground">Updated in real-time</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiInsights.map((insight, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl cursor-pointer transition-all ${
                insight.priority === "high" 
                  ? "bg-accent/10 border border-accent/30 hover:border-accent/50" 
                  : "bg-cyber-primary/5 border border-cyber-primary/20 hover:border-cyber-primary/40"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <insight.icon className={`w-4 h-4 ${insight.priority === "high" ? "text-accent" : "text-cyber-primary"}`} />
                <span className={`text-xs font-semibold uppercase ${insight.priority === "high" ? "text-accent" : "text-cyber-primary"}`}>
                  {insight.type}
                </span>
              </div>
              <p className="text-sm text-foreground">{insight.message}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;

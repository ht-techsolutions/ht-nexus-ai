import { motion, AnimatePresence } from "framer-motion";
import { Route, MapPin, Clock, Fuel, TrendingUp, Play, Pause, RotateCcw, Brain, Zap, Navigation, Settings, Filter, Plus, Eye, Trash2, Edit, ChevronRight, AlertTriangle, CheckCircle } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const initialRoutes = [
  { id: 1, origin: "Los Angeles, CA", destination: "New York, NY", status: "active", eta: "2d 4h", savings: 23, distance: 2789, fuel: 450, co2: 1.2, waypoints: 4, aiScore: 94 },
  { id: 2, origin: "Shanghai, CN", destination: "Rotterdam, NL", status: "active", eta: "18d 6h", savings: 18, distance: 11234, fuel: 2800, co2: 8.5, waypoints: 2, aiScore: 91 },
  { id: 3, origin: "London, UK", destination: "Dubai, UAE", status: "pending", eta: "5d 2h", savings: 15, distance: 3412, fuel: 620, co2: 2.1, waypoints: 3, aiScore: 87 },
  { id: 4, origin: "Tokyo, JP", destination: "Singapore, SG", status: "completed", eta: "Delivered", savings: 21, distance: 3312, fuel: 580, co2: 1.9, waypoints: 2, aiScore: 96 },
  { id: 5, origin: "Miami, FL", destination: "Mexico City, MX", status: "active", eta: "1d 8h", savings: 19, distance: 1892, fuel: 320, co2: 0.9, waypoints: 3, aiScore: 92 },
];

const optimizationHistory = [
  { time: "00:00", savings: 12, routes: 45 },
  { time: "04:00", savings: 15, routes: 52 },
  { time: "08:00", savings: 18, routes: 78 },
  { time: "12:00", savings: 22, routes: 95 },
  { time: "16:00", savings: 25, routes: 112 },
  { time: "20:00", savings: 23, routes: 98 },
];

const aiRecommendations = [
  { id: 1, type: "reroute", message: "Reroute LA-NYC via Denver to avoid weather", impact: "+2h ETA, -15% fuel", priority: "high" },
  { id: 2, type: "consolidate", message: "Consolidate 3 shipments to Shanghai hub", impact: "-$4,500 cost", priority: "medium" },
  { id: 3, type: "timing", message: "Delay departure by 2h to avoid port congestion", impact: "-3h total time", priority: "low" },
];

export const RoutingPage = () => {
  const [routes, setRoutes] = useState(initialRoutes);
  const [optimizing, setOptimizing] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(null);
  const [aiMode, setAiMode] = useState<"auto" | "manual">("auto");
  const [showFilters, setShowFilters] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);
  const [liveStats, setLiveStats] = useState({ activeRoutes: 156, avgSavings: 23, timeSaved: 847, co2Reduced: 45.2 });

  // Simulate optimization progress
  useEffect(() => {
    if (!optimizing) return;
    
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          setOptimizing(false);
          // Update routes with new savings
          setRoutes(r => r.map(route => ({
            ...route,
            savings: Math.min(30, route.savings + Math.floor(Math.random() * 5)),
            aiScore: Math.min(99, route.aiScore + Math.floor(Math.random() * 3))
          })));
          return 0;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [optimizing]);

  // Live stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        activeRoutes: prev.activeRoutes + Math.floor(Math.random() * 3) - 1,
        avgSavings: Math.max(15, prev.avgSavings + (Math.random() - 0.5)),
        timeSaved: prev.timeSaved + Math.floor(Math.random() * 5),
        co2Reduced: prev.co2Reduced + Math.random() * 0.1
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const startOptimization = useCallback(() => {
    setOptimizing(true);
    setOptimizationProgress(0);
  }, []);

  const applyRecommendation = (id: number) => {
    // Simulate applying AI recommendation
    setRoutes(prev => prev.map(r => ({
      ...r,
      savings: r.savings + Math.floor(Math.random() * 3),
      aiScore: Math.min(99, r.aiScore + 2)
    })));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Predictive Routing</h1>
          <p className="text-muted-foreground mt-1">AI-powered route optimization with real-time predictions</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-cyber-primary/10 border border-cyber-primary/20">
            <button
              onClick={() => setAiMode("auto")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${aiMode === "auto" ? "bg-cyber-primary text-white" : "text-muted-foreground"}`}
            >
              <Brain className="w-4 h-4 inline mr-1" />
              Auto AI
            </button>
            <button
              onClick={() => setAiMode("manual")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${aiMode === "manual" ? "bg-cyber-primary text-white" : "text-muted-foreground"}`}
            >
              <Settings className="w-4 h-4 inline mr-1" />
              Manual
            </button>
          </div>
          <button
            onClick={startOptimization}
            disabled={optimizing}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-primary to-accent text-white font-semibold disabled:opacity-50"
          >
            {optimizing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            {optimizing ? "Optimizing..." : "Optimize All Routes"}
          </button>
        </div>
      </div>

      {/* Optimization Progress Bar */}
      <AnimatePresence>
        {optimizing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass rounded-xl p-4 border border-accent/30 bg-accent/5"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent animate-pulse" />
                <span className="font-medium text-foreground">AI Optimization in Progress</span>
              </div>
              <span className="text-sm text-accent font-bold">{optimizationProgress}%</span>
            </div>
            <div className="h-2 bg-cyber-primary/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-cyber-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${optimizationProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Analyzing traffic patterns, weather data, and fuel efficiency...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Routes", value: liveStats.activeRoutes, icon: Route, color: "text-cyber-primary", suffix: "" },
          { label: "Avg. Savings", value: liveStats.avgSavings.toFixed(1), icon: Fuel, color: "text-green-400", suffix: "%" },
          { label: "Time Saved", value: liveStats.timeSaved, icon: Clock, color: "text-accent", suffix: " hrs" },
          { label: "CO₂ Reduced", value: liveStats.co2Reduced.toFixed(1), icon: TrendingUp, color: "text-emerald-400", suffix: " tons" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-xl p-4 border border-cyber-primary/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-primary/20 flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}{stat.suffix}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5 border border-cyber-primary/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-cyber-primary" />
            <h3 className="font-semibold text-foreground">AI Recommendations</h3>
            <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">{aiRecommendations.length} new</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiRecommendations.map((rec) => (
            <motion.div
              key={rec.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                rec.priority === "high" ? "bg-accent/10 border-accent/30" : "bg-cyber-primary/5 border-cyber-primary/20"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  rec.priority === "high" ? "bg-accent/20 text-accent" : rec.priority === "medium" ? "bg-yellow-500/20 text-yellow-400" : "bg-cyber-primary/20 text-cyber-primary"
                }`}>
                  {rec.priority}
                </span>
                <Navigation className="w-4 h-4 text-cyber-primary" />
              </div>
              <p className="text-sm text-foreground mb-2">{rec.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-400">{rec.impact}</span>
                <button
                  onClick={() => applyRecommendation(rec.id)}
                  className="px-3 py-1 rounded-lg bg-cyber-primary/10 text-cyber-primary text-xs font-medium hover:bg-cyber-primary/20 transition-colors"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Optimization History Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Optimization Performance (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={optimizationHistory}>
                <defs>
                  <linearGradient id="savingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7fd8dc" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7fd8dc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="savings" stroke="#7fd8dc" strokeWidth={2} fill="url(#savingsGrad)" name="Savings %" />
                <Line type="monotone" dataKey="routes" stroke="#ec6216" strokeWidth={2} name="Routes Optimized" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Add New Route", icon: Plus, color: "from-cyber-primary to-cyber-secondary" },
              { label: "Bulk Optimize", icon: Zap, color: "from-accent to-orange-400" },
              { label: "Export Report", icon: TrendingUp, color: "from-green-500 to-emerald-400" },
              { label: "AI Analysis", icon: Brain, color: "from-purple-500 to-violet-400" },
            ].map((action) => (
              <motion.button
                key={action.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-4 rounded-xl bg-cyber-primary/5 border border-cyber-primary/20 hover:border-cyber-primary/40 transition-all text-left"
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3`}>
                  <action.icon className="w-5 h-5 text-white" />
                </div>
                <p className="font-medium text-foreground text-sm">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Routes Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl border border-cyber-primary/20 overflow-hidden"
      >
        <div className="p-4 border-b border-cyber-primary/20 flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Active Routes</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-primary/10 text-sm text-cyber-primary hover:bg-cyber-primary/20 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cyber-primary/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Route</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">AI Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Distance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">ETA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Savings</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-primary/10">
              {routes.map((route) => (
                <motion.tr
                  key={route.id}
                  className={`hover:bg-cyber-primary/5 cursor-pointer ${selectedRoute === route.id ? "bg-cyber-primary/10" : ""}`}
                  onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
                  layout
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyber-primary" />
                      <div>
                        <span className="text-sm text-foreground font-medium">{route.origin}</span>
                        <ChevronRight className="w-3 h-3 inline mx-1 text-muted-foreground" />
                        <span className="text-sm text-foreground">{route.destination}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      route.status === "active" ? "bg-green-500/20 text-green-400" : 
                      route.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : 
                      "bg-cyber-primary/20 text-cyber-primary"
                    }`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-cyber-primary/20 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${route.aiScore >= 90 ? "bg-green-400" : route.aiScore >= 80 ? "bg-yellow-400" : "bg-accent"}`}
                          style={{ width: `${route.aiScore}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-foreground">{route.aiScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{route.distance.toLocaleString()} mi</td>
                  <td className="px-4 py-4 text-sm text-foreground">{route.eta}</td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1 text-green-400 text-sm font-medium">
                      <TrendingUp className="w-3 h-3" /> {route.savings}%
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary" title="Edit Route">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary" title="Re-optimize">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default RoutingPage;

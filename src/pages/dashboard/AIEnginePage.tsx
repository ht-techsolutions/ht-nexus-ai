import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Cpu, Zap, Brain, Activity, Play, Pause, RefreshCw, Settings, TrendingUp, AlertTriangle, CheckCircle, BarChart3, Layers, Database, Clock, Target, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

const initialModels = [
  { id: 1, name: "Route Optimization v3.2", status: "active", accuracy: 97.3, predictions: 245000, lastTrained: "2h ago", type: "optimization" },
  { id: 2, name: "Demand Forecasting v2.8", status: "active", accuracy: 94.1, predictions: 189000, lastTrained: "6h ago", type: "forecasting" },
  { id: 3, name: "Risk Assessment v4.0", status: "active", accuracy: 98.7, predictions: 156000, lastTrained: "1h ago", type: "risk" },
  { id: 4, name: "Price Optimization v2.1", status: "training", accuracy: 91.2, predictions: 78000, lastTrained: "Training...", type: "pricing" },
  { id: 5, name: "ETA Prediction v3.5", status: "active", accuracy: 96.8, predictions: 312000, lastTrained: "30m ago", type: "prediction" },
  { id: 6, name: "Anomaly Detection v1.9", status: "active", accuracy: 99.1, predictions: 45000, lastTrained: "4h ago", type: "detection" },
];

const performanceHistory = [
  { time: "00:00", accuracy: 95.2, latency: 45, throughput: 1200 },
  { time: "04:00", accuracy: 96.1, latency: 42, throughput: 1350 },
  { time: "08:00", accuracy: 97.3, latency: 38, throughput: 1800 },
  { time: "12:00", accuracy: 96.8, latency: 41, throughput: 2100 },
  { time: "16:00", accuracy: 97.5, latency: 35, throughput: 2400 },
  { time: "20:00", accuracy: 97.2, latency: 37, throughput: 2200 },
];

const modelCapabilities = [
  { subject: "Accuracy", A: 97, fullMark: 100 },
  { subject: "Speed", A: 92, fullMark: 100 },
  { subject: "Reliability", A: 98, fullMark: 100 },
  { subject: "Scalability", A: 95, fullMark: 100 },
  { subject: "Adaptability", A: 89, fullMark: 100 },
  { subject: "Efficiency", A: 94, fullMark: 100 },
];

const recentPredictions = [
  { id: 1, type: "route", input: "LA → NYC shipment", output: "Optimal route via I-40, ETA 2d 4h", confidence: 98.2, time: "2s ago" },
  { id: 2, type: "demand", input: "Q4 electronics demand", output: "+34% surge expected", confidence: 94.5, time: "5s ago" },
  { id: 3, type: "risk", input: "Mediterranean route", output: "Low risk (weather clear)", confidence: 99.1, time: "8s ago" },
  { id: 4, type: "price", input: "Shanghai → EU container", output: "Optimal price: $2,847", confidence: 91.8, time: "12s ago" },
];

export const AIEnginePage = () => {
  const [models, setModels] = useState(initialModels);
  const [isProcessing, setIsProcessing] = useState(true);
  const [selectedModel, setSelectedModel] = useState<number | null>(null);
  const [liveMetrics, setLiveMetrics] = useState({
    predictionsToday: 2400000,
    avgLatency: 38,
    accuracy: 97.3,
    activeModels: 12,
    queuedRequests: 156,
    gpuUtilization: 78
  });
  const [predictions, setPredictions] = useState(recentPredictions);

  // Live metrics simulation
  useEffect(() => {
    if (!isProcessing) return;

    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        predictionsToday: prev.predictionsToday + Math.floor(Math.random() * 100),
        avgLatency: Math.max(25, prev.avgLatency + (Math.random() - 0.5) * 5),
        accuracy: Math.min(99.9, prev.accuracy + (Math.random() - 0.5) * 0.2),
        activeModels: prev.activeModels,
        queuedRequests: Math.max(0, prev.queuedRequests + Math.floor(Math.random() * 20) - 10),
        gpuUtilization: Math.min(100, Math.max(50, prev.gpuUtilization + (Math.random() - 0.5) * 5))
      }));

      // Add new prediction
      if (Math.random() > 0.7) {
        const newPrediction = {
          id: Date.now(),
          type: ["route", "demand", "risk", "price"][Math.floor(Math.random() * 4)],
          input: "Real-time analysis request",
          output: "Processing complete",
          confidence: 90 + Math.random() * 10,
          time: "Just now"
        };
        setPredictions(prev => [newPrediction, ...prev.slice(0, 3)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const trainModel = useCallback((modelId: number) => {
    setModels(prev => prev.map(m => 
      m.id === modelId ? { ...m, status: "training", lastTrained: "Training..." } : m
    ));

    setTimeout(() => {
      setModels(prev => prev.map(m => 
        m.id === modelId ? { 
          ...m, 
          status: "active", 
          lastTrained: "Just now",
          accuracy: Math.min(99.9, m.accuracy + Math.random() * 0.5)
        } : m
      ));
    }, 5000);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">AI Decision Engine</h1>
          <p className="text-muted-foreground mt-1">Machine learning models trained on billions of data points</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsProcessing(!isProcessing)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              isProcessing ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-muted text-muted-foreground border border-border"
            }`}
          >
            {isProcessing ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            {isProcessing ? "Processing" : "Paused"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-primary to-accent text-white font-semibold text-sm">
            <Settings className="w-4 h-4" />
            Configure
          </button>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Predictions Today", value: (liveMetrics.predictionsToday / 1000000).toFixed(2) + "M", icon: Brain, color: "text-cyber-primary" },
          { label: "Avg Latency", value: liveMetrics.avgLatency.toFixed(0) + "ms", icon: Clock, color: "text-green-400" },
          { label: "Accuracy", value: liveMetrics.accuracy.toFixed(1) + "%", icon: Target, color: "text-accent" },
          { label: "Active Models", value: liveMetrics.activeModels.toString(), icon: Layers, color: "text-purple-400" },
          { label: "Queue", value: liveMetrics.queuedRequests.toString(), icon: Database, color: "text-yellow-400" },
          { label: "GPU Usage", value: liveMetrics.gpuUtilization.toFixed(0) + "%", icon: Cpu, color: "text-emerald-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 border border-cyber-primary/20"
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <motion.p 
              key={stat.value}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-xl font-bold text-foreground"
            >
              {stat.value}
            </motion.p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Performance Metrics (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceHistory}>
                <defs>
                  <linearGradient id="accuracyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7fd8dc" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7fd8dc" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} domain={[90, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="accuracy" stroke="#7fd8dc" strokeWidth={2} fill="url(#accuracyGrad)" name="Accuracy %" />
                <Line type="monotone" dataKey="latency" stroke="#ec6216" strokeWidth={2} name="Latency (ms)" yAxisId="right" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Model Capabilities</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={modelCapabilities}>
                <PolarGrid stroke="#1e3a3a" />
                <PolarAngleAxis dataKey="subject" stroke="#6b7280" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#6b7280" fontSize={10} />
                <Radar name="AI Engine" dataKey="A" stroke="#7fd8dc" fill="#7fd8dc" fillOpacity={0.3} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Live Predictions Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5 border border-cyber-primary/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" />
            <h3 className="font-semibold text-foreground">Live Prediction Feed</h3>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {predictions.map((pred) => (
              <motion.div
                key={pred.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 rounded-xl bg-cyber-primary/5 border border-cyber-primary/10 hover:border-cyber-primary/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      pred.type === "route" ? "bg-cyber-primary/20" : 
                      pred.type === "demand" ? "bg-accent/20" : 
                      pred.type === "risk" ? "bg-green-500/20" : "bg-purple-500/20"
                    }`}>
                      {pred.type === "route" && <TrendingUp className="w-5 h-5 text-cyber-primary" />}
                      {pred.type === "demand" && <BarChart3 className="w-5 h-5 text-accent" />}
                      {pred.type === "risk" && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {pred.type === "price" && <Zap className="w-5 h-5 text-purple-400" />}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{pred.input}</p>
                      <p className="text-sm font-medium text-foreground mt-1">{pred.output}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-cyber-primary">{pred.confidence.toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">{pred.time}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Models Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5 border border-cyber-primary/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">AI Models</h3>
          <button className="text-sm text-cyber-primary hover:text-accent transition-colors">View All →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map((model) => (
            <motion.div
              key={model.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedModel(selectedModel === model.id ? null : model.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedModel === model.id ? "bg-cyber-primary/10 border-cyber-primary/40" : "bg-cyber-primary/5 border-cyber-primary/20 hover:border-cyber-primary/30"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Brain className={`w-5 h-5 ${model.status === "active" ? "text-cyber-primary" : "text-yellow-400"}`} />
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    model.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {model.status}
                  </span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); trainModel(model.id); }}
                  disabled={model.status === "training"}
                  className="p-1.5 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${model.status === "training" ? "animate-spin" : ""}`} />
                </button>
              </div>
              <h4 className="font-medium text-foreground text-sm mb-2">{model.name}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Accuracy</span>
                  <span className="font-medium text-foreground">{model.accuracy.toFixed(1)}%</span>
                </div>
                <div className="h-1.5 bg-cyber-primary/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${model.accuracy >= 95 ? "bg-green-400" : model.accuracy >= 90 ? "bg-yellow-400" : "bg-accent"}`}
                    style={{ width: `${model.accuracy}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Predictions</span>
                  <span className="font-medium text-foreground">{(model.predictions / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Last Trained</span>
                  <span className="font-medium text-cyber-primary">{model.lastTrained}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AIEnginePage;

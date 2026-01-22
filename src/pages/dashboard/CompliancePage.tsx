import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Shield, CheckCircle, AlertTriangle, Globe, FileText, Upload, Download, Search, Filter, RefreshCw, Clock, TrendingUp, Eye, Brain, Zap, XCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

const initialComplianceItems = [
  { id: 1, country: "United States", status: "compliant", lastCheck: "2 hours ago", documents: 12, regulations: 45, aiScore: 98, flag: "🇺🇸" },
  { id: 2, country: "European Union", status: "compliant", lastCheck: "1 hour ago", documents: 28, regulations: 89, aiScore: 97, flag: "🇪🇺" },
  { id: 3, country: "China", status: "pending", lastCheck: "30 min ago", documents: 15, regulations: 56, aiScore: 85, flag: "🇨🇳" },
  { id: 4, country: "United Kingdom", status: "compliant", lastCheck: "4 hours ago", documents: 8, regulations: 32, aiScore: 99, flag: "🇬🇧" },
  { id: 5, country: "Japan", status: "action_required", lastCheck: "15 min ago", documents: 10, regulations: 41, aiScore: 72, flag: "🇯🇵" },
  { id: 6, country: "Singapore", status: "compliant", lastCheck: "3 hours ago", documents: 6, regulations: 28, aiScore: 96, flag: "🇸🇬" },
  { id: 7, country: "Australia", status: "compliant", lastCheck: "2 hours ago", documents: 9, regulations: 35, aiScore: 94, flag: "🇦🇺" },
  { id: 8, country: "Brazil", status: "pending", lastCheck: "45 min ago", documents: 11, regulations: 48, aiScore: 81, flag: "🇧🇷" },
];

const complianceHistory = [
  { time: "00:00", rate: 96.2, checks: 120 },
  { time: "04:00", rate: 97.1, checks: 85 },
  { time: "08:00", rate: 97.8, checks: 210 },
  { time: "12:00", rate: 98.2, checks: 280 },
  { time: "16:00", rate: 98.5, checks: 245 },
  { time: "20:00", rate: 98.7, checks: 180 },
];

const statusDistribution = [
  { name: "Compliant", value: 142, color: "#22c55e" },
  { name: "Pending", value: 8, color: "#eab308" },
  { name: "Action Required", value: 6, color: "#ef4444" },
];

const recentDocuments = [
  { id: 1, name: "Import License - EU", country: "European Union", status: "verified", date: "2 hours ago" },
  { id: 2, name: "Customs Declaration - CN", country: "China", status: "processing", date: "30 min ago" },
  { id: 3, name: "Safety Certificate - US", country: "United States", status: "verified", date: "4 hours ago" },
  { id: 4, name: "Tax Compliance - JP", country: "Japan", status: "pending", date: "1 hour ago" },
];

export const CompliancePage = () => {
  const [complianceItems, setComplianceItems] = useState(initialComplianceItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [liveStats, setLiveStats] = useState({
    countriesCovered: 156,
    documentsProcessed: 2847,
    complianceRate: 98.7,
    checksToday: 1245,
    aiVerified: 2156,
    pendingReview: 23
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        documentsProcessed: prev.documentsProcessed + Math.floor(Math.random() * 3),
        checksToday: prev.checksToday + Math.floor(Math.random() * 5),
        aiVerified: prev.aiVerified + Math.floor(Math.random() * 2),
        complianceRate: Math.min(99.9, prev.complianceRate + (Math.random() - 0.4) * 0.1)
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const runComplianceScan = useCallback(() => {
    setIsScanning(true);
    setTimeout(() => {
      setComplianceItems(prev => prev.map(item => ({
        ...item,
        aiScore: Math.min(100, item.aiScore + Math.floor(Math.random() * 3)),
        lastCheck: "Just now"
      })));
      setIsScanning(false);
    }, 3000);
  }, []);

  const filteredItems = complianceItems.filter(item =>
    item.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!statusFilter || item.status === statusFilter)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "bg-green-500/20 text-green-400";
      case "pending": return "bg-yellow-500/20 text-yellow-400";
      case "action_required": return "bg-red-500/20 text-red-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Auto-Compliance</h1>
          <p className="text-muted-foreground mt-1">AI-powered regulatory compliance across 150+ countries</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={runComplianceScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-primary to-accent text-white font-semibold text-sm disabled:opacity-50"
          >
            {isScanning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
            {isScanning ? "Scanning..." : "AI Compliance Scan"}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary font-medium text-sm hover:bg-cyber-primary/20 transition-colors">
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Countries Covered", value: liveStats.countriesCovered, icon: Globe, color: "from-cyber-primary to-cyber-secondary" },
          { label: "Documents Processed", value: liveStats.documentsProcessed.toLocaleString(), icon: FileText, color: "from-accent to-orange-400" },
          { label: "Compliance Rate", value: liveStats.complianceRate.toFixed(1) + "%", icon: Shield, color: "from-green-500 to-emerald-400" },
          { label: "Checks Today", value: liveStats.checksToday.toLocaleString(), icon: CheckCircle, color: "from-purple-500 to-violet-400" },
          { label: "AI Verified", value: liveStats.aiVerified.toLocaleString(), icon: Brain, color: "from-cyber-primary to-accent" },
          { label: "Pending Review", value: liveStats.pendingReview, icon: Clock, color: "from-yellow-500 to-amber-400" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-xl p-4 border border-cyber-primary/20"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <motion.p 
              key={String(stat.value)}
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

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Compliance Status</h3>
          <div className="flex items-center gap-4">
            <div className="h-40 w-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    onClick={(_, index) => {
                      const statusMap = ["compliant", "pending", "action_required"];
                      setStatusFilter(statusFilter === statusMap[index] ? null : statusMap[index]);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {statusDistribution.map((status) => (
                <div key={status.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                    <span className="text-sm text-foreground">{status.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{status.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Compliance Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Compliance Rate Trend (24h)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={complianceHistory}>
                <defs>
                  <linearGradient id="complianceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} domain={[95, 100]} />
                <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
                <Area type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2} fill="url(#complianceGrad)" name="Compliance Rate %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Documents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl p-5 border border-cyber-primary/20"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Recent Documents</h3>
          <button className="text-sm text-cyber-primary hover:text-accent transition-colors">View All →</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              whileHover={{ scale: 1.02 }}
              className="p-4 rounded-xl bg-cyber-primary/5 border border-cyber-primary/20 hover:border-cyber-primary/40 transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-2">
                <FileText className="w-5 h-5 text-cyber-primary" />
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  doc.status === "verified" ? "bg-green-500/20 text-green-400" :
                  doc.status === "processing" ? "bg-accent/20 text-accent" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {doc.status}
                </span>
              </div>
              <p className="font-medium text-foreground text-sm mb-1">{doc.name}</p>
              <p className="text-xs text-muted-foreground">{doc.country}</p>
              <p className="text-xs text-muted-foreground mt-2">{doc.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Country Compliance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl border border-cyber-primary/20 overflow-hidden"
      >
        <div className="p-4 border-b border-cyber-primary/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h3 className="font-semibold text-foreground">Compliance Status by Region</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyber-primary/40"
              />
            </div>
            <button 
              onClick={() => setStatusFilter(null)}
              className="p-2 rounded-lg bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-cyber-primary/10">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:bg-cyber-primary/5 gap-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <p className="font-medium text-foreground">{item.country}</p>
                    <p className="text-xs text-muted-foreground">Last checked: {item.lastCheck}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{item.documents}</p>
                    <p className="text-xs text-muted-foreground">Documents</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{item.regulations}</p>
                    <p className="text-xs text-muted-foreground">Regulations</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Brain className="w-3 h-3 text-cyber-primary" />
                      <p className="text-sm font-medium text-foreground">{item.aiScore}%</p>
                    </div>
                    <p className="text-xs text-muted-foreground">AI Score</p>
                  </div>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status === "compliant" ? <CheckCircle className="w-3 h-3" /> : 
                     item.status === "pending" ? <Clock className="w-3 h-3" /> :
                     <AlertTriangle className="w-3 h-3" />}
                    {item.status.replace("_", " ")}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default CompliancePage;

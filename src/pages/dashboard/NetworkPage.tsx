import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Globe, Users, Truck, MapPin, Signal, Wifi, WifiOff, TrendingUp, AlertTriangle, CheckCircle, Search, Filter, Plus, Eye, RefreshCw } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const carriers = [
  { id: 1, name: "Pacific Freight Co.", region: "Asia Pacific", status: "online", routes: 156, rating: 4.8, responseTime: "12ms", lastActive: "2m ago" },
  { id: 2, name: "Atlantic Shipping Ltd.", region: "Europe", status: "online", routes: 234, rating: 4.9, responseTime: "8ms", lastActive: "1m ago" },
  { id: 3, name: "Continental Express", region: "North America", status: "online", routes: 189, rating: 4.7, responseTime: "15ms", lastActive: "30s ago" },
  { id: 4, name: "Mediterranean Lines", region: "Europe", status: "degraded", routes: 98, rating: 4.5, responseTime: "45ms", lastActive: "5m ago" },
  { id: 5, name: "Nordic Transport", region: "Europe", status: "online", routes: 67, rating: 4.6, responseTime: "22ms", lastActive: "3m ago" },
  { id: 6, name: "Dubai Logistics Hub", region: "Middle East", status: "online", routes: 145, rating: 4.8, responseTime: "18ms", lastActive: "1m ago" },
];

const regionStats = [
  { name: "North America", carriers: 124, routes: 1245, color: "#7fd8dc" },
  { name: "Europe", carriers: 156, routes: 1890, color: "#10879d" },
  { name: "Asia Pacific", carriers: 189, routes: 2340, color: "#ec6216" },
  { name: "Middle East", carriers: 45, routes: 567, color: "#04435c" },
  { name: "Latin America", carriers: 34, routes: 234, color: "#c8e2e1" },
];

const networkActivity = [
  { time: "00:00", requests: 1200, latency: 45 },
  { time: "04:00", requests: 800, latency: 38 },
  { time: "08:00", requests: 2400, latency: 52 },
  { time: "12:00", requests: 3100, latency: 48 },
  { time: "16:00", requests: 2800, latency: 55 },
  { time: "20:00", requests: 1900, latency: 42 },
];

export const NetworkPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [liveStats, setLiveStats] = useState({
    activeCarriers: 524,
    countries: 180,
    partners: 1247,
    uptime: 99.97,
    avgLatency: 23,
    requestsPerSec: 4500
  });
  const [carrierList, setCarrierList] = useState(carriers);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        activeCarriers: prev.activeCarriers + Math.floor(Math.random() * 3) - 1,
        requestsPerSec: Math.max(3000, prev.requestsPerSec + Math.floor(Math.random() * 200) - 100),
        avgLatency: Math.max(15, prev.avgLatency + (Math.random() - 0.5) * 2)
      }));

      // Update carrier statuses randomly
      setCarrierList(prev => prev.map(c => ({
        ...c,
        responseTime: Math.max(5, parseInt(c.responseTime) + Math.floor(Math.random() * 10) - 5) + "ms",
        lastActive: Math.random() > 0.5 ? "Just now" : c.lastActive
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredCarriers = carrierList.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!selectedRegion || c.region === selectedRegion)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Global Network</h1>
          <p className="text-muted-foreground mt-1">Connected to 500+ carriers worldwide</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-500/20 border border-green-500/30">
            <Signal className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">{liveStats.uptime}% Uptime</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-primary to-accent text-white font-semibold text-sm">
            <Plus className="w-4 h-4" />
            Add Carrier
          </button>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Active Carriers", value: liveStats.activeCarriers, icon: Truck, color: "text-cyber-primary" },
          { label: "Countries", value: liveStats.countries, icon: Globe, color: "text-accent" },
          { label: "Partners", value: liveStats.partners.toLocaleString(), icon: Users, color: "text-green-400" },
          { label: "Uptime", value: liveStats.uptime + "%", icon: CheckCircle, color: "text-emerald-400" },
          { label: "Avg Latency", value: liveStats.avgLatency.toFixed(0) + "ms", icon: Signal, color: "text-yellow-400" },
          { label: "Req/sec", value: liveStats.requestsPerSec.toLocaleString(), icon: TrendingUp, color: "text-purple-400" },
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Region Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Network by Region</h3>
          <div className="flex items-center gap-6">
            <div className="h-48 w-48 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={regionStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="carriers"
                    onClick={(_, index) => setSelectedRegion(selectedRegion === regionStats[index].name ? null : regionStats[index].name)}
                    style={{ cursor: "pointer" }}
                  >
                    {regionStats.map((entry, index) => (
                      <Cell 
                        key={index} 
                        fill={entry.color} 
                        opacity={selectedRegion && selectedRegion !== entry.name ? 0.3 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {regionStats.map((region) => (
                <motion.div
                  key={region.name}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                    selectedRegion === region.name ? "bg-cyber-primary/20" : "hover:bg-cyber-primary/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: region.color }} />
                    <span className="text-sm text-foreground">{region.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-foreground">{region.carriers}</span>
                    <span className="text-xs text-muted-foreground ml-1">carriers</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Network Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-5 border border-cyber-primary/20"
        >
          <h3 className="font-semibold text-foreground mb-4">Network Activity (24h)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={networkActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
                <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: "#04435c", border: "1px solid #10879d", borderRadius: "8px" }} />
                <Bar dataKey="requests" fill="#7fd8dc" radius={[4, 4, 0, 0]} name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Carriers Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl border border-cyber-primary/20 overflow-hidden"
      >
        <div className="p-4 border-b border-cyber-primary/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h3 className="font-semibold text-foreground">Connected Carriers</h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search carriers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyber-primary/40"
              />
            </div>
            <button className="p-2 rounded-lg bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cyber-primary/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Carrier</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Region</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Routes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Latency</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-primary/10">
              <AnimatePresence>
                {filteredCarriers.map((carrier) => (
                  <motion.tr
                    key={carrier.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-cyber-primary/5"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyber-primary/20 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-cyber-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{carrier.name}</p>
                          <p className="text-xs text-muted-foreground">{carrier.lastActive}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-muted-foreground">{carrier.region}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium w-fit ${
                        carrier.status === "online" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {carrier.status === "online" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                        {carrier.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-foreground">{carrier.routes}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-foreground">{carrier.rating}</span>
                        <span className="text-yellow-400">★</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <motion.span 
                        key={carrier.responseTime}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        className={`text-sm font-medium ${parseInt(carrier.responseTime) < 20 ? "text-green-400" : parseInt(carrier.responseTime) < 40 ? "text-yellow-400" : "text-accent"}`}
                      >
                        {carrier.responseTime}
                      </motion.span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <button className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary" title="Ping">
                          <Signal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default NetworkPage;

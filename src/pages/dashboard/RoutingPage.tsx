import { motion } from "framer-motion";
import { Route, MapPin, Clock, Fuel, TrendingUp, Play, Pause, RotateCcw } from "lucide-react";
import { useState } from "react";

const routes = [
  { id: 1, origin: "Los Angeles, CA", destination: "New York, NY", status: "active", eta: "2d 4h", savings: "23%", distance: "2,789 mi" },
  { id: 2, origin: "Shanghai, CN", destination: "Rotterdam, NL", status: "active", eta: "18d 6h", savings: "18%", distance: "11,234 mi" },
  { id: 3, origin: "London, UK", destination: "Dubai, UAE", status: "pending", eta: "5d 2h", savings: "15%", distance: "3,412 mi" },
  { id: 4, origin: "Tokyo, JP", destination: "Singapore, SG", status: "completed", eta: "Delivered", savings: "21%", distance: "3,312 mi" },
];

export const RoutingPage = () => {
  const [optimizing, setOptimizing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Predictive Routing</h1>
          <p className="text-muted-foreground mt-1">AI-powered route optimization with real-time predictions</p>
        </div>
        <button
          onClick={() => setOptimizing(!optimizing)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-primary to-accent text-white font-semibold"
        >
          {optimizing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {optimizing ? "Pause Optimization" : "Start Optimization"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Active Routes", value: "156", icon: Route },
          { label: "Avg. Savings", value: "23%", icon: Fuel },
          { label: "Time Saved", value: "847 hrs", icon: Clock },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 border border-cyber-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-primary/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-cyber-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-xl border border-cyber-primary/20 overflow-hidden">
        <div className="p-4 border-b border-cyber-primary/20">
          <h3 className="font-semibold text-foreground">Active Routes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-cyber-primary/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Route</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Distance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">ETA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Savings</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-primary/10">
              {routes.map((route) => (
                <tr key={route.id} className="hover:bg-cyber-primary/5">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-cyber-primary" />
                      <span className="text-sm text-foreground">{route.origin} → {route.destination}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${route.status === "active" ? "bg-green-500/20 text-green-400" : route.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-cyber-primary/20 text-cyber-primary"}`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{route.distance}</td>
                  <td className="px-4 py-4 text-sm text-foreground">{route.eta}</td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1 text-green-400 text-sm">
                      <TrendingUp className="w-3 h-3" /> {route.savings}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary">
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoutingPage;

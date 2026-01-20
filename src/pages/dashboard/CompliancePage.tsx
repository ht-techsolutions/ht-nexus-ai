import { motion } from "framer-motion";
import { Shield, CheckCircle, AlertTriangle, Globe, FileText } from "lucide-react";

const complianceItems = [
  { id: 1, country: "United States", status: "compliant", lastCheck: "2 hours ago", documents: 12 },
  { id: 2, country: "European Union", status: "compliant", lastCheck: "1 hour ago", documents: 28 },
  { id: 3, country: "China", status: "pending", lastCheck: "30 min ago", documents: 15 },
  { id: 4, country: "United Kingdom", status: "compliant", lastCheck: "4 hours ago", documents: 8 },
  { id: 5, country: "Japan", status: "action_required", lastCheck: "15 min ago", documents: 10 },
];

export const CompliancePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Auto-Compliance</h1>
      <p className="text-muted-foreground mt-1">Automated regulatory compliance across 150+ countries</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Countries Covered", value: "156", icon: Globe, color: "from-cyber-primary to-cyber-secondary" },
        { label: "Documents Processed", value: "2,847", icon: FileText, color: "from-accent to-orange-400" },
        { label: "Compliance Rate", value: "98.7%", icon: Shield, color: "from-green-500 to-emerald-400" },
      ].map((stat, i) => (
        <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass rounded-xl p-5 border border-cyber-primary/20">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
              <stat.icon className="w-5 h-5 text-white" />
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
        <h3 className="font-semibold text-foreground">Compliance Status by Region</h3>
      </div>
      <div className="divide-y divide-cyber-primary/10">
        {complianceItems.map((item) => (
          <div key={item.id} className="p-4 flex items-center justify-between hover:bg-cyber-primary/5">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-cyber-primary" />
              <div>
                <p className="font-medium text-foreground">{item.country}</p>
                <p className="text-xs text-muted-foreground">Last checked: {item.lastCheck}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{item.documents} documents</span>
              <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${item.status === "compliant" ? "bg-green-500/20 text-green-400" : item.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : "bg-red-500/20 text-red-400"}`}>
                {item.status === "compliant" ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                {item.status.replace("_", " ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default CompliancePage;

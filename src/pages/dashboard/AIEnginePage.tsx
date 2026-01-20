import { Cpu, Zap, Brain, Activity } from "lucide-react";

export const AIEnginePage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">AI Decision Engine</h1>
      <p className="text-muted-foreground mt-1">Machine learning models trained on billions of data points</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {[
        { label: "Models Active", value: "12", icon: Brain },
        { label: "Predictions/Day", value: "2.4M", icon: Zap },
        { label: "Accuracy", value: "97.3%", icon: Activity },
        { label: "Processing", value: "Real-time", icon: Cpu },
      ].map((stat) => (
        <div key={stat.label} className="glass rounded-xl p-5 border border-cyber-primary/20">
          <stat.icon className="w-5 h-5 text-accent mb-2" />
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
    <div className="glass rounded-xl p-6 border border-cyber-primary/20">
      <h3 className="font-semibold text-foreground mb-4">AI Model Status</h3>
      <div className="space-y-3">
        {["Route Optimization", "Demand Forecasting", "Risk Assessment", "Price Optimization"].map((model) => (
          <div key={model} className="flex items-center justify-between p-3 rounded-lg bg-cyber-primary/5">
            <span className="text-foreground">{model}</span>
            <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Active</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AIEnginePage;

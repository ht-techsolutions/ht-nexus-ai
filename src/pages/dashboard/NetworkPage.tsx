import { Globe, Users, Truck } from "lucide-react";

export const NetworkPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Global Network</h1>
      <p className="text-muted-foreground mt-1">Connected to 500+ carriers worldwide</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { label: "Active Carriers", value: "524", icon: Truck },
        { label: "Countries", value: "180", icon: Globe },
        { label: "Partners", value: "1,247", icon: Users },
      ].map((stat) => (
        <div key={stat.label} className="glass rounded-xl p-5 border border-cyber-primary/20 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyber-primary/20 flex items-center justify-center">
            <stat.icon className="w-5 h-5 text-cyber-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
    <div className="glass rounded-xl p-8 border border-cyber-primary/20 h-96 flex items-center justify-center">
      <div className="text-center">
        <Globe className="w-16 h-16 text-cyber-primary/30 mx-auto mb-4" />
        <p className="text-muted-foreground">Interactive network map coming soon</p>
      </div>
    </div>
  </div>
);

export default NetworkPage;

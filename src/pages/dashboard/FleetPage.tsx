import { Truck, Wrench, Fuel, MapPin } from "lucide-react";

const vehicles = [
  { id: "TR-2845", status: "active", location: "Los Angeles, CA", fuel: 78, nextMaintenance: "3 days" },
  { id: "TR-1923", status: "active", location: "Chicago, IL", fuel: 45, nextMaintenance: "7 days" },
  { id: "TR-3412", status: "maintenance", location: "Service Center", fuel: 100, nextMaintenance: "Today" },
  { id: "TR-5678", status: "active", location: "Miami, FL", fuel: 62, nextMaintenance: "12 days" },
];

export const FleetPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">Fleet Management</h1>
      <p className="text-muted-foreground mt-1">End-to-end visibility over your entire fleet</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {[
        { label: "Total Vehicles", value: "248", icon: Truck },
        { label: "Active Now", value: "186", icon: MapPin },
        { label: "Avg. Fuel", value: "67%", icon: Fuel },
        { label: "Due Maintenance", value: "12", icon: Wrench },
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
    <div className="glass rounded-xl border border-cyber-primary/20 overflow-hidden">
      <div className="p-4 border-b border-cyber-primary/20">
        <h3 className="font-semibold text-foreground">Vehicle Status</h3>
      </div>
      <div className="divide-y divide-cyber-primary/10">
        {vehicles.map((v) => (
          <div key={v.id} className="p-4 flex items-center justify-between hover:bg-cyber-primary/5">
            <div className="flex items-center gap-3">
              <Truck className="w-5 h-5 text-cyber-primary" />
              <div>
                <p className="font-medium text-foreground">{v.id}</p>
                <p className="text-xs text-muted-foreground">{v.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">{v.fuel}%</p>
                <p className="text-xs text-muted-foreground">Fuel</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${v.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                {v.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default FleetPage;

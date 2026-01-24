import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Truck,
  Wrench,
  Fuel,
  MapPin,
  Battery,
  Thermometer,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Settings,
  Eye,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Clock,
  TrendingUp,
  Gauge,
  Radio,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

type Vehicle = {
  id: string;
  status: string;
  location: string;
  fuel: number;
  battery: number;
  temp: number;
  speed: number;
  nextMaintenance: string;
  driver: string;
  cargo: string;
  lat: number;
  lng: number;
  isNew?: boolean;
};

const initialVehicles: Vehicle[] = [
  {
    id: "TR-2845",
    status: "active",
    location: "Los Angeles, CA",
    fuel: 78,
    battery: 92,
    temp: 72,
    speed: 65,
    nextMaintenance: "3 days",
    driver: "John Smith",
    cargo: "Electronics",
    lat: 34.05,
    lng: -118.24,
  },
  {
    id: "TR-1923",
    status: "active",
    location: "Chicago, IL",
    fuel: 45,
    battery: 88,
    temp: 68,
    speed: 58,
    nextMaintenance: "7 days",
    driver: "Sarah Johnson",
    cargo: "Automotive Parts",
    lat: 41.88,
    lng: -87.63,
  },
  {
    id: "TR-3412",
    status: "maintenance",
    location: "Service Center",
    fuel: 100,
    battery: 100,
    temp: 65,
    speed: 0,
    nextMaintenance: "Today",
    driver: "Mike Brown",
    cargo: "None",
    lat: 40.71,
    lng: -74.01,
  },
  {
    id: "TR-5678",
    status: "active",
    location: "Miami, FL",
    fuel: 62,
    battery: 85,
    temp: 78,
    speed: 72,
    nextMaintenance: "12 days",
    driver: "Emily Davis",
    cargo: "Pharmaceuticals",
    lat: 25.76,
    lng: -80.19,
  },
  {
    id: "TR-9012",
    status: "idle",
    location: "Denver, CO",
    fuel: 95,
    battery: 98,
    temp: 55,
    speed: 0,
    nextMaintenance: "21 days",
    driver: "Tom Wilson",
    cargo: "Food & Beverage",
    lat: 39.74,
    lng: -104.99,
  },
  {
    id: "TR-3456",
    status: "active",
    location: "Seattle, WA",
    fuel: 33,
    battery: 76,
    temp: 62,
    speed: 45,
    nextMaintenance: "5 days",
    driver: "Lisa Chen",
    cargo: "Retail Goods",
    lat: 47.61,
    lng: -122.33,
  },
];

const fleetPerformance = [
  { time: "00:00", efficiency: 85, fuelUsage: 120 },
  { time: "04:00", efficiency: 82, fuelUsage: 95 },
  { time: "08:00", efficiency: 91, fuelUsage: 180 },
  { time: "12:00", efficiency: 88, fuelUsage: 210 },
  { time: "16:00", efficiency: 93, fuelUsage: 195 },
  { time: "20:00", efficiency: 90, fuelUsage: 150 },
];

const statusDistribution = [
  { name: "Active", value: 186, color: "#22c55e" },
  { name: "Idle", value: 42, color: "#7fd8dc" },
  { name: "Maintenance", value: 12, color: "#eab308" },
  { name: "Offline", value: 8, color: "#ef4444" },
];

export const FleetPage = () => {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [liveStats, setLiveStats] = useState({
    totalVehicles: 248,
    activeNow: 186,
    avgFuel: 67,
    maintenanceDue: 12,
    totalMiles: 1245678,
    avgEfficiency: 89,
  });

  const [isTracking, setIsTracking] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  type AddForm = {
    id: string;
    location: string;
    driver: string;
    cargo: string;
    status: string;
    error: string;
    lastFocused?: "id" | "location" | "driver" | "cargo" | "status" | null;
  };
  const [vehicleDetails, setVehicleDetails] = useState<Vehicle | null>(null);
  const [vehicleSettings, setVehicleSettings] = useState<Vehicle | null>(null);
  const { toast } = useToast();

  // Local input refs are created and passed to the form component; the form manages its own draft and focus
  const idRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<HTMLInputElement | null>(null);
  const driverRef = useRef<HTMLInputElement | null>(null);
  const cargoRef = useRef<HTMLInputElement | null>(null);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => ({
          ...v,
          fuel:
            v.status === "active"
              ? Math.max(10, v.fuel - Math.random() * 0.5)
              : v.fuel,
          battery:
            v.status === "active"
              ? Math.max(50, v.battery - Math.random() * 0.2)
              : v.battery,
          speed:
            v.status === "active"
              ? Math.max(40, Math.min(80, v.speed + (Math.random() - 0.5) * 10))
              : v.speed,
          temp: v.temp + (Math.random() - 0.5) * 2,
        })),
      );

      setLiveStats((prev) => ({
        ...prev,
        totalMiles: prev.totalMiles + Math.floor(Math.random() * 50),
        avgFuel: Math.max(50, prev.avgFuel + (Math.random() - 0.5)),
        avgEfficiency: Math.max(
          80,
          Math.min(95, prev.avgEfficiency + (Math.random() - 0.5)),
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!statusFilter || v.status === statusFilter),
  );

  const addVehicle = (payload: {
    id: string;
    location?: string;
    driver?: string;
    cargo?: string;
    status?: string;
  }) => {
    const newV: Vehicle & { isNew?: boolean } = {
      id: payload.id,
      status: payload.status || (payload.id ? "active" : "idle"),
      location: payload.location || "Unknown",
      fuel: 100,
      battery: 100,
      temp: 70,
      speed: 0,
      nextMaintenance: "30 days",
      driver: payload.driver || "Unassigned",
      cargo: payload.cargo || "None",
      lat: 0,
      lng: 0,
      isNew: true,
    };

    setVehicles((prev) => [newV, ...prev]);

    // Remove the 'isNew' highlight after a short interval
    setTimeout(() => {
      setVehicles((prev) =>
        prev.map((v) => (v.id === newV.id ? { ...v, isNew: false } : v)),
      );
    }, 6000);

    // Clear any saved draft and close
    try {
      sessionStorage.removeItem("fleet.addForm");
    } catch (e) {
      /* ignore */
    }
    setIsAddOpen(false);

    toast({
      title: "Vehicle added",
      description: `${payload.id} has been added to fleet`,
    });
  };

  const trackVehicle = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              location: "In transit",
              lastSeen: "Just now",
              speed: Math.max(20, v.speed + 5),
            }
          : v,
      ),
    );
    toast({ title: "Tracking", description: `Now tracking ${id}` });
  };

  const openVehicleDetails = (v: Vehicle) => setVehicleDetails(v);
  const closeVehicleDetails = () => setVehicleDetails(null);
  const openVehicleSettings = (v: Vehicle) => setVehicleSettings(v);
  const closeVehicleSettings = () => setVehicleSettings(null);

  // Self-contained Add Vehicle form: manages its own local state, persistence and focus
  const AddVehicleForm = ({
    idRef,
    locationRef,
    driverRef,
    cargoRef,
    onAdd,
    onCancel,
  }: {
    idRef?: React.RefObject<HTMLInputElement>;
    locationRef?: React.RefObject<HTMLInputElement>;
    driverRef?: React.RefObject<HTMLInputElement>;
    cargoRef?: React.RefObject<HTMLInputElement>;
    onAdd: (payload: {
      id: string;
      location?: string;
      driver?: string;
      cargo?: string;
      status?: string;
    }) => void;
    onCancel: () => void;
  }) => {
    const [form, setForm] = useState<AddForm>({
      id: "",
      location: "",
      driver: "",
      cargo: "",
      status: "active",
      error: "",
      lastFocused: null,
    });
    const lastFocusedRef = useRef<AddForm["lastFocused"]>(null);

    // Rehydrate draft on mount
    useEffect(() => {
      try {
        const raw = sessionStorage.getItem("fleet.addForm");
        if (raw) {
          const parsed = JSON.parse(raw) as AddForm;
          setForm(parsed);
          // restore focus only if we have a lastFocused field
          if (parsed.lastFocused) {
            setTimeout(() => {
              const refMap = {
                id: idRef,
                location: locationRef,
                driver: driverRef,
                cargo: cargoRef,
              } as const;
              const r = refMap[parsed.lastFocused as keyof typeof refMap];
              r?.current?.focus();
            }, 0);
          }
        }
      } catch (e) {
        console.warn("Failed to restore add form draft", e);
      }
    }, [idRef, locationRef, driverRef, cargoRef]);

    // Persist draft on changes; only persists locally (no parent updates)
    useEffect(() => {
      try {
        const toSave = {
          ...form,
          lastFocused: lastFocusedRef.current ?? form.lastFocused ?? null,
        };
        sessionStorage.setItem("fleet.addForm", JSON.stringify(toSave));
      } catch (e) {
        console.warn("Failed to persist add form draft", e);
      }
    }, [form]);

    const handleChange = (k: keyof AddForm, v: string) =>
      setForm((s) => ({ ...s, [k]: v }) as AddForm);
    const handleFieldFocus = (f: AddForm["lastFocused"]) => {
      lastFocusedRef.current = f;
    };

    const handleAdd = () => {
      if (!form.id.trim()) {
        setForm((s) => ({ ...s, error: "Vehicle ID is required" }));
        return;
      }
      onAdd({
        id: form.id.trim(),
        location: form.location.trim(),
        driver: form.driver.trim(),
        cargo: form.cargo.trim(),
        status: form.status,
      });
      try {
        sessionStorage.removeItem("fleet.addForm");
      } catch (e) {
        /* ignore */
      }
    };

    return (
      <div
        className='space-y-3'
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      >
        <div>
          <label className='text-sm'>
            Vehicle ID{" "}
            <span className='text-xs text-muted-foreground'>(required)</span>
          </label>
          <input
            ref={idRef}
            value={form.id}
            onFocus={() => handleFieldFocus("id")}
            onChange={(e) => handleChange("id", e.target.value)}
            placeholder='e.g. TR-1234'
            className='w-full mt-1 p-2 rounded-md bg-cyber-primary/5 border border-cyber-primary/10'
          />
        </div>
        <div>
          <label className='text-sm'>Location</label>
          <input
            ref={locationRef}
            value={form.location}
            onFocus={() => handleFieldFocus("location")}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder='City, State'
            className='w-full mt-1 p-2 rounded-md bg-cyber-primary/5 border border-cyber-primary/10'
          />
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <div>
            <label className='text-sm'>Driver</label>
            <input
              ref={driverRef}
              value={form.driver}
              onFocus={() => handleFieldFocus("driver")}
              onChange={(e) => handleChange("driver", e.target.value)}
              placeholder='Driver name'
              className='w-full mt-1 p-2 rounded-md bg-cyber-primary/5 border border-cyber-primary/10'
            />
          </div>
          <div>
            <label className='text-sm'>Cargo</label>
            <input
              ref={cargoRef}
              value={form.cargo}
              onFocus={() => handleFieldFocus("cargo")}
              onChange={(e) => handleChange("cargo", e.target.value)}
              placeholder='Cargo description'
              className='w-full mt-1 p-2 rounded-md bg-cyber-primary/5 border border-cyber-primary/10'
            />
          </div>
        </div>
        <div>
          <label className='text-sm'>Status</label>
          <select
            value={form.status}
            onFocus={() => handleFieldFocus("status")}
            onChange={(e) => handleChange("status", e.target.value)}
            className='w-full mt-1 p-2 rounded-md bg-cyber-primary/5 border border-cyber-primary/10'
          >
            <option value='active'>Active</option>
            <option value='idle'>Idle</option>
            <option value='maintenance'>Maintenance</option>
            <option value='offline'>Offline</option>
          </select>
        </div>

        {form.error && <p className='text-xs text-red-400'>{form.error}</p>}

        <div className='flex items-center justify-between pt-2'>
          <div className='text-xs text-muted-foreground'>
            Preview: <span className='font-medium'>{form.id || "—"}</span> •{" "}
            <span className='font-medium'>{form.status}</span> •{" "}
            <span className='font-medium'>{form.location || "—"}</span>
          </div>
          <div className='flex items-center gap-2'>
            <button
              onClick={onCancel}
              className='px-3 py-1 rounded-md bg-cyber-primary/10'
            >
              Cancel
            </button>
            <button
              disabled={!form.id.trim()}
              onClick={handleAdd}
              className={`px-3 py-1 rounded-md ${!form.id.trim() ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-cyber-primary text-white"}`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "idle":
        return "bg-cyber-primary/20 text-cyber-primary";
      case "maintenance":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-red-500/20 text-red-400";
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div>
          <h1 className='text-2xl md:text-3xl font-display font-bold text-foreground'>
            Fleet Management
          </h1>
          <p className='text-muted-foreground mt-1'>
            End-to-end visibility over your entire fleet
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => {
              setIsTracking((s) => !s);
              toast({
                title: isTracking ? "Tracking disabled" : "Tracking enabled",
              });
            }}
            className='flex items-center gap-2 px-4 py-2 rounded-xl bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary font-medium text-sm hover:bg-cyber-primary/20 transition-colors'
          >
            <Radio className='w-4 h-4' />
            {isTracking ? "Live Tracking" : "Tracking Off"}
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className='flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyber-primary to-accent text-white font-semibold text-sm'
          >
            <Plus className='w-4 h-4' />
            Add Vehicle
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4'>
        {[
          {
            label: "Total Vehicles",
            value: liveStats.totalVehicles,
            icon: Truck,
            color: "text-cyber-primary",
          },
          {
            label: "Active Now",
            value: liveStats.activeNow,
            icon: MapPin,
            color: "text-green-400",
          },
          {
            label: "Avg. Fuel",
            value: liveStats.avgFuel.toFixed(0) + "%",
            icon: Fuel,
            color: "text-accent",
          },
          {
            label: "Due Maintenance",
            value: liveStats.maintenanceDue,
            icon: Wrench,
            color: "text-yellow-400",
          },
          {
            label: "Total Miles",
            value: (liveStats.totalMiles / 1000).toFixed(0) + "K",
            icon: TrendingUp,
            color: "text-purple-400",
          },
          {
            label: "Efficiency",
            value: liveStats.avgEfficiency.toFixed(0) + "%",
            icon: Gauge,
            color: "text-emerald-400",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className='glass rounded-xl p-4 border border-cyber-primary/20'
          >
            <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
            <motion.p
              key={String(stat.value)}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className='text-xl font-bold text-foreground'
            >
              {stat.value}
            </motion.p>
            <p className='text-xs text-muted-foreground'>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Fleet Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='glass rounded-xl p-5 border border-cyber-primary/20'
        >
          <h3 className='font-semibold text-foreground mb-4'>Fleet Status</h3>
          <div className='flex items-center gap-4'>
            <div className='h-40 w-40'>
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx='50%'
                    cy='50%'
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey='value'
                    onClick={(_, index) =>
                      setStatusFilter(
                        statusFilter ===
                          statusDistribution[index].name.toLowerCase()
                          ? null
                          : statusDistribution[index].name.toLowerCase(),
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={entry.color}
                        opacity={
                          statusFilter &&
                          statusFilter !== entry.name.toLowerCase()
                            ? 0.3
                            : 1
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#04435c",
                      border: "1px solid #10879d",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='flex-1 space-y-2'>
              {statusDistribution.map((status) => (
                <motion.div
                  key={status.name}
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    setStatusFilter(
                      statusFilter === status.name.toLowerCase()
                        ? null
                        : status.name.toLowerCase(),
                    )
                  }
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                    statusFilter === status.name.toLowerCase()
                      ? "bg-cyber-primary/20"
                      : "hover:bg-cyber-primary/10"
                  }`}
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className='w-3 h-3 rounded-full'
                      style={{ backgroundColor: status.color }}
                    />
                    <span className='text-sm text-foreground'>
                      {status.name}
                    </span>
                  </div>
                  <span className='text-sm font-medium text-foreground'>
                    {status.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='lg:col-span-2 glass rounded-xl p-5 border border-cyber-primary/20'
        >
          <h3 className='font-semibold text-foreground mb-4'>
            Fleet Performance (24h)
          </h3>
          <div className='h-48'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={fleetPerformance}>
                <defs>
                  <linearGradient
                    id='efficiencyGrad'
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop offset='5%' stopColor='#7fd8dc' stopOpacity={0.3} />
                    <stop offset='95%' stopColor='#7fd8dc' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' stroke='#1e3a3a' />
                <XAxis dataKey='time' stroke='#6b7280' fontSize={12} />
                <YAxis stroke='#6b7280' fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#04435c",
                    border: "1px solid #10879d",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type='monotone'
                  dataKey='efficiency'
                  stroke='#7fd8dc'
                  strokeWidth={2}
                  fill='url(#efficiencyGrad)'
                  name='Efficiency %'
                />
                <Line
                  type='monotone'
                  dataKey='fuelUsage'
                  stroke='#ec6216'
                  strokeWidth={2}
                  name='Fuel Usage (gal)'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Vehicle Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='glass rounded-xl border border-cyber-primary/20 overflow-hidden'
      >
        <div className='p-4 border-b border-cyber-primary/20 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
          <h3 className='font-semibold text-foreground'>Vehicle Status</h3>
          <div className='flex items-center gap-3 w-full sm:w-auto'>
            <div className='relative flex-1 sm:flex-initial'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground' />
              <input
                type='text'
                placeholder='Search vehicles...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg bg-cyber-primary/10 border border-cyber-primary/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyber-primary/40'
              />
            </div>
            <button
              onClick={() => setStatusFilter(null)}
              className='p-2 rounded-lg bg-cyber-primary/10 text-cyber-primary hover:bg-cyber-primary/20 transition-colors'
            >
              <RefreshCw className='w-4 h-4' />
            </button>
          </div>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-cyber-primary/5'>
              <tr>
                <th className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase'>
                  Vehicle
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase'>
                  Status
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase'>
                  Location
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase'>
                  Fuel
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase'>
                  Battery
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase'>
                  Speed
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase'>
                  Driver
                </th>
                <th className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-cyber-primary/10'>
              <AnimatePresence>
                {filteredVehicles.map((v) => (
                  <motion.tr
                    key={v.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`hover:bg-cyber-primary/5 cursor-pointer ${selectedVehicle === v.id ? "bg-cyber-primary/10" : ""} ${v.isNew ? "ring-2 ring-cyber-primary/30" : ""}`}
                    onClick={() =>
                      setSelectedVehicle(selectedVehicle === v.id ? null : v.id)
                    }
                  >
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-xl bg-cyber-primary/20 flex items-center justify-center'>
                          <Truck className='w-5 h-5 text-cyber-primary' />
                        </div>
                        <div>
                          <p className='font-medium text-foreground'>
                            {v.id}
                            {v.isNew && (
                              <span className='ml-2 inline-flex items-center text-xs font-semibold bg-cyber-primary text-white px-2 py-0.5 rounded-full'>
                                New
                              </span>
                            )}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {v.cargo}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(v.status)}`}
                      >
                        {v.status}
                      </span>
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-1'>
                        <MapPin className='w-3 h-3 text-cyber-primary' />
                        <span className='text-sm text-muted-foreground'>
                          {v.location}
                        </span>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-2'>
                        <div className='w-16 h-2 bg-cyber-primary/20 rounded-full overflow-hidden'>
                          <motion.div
                            className={`h-full rounded-full ${v.fuel > 50 ? "bg-green-400" : v.fuel > 25 ? "bg-yellow-400" : "bg-red-400"}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${v.fuel}%` }}
                          />
                        </div>
                        <span className='text-sm text-foreground'>
                          {v.fuel.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-2'>
                        <Battery
                          className={`w-4 h-4 ${v.battery > 80 ? "text-green-400" : v.battery > 50 ? "text-yellow-400" : "text-red-400"}`}
                        />
                        <span className='text-sm text-foreground'>
                          {v.battery.toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-1'>
                        <Gauge className='w-4 h-4 text-cyber-primary' />
                        <motion.span
                          key={v.speed}
                          initial={{ scale: 1.1 }}
                          animate={{ scale: 1 }}
                          className='text-sm font-medium text-foreground'
                        >
                          {v.speed.toFixed(0)} mph
                        </motion.span>
                      </div>
                    </td>
                    <td className='px-4 py-4 text-sm text-muted-foreground'>
                      {v.driver}
                    </td>
                    <td className='px-4 py-4'>
                      <div className='flex items-center gap-1'>
                        <button
                          onClick={() => openVehicleDetails(v)}
                          className='p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary'
                          title='View Details'
                        >
                          <Eye className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => trackVehicle(v.id)}
                          className='p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary'
                          title='Track'
                        >
                          <Navigation className='w-4 h-4' />
                        </button>
                        <button
                          onClick={() => openVehicleSettings(v)}
                          className='p-2 rounded-lg hover:bg-cyber-primary/10 text-cyber-primary'
                          title='Settings'
                        >
                          <Settings className='w-4 h-4' />
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

      {/* Add Vehicle Modal */}
      <AnimatePresence>
        {isAddOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center'
          >
            <div
              className='absolute inset-0 bg-black/40'
              onClick={() => setIsAddOpen(false)}
            />
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className='bg-background rounded-xl p-6 w-full max-w-md z-50 border border-cyber-primary/20'
            >
              <h3 className='text-lg font-semibold mb-3'>Add Vehicle</h3>
              <AddVehicleForm
                idRef={idRef}
                locationRef={locationRef}
                driverRef={driverRef}
                cargoRef={cargoRef}
                onAdd={(payload) => addVehicle(payload)}
                onCancel={() => setIsAddOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicle Details Modal */}
      <AnimatePresence>
        {vehicleDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center'
          >
            <div
              className='absolute inset-0 bg-black/40'
              onClick={closeVehicleDetails}
            />
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className='bg-background rounded-xl p-6 w-full max-w-lg z-50 border border-cyber-primary/20'
            >
              <div className='flex items-start justify-between'>
                <div>
                  <h3 className='text-lg font-semibold'>{vehicleDetails.id}</h3>
                  <p className='text-sm text-muted-foreground'>
                    {vehicleDetails.location} • {vehicleDetails.driver}
                  </p>
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => {
                      setVehicles((prev) =>
                        prev.map((v) =>
                          v.id === vehicleDetails.id
                            ? { ...v, status: "maintenance" }
                            : v,
                        ),
                      );
                      toast({
                        title: "Maintenance scheduled",
                        description: `${vehicleDetails.id} set to maintenance`,
                      });
                      closeVehicleDetails();
                    }}
                    className='px-3 py-1 rounded-md bg-yellow-400 text-white'
                  >
                    Schedule Maintenance
                  </button>
                  <button
                    onClick={closeVehicleDetails}
                    className='px-3 py-1 rounded-md bg-cyber-primary/10'
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className='mt-4 grid grid-cols-2 gap-4'>
                <div className='p-3 rounded-md bg-cyber-primary/5'>
                  <p className='text-xs text-muted-foreground'>Fuel</p>
                  <p className='font-medium'>
                    {vehicleDetails.fuel.toFixed(0)}%
                  </p>
                </div>
                <div className='p-3 rounded-md bg-cyber-primary/5'>
                  <p className='text-xs text-muted-foreground'>Battery</p>
                  <p className='font-medium'>
                    {vehicleDetails.battery.toFixed(0)}%
                  </p>
                </div>
                <div className='p-3 rounded-md bg-cyber-primary/5'>
                  <p className='text-xs text-muted-foreground'>Speed</p>
                  <p className='font-medium'>
                    {vehicleDetails.speed.toFixed(0)} mph
                  </p>
                </div>
                <div className='p-3 rounded-md bg-cyber-primary/5'>
                  <p className='text-xs text-muted-foreground'>
                    Next Maintenance
                  </p>
                  <p className='font-medium'>
                    {vehicleDetails.nextMaintenance}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vehicle Settings Modal */}
      <AnimatePresence>
        {vehicleSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-50 flex items-center justify-center'
          >
            <div
              className='absolute inset-0 bg-black/40'
              onClick={closeVehicleSettings}
            />
            <motion.div
              initial={{ scale: 0.98 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.98 }}
              className='bg-background rounded-xl p-6 w-full max-w-md z-50 border border-cyber-primary/20'
            >
              <div className='flex items-center justify-between mb-3'>
                <h3 className='text-lg font-semibold'>
                  {vehicleSettings.id} Settings
                </h3>
                <button
                  onClick={closeVehicleSettings}
                  className='px-3 py-1 rounded-md bg-cyber-primary/10'
                >
                  Close
                </button>
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium'>Status</h4>
                    <p className='text-xs text-muted-foreground'>
                      Set the operational status
                    </p>
                  </div>
                  <select
                    defaultValue={vehicleSettings.status}
                    onChange={(e) =>
                      setVehicles((prev) =>
                        prev.map((v) =>
                          v.id === vehicleSettings.id
                            ? { ...v, status: e.target.value }
                            : v,
                        ),
                      )
                    }
                    className='px-3 py-1 rounded-md bg-cyber-primary/5'
                  >
                    <option value='active'>Active</option>
                    <option value='idle'>Idle</option>
                    <option value='maintenance'>Maintenance</option>
                    <option value='offline'>Offline</option>
                  </select>
                </div>

                <div className='flex items-center justify-between'>
                  <div>
                    <h4 className='font-medium'>Actions</h4>
                    <p className='text-xs text-muted-foreground'>
                      Perform vehicle specific actions
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => {
                        trackVehicle(vehicleSettings.id);
                        closeVehicleSettings();
                      }}
                      className='px-3 py-1 rounded-md bg-cyber-primary text-white'
                    >
                      Track Now
                    </button>
                    <button
                      onClick={() => {
                        setVehicles((prev) =>
                          prev.filter((v) => v.id !== vehicleSettings.id),
                        );
                        toast({
                          title: "Removed",
                          description: `${vehicleSettings.id} removed from fleet`,
                        });
                        closeVehicleSettings();
                      }}
                      className='px-3 py-1 rounded-md bg-red-400 text-white'
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FleetPage;

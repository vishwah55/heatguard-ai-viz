import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind, Eye, AlertTriangle, TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import GlassCard from "@/components/GlassCard";
import RiskMeter from "@/components/RiskMeter";

const surgeData = [
  { hour: "6AM", admissions: 12, ambulance: 3 },
  { hour: "8AM", admissions: 18, ambulance: 5 },
  { hour: "10AM", admissions: 35, ambulance: 8 },
  { hour: "12PM", admissions: 52, ambulance: 14 },
  { hour: "2PM", admissions: 68, ambulance: 19 },
  { hour: "4PM", admissions: 58, ambulance: 15 },
  { hour: "6PM", admissions: 40, ambulance: 10 },
  { hour: "8PM", admissions: 25, ambulance: 6 },
  { hour: "10PM", admissions: 15, ambulance: 4 },
];

const wardData = [
  { ward: "Ward A", score: 82 },
  { ward: "Ward B", score: 65 },
  { ward: "Ward C", score: 91 },
  { ward: "Ward D", score: 45 },
  { ward: "Ward E", score: 73 },
  { ward: "Ward F", score: 58 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">
            Institutional <span className="text-gradient-primary">Dashboard</span>
          </h1>
          <p className="text-muted-foreground">Real-time climate risk intelligence for decision makers</p>
        </motion.div>

        {/* Weather Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Thermometer, label: "Temperature", value: "42.3°C", sub: "+2.1° from avg", color: "text-heat-danger" },
            { icon: Droplets, label: "Humidity", value: "67%", sub: "High moisture", color: "text-primary" },
            { icon: Wind, label: "Wind Speed", value: "8 km/h", sub: "Light breeze", color: "text-foreground" },
            { icon: Eye, label: "Heat Index", value: "48.7", sub: "Extreme caution", color: "text-accent" },
          ].map((card, i) => (
            <GlassCard key={card.label} delay={i * 0.1}>
              <div className="flex items-center gap-3 mb-3">
                <card.icon className={`w-5 h-5 ${card.color}`} />
                <span className="text-sm text-muted-foreground">{card.label}</span>
              </div>
              <div className={`stat-counter text-2xl font-bold ${card.color}`}>{card.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{card.sub}</div>
            </GlassCard>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <GlassCard delay={0.2}>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h3 className="font-display text-lg font-semibold text-foreground">Hospital Surge Prediction</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={surgeData}>
                <defs>
                  <linearGradient id="admGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 20%)" />
                <XAxis dataKey="hour" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "hsl(222, 40%, 12%)", border: "1px solid hsl(222, 20%, 25%)", borderRadius: "12px", color: "hsl(210, 40%, 96%)" }}
                />
                <Area type="monotone" dataKey="admissions" stroke="hsl(0, 84%, 60%)" fill="url(#admGrad)" strokeWidth={2} name="Admissions" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>

          <GlassCard delay={0.3}>
            <div className="flex items-center gap-2 mb-6">
              <AlertTriangle className="w-5 h-5 text-accent" />
              <h3 className="font-display text-lg font-semibold text-foreground">Ambulance Demand Forecast</h3>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={surgeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 20%, 20%)" />
                <XAxis dataKey="hour" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "hsl(222, 40%, 12%)", border: "1px solid hsl(222, 20%, 25%)", borderRadius: "12px", color: "hsl(210, 40%, 96%)" }}
                />
                <Bar dataKey="ambulance" fill="hsl(30, 95%, 55%)" radius={[6, 6, 0, 0]} name="Ambulances" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* Ward Vulnerability */}
        <GlassCard delay={0.4}>
          <h3 className="font-display text-lg font-semibold text-foreground mb-6">Ward-Level Vulnerability Grid</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {wardData.map((w) => (
              <RiskMeter key={w.ward} score={w.score} label={w.ward} size={100} />
            ))}
          </div>
        </GlassCard>

        {/* Advisory */}
        <GlassCard delay={0.5} glow="danger" className="mt-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 pulse-glow">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">⚠️ Active Heat Advisory</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Extreme heat conditions detected across 73% of monitored grid cells. Peak temperatures expected between 1 PM – 4 PM.
                Hospital surge capacity at 82%. Recommend activating emergency heat protocol and deploying additional cooling stations in Ward C and Ward A.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Dashboard;

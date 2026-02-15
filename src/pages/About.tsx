import { motion } from "framer-motion";
import { Brain, Database, Cloud, Shield, Layers, Cpu } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const stack = [
  { icon: Brain, title: "ML Risk Engine", desc: "RandomForestClassifier model with rule-based fallback for real-time vulnerability scoring." },
  { icon: Cloud, title: "Weather Ingestion", desc: "OpenWeather API integration with 30-minute grid-based temperature updates." },
  { icon: Database, title: "Geospatial Database", desc: "MongoDB Atlas with 2dsphere indexing for high-performance spatial queries." },
  { icon: Layers, title: "GIS Visualization", desc: "Leaflet.js interactive heatmap with color-coded vulnerability overlays." },
  { icon: Shield, title: "JWT Authentication", desc: "Role-based access control for users and institutional administrators." },
  { icon: Cpu, title: "Microservice Architecture", desc: "FastAPI ML service + Express API + React frontend for scalable deployment." },
];

const About = () => {
  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient-primary">HeatGuard AI</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            An AI-powered climate intelligence platform designed to predict heatwave risks, protect vulnerable populations, and empower institutions with actionable data.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {stack.map((item, i) => (
            <GlassCard key={item.title} delay={i * 0.1} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="text-center">
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">System Architecture</h3>
          <p className="text-muted-foreground text-sm mb-6">Weather API → Grid Assignment → ML Microservice → Risk Scoring → Database → Real-Time Frontend</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["React + Vite", "Node.js + Express", "FastAPI + scikit-learn", "MongoDB Atlas", "Leaflet.js", "Recharts", "JWT Auth", "OpenWeather API"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground border border-border/40">{tech}</span>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default About;

import { motion } from "framer-motion";
import { ArrowRight, Shield, MapPin, Activity, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import GlassCard from "@/components/GlassCard";
import StatCounter from "@/components/StatCounter";
import RiskMeter from "@/components/RiskMeter";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const features = [
  {
    icon: MapPin,
    title: "Real-Time Heat Map",
    desc: "Interactive GIS-powered heatmap with live temperature grid cells, color-coded vulnerability zones, and GPS-based location tracking.",
  },
  {
    icon: Shield,
    title: "AI Risk Assessment",
    desc: "ML-powered personal risk scoring based on age, health conditions, occupation, and real-time environmental data.",
  },
  {
    icon: Activity,
    title: "Hospital Surge Prediction",
    desc: "Forecast emergency department demand, ambulance needs, and ward-level vulnerability during extreme heat events.",
  },
  {
    icon: Zap,
    title: "Instant Health Alerts",
    desc: "Personalized hydration reminders, safe outdoor timing, and automated heat advisories pushed to your device.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 gradient-hero opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 pt-24 pb-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">AI-Powered Climate Intelligence</span>
            </motion.div>

            <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Predict. Protect.{" "}
              <span className="text-gradient-heat">Survive</span> the Heat.
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Real-time heatwave vulnerability mapping and personalized health alerts powered by machine learning. Protecting communities before disaster strikes.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/heatmap"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl gradient-primary font-semibold text-primary-foreground hover:opacity-90 transition-opacity glow-primary"
              >
                Explore Heat Map <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/risk"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass-card font-semibold text-foreground hover:bg-muted/50 transition-colors"
              >
                Check Your Risk
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter end={2847} label="Grid Cells Monitored" />
            <StatCounter end={99} suffix="%" label="Prediction Accuracy" />
            <StatCounter end={14} suffix="M" label="People Protected" />
            <StatCounter end={30} suffix="min" label="Update Interval" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
              Climate Intelligence, <span className="text-gradient-primary">Reimagined</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced AI models analyze real-time weather data to deliver actionable health insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <GlassCard key={f.title} delay={i * 0.1}>
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Demo */}
      <section className="py-20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Personal <span className="text-gradient-heat">Risk Score</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our AI model evaluates your personal vulnerability based on age, pre-existing conditions, occupation type, and real-time environmental exposure to generate a dynamic risk score updated every 30 minutes.
              </p>
              <Link
                to="/risk"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
              >
                Calculate Your Risk <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center gap-8"
            >
              <RiskMeter score={72} label="Heat Index" />
              <RiskMeter score={45} label="Vulnerability" />
              <RiskMeter score={88} label="Exposure" size={120} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>© 2026 HeatGuard AI — Climate Intelligence Platform. Built for resilience.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

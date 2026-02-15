import { useState } from "react";
import { motion } from "framer-motion";
import { Droplets, Sun, Clock, AlertTriangle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import RiskMeter from "@/components/RiskMeter";

const healthConditions = ["None", "Hypertension", "Diabetes", "Heart Disease", "Respiratory Issues", "Kidney Disease"];
const occupations = ["Indoor Office", "Outdoor Labor", "Healthcare", "Construction", "Agriculture", "Student"];

const PersonalRisk = () => {
  const [age, setAge] = useState(30);
  const [condition, setCondition] = useState("None");
  const [occupation, setOccupation] = useState("Indoor Office");
  const [exposure, setExposure] = useState(2);
  const [result, setResult] = useState<null | { score: number; hydration: string; timing: string; advisory: string }>(null);

  const calculate = () => {
    // Rule-based risk calculation (simulating ML response)
    let score = 20;
    if (age > 60) score += 25;
    else if (age > 45) score += 15;
    else if (age < 18) score += 10;

    const conditionMap: Record<string, number> = { None: 0, Hypertension: 15, Diabetes: 12, "Heart Disease": 20, "Respiratory Issues": 18, "Kidney Disease": 16 };
    score += conditionMap[condition] || 0;

    const occMap: Record<string, number> = { "Indoor Office": 0, "Outdoor Labor": 25, Healthcare: 5, Construction: 22, Agriculture: 20, Student: 3 };
    score += occMap[occupation] || 0;

    score += Math.min(exposure * 4, 20);
    score = Math.min(score, 100);

    const hydration = score > 60 ? "Drink 500ml water every 30 minutes. Add electrolytes." : score > 40 ? "Drink 250ml water every hour. Stay hydrated." : "Maintain regular hydration — 2-3L daily.";
    const timing = score > 60 ? "Avoid outdoor activity between 10 AM – 5 PM." : score > 40 ? "Limit outdoor exposure between 12 PM – 3 PM." : "Safe for outdoor activity with precautions.";
    const advisory = score > 70 ? "⚠️ HIGH RISK — Seek air-conditioned shelter. Monitor for heat stroke symptoms." : score > 50 ? "⚡ MODERATE RISK — Take frequent breaks in shade." : "✅ LOW RISK — Normal precautions advised.";

    setResult({ score, hydration, timing, advisory });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2">
            Personal <span className="text-gradient-primary">Risk Calculator</span>
          </h1>
          <p className="text-muted-foreground">AI-powered health vulnerability assessment</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <GlassCard>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">Your Profile</h3>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Age: {age}</label>
                <input type="range" min={5} max={100} value={age} onChange={(e) => setAge(+e.target.value)}
                  className="w-full accent-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Health Condition</label>
                <select value={condition} onChange={(e) => setCondition(e.target.value)}
                  className="w-full p-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {healthConditions.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Occupation</label>
                <select value={occupation} onChange={(e) => setOccupation(e.target.value)}
                  className="w-full p-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {occupations.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Outdoor Exposure: {exposure}h/day</label>
                <input type="range" min={0} max={12} value={exposure} onChange={(e) => setExposure(+e.target.value)}
                  className="w-full accent-primary" />
              </div>
              <button onClick={calculate}
                className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-semibold glow-primary hover:opacity-90 transition-opacity">
                Calculate Risk Score
              </button>
            </div>
          </GlassCard>

          {/* Result */}
          <div className="space-y-6">
            {result ? (
              <>
                <GlassCard glow={result.score > 60 ? "danger" : result.score > 40 ? "accent" : "primary"}>
                  <div className="flex justify-center mb-4">
                    <RiskMeter score={result.score} label="Overall Risk" size={160} />
                  </div>
                  <div className={`text-center p-3 rounded-xl text-sm font-medium ${
                    result.score > 70 ? "bg-destructive/10 text-destructive pulse-glow" : result.score > 40 ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"
                  }`}>
                    {result.advisory}
                  </div>
                </GlassCard>

                <div className="grid gap-4">
                  <GlassCard delay={0.1} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Hydration</h4>
                      <p className="text-sm text-muted-foreground">{result.hydration}</p>
                    </div>
                  </GlassCard>
                  <GlassCard delay={0.2} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground mb-1">Safe Timing</h4>
                      <p className="text-sm text-muted-foreground">{result.timing}</p>
                    </div>
                  </GlassCard>
                </div>
              </>
            ) : (
              <GlassCard className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <Sun className="w-16 h-16 text-muted-foreground/30 mb-4 animate-float" />
                <p className="text-muted-foreground">Fill in your details and calculate your personalized heat risk score.</p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalRisk;

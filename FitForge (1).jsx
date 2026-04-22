import { useState, useEffect } from "react";

const SCREENS = ["onboard1", "onboard2", "onboard3", "home", "plan", "nutrition", "progress"];

const physiques = [
  { id: "lean", label: "Lean & Toned", icon: "⚡", desc: "Low body fat, defined muscles" },
  { id: "athletic", label: "Athletic Build", icon: "🏆", desc: "Strong, functional, balanced" },
  { id: "bulk", label: "Bulk & Mass", icon: "💪", desc: "Maximum muscle size & strength" },
  { id: "endurance", label: "Endurance", icon: "🔥", desc: "Stamina, cardio, longevity" },
];

const timeOptions = [
  { id: "15", label: "15 min", sub: "Quick bursts" },
  { id: "30", label: "30 min", sub: "Efficient" },
  { id: "45", label: "45 min", sub: "Balanced" },
  { id: "60", label: "60 min", sub: "Dedicated" },
  { id: "90", label: "90 min", sub: "Serious" },
];

const workoutPlans = {
  lean: {
    gym: [
      { day: "Mon", name: "Upper Cut", exercises: ["Cable Flyes 4×15", "Lat Pulldown 4×12", "Shoulder Press 3×15", "Tricep Pushdown 3×20"], tag: "Strength" },
      { day: "Tue", name: "HIIT Cardio", exercises: ["Treadmill Intervals 20min", "Jump Rope 5min", "Box Jumps 4×10", "Battle Ropes 3×30s"], tag: "Cardio" },
      { day: "Wed", name: "Lower Sculpt", exercises: ["Leg Press 4×15", "Romanian Deadlift 4×12", "Leg Curl 3×15", "Calf Raises 4×20"], tag: "Strength" },
      { day: "Thu", name: "Active Rest", exercises: ["Yoga Flow 20min", "Foam Rolling 10min", "Light Walk 20min"], tag: "Recovery" },
      { day: "Fri", name: "Full Body Burn", exercises: ["Barbell Complex 4×8", "Kettlebell Swings 4×15", "Pull-ups 3×Max", "Core Circuit 3×"], tag: "Strength" },
    ],
    noGym: [
      { day: "Mon", name: "Push Power", exercises: ["Push-ups 5×20", "Pike Push-ups 4×12", "Dips (chair) 4×15", "Plank 3×60s"], tag: "Strength" },
      { day: "Tue", name: "Run & Burn", exercises: ["Interval Run 20min", "Jump Squats 4×15", "Burpees 3×10", "Mountain Climbers 3×30s"], tag: "Cardio" },
      { day: "Wed", name: "Pull Day", exercises: ["Pull-ups 5×Max", "Inverted Rows 4×12", "Superman 3×15", "Reverse Snow Angels 3×20"], tag: "Strength" },
      { day: "Thu", name: "Recovery", exercises: ["Stretching 20min", "Light Yoga 15min", "Walk 30min"], tag: "Recovery" },
      { day: "Fri", name: "Full Shred", exercises: ["Burpee Complex 4×8", "Jump Lunges 4×12", "Push-up Variations 3×15", "Abs Circuit 3×"], tag: "Strength" },
    ],
  },
  athletic: {
    gym: [
      { day: "Mon", name: "Power Lift", exercises: ["Squat 5×5", "Bench Press 5×5", "Barbell Row 5×5", "Core Work 3×"], tag: "Power" },
      { day: "Tue", name: "Speed & Agility", exercises: ["Sprints 6×40m", "Agility Ladder 15min", "Box Jumps 4×8", "Med Ball Throws 4×10"], tag: "Cardio" },
      { day: "Wed", name: "Olympic Lift", exercises: ["Power Clean 5×3", "Push Press 4×6", "Romanian DL 4×8", "Farmer Carries 4×30m"], tag: "Power" },
      { day: "Thu", name: "Active Rest", exercises: ["Mobility Work 30min", "Light Swimming 20min", "Foam Rolling 10min"], tag: "Recovery" },
      { day: "Fri", name: "Compound Day", exercises: ["Deadlift 5×3", "Pull-ups 5×Max", "Dips 4×12", "Sled Push 4×20m"], tag: "Power" },
    ],
    noGym: [
      { day: "Mon", name: "Bodyweight Power", exercises: ["Explosive Push-ups 5×8", "Jump Squats 5×10", "Pull-ups 5×Max", "Core Circuit 3×"], tag: "Power" },
      { day: "Tue", name: "Sprint Day", exercises: ["Hill Sprints 8×20s", "Lateral Bounds 4×10", "Single Leg Hops 4×8", "Agility Drills 15min"], tag: "Cardio" },
      { day: "Wed", name: "Strength Circuit", exercises: ["Pistol Squats 4×6", "Archer Push-ups 4×8", "Nordic Curls 4×5", "L-Sit Holds 4×20s"], tag: "Power" },
      { day: "Thu", name: "Recovery", exercises: ["Mobility Flow 30min", "Light Jog 15min", "Stretching 15min"], tag: "Recovery" },
      { day: "Fri", name: "Functional Fit", exercises: ["Bear Crawls 4×20m", "Jump Lunges 4×12", "Explosive Pull-ups 4×6", "Plank Variations 3×"], tag: "Power" },
    ],
  },
  bulk: {
    gym: [
      { day: "Mon", name: "Chest & Tri", exercises: ["Bench Press 5×5", "Incline DB Press 4×10", "Cable Crossover 4×12", "Skull Crushers 4×10"], tag: "Mass" },
      { day: "Tue", name: "Back & Bi", exercises: ["Deadlift 4×5", "Barbell Row 4×8", "Lat Pulldown 4×12", "Barbell Curls 4×12"], tag: "Mass" },
      { day: "Wed", name: "Legs", exercises: ["Squat 5×5", "Leg Press 4×12", "Romanian DL 4×10", "Leg Curl 4×12"], tag: "Mass" },
      { day: "Thu", name: "Shoulders", exercises: ["OHP 4×8", "Lateral Raises 4×15", "Face Pulls 4×15", "Shrugs 4×12"], tag: "Mass" },
      { day: "Fri", name: "Arms & Abs", exercises: ["EZ Bar Curls 4×12", "Hammer Curls 4×12", "Tricep Dips 4×Max", "Weighted Abs 4×15"], tag: "Mass" },
    ],
    noGym: [
      { day: "Mon", name: "Push Mass", exercises: ["Wide Push-ups 5×Max", "Diamond Push-ups 4×15", "Pike Push-ups 4×12", "Tricep Dips 4×Max"], tag: "Mass" },
      { day: "Tue", name: "Pull Mass", exercises: ["Pull-ups 5×Max", "Chin-ups 4×Max", "Inverted Rows 4×15", "Bicep Curls (bag) 4×15"], tag: "Mass" },
      { day: "Wed", name: "Leg Mass", exercises: ["Pistol Squats 5×8", "Bulgarian Split Squats 4×12", "Single Leg DL 4×10", "Calf Raises 5×25"], tag: "Mass" },
      { day: "Thu", name: "Shoulders", exercises: ["Handstand Push-ups 4×Max", "Pike Push-ups 4×15", "YTW Raises 4×10", "Band Pull-Aparts 4×20"], tag: "Mass" },
      { day: "Fri", name: "Full Body", exercises: ["Burpees 4×10", "Jump Squats 4×15", "Explosive Push-ups 4×12", "Core Circuit 4×"], tag: "Mass" },
    ],
  },
  endurance: {
    gym: [
      { day: "Mon", name: "Long Run", exercises: ["Treadmill Run 40min", "Elliptical 15min", "Stretching 10min"], tag: "Cardio" },
      { day: "Tue", name: "Cross Train", exercises: ["Rowing Machine 20min", "Bike 20min", "Light Lifting 3×15"], tag: "Cardio" },
      { day: "Wed", name: "Strength Base", exercises: ["Squat 3×15", "Deadlift 3×12", "Push-ups 3×20", "Core Circuit 3×"], tag: "Strength" },
      { day: "Thu", name: "Tempo Run", exercises: ["Tempo Run 30min", "Stair Climber 15min", "Foam Rolling 10min"], tag: "Cardio" },
      { day: "Fri", name: "Zone 2 Cardio", exercises: ["Easy Run 50min", "Light Yoga 15min", "Mobility Work 10min"], tag: "Cardio" },
    ],
    noGym: [
      { day: "Mon", name: "Distance Run", exercises: ["Easy Run 40min", "Walk 10min cooldown", "Stretching 10min"], tag: "Cardio" },
      { day: "Tue", name: "Cross Train", exercises: ["Bike Ride 30min", "Swim 20min", "Yoga 15min"], tag: "Cardio" },
      { day: "Wed", name: "Strength", exercises: ["Push-ups 3×20", "Squats 3×20", "Lunges 3×15", "Core Circuit 3×"], tag: "Strength" },
      { day: "Thu", name: "Intervals", exercises: ["Run Intervals 25min", "Jump Rope 10min", "Stretching 10min"], tag: "Cardio" },
      { day: "Fri", name: "Long Easy", exercises: ["Long Run 50min", "Cool Down Walk 10min", "Full Body Stretch 15min"], tag: "Cardio" },
    ],
  },
};

const nutritionPlans = {
  lean: { calories: 2100, protein: 175, carbs: 200, fat: 65, meals: ["Greek yogurt + berries + granola", "Grilled chicken salad + quinoa", "Apple + almond butter", "Salmon + sweet potato + broccoli", "Cottage cheese + cucumber"] },
  athletic: { calories: 2800, protein: 200, carbs: 300, fat: 80, meals: ["Oats + eggs + banana", "Turkey wrap + veggies + hummus", "Rice cakes + peanut butter", "Steak + rice + asparagus", "Protein shake + trail mix"] },
  bulk: { calories: 3400, protein: 220, carbs: 420, fat: 95, meals: ["6 eggs + oats + milk", "Chicken breast + pasta + olive oil", "Mass shake + banana + peanut butter", "Ribeye + large potato + butter", "Cottage cheese + nuts + honey"] },
  endurance: { calories: 2600, protein: 150, carbs: 380, fat: 70, meals: ["Oatmeal + honey + banana", "Pasta + marinara + chicken", "Energy bar + sports drink", "Salmon + quinoa + spinach", "Rice pudding + raisins"] },
};

const tagColors = {
  Strength: { bg: "#1a2a1a", text: "#4ade80", border: "#166534" },
  Cardio: { bg: "#1a1a2a", text: "#818cf8", border: "#3730a3" },
  Power: { bg: "#2a1a1a", text: "#f87171", border: "#991b1b" },
  Mass: { bg: "#2a1a2a", text: "#e879f9", border: "#7e22ce" },
  Recovery: { bg: "#1a2a2a", text: "#22d3ee", border: "#155e75" },
};

export default function FitForge() {
  const [screen, setScreen] = useState("onboard1");
  const [physique, setPhysique] = useState(null);
  const [time, setTime] = useState(null);
  const [hasGym, setHasGym] = useState(null);
  const [activeTab, setActiveTab] = useState("plan");
  const [streak, setStreak] = useState(14);
  const [completedDays, setCompletedDays] = useState({ Mon: true, Tue: true, Wed: true });
  const [expandedDay, setExpandedDay] = useState(null);
  const [animating, setAnimating] = useState(false);

  const advance = (next) => {
    setAnimating(true);
    setTimeout(() => { setScreen(next); setAnimating(false); }, 280);
  };

  const plan = physique ? (hasGym ? workoutPlans[physique].gym : workoutPlans[physique].noGym) : [];
  const nutrition = physique ? nutritionPlans[physique] : null;

  const styles = {
    app: {
      maxWidth: 390,
      minHeight: "100vh",
      margin: "0 auto",
      background: "#080c0f",
      fontFamily: "'DM Sans', sans-serif",
      color: "#f0f4f8",
      position: "relative",
      overflow: "hidden",
    },
    screen: {
      opacity: animating ? 0 : 1,
      transform: animating ? "translateY(18px)" : "translateY(0)",
      transition: "opacity 0.28s ease, transform 0.28s ease",
    },
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080c0f; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a3540; border-radius: 4px; }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px #c8f04430; } 50% { box-shadow: 0 0 40px #c8f04460; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      `}</style>
      <div style={styles.app}>
        <div style={styles.screen}>
          {screen === "onboard1" && <Onboard1 advance={advance} physique={physique} setPhysique={setPhysique} />}
          {screen === "onboard2" && <Onboard2 advance={advance} time={time} setTime={setTime} />}
          {screen === "onboard3" && <Onboard3 advance={advance} hasGym={hasGym} setHasGym={setHasGym} />}
          {["home", "plan", "nutrition", "progress"].includes(screen) && (
            <MainApp
              screen={screen} setScreen={setScreen} activeTab={activeTab} setActiveTab={setActiveTab}
              physique={physique} time={time} hasGym={hasGym} plan={plan} nutrition={nutrition}
              streak={streak} completedDays={completedDays} setCompletedDays={setCompletedDays}
              expandedDay={expandedDay} setExpandedDay={setExpandedDay}
            />
          )}
        </div>
      </div>
    </>
  );
}

function Onboard1({ advance, physique, setPhysique }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg, #0d1f1a 0%, #080c0f 60%)", padding: "56px 28px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, #c8f04415 0%, transparent 70%)" }} />
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 4, color: "#c8f044", textTransform: "uppercase", marginBottom: 16 }}>FitForge AI</div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 54, lineHeight: 1, color: "#f0f4f8", marginBottom: 12 }}>
          BUILD YOUR<br /><span style={{ color: "#c8f044" }}>IDEAL BODY</span>
        </div>
        <p style={{ fontSize: 15, color: "#8ca0af", lineHeight: 1.6, maxWidth: 280 }}>AI-powered plans built around your physique goals, schedule, and equipment.</p>
      </div>

      <div style={{ flex: 1, padding: "28px 20px 40px", background: "#080c0f" }}>
        <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, color: "#8ca0af", textTransform: "uppercase", marginBottom: 16 }}>What's your goal physique?</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {physiques.map(p => (
            <button key={p.id} onClick={() => setPhysique(p.id)} style={{
              background: physique === p.id ? "linear-gradient(135deg, #1a2e18, #1f3820)" : "#0f1820",
              border: physique === p.id ? "1.5px solid #c8f044" : "1.5px solid #1e2d38",
              borderRadius: 16, padding: "18px 20px", cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 16,
              transition: "all 0.2s ease",
              boxShadow: physique === p.id ? "0 0 24px #c8f04420" : "none",
            }}>
              <div style={{ fontSize: 28, width: 48, height: 48, borderRadius: 14, background: physique === p.id ? "#c8f04415" : "#151f28", display: "flex", alignItems: "center", justifyContent: "center" }}>{p.icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: physique === p.id ? "#c8f044" : "#f0f4f8", marginBottom: 3 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: "#8ca0af" }}>{p.desc}</div>
              </div>
              {physique === p.id && <div style={{ marginLeft: "auto", fontSize: 18, color: "#c8f044" }}>✓</div>}
            </button>
          ))}
        </div>
        <button onClick={() => physique && advance("onboard2")} style={{
          width: "100%", marginTop: 28, padding: "18px", borderRadius: 18,
          background: physique ? "linear-gradient(135deg, #c8f044, #a8d030)" : "#1a2530",
          border: "none", color: physique ? "#080c0f" : "#4a5a68", fontSize: 17, fontWeight: 800,
          cursor: physique ? "pointer" : "not-allowed", letterSpacing: 0.5,
          transition: "all 0.25s ease",
          boxShadow: physique ? "0 8px 32px #c8f04440" : "none",
        }}>Continue →</button>
      </div>
    </div>
  );
}

function Onboard2({ advance, time, setTime }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(160deg, #0d1820 0%, #080c0f 60%)", padding: "56px 28px 32px" }}>
        <button onClick={() => advance("onboard1")} style={{ background: "none", border: "none", color: "#8ca0af", fontSize: 14, cursor: "pointer", marginBottom: 24, padding: 0 }}>← Back</button>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 4, color: "#c8f044", textTransform: "uppercase", marginBottom: 12 }}>Step 2 of 3</div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, lineHeight: 1, color: "#f0f4f8", marginBottom: 10 }}>
          HOW MUCH TIME<br /><span style={{ color: "#c8f044" }}>PER SESSION?</span>
        </div>
        <p style={{ fontSize: 14, color: "#8ca0af" }}>We'll design workouts that fit your schedule perfectly.</p>
      </div>
      <div style={{ flex: 1, padding: "28px 20px 40px", background: "#080c0f" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {timeOptions.map(t => (
            <button key={t.id} onClick={() => setTime(t.id)} style={{
              background: time === t.id ? "linear-gradient(135deg, #1a2e18, #1f3820)" : "#0f1820",
              border: time === t.id ? "1.5px solid #c8f044" : "1.5px solid #1e2d38",
              borderRadius: 16, padding: "20px 16px", cursor: "pointer", textAlign: "center",
              transition: "all 0.2s ease",
              boxShadow: time === t.id ? "0 0 20px #c8f04420" : "none",
            }}>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: 40, color: time === t.id ? "#c8f044" : "#f0f4f8", lineHeight: 1 }}>{t.label}</div>
              <div style={{ fontSize: 12, color: "#8ca0af", marginTop: 4, fontWeight: 500 }}>{t.sub}</div>
            </button>
          ))}
        </div>
        <button onClick={() => time && advance("onboard3")} style={{
          width: "100%", marginTop: 28, padding: "18px", borderRadius: 18,
          background: time ? "linear-gradient(135deg, #c8f044, #a8d030)" : "#1a2530",
          border: "none", color: time ? "#080c0f" : "#4a5a68", fontSize: 17, fontWeight: 800,
          cursor: time ? "pointer" : "not-allowed",
          transition: "all 0.25s ease",
          boxShadow: time ? "0 8px 32px #c8f04440" : "none",
        }}>Continue →</button>
      </div>
    </div>
  );
}

function Onboard3({ advance, hasGym, setHasGym }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "linear-gradient(160deg, #0d1820 0%, #080c0f 60%)", padding: "56px 28px 32px" }}>
        <button onClick={() => advance("onboard2")} style={{ background: "none", border: "none", color: "#8ca0af", fontSize: 14, cursor: "pointer", marginBottom: 24, padding: 0 }}>← Back</button>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 4, color: "#c8f044", textTransform: "uppercase", marginBottom: 12 }}>Step 3 of 3</div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 48, lineHeight: 1, color: "#f0f4f8", marginBottom: 10 }}>
          GYM ACCESS<br /><span style={{ color: "#c8f044" }}>OR HOME?</span>
        </div>
        <p style={{ fontSize: 14, color: "#8ca0af" }}>Your plan adapts to the equipment you have available.</p>
      </div>
      <div style={{ flex: 1, padding: "28px 20px 40px", background: "#080c0f" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { val: true, icon: "🏋️", title: "I have a gym pass", sub: "Full equipment access — barbells, machines, cables" },
            { val: false, icon: "🏠", title: "Home / No gym", sub: "Bodyweight & minimal equipment workouts" },
          ].map(opt => (
            <button key={String(opt.val)} onClick={() => setHasGym(opt.val)} style={{
              background: hasGym === opt.val ? "linear-gradient(135deg, #1a2e18, #1f3820)" : "#0f1820",
              border: hasGym === opt.val ? "1.5px solid #c8f044" : "1.5px solid #1e2d38",
              borderRadius: 20, padding: "24px 22px", cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 18, transition: "all 0.2s ease",
              boxShadow: hasGym === opt.val ? "0 0 28px #c8f04425" : "none",
            }}>
              <div style={{ fontSize: 36 }}>{opt.icon}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: hasGym === opt.val ? "#c8f044" : "#f0f4f8", marginBottom: 4 }}>{opt.title}</div>
                <div style={{ fontSize: 13, color: "#8ca0af", lineHeight: 1.4 }}>{opt.sub}</div>
              </div>
              {hasGym === opt.val && <div style={{ marginLeft: "auto", color: "#c8f044", fontSize: 20 }}>✓</div>}
            </button>
          ))}
        </div>
        <button onClick={() => hasGym !== null && advance("plan")} style={{
          width: "100%", marginTop: 32, padding: "18px", borderRadius: 18,
          background: hasGym !== null ? "linear-gradient(135deg, #c8f044, #a8d030)" : "#1a2530",
          border: "none", color: hasGym !== null ? "#080c0f" : "#4a5a68", fontSize: 17, fontWeight: 800,
          cursor: hasGym !== null ? "pointer" : "not-allowed",
          transition: "all 0.25s ease",
          boxShadow: hasGym !== null ? "0 8px 32px #c8f04440" : "none",
        }}>Build My Plan 🚀</button>
      </div>
    </div>
  );
}

function MainApp({ screen, setScreen, activeTab, setActiveTab, physique, time, hasGym, plan, nutrition, streak, completedDays, setCompletedDays, expandedDay, setExpandedDay }) {
  const tabs = [
    { id: "plan", label: "Plan", icon: "📋" },
    { id: "nutrition", label: "Nutrition", icon: "🥗" },
    { id: "progress", label: "Progress", icon: "📈" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(180deg, #0d1f1a 0%, #080c0f 100%)", padding: "52px 24px 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 13, color: "#8ca0af", fontWeight: 500, marginBottom: 4 }}>Your FitForge Plan</div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: "#f0f4f8", lineHeight: 1 }}>
              {physiques.find(p => p.id === physique)?.label?.toUpperCase()}
            </div>
          </div>
          <div style={{ textAlign: "center", background: "#0f1e16", borderRadius: 16, padding: "12px 18px", border: "1px solid #1e3a28" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 30, color: "#c8f044", lineHeight: 1 }}>{streak}</div>
            <div style={{ fontSize: 11, color: "#8ca0af", fontWeight: 600 }}>DAY STREAK 🔥</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          <Chip icon="⏱" label={`${time} min`} />
          <Chip icon={hasGym ? "🏋️" : "🏠"} label={hasGym ? "Gym" : "Home"} />
          <Chip icon="🤖" label="AI-Powered" />
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{ display: "flex", background: "#0a1118", borderBottom: "1px solid #1a2530", padding: "0 8px" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, padding: "14px 8px 12px", background: "none", border: "none",
            borderBottom: activeTab === t.id ? "2.5px solid #c8f044" : "2.5px solid transparent",
            color: activeTab === t.id ? "#c8f044" : "#4a6070",
            fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            transition: "color 0.2s ease",
          }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 16px 100px" }}>
        {activeTab === "plan" && <PlanTab plan={plan} completedDays={completedDays} setCompletedDays={setCompletedDays} expandedDay={expandedDay} setExpandedDay={setExpandedDay} />}
        {activeTab === "nutrition" && <NutritionTab nutrition={nutrition} physique={physique} />}
        {activeTab === "progress" && <ProgressTab streak={streak} completedDays={completedDays} physique={physique} />}
      </div>
    </div>
  );
}

function Chip({ icon, label }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#0f1e28", border: "1px solid #1e3040", borderRadius: 20, padding: "6px 12px", fontSize: 12, fontWeight: 600, color: "#8ca0af" }}>
      <span>{icon}</span>{label}
    </div>
  );
}

function PlanTab({ plan, completedDays, setCompletedDays, expandedDay, setExpandedDay }) {
  const toggleDay = (day) => setCompletedDays(prev => ({ ...prev, [day]: !prev[day] }));
  const today = "Thu";
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#8ca0af", textTransform: "uppercase", marginBottom: 14 }}>This Week's Plan</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {plan.map((workout, i) => {
          const isToday = workout.day === today;
          const done = completedDays[workout.day];
          const expanded = expandedDay === workout.day;
          const tc = tagColors[workout.tag] || tagColors.Strength;
          return (
            <div key={workout.day} style={{
              background: done ? "#0a180f" : isToday ? "#0f1e28" : "#0c1520",
              border: isToday ? "1.5px solid #2a4a5a" : done ? "1.5px solid #1a3822" : "1.5px solid #141f28",
              borderRadius: 18, overflow: "hidden", transition: "all 0.25s ease",
              boxShadow: isToday ? "0 4px 24px #00000040" : "none",
            }}>
              <div onClick={() => setExpandedDay(expanded ? null : workout.day)} style={{ padding: "16px 18px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ textAlign: "center", minWidth: 38 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isToday ? "#c8f044" : "#4a6070", letterSpacing: 1 }}>{workout.day.toUpperCase()}</div>
                  {isToday && <div style={{ fontSize: 9, color: "#c8f044", fontWeight: 700, letterSpacing: 0.5, marginTop: 2 }}>TODAY</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: done ? "#4a7a58" : "#f0f4f8", textDecoration: done ? "line-through" : "none", marginBottom: 4 }}>{workout.name}</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: tc.bg, border: `1px solid ${tc.border}`, borderRadius: 8, padding: "3px 8px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: tc.text }}>{workout.tag}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 16 }}>{expanded ? "▲" : "▼"}</div>
                  <button onClick={(e) => { e.stopPropagation(); toggleDay(workout.day); }} style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: done ? "#c8f044" : "transparent",
                    border: done ? "none" : "2px solid #2a3a48",
                    color: done ? "#080c0f" : "#4a6070", fontSize: 14,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s ease",
                  }}>{done ? "✓" : ""}</button>
                </div>
              </div>
              {expanded && (
                <div style={{ borderTop: "1px solid #1a2530", padding: "14px 18px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {workout.exercises.map((ex, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: "#080c0f", borderRadius: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#c8f044", flexShrink: 0 }} />
                      <span style={{ fontSize: 14, color: "#c8d8e0", fontWeight: 500 }}>{ex}</span>
                    </div>
                  ))}
                  {isToday && (
                    <button style={{ marginTop: 8, padding: "13px", borderRadius: 14, background: "linear-gradient(135deg, #c8f044, #a8d030)", border: "none", color: "#080c0f", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
                      Start Workout ▶
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function NutritionTab({ nutrition, physique }) {
  if (!nutrition) return null;
  const macros = [
    { name: "Protein", val: nutrition.protein, unit: "g", color: "#f87171", pct: Math.round(nutrition.protein * 4 / nutrition.calories * 100) },
    { name: "Carbs", val: nutrition.carbs, unit: "g", color: "#818cf8", pct: Math.round(nutrition.carbs * 4 / nutrition.calories * 100) },
    { name: "Fat", val: nutrition.fat, unit: "g", color: "#fbbf24", pct: Math.round(nutrition.fat * 9 / nutrition.calories * 100) },
  ];
  return (
    <div>
      {/* Calorie card */}
      <div style={{ background: "linear-gradient(135deg, #0d2018, #0a1a10)", border: "1px solid #1a3828", borderRadius: 20, padding: "24px", marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#4a7a58", textTransform: "uppercase", marginBottom: 8 }}>Daily Target</div>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 64, color: "#c8f044", lineHeight: 1, animation: "pulse-glow 3s ease infinite" }}>{nutrition.calories}</div>
        <div style={{ fontSize: 16, color: "#8ca0af", fontWeight: 500 }}>calories / day</div>
      </div>

      {/* Macros */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
        {macros.map(m => (
          <div key={m.name} style={{ background: "#0c1520", border: "1px solid #1a2530", borderRadius: 16, padding: "16px 12px", textAlign: "center" }}>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 36, color: m.color, lineHeight: 1 }}>{m.val}</div>
            <div style={{ fontSize: 11, color: "#8ca0af", fontWeight: 600, letterSpacing: 0.5 }}>{m.unit} {m.name}</div>
            <div style={{ marginTop: 8, height: 4, background: "#1a2530", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${m.pct}%`, background: m.color, borderRadius: 2 }} />
            </div>
            <div style={{ fontSize: 10, color: "#4a6070", marginTop: 4 }}>{m.pct}%</div>
          </div>
        ))}
      </div>

      {/* Meals */}
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#8ca0af", textTransform: "uppercase", marginBottom: 12 }}>Meal Plan</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {nutrition.meals.map((meal, i) => (
          <div key={i} style={{ background: "#0c1520", border: "1px solid #1a2530", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "#0f1e28", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              {["☀️", "🌿", "🍎", "🌙", "🥛"][i]}
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#4a7a58", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>
                {["Breakfast", "Lunch", "Snack", "Dinner", "Late Snack"][i]}
              </div>
              <div style={{ fontSize: 14, color: "#c8d8e0", fontWeight: 500 }}>{meal}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressTab({ streak, completedDays, physique }) {
  const weeks = [
    [true, true, false, false, false, false, false],
    [true, true, true, true, false, false, false],
    [true, false, true, true, true, false, false],
    [true, true, true, false, false, false, false],
  ];
  const completedCount = Object.values(completedDays).filter(Boolean).length;
  const stats = [
    { label: "Workouts Done", val: 23, icon: "💪" },
    { label: "This Week", val: `${completedCount}/5`, icon: "📅" },
    { label: "Best Streak", val: "21 days", icon: "🔥" },
    { label: "Calories Burned", val: "12.4k", icon: "⚡" },
  ];
  return (
    <div>
      {/* Streak */}
      <div style={{ background: "linear-gradient(135deg, #1a1a0d, #141408)", border: "1px solid #2a2a10", borderRadius: 20, padding: "24px", marginBottom: 16, textAlign: "center" }}>
        <div style={{ fontFamily: "'Bebas Neue'", fontSize: 72, color: "#c8f044", lineHeight: 1 }}>{streak}</div>
        <div style={{ fontSize: 16, color: "#8ca0af", fontWeight: 600 }}>Day Streak 🔥</div>
        <div style={{ marginTop: 16, fontSize: 13, color: "#4a7a30", fontWeight: 600 }}>Keep it going — you're on fire!</div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "#0c1520", border: "1px solid #1a2530", borderRadius: 16, padding: "18px 16px" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Bebas Neue'", fontSize: 32, color: "#f0f4f8", lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 12, color: "#8ca0af", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Calendar heatmap */}
      <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2, color: "#8ca0af", textTransform: "uppercase", marginBottom: 12 }}>Activity Heatmap</div>
      <div style={{ background: "#0c1520", border: "1px solid #1a2530", borderRadius: 16, padding: "18px" }}>
        <div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", gap: 4 }}>
              {week.map((active, di) => (
                <div key={di} style={{ width: 36, height: 36, borderRadius: 8, background: active ? `rgba(200,240,68,${0.3 + wi * 0.18})` : "#131d28", border: active ? "1px solid #c8f04440" : "1px solid #1a2530", transition: "all 0.2s" }} />
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 14, alignItems: "center" }}>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#131d28", border: "1px solid #1a2530" }} />
          <span style={{ fontSize: 11, color: "#4a6070" }}>Rest</span>
          <div style={{ width: 12, height: 12, borderRadius: 3, background: "#c8f04470", marginLeft: 8 }} />
          <span style={{ fontSize: 11, color: "#4a6070" }}>Workout</span>
        </div>
      </div>

      {/* Premium Upsell */}
      <div style={{ marginTop: 16, background: "linear-gradient(135deg, #0d1f1a, #12281e)", border: "1.5px solid #2a4a3a", borderRadius: 20, padding: "22px" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#c8f044", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🚀 FitForge Pro</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#f0f4f8", marginBottom: 8 }}>Unlock your full potential</div>
        <div style={{ fontSize: 13, color: "#8ca0af", lineHeight: 1.6, marginBottom: 16 }}>
          Video demos • Advanced analytics • Custom meal plans • 1-on-1 AI coaching
        </div>
        <button style={{ width: "100%", padding: "15px", borderRadius: 14, background: "linear-gradient(135deg, #c8f044, #a8d030)", border: "none", color: "#080c0f", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
          Start Free Trial — $14.99/mo
        </button>
      </div>
    </div>
  );
}

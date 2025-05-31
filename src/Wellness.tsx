import { useState, useEffect } from "react";
import {
  Heart,
  Brain,
  Leaf,
  Sun,
  Moon,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Wellness = () => {
  const [selectedPractice, setSelectedPractice] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [completedPractices, setCompletedPractices] = useState<string[]>(() => {
    const saved = localStorage.getItem("completedPractices");
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(
      "completedPractices",
      JSON.stringify(completedPractices)
    );
  }, [completedPractices]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined = undefined;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((timer: number) => timer - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const practices = [
    {
      id: "breathing",
      title: "4-7-8 Breathing",
      icon: <Leaf className="w-6 h-6" />,
      duration: "2-5 min",
      difficulty: "Beginner",
      description:
        "A calming breath pattern that reduces anxiety and promotes relaxation.",
      instructions: [
        "Sit comfortably with your back straight",
        "Exhale completely through your mouth",
        "Close your mouth, inhale through nose for 4 counts",
        "Hold your breath for 7 counts",
        "Exhale through mouth for 8 counts",
        "Repeat 3-4 cycles",
      ],
      benefits: ["Reduces anxiety", "Improves sleep", "Lowers stress"],
    },
    {
      id: "body-scan",
      title: "Body Scan Meditation",
      icon: <Heart className="w-6 h-6" />,
      duration: "10-20 min",
      difficulty: "Beginner",
      description:
        "Progressive awareness of physical sensations throughout your body.",
      instructions: [
        "Lie down comfortably or sit with eyes closed",
        "Start with three deep breaths",
        "Focus attention on your toes",
        "Notice any sensations without judgment",
        "Slowly move up: feet, legs, torso, arms, neck, head",
        "Spend 30-60 seconds on each body part",
        "End with awareness of your whole body",
      ],
      benefits: ["Releases tension", "Improves body awareness", "Reduces pain"],
    },
    {
      id: "mindful-walking",
      title: "Mindful Walking",
      icon: <Sun className="w-6 h-6" />,
      duration: "5-15 min",
      difficulty: "Beginner",
      description: "Transform ordinary walking into a meditative practice.",
      instructions: [
        "Walk slower than usual",
        "Feel your feet touching the ground",
        "Notice the rhythm of your steps",
        "Be aware of your surroundings without judgment",
        "When mind wanders, return to the sensation of walking",
        "Focus on one step at a time",
      ],
      benefits: [
        "Grounds you in present",
        "Combines movement & mindfulness",
        "Easy to do anywhere",
      ],
    },
    {
      id: "loving-kindness",
      title: "Loving-Kindness Meditation",
      icon: <Heart className="w-6 h-6" />,
      duration: "10-15 min",
      difficulty: "Intermediate",
      description: "Cultivate compassion for yourself and others.",
      instructions: [
        "Sit comfortably and close your eyes",
        'Begin with yourself: "May I be happy, may I be healthy, may I be at peace"',
        "Visualize someone you love, repeat the phrases for them",
        "Think of a neutral person, extend the same wishes",
        "Consider someone difficult, offer the same kindness",
        "Extend to all beings everywhere",
      ],
      benefits: [
        "Increases compassion",
        "Reduces negative emotions",
        "Improves relationships",
      ],
    },
    {
      id: "five-senses",
      title: "5-4-3-2-1 Grounding",
      icon: <Brain className="w-6 h-6" />,
      duration: "3-5 min",
      difficulty: "Beginner",
      description: "Use your senses to anchor yourself in the present moment.",
      instructions: [
        "Name 5 things you can see",
        "Name 4 things you can touch",
        "Name 3 things you can hear",
        "Name 2 things you can smell",
        "Name 1 thing you can taste",
        "Take three deep breaths",
      ],
      benefits: ["Stops anxiety spirals", "Quick reset tool", "Works anywhere"],
    },
    {
      id: "evening-reflection",
      title: "Evening Reflection",
      icon: <Moon className="w-6 h-6" />,
      duration: "5-10 min",
      difficulty: "Beginner",
      description: "End your day with gratitude and gentle reflection.",
      instructions: [
        "Find a quiet moment before bed",
        "Think of 3 things you're grateful for today",
        "Reflect on one positive moment from your day",
        "Acknowledge any challenges without judgment",
        "Set an intention for tomorrow",
        "Take 5 deep, releasing breaths",
      ],
      benefits: ["Improves sleep", "Increases gratitude", "Processes the day"],
    },
  ];

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setTimer(0);
    setIsTimerRunning(false);
  };

  const markCompleted = (practiceId: string) => {
    if (!completedPractices.includes(practiceId)) {
      setCompletedPractices([...completedPractices, practiceId]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (selectedPractice) {
    const practice = practices.find((p) => p.id === selectedPractice);
    if (!practice) return null;
    return (
      <div className="max-w-4xl mx-auto p-2 sm:p-4 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        <button
          onClick={() => navigate("/")}
          className="mb-4 sm:mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8">
          <button
            onClick={() => setSelectedPractice(null)}
            className="mb-4 sm:mb-6 text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base"
          >
            ← Back to Practices
          </button>
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
            <div className="text-indigo-600">{practice.icon}</div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {practice.title}
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                {practice.duration} • {practice.difficulty}
              </p>
            </div>
          </div>
          <p className="text-gray-700 mb-6 text-base sm:text-lg">
            {practice.description}
          </p>
          {/* Timer */}
          <div className="bg-indigo-50 rounded-xl p-4 sm:p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-2xl sm:text-3xl font-mono text-indigo-800">
                {formatTime(timer)}
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => startTimer(5)}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                >
                  5 min
                </button>
                <button
                  onClick={() => startTimer(10)}
                  className="px-3 py-2 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm sm:text-base"
                >
                  10 min
                </button>
                <button
                  onClick={toggleTimer}
                  className="p-2 sm:p-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {isTimerRunning ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={resetTimer}
                  className="p-2 sm:p-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          {/* Instructions */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Instructions
            </h3>
            <ol className="space-y-3">
              {practice.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 text-sm sm:text-base">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          {/* Benefits */}
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Benefits
            </h3>
            <div className="flex flex-wrap gap-2">
              {practice.benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => markCompleted(practice.id)}
            className={`w-full py-3 rounded-xl font-medium transition-all text-sm sm:text-base ${
              completedPractices.includes(practice.id)
                ? "bg-green-100 text-green-800 border-2 border-green-300"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {completedPractices.includes(practice.id)
              ? "✓ Completed Today"
              : "Mark as Completed"}
          </button>
          {completedPractices.includes(practice.id) && (
            <button
              onClick={() =>
                setCompletedPractices(
                  completedPractices.filter((id) => id !== practice.id)
                )
              }
              className="w-full mt-2 py-3 rounded-xl font-medium bg-red-100 text-red-800 border-2 border-red-300 hover:bg-red-200 transition-all text-sm sm:text-base"
            >
              Reset Completion
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-2 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <button
        onClick={() => navigate("/")}
        className="mb-4 sm:mb-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium text-sm sm:text-base"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Home
      </button>
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">
          Your Mindfulness Practice
        </h1>
        <p className="text-gray-600 text-sm sm:text-lg max-w-2xl mx-auto">
          Choose a practice that fits your current mood and available time.
          Start small and build consistency.
        </p>
      </div>
      {/* Quick Stats */}
      <div className="bg-white rounded-xl p-4 sm:p-6 mb-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">
              Today's Progress
            </h3>
            <p className="text-gray-600 text-sm sm:text-base">
              {completedPractices.length} of {practices.length} practices
              completed
            </p>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-indigo-600">
            {Math.round((completedPractices.length / practices.length) * 100)}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-3 sm:mt-4">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedPractices.length / practices.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
      {/* Practice Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {practices.map((practice) => (
          <div
            key={practice.id}
            className={`bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 ${
              completedPractices.includes(practice.id)
                ? "border-green-300 bg-green-50"
                : "border-transparent hover:border-indigo-200"
            }`}
            onClick={() => setSelectedPractice(practice.id)}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="text-indigo-600">{practice.icon}</div>
              {completedPractices.includes(practice.id) && (
                <div className="text-green-600 font-bold text-base sm:text-lg">
                  ✓
                </div>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">
              {practice.title}
            </h3>
            <p className="text-gray-600 mb-2 sm:mb-4 text-xs sm:text-sm">
              {practice.description}
            </p>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium">
                {practice.duration}
              </span>
              <span className="text-gray-500">{practice.difficulty}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Daily Tip */}
      <div className="mt-6 sm:mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-4 sm:p-6 text-white">
        <h3 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2">
          💡 Today's Mindfulness Tip
        </h3>
        <p className="text-xs sm:text-base">
          Start with just 2-3 minutes of practice. Consistency matters more than
          duration. Even one mindful breath can make a difference in your day.
        </p>
      </div>
    </div>
  );
};

export default Wellness;

import { useState, useEffect } from "react";
import {
  Clock,
  Target,
  CheckCircle,
  // AlertCircle,
  // Calendar,
  Zap,
  Brain,
  Home,
  Building,
} from "lucide-react";

interface Task {
  id: number;
  text: string;
  estimatedTime: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  broken: boolean;
  location: string;
  createdAt: Date;
}

const ProcrastinationBuster = () => {
  // Initialize state from localStorage or defaults
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTask, setCurrentTask] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");
  const [workLocation, setWorkLocation] = useState(() => {
    return localStorage.getItem("workLocation") || "home";
  });
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [completedToday, setCompletedToday] = useState(() => {
    const saved = localStorage.getItem("completedToday");
    const savedDate = localStorage.getItem("completedDate");
    const today = new Date().toDateString();

    // Reset counter if it's a new day
    if (savedDate !== today) {
      return 0;
    }
    return saved ? parseInt(saved) : 0;
  });

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save work location when it changes
  useEffect(() => {
    localStorage.setItem("workLocation", workLocation);
  }, [workLocation]);

  // Save completed count and date
  useEffect(() => {
    localStorage.setItem("completedToday", completedToday.toString());
    localStorage.setItem("completedDate", new Date().toDateString());
  }, [completedToday]);

  // Timer effect
  useEffect(() => {
    let interval: number | undefined = undefined;
    if (activeTimer && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeTimer) {
      setActiveTimer(null);
      alert("Time's up! Take a 5-minute break.");
    }
    return () => clearInterval(interval);
  }, [activeTimer, timeLeft]);

  const addTask = () => {
    if (currentTask.trim()) {
      const newTask: Task = {
        id: Date.now(),
        text: currentTask,
        estimatedTime: estimatedTime || "30",
        priority,
        completed: false,
        broken: false,
        location: workLocation,
        createdAt: new Date(),
      };
      setTasks([...tasks, newTask]);
      setCurrentTask("");
      setEstimatedTime("");
    }
  };

  const breakDownTask = (taskId: number) => {
    setTasks(
      tasks.map((task: Task) =>
        task.id === taskId ? { ...task, broken: !task.broken } : task
      )
    );
  };

  const completeTask = (taskId: number) => {
    setTasks(
      tasks.map((task: Task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    const task = tasks.find((t: Task) => t.id === taskId);
    if (task && !task.completed) {
      setCompletedToday(completedToday + 1);
    } else {
      setCompletedToday(Math.max(0, completedToday - 1));
    }
  };

  const startPomodoro = (minutes: number) => {
    setActiveTimer(minutes);
    setTimeLeft(minutes * 60);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task: Task) => task.id !== taskId));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPriorityColor = (priority: "high" | "medium" | "low") => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-50";
      case "medium":
        return "border-yellow-500 bg-yellow-50";
      case "low":
        return "border-green-500 bg-green-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const sortedTasks = tasks.sort((a: Task, b: Task) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Brain className="text-indigo-600" />
            Time Manager
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 bg-indigo-100 px-2 sm:px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium">
                {completedToday} completed today
              </span>
            </div>
            <button
              onClick={() =>
                setWorkLocation(workLocation === "home" ? "office" : "home")
              }
              className="flex items-center gap-2 px-2 sm:px-3 py-1 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              {workLocation === "home" ? (
                <Home className="w-4 h-4" />
              ) : (
                <Building className="w-4 h-4" />
              )}
              <span className="text-sm">
                {workLocation === "home" ? "WFH" : "Office"}
              </span>
            </button>
          </div>
        </div>

        {/* Quick Pomodoro Timer */}
        <div className="bg-indigo-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Zap className="text-indigo-600 w-4 h-4" />
            Beat Procrastination Timer
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {activeTimer ? (
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-indigo-600">
                  {formatTime(timeLeft)}
                </div>
                <button
                  onClick={() => setActiveTimer(null)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Stop
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => startPomodoro(15)}
                  className="px-3 sm:px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base"
                >
                  15 min (Quick Win)
                </button>
                <button
                  onClick={() => startPomodoro(25)}
                  className="px-3 sm:px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm sm:text-base"
                >
                  25 min (Pomodoro)
                </button>
                <button
                  onClick={() => startPomodoro(5)}
                  className="px-3 sm:px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm sm:text-base"
                >
                  5 min (Just Start)
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2 text-center sm:text-left">
            💡 Start with 5 minutes to overcome initial resistance, then build
            momentum!
          </p>
        </div>

        {/* Add Task Form */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Add New Task</h3>
          <div className="flex flex-col sm:flex-row gap-2 mb-3">
            <input
              type="text"
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <div className="flex gap-2">
              <input
                type="number"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
                placeholder="Min"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as "high" | "medium" | "low")
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors whitespace-nowrap"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`border-l-4 rounded-lg p-3 sm:p-4 ${getPriorityColor(
                task.priority
              )} ${task.completed ? "opacity-60" : ""}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => completeTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      task.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-300 hover:border-green-500"
                    }`}
                  >
                    {task.completed && <CheckCircle className="w-4 h-4" />}
                  </button>
                  <div>
                    <p
                      className={`font-medium ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.estimatedTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        {task.location === "home" ? (
                          <Home className="w-3 h-3" />
                        ) : (
                          <Building className="w-3 h-3" />
                        )}
                        {task.location}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority} priority
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => breakDownTask(task.id)}
                    className="px-2 sm:px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  >
                    {task.broken ? "Unbreak" : "Break Down"}
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="px-2 sm:px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {task.broken && (
                <div className="mt-3 p-3 bg-white rounded border-l-2 border-blue-300">
                  <p className="text-sm text-blue-800 font-medium">
                    🔧 Break this down into smaller steps:
                  </p>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Step 1: Research/plan (5 min)</li>
                    <li>• Step 2: Set up environment (5 min)</li>
                    <li>• Step 3: Start smallest piece (10 min)</li>
                    <li>• Step 4: Continue building momentum</li>
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Target className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No tasks yet. Add one above to get started!</p>
            <p className="text-sm mt-1">
              💡 Start with something small to build momentum
            </p>
          </div>
        )}

        {/* Anti-Procrastination Tips */}
        <div className="mt-6 sm:mt-8 bg-yellow-50 rounded-lg p-3 sm:p-4">
          <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Brain className="text-yellow-600 w-4 h-4" />
            Anti-Procrastination Strategies
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-sm text-gray-700">
            <div>
              • <strong>2-Minute Rule:</strong> If it takes less than 2 minutes,
              do it now
            </div>
            <div>
              • <strong>5-Minute Start:</strong> Commit to just 5 minutes to
              overcome resistance
            </div>
            <div>
              • <strong>Break It Down:</strong> Large tasks feel overwhelming -
              make them tiny
            </div>
            <div>
              • <strong>Environment Design:</strong> Remove distractions from
              your workspace
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcrastinationBuster;

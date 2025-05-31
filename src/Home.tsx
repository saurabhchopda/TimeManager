import { useNavigate } from "react-router-dom";
import { Brain, Heart } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Time Manager
          </h1>
          <p className="text-gray-600 text-lg">Choose your focus area</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <button
            onClick={() => navigate("/timer")}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-200 group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                <Brain className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Procrastination Buster
              </h2>
              <p className="text-gray-600 text-center">
                Manage tasks, track progress, and stay focused with the Pomodoro
                technique
              </p>
            </div>
          </button>

          <button
            onClick={() => navigate("/wellness")}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-200 group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Mindfulness Practice
              </h2>
              <p className="text-gray-600 text-center">
                Guided mindfulness exercises and meditation practices for mental
                wellness
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

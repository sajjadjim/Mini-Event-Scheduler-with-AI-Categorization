import React from "react";
import { motion } from "framer-motion";
import { Calendar, Brain, Bell, Clock3 } from "lucide-react"; // Icons
// import { Button } from "@/components/ui/button"; // Optional: your custom button component

const Section2: React.FC = () => {
  // const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8 text-purple-600" />,
      title: "AI Categorization",
      desc: "Our AI engine analyzes and automatically tags your event type.",
    },
    {
      icon: <Clock3 className="w-8 h-8 text-blue-600" />,
      title: "Smart Time Handling",
      desc: "No confusion with time zones or formats — we normalize everything.",
    },
    {
      icon: <Bell className="w-8 h-8 text-yellow-500" />,
      title: "Reminders",
      desc: "Get notified before your events start. Never miss an appointment!",
    },
    {
      icon: <Calendar className="w-8 h-8 text-green-600" />,
      title: "Clean Scheduling",
      desc: "Simple, fast interface to create and browse all your events.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 overflow-hidden px-4">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4 text-white"
        >
          Mini Event Scheduler
        </motion.h1>
        <p className="text-lg text-white mb-6 max-w-2xl">
          Plan events effortlessly with the help of AI. Stay organized, stay smart.
        </p>

      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-400">
          Why Choose Us?
        </h2>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md p-6 text-center"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Section2;

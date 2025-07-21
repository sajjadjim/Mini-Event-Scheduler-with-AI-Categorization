import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineEdit } from "react-icons/ai";
import useAuth from "../../Hook/useAuth";

interface Task {
  _id: string;
  name: string;
  email: string;
  title: string;
  date: string;
  time: string;
  notes: string;
  description: string;
}

const MyTask: React.FC = () => {
  const auth = useAuth();
  const email = auth?.user?.email || "";

  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState({
    time: "",
    notes: "",
    description: "",
  });

  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  useEffect(() => {
    if (!email) return;

    axios
      .get(`http://localhost:3000/items/user/${encodeURIComponent(email)}`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [res.data];
        setTasks(data);
      })
      .catch((err) => {
        console.error("Failed to fetch tasks", err);
      });
  }, [email]);

  const openModal = (task: Task) => {
    setSelectedTask(task);
    setFormData({
      time: task.time,
      notes: task.notes,
      description: task.description,
    });
    setShowModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    if (!selectedTask) return;

    axios
      .put(`http://localhost:3000/items/${selectedTask._id}`, {
        time: formData.time,
        notes: formData.notes,
        description: formData.description,
      })
      .then(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === selectedTask._id ? { ...task, ...formData } : task
          )
        );
        setShowModal(false);
        import("sweetalert2").then((Swal) => {
          Swal.default.fire({
            icon: "success",
            title: "Task updated!",
            text: "Your task has been updated successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
        });
      })
      .catch((err) => {
        console.error("Failed to update task", err);
        import("sweetalert2").then((Swal) => {
          Swal.default.fire({
            icon: "error",
            title: "Update failed",
            text: "There was a problem updating your task.",
          });
        });
      });
  };

  return (
    <div className="min-h-screen mt-20 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={() => setViewMode(viewMode === "card" ? "table" : "card")}
          className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white px-4 py-2 rounded"
        >
          View: {viewMode === "card" ? "Table" : "Card"}
        </button>
      </div>

      {tasks.length > 0 ? (
        viewMode === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
              >
                <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                <p><strong>Date:</strong> {task.date}</p>
                <p><strong>Time:</strong> {task.time}</p>
                <p><strong>Notes:</strong> {task.notes}</p>
                <p><strong>Description:</strong> {task.description}</p>
                <button
                  onClick={() => openModal(task)}
                  className="mt-4 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                >
                  <AiOutlineEdit />
                  Update Task
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto max-w-5xl mx-auto">
            <table className="min-w-full border text-sm bg-white dark:bg-gray-800">
              <thead className="bg-purple-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Time</th>
                  <th className="px-4 py-2 text-left">Notes</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task._id} className="border-t">
                    <td className="px-4 py-2">{task.title}</td>
                    <td className="px-4 py-2">{task.date}</td>
                    <td className="px-4 py-2">{task.time}</td>
                    <td className="px-4 py-2">{task.notes}</td>
                    <td className="px-4 py-2">{task.description}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openModal(task)}
                        className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-xs"
                      >
                        <AiOutlineEdit />
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <p className="text-center">No tasks found.</p>
      )}

      {/* Update Modal */}
      {showModal && selectedTask && (
        <div className="fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Update Task</h3>

            <label className="block mb-2">
              Time:
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
            </label>

            <label className="block mb-2">
              Notes:
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
            </label>

            <label className="block mb-4">
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full mt-1 px-3 py-2 rounded bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
              />
            </label>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTask;

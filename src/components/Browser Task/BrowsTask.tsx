// In your parent component or App.tsx
import BrowserTask from "./BrowserTask";

const API_URL = "http://localhost:3000/items"; // Replace with your actual API URL

function BrowsTask() {
  return <BrowserTask   apiUrl={API_URL} />;
}

export default BrowsTask;

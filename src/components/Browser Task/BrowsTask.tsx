// In your parent component or App.tsx
import BrowserTask from "./BrowserTask";

const API_URL = "https://ts-express-server-seven.vercel.app/items"; // Replace with your actual API URL

function BrowsTask() {
  return <BrowserTask   apiUrl={API_URL} />;
}

export default BrowsTask;

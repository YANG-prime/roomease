import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[80vh] text-center">
        
        <h1 className="text-6xl font-bold text-blue-600 mb-4">
          RoomEase
        </h1>

        <p className="text-xl text-gray-600 max-w-xl">
          Manage chores, split bills, and live peacefully with your roommates.
        </p>

      </div>

    </div>
  );
}

export default Home;
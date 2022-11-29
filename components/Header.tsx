import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <nav className="px-5 bg-gray-800">
      <div className="relative text-white flex h-16 items-center justify-end">
        <div>
          {isAuthenticated ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                login();
              }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

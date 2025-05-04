
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserWelcome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check login status
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div className="px-4 mb-4">
      <div className="bg-white rounded-xl p-3 shadow-sm border border-heritage-gold/10 flex justify-between items-center hover:shadow-md transition-all duration-300">
        <div>
          <h3 className="font-song text-lg">
            {isLoggedIn ? "欢迎回来" : "游客，您好"}
          </h3>
          <p className="text-xs text-gray-500">
            {isLoggedIn ? "继续探索非遗文化" : "登录解锁更多功能"}
          </p>
        </div>
        
        {!isLoggedIn && (
          <Link to="/login">
            <button className="brush-btn text-sm transform transition-all hover:scale-110 duration-200">
              立即登录
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UserWelcome;

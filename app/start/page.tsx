"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signup } from "@/lib/auth";

export default function StartPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  
  // 폼 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 설명서 페이지 내용
  const guidePages = [
    { title: "Welcome to Swell", desc: "Discover the ultimate surfing experience. Our service connects you with the best waves around the world." },
    { title: "스와이프하며 코디 구경", desc: "마음에 드는 코디를 좌우로 넘기며 탐색해보세요." },
    { title: "좋아요로 저장", desc: "마음에 드는 코디에 좋아요를 눌러 저장하세요." },
    { title: "AI 가상 피팅", desc: "선택한 옷을 AI로 직접 입어볼 수 있어요." },
  ];

  // 로그인 처리
  const handleLogin = async () => {
    setError("");
    setLoading(true);
    
    try {
      const response = await login({ email, password });
      if (response.success) {
        router.push("/main");
      } else {
        setError(response.error?.message || "로그인에 실패했습니다");
      }
    } catch (err) {
      setError("로그인에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  // 회원가입 처리
  const handleSignup = async () => {
    setError("");
    
    if (!gender) {
      setError("성별을 선택해주세요");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await signup({ email, password, name, gender });
      if (response.success) {
        setIsLogin(true);
        setError("");
        alert("회원가입 완료! 로그인해주세요.");
      } else {
        setError(response.error?.message || "회원가입에 실패했습니다");
      }
    } catch (err) {
      setError("회원가입에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/beach-bg.jpg')" }}
    >
      {/* 배경 오버레이 (임시 - 배경 이미지 없을 때) */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-100 to-amber-50" />
      
      {/* 컨텐츠 */}
      <div className="relative z-10 flex min-h-screen p-8 gap-6">
        
        {/* 왼쪽 영역 */}
        <div className="flex flex-col gap-6 w-[400px]">
          
          {/* 로그인/회원가입 박스 */}
          <div className="bg-cyan-200/80 backdrop-blur rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Swell</h1>
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="text-gray-600 hover:text-gray-800"
              >
                {isLogin ? "sign up" : "login"}
              </button>
            </div>

            {isLogin ? (
              // 로그인 폼
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="e-mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="w-12 h-12 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-700 disabled:bg-gray-400"
                  >
                    →
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <p className="text-center text-gray-600 mt-4">find your swell!</p>
              </div>
            ) : (
              // 회원가입 폼
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="e-mail address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="password"
                  placeholder="password (8자 이상)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500"
                />
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "male"}
                      onChange={() => setGender("male")}
                      className="w-4 h-4"
                    />
                    <span>남자</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={gender === "female"}
                      onChange={() => setGender("female")}
                      className="w-4 h-4"
                    />
                    <span>여자</span>
                  </label>
                </div>
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-400"
                >
                  {loading ? "처리 중..." : "가입하기"}
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
            )}
          </div>

          {/* 로고 애니메이션 박스 (빈 박스) */}
          <div className="bg-cyan-200/80 backdrop-blur rounded-2xl h-[200px] flex items-center justify-center">
            <p className="text-gray-500">로고 애니메이션 영역</p>
          </div>
        </div>

        {/* 오른쪽 - 설명서 카드 */}
        <div className="flex-1 flex items-start justify-center pt-4">
          <div className="bg-white/90 backdrop-blur rounded-2xl w-[500px] h-[400px] p-8 flex flex-col">
            <p className="text-right text-gray-400 text-sm mb-4">
              Page {currentPage + 1} of {guidePages.length}
            </p>
            
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <h2 className="text-xl font-semibold mb-4">
                {guidePages[currentPage].title}
              </h2>
              <p className="text-gray-600">
                {guidePages[currentPage].desc}
              </p>
            </div>

            {/* 페이지 네비게이션 */}
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30"
              >
                ←
              </button>
              
              <div className="flex gap-2">
                {guidePages.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i === currentPage ? "bg-gray-800" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(guidePages.length - 1, currentPage + 1))}
                disabled={currentPage === guidePages.length - 1}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
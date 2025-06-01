"use client";
import React, { useState } from "react";

export default function Stamp() {
  const [isStamping, setIsStamping] = useState(false);
  const [stampCount, setStampCount] = useState(0);

  const handleStampClick = () => {
    if (!isStamping) {
      setIsStamping(true);
      setStampCount((prev) => prev + 1);

      // アニメーション終了後に状態をリセット
      setTimeout(() => {
        setIsStamping(false);
      }, 1000);
    }
  };
  return (
    <>
      <div className="bg-pink-100 rounded-full px-5 py-2 text-pink-600 font-medium text-sm transform rotate-3 border border-pink-300 shadow-sm">
        Valid until: ∞
      </div>
      <div
        onClick={handleStampClick}
        className={`w-20 h-20 rounded-full bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center cursor-pointer 
                      ${
                        isStamping
                          ? "animate-stamp transform-gpu origin-center"
                          : "transform -rotate-12 hover:rotate-0 transition-all duration-300 hover:shadow-md"
                      } 
                      relative`}
        title="スタンプを押してみよう！"
      >
        <span className="text-indigo-700 font-bold text-xs">DEV STAMP</span>

        {/* スタンプ押印時の効果 */}
        {isStamping && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 bg-indigo-600 rounded-full opacity-10 animate-ping"></div>
          </div>
        )}

        {/* スタンプカウンター */}
        {stampCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
            {stampCount}
          </div>
        )}
      </div>

      {/* スタンプが押された跡のマーク */}
      <div className="flex flex-wrap justify-center gap-2 max-w-xs">
        {[...Array(Math.min(stampCount, 5))].map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-full bg-indigo-100 border border-indigo-300 flex items-center justify-center opacity-70 transform rotate-${Math.floor(
              Math.random() * 45 - 22
            )}`}
          >
            <span className="text-indigo-700 font-bold text-[7px]">DEV</span>
          </div>
        ))}
      </div>
    </>
  );
}

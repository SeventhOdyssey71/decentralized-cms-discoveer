export function CircleIllustration() {
  return (
    <div className="relative w-96 h-80 flex items-center justify-center">
      {/* Background circles with glow effects */}
      <div className="absolute inset-0">
        {/* Large background circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-gray-200 opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-gray-200 opacity-20"></div>
      </div>

      {/* SuiNS Logo - Top (Purple) */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 animate-spin-slow">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/30">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="/suins-logo.png" alt="SuiNS" className="w-16 h-16 object-contain rounded-full" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-purple-500 opacity-20 blur-xl"></div>
        </div>
      </div>

      {/* Walrus Token - Bottom Left (Greenish) */}
      <div className="absolute bottom-12 left-8 animate-spin-reverse-slow">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#97F0E5] to-[#7DE0D3] p-0.5 shadow-lg shadow-[#97F0E5]/40">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="/walrus-token.png" alt="Walrus Token" className="w-20 h-20 object-contain rounded-full" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#97F0E5] opacity-30 blur-xl"></div>
        </div>
      </div>

      {/* Walrus Character - Bottom Right (Greenish) */}
      <div className="absolute bottom-8 right-12 animate-spin-slow">
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-[#97F0E5] to-[#7DE0D3] p-0.5 shadow-lg shadow-[#97F0E5]/40">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="/walrus-character.png" alt="Walrus" className="w-24 h-24 object-contain rounded-full" />
            </div>
          </div>
          <div className="absolute inset-0 rounded-full bg-[#97F0E5] opacity-30 blur-xl"></div>
        </div>
      </div>

      {/* Additional decorative circle (Blue) */}
      <div className="absolute top-20 right-8 animate-pulse">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 opacity-60 shadow-lg shadow-blue-400/30"></div>
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 blur-lg"></div>
      </div>

      {/* Smaller Green Circle */}
      <div className="absolute bottom-32 left-20 animate-bounce-slow">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 opacity-50 shadow-lg shadow-green-400/30"></div>
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-20 blur-md"></div>
      </div>

    </div>
  )
}



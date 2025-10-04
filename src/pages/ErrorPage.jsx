const ErrorPage = ({ onNavigate }) => {
  return (
    <div className="flex h-screen bg-base-200">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-rose-500 via-red-500 to-pink-600 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-32 translate-y-32"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="mb-8">
            <AlertTriangle className="w-32 h-32 animate-pulse" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-9xl font-bold mb-4">404</h1>
          <p className="text-2xl text-center text-rose-100 max-w-md mb-8">
            Oops! Sahifa topilmadi
          </p>
          
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 max-w-md">
            <p className="text-center">
              Siz qidirayotgan sahifa mavjud emas yoki boshqa joyga ko'chirilgan bo'lishi mumkin.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Error Info */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-error rounded-full mb-6">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-base-content mb-4">Sahifa topilmadi</h2>
            <p className="text-base-content/60 text-lg">
              Kechirasiz, siz qidirayotgan sahifa mavjud emas.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="alert alert-warning">
              <AlertTriangle className="w-5 h-5" />
              <span>URL manzil noto'g'ri kiritilgan bo'lishi mumkin</span>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => onNavigate('login')}
              className="btn btn-primary w-full gap-2"
            >
              <Home className="w-5 h-5" />
              Login sahifaga qaytish
            </button>
            
            <button 
              onClick={() => window.location.reload()}
              className="btn btn-outline w-full gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Sahifani yangilash
            </button>
          </div>

          <div className="mt-8 p-6 bg-base-100 rounded-2xl">
            <h3 className="font-semibold mb-3">Yordam kerakmi?</h3>
            <p className="text-sm text-base-content/60 mb-4">
              Agar muammo davom etsa, quyidagi havolalardan foydalaning:
            </p>
            <div className="flex justify-center gap-4">
              <button className="text-sm text-primary hover:underline">Yordam markazi</button>
              <button className="text-sm text-primary hover:underline">Qo'llab-quvvatlash</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage
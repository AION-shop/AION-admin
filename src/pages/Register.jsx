const RegisterPage = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Parollar mos kelmadi!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Ro\'yxatdan o\'tish muvaffaqiyatli!');
      onNavigate('login');
    }, 1500);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex h-screen bg-base-200">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-32 translate-y-32"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="mb-8">
            <UserPlus className="w-32 h-32" strokeWidth={1.5} />
          </div>
          
          <h1 className="text-5xl font-bold mb-4">Qo'shiling!</h1>
          <p className="text-xl text-center text-emerald-100 max-w-md mb-8">
            Admin hisobini yarating va platformani to'liq nazorat qilishni boshlang
          </p>
          
          <div className="space-y-4 w-full max-w-md">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-3">
              <div className="text-2xl">✨</div>
              <div>
                <div className="font-semibold mb-1">To'liq nazorat</div>
                <div className="text-sm text-emerald-100">Barcha mahsulot va buyurtmalarni boshqaring</div>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-3">
              <div className="text-2xl">📊</div>
              <div>
                <div className="font-semibold mb-1">Tahlil va hisobotlar</div>
                <div className="text-sm text-emerald-100">Real vaqt statistika va hisobotlar</div>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 flex items-start gap-3">
              <div className="text-2xl">🔒</div>
              <div>
                <div className="font-semibold mb-1">Xavfsizlik</div>
                <div className="text-sm text-emerald-100">Yuqori darajadagi ma'lumotlar himoyasi</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-2xl mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-base-content">Ro'yxatdan o'tish</h2>
            <p className="text-base-content/60 mt-2">Admin hisobini yaratish uchun ma'lumotlarni kiriting</p>
          </div>

          <div className="space-y-4">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2">To'liq ism</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ism Familiya"
                  className="input input-bordered w-full pl-12"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Email manzil</label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="admin@example.com"
                  className="input input-bordered w-full pl-12"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Parol</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium mb-2">Parolni tasdiqlang</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-12"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm mt-1" />
              <span className="text-sm text-base-content/70">
                Men <button className="text-primary hover:underline">Foydalanish shartlari</button> va{' '}
                <button className="text-primary hover:underline">Maxfiylik siyosati</button>ni qabul qilaman
              </span>
            </div>

            <button 
              onClick={handleRegister}
              className="btn btn-success w-full" 
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner"></span> : 'Ro\'yxatdan o\'tish'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-base-content/60">
              Hisobingiz bormi?{' '}
              <button 
                onClick={() => onNavigate('login')}
                className="text-primary font-medium hover:underline"
              >
                Kirish
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage
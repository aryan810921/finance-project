import { useState, useEffect } from 'react'
import {
  TrendingUp,
  Wallet,
  Target,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Sun,
  Moon,
  Menu,
  X,
  Sparkles,
  Calculator,
} from 'lucide-react'

// Import generated 3D illustration assets
import moneyTeam from '../../assets/money_team.png'
import ManageMoney from '../../assets/manage.png'
import analytics3d from '../../assets/analytics_desk_3d.png'

const SERVICES_DATA = [
  {
    id: 'tracking',
    icon: Wallet,
    title: 'Income & Expense Tracking',
    colorBg: 'bg-amber-100 dark:bg-amber-900/30',
    colorText: 'text-amber-600 dark:text-amber-400',
    colorBorder: 'border-amber-200 dark:border-amber-800/40',
    badgeColor: 'bg-amber-500',
    desc: 'Automated categorisation and real-time expense breakdown for complete cash flow clarity.',
    details: 'Track all your inflows and outflows in one unified dashboard. Set custom monthly budgets, monitor recurring subscriptions, and get instant notifications when spending approaches your target limit.',
  },
  {
    id: 'planner',
    icon: Target,
    title: 'Smart Goal Planner',
    colorBg: 'bg-emerald-100 dark:bg-emerald-900/30',
    colorText: 'text-emerald-600 dark:text-emerald-400',
    colorBorder: 'border-emerald-200 dark:border-emerald-800/40',
    badgeColor: 'bg-emerald-500',
    desc: 'Set custom financial targets with automated timelines, target monthly savings, and milestone trackers.',
    details: 'Whether saving for a dream home, emergency fund, or vacation, our goal engine calculates the exact monthly contributions needed and dynamically adapts when your monthly savings change.',
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Wealth Analytics',
    colorBg: 'bg-indigo-100 dark:bg-indigo-900/30',
    colorText: 'text-indigo-600 dark:text-indigo-400',
    colorBorder: 'border-indigo-200 dark:border-indigo-800/40',
    badgeColor: 'bg-indigo-500',
    desc: 'Deep data insights and forecasting to help optimize your capital allocation and net worth growth.',
    details: 'Visualise cash flow trends with interactive charts, savings projection models, and monthly expenditure heatmaps designed to help you discover hidden savings opportunities.',
  },
  {
    id: 'advisory',
    icon: ShieldCheck,
    title: 'AI Financial Advisor',
    colorBg: 'bg-rose-100 dark:bg-rose-900/30',
    colorText: 'text-rose-600 dark:text-rose-400',
    colorBorder: 'border-rose-200 dark:border-rose-800/40',
    badgeColor: 'bg-rose-500',
    desc: 'Tailored recommendations that adapt when expenses rise or income shifts to keep you on track.',
    details: 'Get personalized financial health scores, proactive alerts for over-budget categories, and actionable tips to boost your net savings rate by up to 35% without sacrificing lifestyle quality.',
  },
]

const PROCESS_STEPS = [
  {
    number: '1',
    title: 'Register & Connect',
    desc: 'Create your secure account in under 60 seconds with 256-bit encryption safety.',
  },
  {
    number: '2',
    title: 'Input Financials',
    desc: 'Enter your monthly salary, recurring income, and primary expense streams effortlessly.',
  },
  {
    number: '3',
    title: 'Set Target Goal',
    desc: 'Define your desired goal, target savings amount, and target deadline in months.',
  },
  {
    number: '4',
    title: 'Track & Grow',
    desc: 'Receive real-time progress updates, automated monthly targets, and actionable advice.',
  },
]

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Jassica Hussain',
    role: 'Executive Director',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'FinPulse transformed how I manage my monthly salary and savings. I reached my house down payment goal 4 months earlier than expected!',
  },
  {
    id: 2,
    name: 'Mashley Juan',
    role: 'Executive Managing Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'The goal timeline calculator and real-time expense breakdown gave me total clarity. The dynamic UI makes financial planning engaging and effortless.',
  },
  {
    id: 3,
    name: 'Yuan Seth',
    role: 'Executive Lead Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'Finally a finance tool that is both visually gorgeous and mathematically precise. The automated guidance keeps our household budget on point.',
  },
  {
    id: 4,
    name: 'Alex Vance',
    role: 'Product Strategist',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150',
    rating: 5,
    text: 'The interactive goal projection and expense category insights helped us cut unnecessary costs by 28% within the first two months!',
  },
]

export default function LandingPage({
  onSwitchView,
  isAuthenticated,
  user,
  isDarkMode,
  handleToggleTheme,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [selectedServiceModal, setSelectedServiceModal] = useState(null)

  // Interactive Live Calculator state
  const [calcSalary, setCalcSalary] = useState(5000)
  const [calcExpense, setCalcExpense] = useState(2800)
  const [calcGoalAmount, setCalcGoalAmount] = useState(15000)
  const [calcGoalMonths, setCalcGoalMonths] = useState(12)

  // Calculated values
  const calcSavings = Math.max(0, calcSalary - calcExpense)
  const calcMonthlyRequired = Math.ceil(calcGoalAmount / (calcGoalMonths || 1))
  const calcCanAchieve = calcSavings >= calcMonthlyRequired
  const calcMonthsToGoal = calcSavings > 0 ? Math.ceil(calcGoalAmount / calcSavings) : Infinity

  // Testimonial autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const scrollToSection = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className={`min-h-screen font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-[#FAF8F5] text-slate-800'}`}>

      {/* Dynamic Background Floating Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-12 left-[10%] w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-[5%] w-96 h-96 bg-teal-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-[15%] w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* HEADER / NAVBAR */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a]/85 border-slate-800' : 'bg-[#FAF8F5]/85 border-emerald-100/60'}`}>
        <div className="max-w-6xl mx-auto px-5 h-20 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-emerald-500 via-teal-500 to-cyan-500  shadow-md shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[10px] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight  bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              FIMA
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-emerald-500 transition-colors">Home</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-emerald-500 transition-colors">About us</button>
            <button onClick={() => scrollToSection('services')} className="hover:text-emerald-500 transition-colors">Services</button>
            <button onClick={() => scrollToSection('process')} className="hover:text-emerald-500 transition-colors">Process</button>
            <button onClick={() => scrollToSection('calculator')} className="hover:text-emerald-500 transition-colors flex items-center gap-1.5">
              <Calculator className="w-4 h-4" /> Simulator
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="hover:text-emerald-500 transition-colors">Testimonials</button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={handleToggleTheme}
              className={`p-2.5 rounded-full border transition-all duration-200 ${isDarkMode
                ? 'border-slate-700 bg-slate-800 text-amber-400 hover:bg-slate-700'
                : 'border-slate-200 bg-white text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 shadow-sm'
                }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={() => onSwitchView('dashboard')}
                className="px-5 py-2.5 text-sm font-semibold rounded-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Dashboard ({user?.name?.split(' ')[0] || 'User'})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSwitchView('login')}
                  className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => onSwitchView('register')}
                  className="px-5 py-2.5 text-sm font-semibold rounded-full bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02]"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200/50"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-5 flex flex-col gap-4 shadow-xl">
            <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false) }} className="text-left py-2 font-semibold text-slate-700 dark:text-slate-200">Home</button>
            <button onClick={() => scrollToSection('about')} className="text-left py-2 font-semibold text-slate-700 dark:text-slate-200">About us</button>
            <button onClick={() => scrollToSection('services')} className="text-left py-2 font-semibold text-slate-700 dark:text-slate-200">Services</button>
            <button onClick={() => scrollToSection('process')} className="text-left py-2 font-semibold text-slate-700 dark:text-slate-200">Process</button>
            <button onClick={() => scrollToSection('calculator')} className="text-left py-2 font-semibold text-emerald-600 dark:text-emerald-400">Simulator & Calculator</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-left py-2 font-semibold text-slate-700 dark:text-slate-200">Testimonials</button>
            <hr className="border-slate-100 dark:border-slate-800" />
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => { onSwitchView('login'); setMobileMenuOpen(false) }}
                  className="w-full py-2.5 text-center font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                >
                  Log In
                </button>
                <button
                  onClick={() => { onSwitchView('register'); setMobileMenuOpen(false) }}
                  className="w-full py-2.5 text-center font-semibold rounded-lg bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-12 gap-12 items-center">

          {/* Hero Left Content */}
          <div className="md:col-span-6 space-y-6 text-left">

            {/* Top Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Smart Personal Finance</span>
            </div>

            {/* Headline matching image style */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white color-black tracking-tight leading-[1.15]">
              We create <span className="text-emerald-500">solutions</span> for your business & wealth
            </h1>

            {/* Subtitle matching image style */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Our team keeps a keen eye on emerging spending trends, salary optimization, and intelligent goal tracking to ensure your personal wealth remains cutting-edge.
            </p>

            {/* Action CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onSwitchView(isAuthenticated ? 'dashboard' : 'register')}
                className="px-7 py-3.5 text-base font-bold rounded-full bg-emerald-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Get Started</span>
              </button>

              <button
                onClick={() => scrollToSection('services')}
                className="group flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center group-hover:border-emerald-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/30 transition-all">
                  <ArrowRight className="w-4 h-4 rotate-90 text-slate-500 group-hover:text-emerald-500" />
                </div>
                <span>Explore more</span>
              </button>
            </div>

            {/* Floating stats badges */}
            <div className="pt-8 border-t border-slate-200/60 dark:border-slate-800 grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">+35%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Avg Savings Rate</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">98.4%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Goal Success</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">24/7</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">AI Financial Monitoring</p>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Graphic (3D Illustration with floating elements) */}
          <div className="md:col-span-6 relative flex justify-center items-center">

            {/* Background Glow Ring */}
            <div className="absolute w-[85%] h-[85%] rounded-full bg-linear-to-tr from-emerald-300/30 to-teal-200/40 blur-2xl"></div>

            {/* Main 3D Generated Render Image */}
            <div className="relative z-10 w-full max-w-lg transition-transform duration-500 hover:scale-[1.02]">
              <img
                src={moneyTeam}
                alt="FinPulse 3D Team Working Visual"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-3xl"
              />
            </div>

            {/* Floating Glassmorphism Badge 1 */}
            <div className="absolute -top-4 -right-2 z-20 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-white/60 dark:border-slate-700 shadow-xl animate-bounce [animation-duration:3s]">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Target Achieved</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">$15,000 Saved</p>
              </div>
            </div>

            {/* Floating Glassmorphism Badge 2 */}
            <div className="absolute -bottom-6 -left-4 z-20 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-white/60 dark:border-slate-700 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-orange-950 flex items-center justify-center text-emerald-500">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400">Monthly Net Income</p>
                <p className="text-sm font-bold text-slate-900 dark:text-white">+$2,200 Surplus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES SECTION ("We Provide The Best Services") */}
      <section id="services" className="py-20 bg-white/60 dark:bg-slate-900/60 border-y border-emerald-100/50 dark:border-slate-800/80 relative z-10">
        <div className="max-w-6xl mx-auto px-5 text-center">

          {/* Section Heading matching reference image */}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            We Provide The Best <span className="text-emerald-500">Services</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Let us unleash the full potential of your business and personal budget with our data-driven financial strategies.
          </p>

          {/* 4 Colored Service Cards Grid matching image */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((service) => {
              const IconComp = service.icon
              return (
                <div
                  key={service.id}
                  className="group relative bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between text-left"
                >
                  <div>
                    {/* Top Icon Badge */}
                    <div className={`w-12 h-12 rounded-xl ${service.colorBg} ${service.colorText} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    {/* Service Title */}
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60">
                    <button
                      onClick={() => setSelectedServiceModal(service)}
                      className="text-xs font-bold text-emerald-500 hover:text-emerald-600 flex items-center gap-1 group-hover:gap-2 transition-all"
                    >
                      <span>Show Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: PROCESS SECTION ("Simple Solutions!") */}
      <section id="process" className="py-20 relative z-10 overflow-hidden">
        {/* Soft background banner tone matching reference image */}
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-emerald-50/80 dark:bg-slate-800/40 rounded-3xl p-8 sm:p-12 border border-emerald-100/70 dark:border-slate-800 grid md:grid-cols-12 gap-10 items-center">

            {/* Process Left Image (Armchair 3D figure matching image) */}
            <div className="md:col-span-5 relative flex justify-center">
              <div className="relative z-10 w-full max-w-sm">
                <img
                  src={ManageMoney}
                  alt="3D Character relaxing in armchair using tablet"
                  className="w-full h-auto object-contain drop-shadow-xl hover:scale-[1.02] transition-transform"
                />
              </div>
            </div>

            {/* Process Right Content */}
            <div className="md:col-span-7 space-y-6 text-left">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Simple <span className="text-emerald-500">Solutions!</span>
                </h2>
                <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  We understand that no two financial journeys are alike. That's why we take the time to guide you step by step.
                </p>
              </div>

              {/* Numbered Steps 1 to 4 */}
              <div className="space-y-4 pt-2">
                {PROCESS_STEPS.map((step) => (
                  <div key={step.number} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-extrabold flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 text-sm">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons matching image */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSwitchView(isAuthenticated ? 'dashboard' : 'register')}
                  className="px-6 py-3 text-sm font-bold rounded-full bg-emerald-500 hover:bg-green-600 text-white shadow-md shadow-emerald-500/25 transition-all hover:scale-[1.02]"
                >
                  Get Started
                </button>
                <button
                  onClick={() => scrollToSection('calculator')}
                  className="px-6 py-3 text-sm font-bold rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all"
                >
                  Test Calculator
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: PLATFORM / ABOUT SHOWCASE ("Our Agency / Platform") */}
      <section id="about" className="py-20 bg-white/60 dark:bg-slate-900/60 border-t border-emerald-100/50 dark:border-slate-800/80 relative z-10">
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-12 gap-12 items-center">

          {/* About Left Text matching image */}
          <div className="md:col-span-6 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our <span className="text-emerald-500">Platform</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              We believe in the power of data. Our analytics-driven approach allows us to make informed decisions and optimize your budget for maximum financial growth. Let's turn your data into actionable insights and tailored solutions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-slate-800/70 border border-emerald-100 dark:border-slate-700">
                <p className="text-2xl font-black text-emerald-500">256-bit</p>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Bank-Grade Encryption</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/70 border border-amber-100 dark:border-slate-700">
                <p className="text-2xl font-black text-amber-500">Instant</p>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">Goal Feasibility Audit</p>
              </div>
            </div>

            <div>
              <button
                onClick={() => onSwitchView(isAuthenticated ? 'dashboard' : 'login')}
                className="px-6 py-3 text-sm font-bold rounded-full bg-emerald-500 hover:bg-orange-600 text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                Learn More & Launch
              </button>
            </div>
          </div>

          {/* About Right Visual (3D Desk analytics matching image) */}
          <div className="md:col-span-6 relative flex justify-center">
            <div className="relative z-10 w-full max-w-md">
              <img
                src={analytics3d}
                alt="3D Analyst desk visual with charts"
                className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl hover:scale-[1.02] transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC FEATURE: INTERACTIVE GOAL CALCULATOR & SIMULATOR SECTION */}
      <section id="calculator" className="py-20 relative z-10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-700 relative overflow-hidden">

            {/* Decorative background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Live Tool</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">Instant Savings & Goal Simulator</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-2">
                Adjust your parameters below to test how quickly you can achieve your financial target with FinPulse.
              </p>
            </div>

            <div className="grid md:grid-cols-12 gap-8 items-center">

              {/* Sliders Input Panel */}
              <div className="md:col-span-7 space-y-6">

                {/* Monthly Salary Slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <span className="text-slate-300">Monthly Salary / Income</span>
                    <span className="text-emerald-400 font-mono text-base">${calcSalary.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="500"
                    value={calcSalary}
                    onChange={(e) => setCalcSalary(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Monthly Expense Slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <span className="text-slate-300">Monthly Expenses</span>
                    <span className="text-amber-400 font-mono text-base">${calcExpense.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="15000"
                    step="250"
                    value={calcExpense}
                    onChange={(e) => setCalcExpense(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                {/* Goal Amount Slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <span className="text-slate-300">Target Goal Amount</span>
                    <span className="text-emerald-400 font-mono text-base">${calcGoalAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={calcGoalAmount}
                    onChange={(e) => setCalcGoalAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Goal Timeline Slider */}
                <div>
                  <div className="flex justify-between items-center text-sm font-semibold mb-2">
                    <span className="text-slate-300">Desired Timeline</span>
                    <span className="text-indigo-400 font-mono text-base">{calcGoalMonths} Months</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="36"
                    step="1"
                    value={calcGoalMonths}
                    onChange={(e) => setCalcGoalMonths(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>

              {/* Calculated Results Display */}
              <div className="md:col-span-5 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-5 text-left">

                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Net Savings</p>
                  <p className="text-3xl font-black text-emerald-400 mt-1">${calcSavings.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-700/80">
                  <div>
                    <p className="text-xs text-slate-400">Required/mo</p>
                    <p className="text-base font-bold text-white">${calcMonthlyRequired.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Est. Time to Goal</p>
                    <p className="text-base font-bold text-emerald-400">
                      {calcMonthsToGoal === Infinity ? 'N/A' : `${calcMonthsToGoal} mos`}
                    </p>
                  </div>
                </div>

                {/* Feasibility Indicator */}
                <div className={`p-3.5 rounded-xl border text-xs font-medium ${calcCanAchieve
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                  }`}>
                  <p className="font-bold flex items-center gap-1.5 text-sm mb-1">
                    {calcCanAchieve ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <ShieldCheck className="w-4 h-4 text-rose-400" />}
                    {calcCanAchieve ? 'Goal Achievable!' : 'Savings Gap Identified'}
                  </p>
                  <p>
                    {calcCanAchieve
                      ? `Your current monthly savings cover the target monthly contribution of $${calcMonthlyRequired}.`
                      : `Try reducing monthly expenses by $${(calcMonthlyRequired - calcSavings).toLocaleString()} to hit your timeline.`}
                  </p>
                </div>

                <button
                  onClick={() => onSwitchView(isAuthenticated ? 'dashboard' : 'register')}
                  className="w-full py-3 text-center font-bold text-xs rounded-xl bg-emerald-500 hover:bg-orange-600 text-white transition-all shadow-md shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <span>Track This Plan in FinPulse</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS SECTION ("What Clients Say!") */}
      <section id="testimonials" className="py-20 bg-white/60 dark:bg-slate-900/60 border-t border-emerald-100/50 dark:border-slate-800/80 relative z-10">
        <div className="max-w-6xl mx-auto px-5 text-center">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            What <span className="text-emerald-500">Clients Say!</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            See How Our Smart Digital Platform Helped Clients Achieve Their Personal & Business Goals
          </p>

          {/* Testimonial Slider Grid */}
          <div className="mt-12 relative max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {[0, 1, 2].map((offset) => {
                const index = (activeTestimonial + offset) % TESTIMONIALS.length
                const item = TESTIMONIALS[index]
                return (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Author Info matching reference image */}
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.name}</h4>
                          <p className="text-xs text-slate-400">{item.role}</p>
                        </div>
                      </div>

                      {/* Testimonial Quote */}
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{item.text}"
                      </p>
                    </div>

                    {/* Star Rating */}
                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Slider Controls (Prev/Next Arrows) matching reference image */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots Indicator */}
              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2.5 rounded-full transition-all ${activeTestimonial === i ? 'w-7 bg-emerald-500' : 'w-2.5 bg-slate-300 dark:bg-slate-700'
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: CTA BANNER SECTION ("Ready to get started?") matching image */}
      <section className="py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-linear-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black">Ready to get started?</h3>
              <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                Join thousands of individuals taking full control of their monthly savings and financial targets today.
              </p>
            </div>
            <button
              onClick={() => onSwitchView(isAuthenticated ? 'dashboard' : 'register')}
              className="px-7 py-3.5 text-sm font-extrabold rounded-full bg-white text-emerald-600 hover:bg-emerald-50 transition-all shadow-lg hover:scale-105 shrink-0"
            >
              Contact Us / Get Started
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER matching reference image layout */}
      <footer className="bg-emerald-50/70 dark:bg-slate-950 border-t border-emerald-100 dark:border-slate-800 pt-16 pb-12 relative z-10 text-left">
        <div className="max-w-6xl mx-auto px-5 grid grid-cols-2 md:grid-cols-12 gap-8">

          {/* Logo & Social */}
          <div className="col-span-2 md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white">FIMA</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Empowering your financial freedom with real-time budget tracking, goal timelines, and dynamic AI analytics.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:text-emerald-500 cursor-pointer text-xs font-bold">f</span>
              <span className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:text-emerald-500 cursor-pointer text-xs font-bold">ig</span>
              <span className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:text-emerald-500 cursor-pointer text-xs font-bold">tw</span>
            </div>
          </div>

          {/* Links Column 1: Company */}
          <div className="col-span-1 md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Company</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-emerald-500">About Us</button></li>
              <li><button onClick={() => scrollToSection('process')} className="hover:text-emerald-500">Process</button></li>
              <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-emerald-500">Testimonials</button></li>
              <li><button onClick={() => onSwitchView('login')} className="hover:text-emerald-500">Careers</button></li>
            </ul>
          </div>

          {/* Links Column 2: Designs / Features */}
          <div className="col-span-1 md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Features</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><button onClick={() => scrollToSection('services')} className="hover:text-emerald-500">Expense Tracking</button></li>
              <li><button onClick={() => scrollToSection('calculator')} className="hover:text-emerald-500">Goal Simulator</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-emerald-500">Wealth Analytics</button></li>
              <li><button onClick={() => scrollToSection('services')} className="hover:text-emerald-500">AI Advisory</button></li>
            </ul>
          </div>

          {/* Links Column 3: Resources */}
          <div className="col-span-2 md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">Resources</h4>
            <ul className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-emerald-500">Financial Guides</a></li>
              <li><a href="#" className="hover:text-emerald-500">Blog & Insights</a></li>
              <li><a href="#" className="hover:text-emerald-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-500">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-6xl mx-auto px-5 mt-12 pt-6 border-t border-slate-200/60 dark:border-slate-800 text-center text-xs text-slate-400">
          All Rights Reserved {new Date().getFullYear()} FinPulse Project
        </div>
      </footer>

      {/* SERVICE MODAL POPUP */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-700 shadow-2xl relative">
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className={`w-12 h-12 rounded-xl ${selectedServiceModal.colorBg} ${selectedServiceModal.colorText} flex items-center justify-center mb-4`}>
              <selectedServiceModal.icon className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {selectedServiceModal.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {selectedServiceModal.details}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedServiceModal(null)
                  onSwitchView(isAuthenticated ? 'dashboard' : 'register')
                }}
                className="flex-1 py-2.5 text-xs font-bold rounded-full bg-emerald-500 hover:bg-orange-600 text-white shadow-md shadow-emerald-500/20"
              >
                Get Started with {selectedServiceModal.title}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

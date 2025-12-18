import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;
  const isScrolling = useRef(false);
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(min-width: 768px)').matches;
  });
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const handleChange = () => {
      setIsDesktop(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling.current) return;

      if (e.deltaY > 0 && currentSlide < totalSlides - 1) {
        // Scroll down
        isScrolling.current = true;
        setCurrentSlide(currentSlide + 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      } else if (e.deltaY < 0 && currentSlide > 0) {
        // Scroll up
        isScrolling.current = true;
        setCurrentSlide(currentSlide - 1);
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentSlide, isDesktop]);

  const scrollToSlide = (index: number) => {
    if (isDesktop) {
      setCurrentSlide(index);
      return;
    }

    slideRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToSlide = (index: number) => {
    scrollToSlide(index);
  };

  const goToTrySlide = () => {
    scrollToSlide(totalSlides - 1);
  };

  const scrollToNext = () => {
    scrollToSlide(1);
  };

  return (
    <div
      className={`bg-black text-white relative ${
        isDesktop ? 'h-screen overflow-hidden' : 'min-h-screen overflow-x-hidden'
      }`}
    >
      {/* Vertical Slider Container */}
      <div className={isDesktop ? 'relative h-full w-full' : 'w-full'}>
        {/* Slide 1: Hero */}
        <div
          ref={(el) => {
            slideRefs.current[0] = el;
          }}
          className={
            isDesktop
              ? `absolute inset-0 h-full w-full flex items-center justify-center px-8 transition-opacity duration-1000 ${
                  currentSlide === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`
              : 'relative min-h-screen w-full flex items-center justify-center px-6 py-16'
          }
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <img src={'/static/logo-light.png'} alt="Old-Net Logo" className="w-40 h-40 mx-auto mb-8" />
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-7xl font-light tracking-tight mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Old-Net
            </motion.h1>
            <motion.p 
              className="text-lg md:text-2xl text-gray-400 font-light mb-12"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Свобода интернета без границ
            </motion.p>
             <div className="grid grid-rows-2 md:grid-rows-2 gap-4 text-center">
              <motion.button
              onClick={scrollToNext}
              className="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Узнать больше
            </motion.button>
            <motion.button
              onClick={goToTrySlide}
              className="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Попробовать бесплатно
            </motion.button>
             </div>
            
          </div>
        </div>

        {/* Slide 2: About Service */}
        <div
          ref={(el) => {
            slideRefs.current[1] = el;
          }}
          className={
            isDesktop
              ? `absolute inset-0 h-full w-full flex items-center justify-center px-8 transition-opacity duration-1000 ${
                  currentSlide === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`
              : 'relative min-h-screen w-full flex items-center justify-center px-6 py-16'
          }
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-10 md:mb-16 text-center">
              О сервисе
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div 
                className="bg-secondary p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-primary text-4xl mb-4">🔒</div>
                <h3 className="text-2xl mb-4">Протокол VLESS</h3>
                <p className="text-gray-400 leading-relaxed">
                  Ультразащищенный протокол нового поколения обеспечивает максимальную безопасность ваших данных
                </p>
              </motion.div>
              <motion.div 
                className="bg-secondary p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-primary text-4xl mb-4">🚀</div>
                <h3 className="text-2xl mb-4">Обход блокировок</h3>
                <p className="text-gray-400 leading-relaxed">
                  Обход белых списков и доступ к любым ресурсам без ограничений
                </p>
              </motion.div>
            </div>
            <div className="bg-secondary p-8 rounded-3xl border border-white/10">
              <h3 className="text-2xl mb-6">Серверные локации</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <motion.div 
                  className="p-4 bg-black/30 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-gray-300">🇷🇺 Москва</p>
                </motion.div>
                <motion.div 
                  className="p-4 bg-black/30 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-gray-300">🇵🇱 Польша</p>
                </motion.div>
                <motion.div 
                  className="p-4 bg-black/30 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-gray-300">🇱🇻 Латвия</p>
                </motion.div>
                <motion.div 
                  className="p-4 bg-black/30 rounded-2xl"
                  whileHover={{ scale: 1.05 }}
                >
                  <p className="text-gray-300">🇫🇮 Финляндия</p>
                </motion.div>
                <motion.div 
                  className="col-span-2 md:col-span-4 p-4 bg-primary/10 rounded-2xl border border-primary/30"
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="text-primary">🇷🇺 Москва (обход белых списков)</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Pricing */}
        <div
          ref={(el) => {
            slideRefs.current[2] = el;
          }}
          className={
            isDesktop
              ? `absolute inset-0 h-full w-full flex items-center justify-center px-8 py-8 transition-opacity duration-1000 ${
                  currentSlide === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`
              : 'relative min-h-screen w-full flex items-center justify-center px-6 py-16'
          }
        >
          <div className="max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-10 md:mb-12 text-center">
              Тарифные планы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {/* Free Trial */}
              <motion.div 
                className="bg-secondary p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="mb-4">
                  <h3 className="text-2xl mb-2">1 день</h3>
                  <div className="text-3xl font-light text-primary mb-2">Бесплатно</div>
                </div>
                <motion.button 
                  onClick={goToTrySlide}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Попробовать
                </motion.button>
              </motion.div>

              {/* 7 Days */}
              <motion.div 
                className="bg-secondary p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="mb-4">
                  <h3 className="text-2xl mb-2">7 дней</h3>
                  <div className="text-3xl font-light text-primary mb-2">50₽</div>
                </div>
                <motion.button 
                  onClick={goToTrySlide}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Выбрать
                </motion.button>
              </motion.div>

              {/* 30 Days - Popular */}
              <motion.div 
                className="bg-gradient-to-br from-primary/20 to-secondary p-6 rounded-3xl border border-primary/50 hover:border-primary transition-all duration-300 relative"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full text-xs">
                  Популярный
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl mb-2">30 дней</h3>
                  <div className="text-3xl font-light text-primary mb-2">150₽</div>
                </div>
                <motion.button 
                  onClick={goToTrySlide}
                  className="w-full bg-primary hover:bg-red-600 text-white py-3 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Выбрать
                </motion.button>
              </motion.div>

              {/* 90 Days */}
              <motion.div 
                className="bg-secondary p-6 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="mb-4">
                  <h3 className="text-2xl mb-2">90 дней</h3>
                  <div className="text-3xl font-light text-primary mb-2">400₽</div>
                  <p className="text-xs text-gray-500">Выгода 20%</p>
                </div>
                <motion.button 
                  onClick={goToTrySlide}
                  className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-full transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Выбрать
                </motion.button>
              </motion.div>
            </div>

            {/* Features */}
            <div className="text-center space-y-2 text-gray-400 text-sm">
              <p>✓ Скорость до 1 Гбит/с на всех тарифах</p>
              <p>✓ До 5 устройств одновременно</p>
              <p>✓ Безлимитный трафик</p>
            </div>
          </div>
        </div>

        {/* Slide 4: Try */}
        <div
          ref={(el) => {
            slideRefs.current[3] = el;
          }}
          className={
            isDesktop
              ? `absolute inset-0 h-full w-full flex items-center justify-center px-8 py-8 transition-opacity duration-1000 ${
                  currentSlide === 3 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`
              : 'relative min-h-screen w-full flex items-center justify-center px-6 py-16'
          }
        >
          <div className="max-w-5xl mx-auto w-full">
            <motion.h2
              className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Попробовать
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg font-light mb-10 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Откройте Telegram-бота, получите конфигурацию и подключитесь за пару минут.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <motion.div
                className="bg-secondary p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-primary text-4xl mb-4">1</div>
                <h3 className="text-2xl mb-3">Открыть бота</h3>
                <p className="text-gray-400 leading-relaxed">
                  Перейдите по ссылке и нажмите Start — бот подскажет следующие шаги.
                </p>
              </motion.div>
              <motion.div
                className="bg-secondary p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-primary text-4xl mb-4">2</div>
                <h3 className="text-2xl mb-3">Выбрать тариф</h3>
                <p className="text-gray-400 leading-relaxed">
                  Подберите подходящий период и оплатите внутри Telegram.
                </p>
              </motion.div>
              <motion.div
                className="bg-secondary p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="text-primary text-4xl mb-4">3</div>
                <h3 className="text-2xl mb-3">Подключиться</h3>
                <p className="text-gray-400 leading-relaxed">
                  Скопируйте конфиг или QR-код в ваш клиент — и вы онлайн.
                </p>
              </motion.div>
            </div>

            <div className="bg-secondary p-8 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl mb-2">Готовы начать?</h3>
                <p className="text-gray-400">
                  Если возникнут вопросы — поддержка в Telegram отвечает быстро.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <motion.a
                  href="https://t.me/oldnetbot"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary hover:bg-red-600 text-white px-8 py-4 rounded-full transition-all duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open Old-Net Telegram bot"
                >
                  Открыть бота
                </motion.a>
                <motion.a
                  href="https://t.me/oldnetsupport"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full transition-all duration-300 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open Old-Net support"
                >
                  Поддержка
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Dot Navigation */}
      {isDesktop && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
          {[...Array(totalSlides)].map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-primary h-8' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

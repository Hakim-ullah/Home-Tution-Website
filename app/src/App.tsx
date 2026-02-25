import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, type Variants } from 'framer-motion';
import { 
  Heart, 
  Sparkles, 
  Star, 
  BookOpen, 
  Users, 
  Home, 
  Target, 
  MessageCircle, 
  Brain,
  Lightbulb,
  Award,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Send,
  X
} from 'lucide-react';
import './App.css';

// ============================================
// TYPES
// ============================================
interface FormData {
  parentName: string;
  childAge: string;
  contact: string;
}

interface FormErrors {
  parentName?: string;
  childAge?: string;
  contact?: string;
}

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
  }
};

// ============================================
// FLOATING SHAPES COMPONENT
// ============================================
const FloatingShapes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Large circles */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-orange-200/40 to-pink-200/40 blur-3xl"
        style={{ top: '10%', left: '-5%' }}
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-purple-200/40 to-blue-200/40 blur-3xl"
        style={{ top: '40%', right: '-10%' }}
        animate={{
          y: [0, 50, 0],
          x: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-green-200/40 to-teal-200/40 blur-3xl"
        style={{ bottom: '20%', left: '20%' }}
        animate={{
          y: [0, -30, 0],
          x: [0, 40, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Small floating orbs */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${
              ['#fecaca', '#fde68a', '#bbf7d0', '#ddd6fe', '#fed7aa'][i % 5]
            } 0%, ${
              ['#fca5a5', '#fcd34d', '#86efac', '#c4b5fd', '#fdba74'][i % 5]
            } 100%)`,
            top: `${15 + (i * 10)}%`,
            left: `${10 + (i * 10)}%`,
          }}
          animate={{
            y: [0, -30 - (i * 5), 0],
            x: [0, (i % 2 === 0 ? 20 : -20), 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4 + (i * 0.5),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* Geometric shapes */}
      <motion.div
        className="absolute w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-300/30 to-amber-300/30 rotate-12"
        style={{ top: '25%', right: '15%' }}
        animate={{ rotate: [12, 25, 12], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-16 h-16 rounded-full border-4 border-purple-300/30"
        style={{ bottom: '30%', right: '25%' }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-12 h-12 bg-gradient-to-br from-green-300/30 to-emerald-300/30 rounded-lg -rotate-12"
        style={{ top: '60%', left: '8%' }}
        animate={{ rotate: [-12, -25, -12], y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
};

// ============================================
// NAVIGATION COMPONENT
// ============================================
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-soft py-3' : 'py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            Home School Tuition
          </span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'About', id: 'about' },
            { label: 'Programs', id: 'gains' },
            { label: 'Why Us', id: 'why-us' },
            { label: 'Enroll', id: 'enroll' },
          ].map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors relative"
              whileHover={{ y: -2 }}
            >
              {item.label}
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-amber-400"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
        </div>
        
        <motion.button
          onClick={() => scrollToSection('enroll')}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-sm font-medium shadow-lg shadow-orange-500/25"
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px -10px rgba(249, 115, 22, 0.5)' }}
          whileTap={{ scale: 0.98 }}
        >
          Enroll Now
        </motion.button>
      </div>
    </motion.nav>
  );
};

// ============================================
// HERO SECTION
// ============================================
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <motion.div style={{ opacity }} className="absolute inset-0">
        <motion.div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-orange-200/50 to-amber-200/50 blur-3xl"
          style={{ top: '-20%', right: '-10%', y: springY1 }}
        />
        <motion.div 
          className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-200/50 to-pink-200/50 blur-3xl"
          style={{ bottom: '-10%', left: '-5%', y: springY2 }}
        />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium text-gray-700">Premium Early Childhood Education</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-gray-800">Nurturing</span>
              <br />
              <span className="text-gradient">Young Minds</span>
              <br />
              <span className="text-gray-800">with Love</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed"
            >
              We don't just teach — we guide, care, and inspire. Watch your child 
              transform into a confident, curious, and compassionate individual 
              through our personalized home tuition approach.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => scrollToSection('enroll')}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg shadow-xl shadow-orange-500/30 flex items-center gap-2"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 20px 40px -15px rgba(249, 115, 22, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Enroll Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 rounded-full glass text-gray-700 font-semibold text-lg flex items-center gap-2"
                whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.9)' }}
                whileTap={{ scale: 0.98 }}
              >
                Learn More
              </motion.button>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-6 mt-10"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-300 to-amber-300 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-medium text-white">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">500+</p>
                <p className="text-sm text-gray-500">Happy Families</p>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square">
              {/* Main floating card */}
              <motion.div
                className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl shadow-2xl border border-white/50 overflow-hidden"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-purple-100/50 to-green-100/50" />
                <div className="relative h-full flex flex-col items-center justify-center p-8">
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center mb-6 shadow-xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Heart className="w-16 h-16 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Child Development</h3>
                  <p className="text-center text-gray-600">Building confidence, character, and curiosity</p>
                </div>
              </motion.div>
              
              {/* Floating elements around */}
              <motion.div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-2xl glass flex items-center justify-center shadow-lg"
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              >
                <BookOpen className="w-10 h-10 text-orange-500" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full glass flex items-center justify-center shadow-lg"
                animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <Sparkles className="w-8 h-8 text-purple-500" />
              </motion.div>
              
              <motion.div
                className="absolute top-1/2 -right-8 w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg"
                animate={{ x: [0, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
              >
                <Target className="w-7 h-7 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-gray-400/50 flex items-start justify-center p-2">
          <motion.div 
            className="w-1.5 h-1.5 rounded-full bg-gray-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// ABOUT SECTION
// ============================================
const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      icon: Heart,
      title: 'Learning Through Love',
      description: 'We believe every child learns best when they feel safe, loved, and valued.',
      color: 'from-rose-400 to-pink-500',
    },
    {
      icon: Users,
      title: 'Personalized Care',
      description: 'Each child receives individual attention tailored to their unique personality.',
      color: 'from-orange-400 to-amber-500',
    },
    {
      icon: Lightbulb,
      title: 'Guided Discovery',
      description: 'We nurture curiosity and help children explore the world around them.',
      color: 'from-purple-400 to-violet-500',
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInLeft}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-6">
              Our Philosophy
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              We Serve, Not Just
              <span className="text-gradient"> Teach</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At Home School Tuition, we understand that early childhood education is about 
              much more than academics. It's about building a foundation for life — 
              developing confidence, emotional intelligence, and a love for learning.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our approach combines structured learning with playful exploration, 
              creating an environment where children naturally thrive and develop 
              at their own pace.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {['Confidence Building', 'Emotional Growth', 'Curiosity'].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 rounded-full glass text-sm font-medium text-gray-700"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.9)' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="space-y-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeInUp}
                whileHover={{ x: 10, scale: 1.02 }}
                className="group p-6 rounded-3xl glass shadow-soft hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// AGE REQUIREMENT SECTION
// ============================================
const AgeSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-24 overflow-hidden" ref={ref}>
      <motion.div 
        className="max-w-5xl mx-auto px-6"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={scaleIn}
      >
        <div className="relative rounded-[3rem] overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400" />
          
          {/* Animated pattern */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-32 h-32 rounded-full border-4 border-white"
                style={{
                  top: `${20 + (i * 15)}%`,
                  left: `${10 + (i * 15)}%`,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
          
          <div className="relative py-16 px-8 md:px-16 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur mb-6"
            >
              <Users className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              For Children Aged
            </motion.h2>
            
            <motion.div 
              variants={fadeInUp}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <span className="text-7xl md:text-8xl font-bold text-white">3</span>
              <span className="text-5xl md:text-6xl font-light text-white/80">—</span>
              <span className="text-7xl md:text-8xl font-bold text-white">6</span>
              <span className="text-3xl md:text-4xl font-medium text-white/90">years</span>
            </motion.div>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              The most crucial years for building a strong foundation. 
              We focus on holistic development during this magical window of growth.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ============================================
// WHAT YOUR CHILD GAINS SECTION
// ============================================
const GainsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const gains = [
    {
      icon: Award,
      title: 'Unshakeable Confidence',
      description: 'Your child develops self-assurance that carries them through every challenge.',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: MessageCircle,
      title: 'Excellent Communication',
      description: 'Clear expression, active listening, and meaningful conversation skills.',
      color: 'from-blue-400 to-indigo-500',
    },
    {
      icon: Brain,
      title: 'Broad Knowledge Base',
      description: 'Strong foundation in general knowledge, logic, and critical thinking.',
      color: 'from-purple-400 to-violet-500',
    },
    {
      icon: Heart,
      title: 'Emotional Intelligence',
      description: 'Understanding feelings, empathy, and healthy emotional expression.',
      color: 'from-rose-400 to-pink-500',
    },
    {
      icon: Target,
      title: 'Leadership Mindset',
      description: 'Early development of initiative, responsibility, and decision-making.',
      color: 'from-emerald-400 to-green-500',
    },
    {
      icon: Sparkles,
      title: 'Love for Learning',
      description: 'A lifelong curiosity and enthusiasm for discovering new things.',
      color: 'from-cyan-400 to-teal-500',
    },
  ];

  return (
    <section id="gains" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            Transformative Results
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What Your Child
            <span className="text-gradient"> Gains</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Within two years, watch your child blossom into a confident, 
            mature, and intelligent individual who's ahead of the curve.
          </p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {gains.map((gain) => (
            <motion.div
              key={gain.title}
              variants={fadeInUp}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group relative p-8 rounded-3xl bg-white shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Hover gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gain.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <div className="relative">
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gain.color} flex items-center justify-center mb-6 shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <gain.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{gain.title}</h3>
                <p className="text-gray-600 leading-relaxed">{gain.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ============================================
// WHY CHOOSE US SECTION
// ============================================
const WhyUsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const reasons = [
    {
      icon: Home,
      title: 'Home Comfort Learning',
      description: 'Learning happens in the familiar, safe environment of your own home.',
    },
    {
      icon: Users,
      title: 'Personalized Attention',
      description: 'One-on-one focus tailored to your child\'s unique learning style.',
    },
    {
      icon: Target,
      title: 'Structured Growth Roadmap',
      description: 'Clear milestones and progress tracking for steady development.',
    },
  ];

  const timelineSteps = [
    { month: 'Month 1-3', title: 'Foundation Building', desc: 'Establishing trust and routine' },
    { month: 'Month 4-8', title: 'Skill Development', desc: 'Core competencies take shape' },
    { month: 'Month 9-12', title: 'Confidence Bloom', desc: 'Visible transformation begins' },
    { month: 'Year 2', title: 'Excellence', desc: 'Your child leads and inspires' },
  ];

  return (
    <section id="why-us" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Reasons */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-6">
              Why Parents Trust Us
            </motion.span>
            
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-800 mb-8">
              Why Choose
              <span className="text-gradient"> Us</span>
            </motion.h2>
            
            <div className="space-y-6">
              {reasons.map((reason) => (
                <motion.div
                  key={reason.title}
                  variants={fadeInUp}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-5 p-5 rounded-2xl hover:bg-white/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                    <reason.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{reason.title}</h3>
                    <p className="text-gray-600">{reason.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Right side - Timeline */}
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={slideInRight}
            className="relative"
          >
            <div className="glass rounded-3xl p-8 shadow-soft">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Growth Journey</h3>
              
              <div className="relative">
                {/* Timeline line */}
                <motion.div 
                  className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 via-amber-400 to-green-400"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                  style={{ originY: 0 }}
                />
                
                <div className="space-y-8">
                  {timelineSteps.map((step, index) => (
                    <motion.div
                      key={step.month}
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                      className="relative flex items-start gap-6"
                    >
                      <motion.div 
                        className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </motion.div>
                      
                      <div className="flex-1 pt-1">
                        <span className="text-sm font-medium text-orange-600">{step.month}</span>
                        <h4 className="text-lg font-semibold text-gray-800">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============================================
// ENROLLMENT SECTION
// ============================================
const EnrollmentSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    childAge: '',
    contact: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.parentName.trim()) {
      newErrors.parentName = 'Please enter your name';
    }
    
    const age = parseInt(formData.childAge);
    if (!formData.childAge || isNaN(age) || age < 3 || age > 6) {
      newErrors.childAge = 'Age must be between 3 and 6 years';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Please enter your contact number';
    } else if (!/^\d{10,}$/.test(formData.contact.replace(/\s/g, ''))) {
      newErrors.contact = 'Please enter a valid contact number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({ parentName: '', childAge: '', contact: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section id="enroll" className="relative py-32 overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-medium mb-6">
            Begin the Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Enroll Your
            <span className="text-gradient"> Child Today</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Take the first step towards transforming your child's future. 
            Fill in the details below and we'll get in touch.
          </p>
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={scaleIn}
          className="relative"
        >
          <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-soft">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Parent Name */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <label className="text-sm font-medium text-gray-700 ml-1">Parent&apos;s Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className={`w-full px-5 py-4 rounded-2xl bg-white/80 border-2 ${
                        errors.parentName ? 'border-rose-400' : 'border-transparent'
                      } focus:border-orange-400 transition-all duration-300 text-gray-800 placeholder:text-gray-400`}
                    />
                    <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                  {errors.parentName && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-rose-500 ml-1"
                    >
                      {errors.parentName}
                    </motion.p>
                  )}
                </motion.div>
                
                {/* Child Age */}
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <label className="text-sm font-medium text-gray-700 ml-1">Child&apos;s Age (3-6 years)</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="childAge"
                      value={formData.childAge}
                      onChange={handleChange}
                      placeholder="e.g., 4"
                      min="3"
                      max="6"
                      className={`w-full px-5 py-4 rounded-2xl bg-white/80 border-2 ${
                        errors.childAge ? 'border-rose-400' : 'border-transparent'
                      } focus:border-orange-400 transition-all duration-300 text-gray-800 placeholder:text-gray-400`}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">years</span>
                  </div>
                  {errors.childAge && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-sm text-rose-500 ml-1"
                    >
                      {errors.childAge}
                    </motion.p>
                  )}
                </motion.div>
              </div>
              
              {/* Contact */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <label className="text-sm font-medium text-gray-700 ml-1">Contact Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={`w-full px-5 py-4 rounded-2xl bg-white/80 border-2 ${
                      errors.contact ? 'border-rose-400' : 'border-transparent'
                    } focus:border-orange-400 transition-all duration-300 text-gray-800 placeholder:text-gray-400`}
                  />
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
                {errors.contact && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-rose-500 ml-1"
                  >
                    {errors.contact}
                  </motion.p>
                )}
              </motion.div>
              
              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-lg shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 disabled:opacity-70"
                whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px rgba(249, 115, 22, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    Submit Enrollment
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
      
      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-white rounded-[2rem] p-8 md:p-12 max-w-md w-full text-center shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-gray-800 mb-3"
              >
                Enrollment Submitted!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 mb-6"
              >
                Thank you for your interest! We&apos;ll contact you within 24 hours to discuss your child&apos;s journey.
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setShowSuccess(false)}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// ============================================
// FOOTER SECTION
// ============================================
const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative py-16 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-t from-orange-50/50 to-transparent" />
      
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={fadeIn}
        className="relative max-w-7xl mx-auto px-6"
      >
        <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-soft">
          <div className="grid md:grid-cols-3 gap-10 items-center">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Home School Tuition
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Nurturing young minds with love, care, and personalized attention.
              </p>
            </div>
            
            {/* Contact */}
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-sm">hello@homeschooltuition.com</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Serving families nationwide</span>
              </div>
            </div>
            
            {/* Social */}
            <div className="flex items-center justify-center md:justify-end gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center text-gray-600 hover:text-orange-500 hover:bg-white transition-all"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-gray-200/50 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Home School Tuition. All rights reserved.
            </p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  return (
    <div className="relative min-h-screen bg-gradient-hero">
      <FloatingShapes />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <AgeSection />
        <GainsSection />
        <WhyUsSection />
        <EnrollmentSection />
        <Footer />
      </main>
    </div>
  );
}

export default App;

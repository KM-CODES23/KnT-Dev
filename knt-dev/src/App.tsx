import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import './index.css';
import logo from './assets/logo3.png';
import heroBg from './assets/bg1.png';
import kmcodes from './assets/kmcodes.png';
import lunar from './assets/lunar.png';


import unpackImg from './assets/unpack-ai.jpeg'; 
import kmcodesImg from './assets/kmcodesweb.png';
import voiceImg from './assets/voiceinaction.png';
import vukaImg from './assets/vukamjita.png';

interface FormData {
  name: string;
  email: string;
  message: string;
}

/* =========================================================================
   THREE.JS BACKGROUND COMPONENT (AI Particle Network)
   ========================================================================= */
const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
    mountRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: '#FF7A00',
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleMesh);

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      particleMesh.rotation.y += 0.0005;
      particleMesh.rotation.x += 0.0002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none bg-[#0A0B0E]" />;
};

/* =========================================================================
   MAIN APP COMPONENT
   ========================================================================= */
export default function App() {
  

  // New States for Mobile Menu & FAQ
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Reference for sliding portfolio carousel
  const portfolioScrollRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollPortfolio = (direction: 'left' | 'right') => {
    if (portfolioScrollRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      portfolioScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); 
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.observe-me');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const stackItems = [
    {
      name: 'React.js',
      category: 'Frontend Framework',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" strokeWidth={1.5} transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" strokeWidth={1.5} transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" strokeWidth={1.5} transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'TypeScript',
      category: 'Typed Language',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      name: 'Node.js',
      category: 'Backend Runtime',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
        </svg>
      )
    },
    {
      name: 'Python',
      category: 'Automation & AI',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21" />
        </svg>
      )
    },
    {
      name: 'Tailwind CSS',
      category: 'UI Styling',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.01 2.748a15.997 15.998 0 015.01-2.748m0 0a3 3 0 005.781-1.129 2.25 2.25 0 012.4-2.245 4.5 4.5 0 00-8.4 2.245c0 .399.078.78.22 1.128zm0 0a15.997 15.997 0 00-3.388 1.62" />
        </svg>
      )
    },
    {
      name: 'AWS Cloud',
      category: 'Infrastructure',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      )
    },
    {
      name: 'Supabase',
      category: 'Cloud Database',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
        </svg>
      )
    },
    {
      name: 'Docker',
      category: 'Containerization',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v10.5L12 22.5M3 7.5l9 5.25M3 7.5v10.5l9 5.25m0-10.5v10.5" />
        </svg>
      )
    }
  ];

  const faqs = [
    { q: "Do you offer monthly maintenance and support?", a: "Yes. After deployment, we offer dedicated hardware and software maintenance retainers to ensure your systems remain updated, secure, and running at 100%." },
    { q: "How long does a custom web application take to build?", a: "Timelines depend heavily on feature scope, but a standard application MVP typically moves from discovery to deployment within 4 to 8 weeks." },
    { q: "Do we own the source code after launch?", a: "Absolutely. Once the project is finalized and the final invoice is cleared, the intellectual property and source code belong entirely to you." }
  ];
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');

    fetch("/contact.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...formData })
    })
      .then((response) => {
        if (response.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => setSubmitStatus('idle'), 4000);
        } else {
          setSubmitStatus('error');
        }
      })
      .catch((error) => {
        console.error(error);
        setSubmitStatus('error');
      });
  };

  return (
    // Replaced solid background color with transparent so the 3D grid shows through
    <div className="min-h-screen text-white select-none overflow-x-hidden relative bg-transparent">
      
      {/* 1. THREE.JS 3D PARTICLE BACKGROUND */}
      <ThreeBackground />
      
      {/* =========================================================================
          TOP VIEWPORT WRAPPER
         ========================================================================= */}
      <div id="home" className="relative min-h-screen w-full pb-12 overflow-hidden">
        
        <div 
          className="absolute inset-0 bg-no-repeat bg-right-top lg:bg-cover pointer-events-none z-0"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            animation: 'slowPanZoom 20s ease-in-out infinite alternate'
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#0F1115] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1115]/90 via-[#0F1115]/40 to-transparent pointer-events-none hidden lg:block z-10" />

        <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 bg-[#0F1115]/80 backdrop-blur-md border-b border-white/5">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <a href="#home">
                <img src={logo} alt="KnT Dev Logo" className="h-10 w-auto object-contain rounded-md" loading="lazy"/>
              </a>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-wider font-semibold" style={{ color: '#94A3B8' }}>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              
              <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
              <a href="#team" className="hover:text-white transition-colors">Team</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>

            <div className="hidden md:block">
              <a href="#contact" className="btn-glow text-xs uppercase tracking-wider px-5 py-2.5">Start Your Project</a>
            </div>

            {/* Mobile Hamburger Icon */}
            <button 
              className="md:hidden text-white hover:text-[#FF7A00] transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#0F1115] border-b border-white/5 py-4 px-6 flex flex-col space-y-4 shadow-xl z-50">
              <a href="#services" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-wide text-neutral-300 hover:text-white">Services</a>
              
              <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-wide text-neutral-300 hover:text-white">Portfolio</a>
              <a href="#team" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-wide text-neutral-300 hover:text-white">Team</a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold uppercase tracking-wide text-neutral-300 hover:text-white">FAQ</a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center bg-[#FF7A00] text-white py-3 rounded text-xs font-bold uppercase tracking-wider mt-2 hover:bg-[#FFA800] transition-colors">Start Your Project</a>
            </div>
          )}
        </nav>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* POSTER HERO LEFT */}
          <div className="pt-36 pb-6 max-w-xl observe-me fade-up-blur">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Code. <br />
              Automate. <br />
              <span className="text-[#FF7A00]">Innovate.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-lg max-w-lg leading-relaxed text-neutral-300">
              We build smart, scalable and reliable tech solutions that <strong className="text-[#FF7A00]">power businesses</strong> into the future.
            </p>

            {/* Actionable Hero Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#contact" className="bg-[#FF7A00] text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider hover:bg-[#FFA800] transition-colors flex items-center space-x-2 shadow-[0_0_15px_rgba(255,122,0,0.3)]">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                <span>Get a Quote</span>
              </a>
              <a href="#portfolio" className="border border-white/20 bg-[#1A1D24]/50 backdrop-blur-md text-white px-8 py-3 rounded text-xs font-bold uppercase tracking-wider hover:border-[#FF7A00] hover:text-[#FF7A00] transition-colors">
                View Our Work
              </a>
            </div>
          </div>

          {/* POSTER SERVICES GRID */}
          <div id="services" className="relative z-20 max-w-7xl mx-auto w-full pt-4">
            <h2 className="text-sm font-bold mb-3 uppercase tracking-wider text-neutral-400 observe-me fade-up" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              Our Services
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'WEBSITES', 
                  subtitle: 'Modern. Responsive. Results Driven.',
                  desc: 'We design and develop stunning, fast and responsive websites that represent your brand and convert visitors into customers.' 
                },
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  ),
                  title: 'AI AUTOMATION', 
                  subtitle: 'Automate Smarter. Work Less. Achieve More.',
                  desc: 'We build custom AI automations that streamline your workflows, save time, reduce costs and help your business scale intelligently.' 
                },
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: 'APP DEVELOPMENT', 
                  subtitle: 'Ideas into Powerful Mobile Experiences.',
                  desc: 'We create high-performance mobile apps for Android and iOS that are user-friendly, scalable and built to perform.' 
                },
                { 
                  icon: (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: 'SOFTWARE MAINTENANCE', 
                  subtitle: 'Keep Your Systems Running at 100%.',
                  desc: 'We provide reliable maintenance and support for both software and hardware to ensure your systems stay secure, updated and performing at their best.' 
                }
              ].map((svc, i) => (
                <div 
                  key={i} 
                  className="card-glass p-5 border border-amber-600/30 flex flex-col justify-between hover:border-[#FF7A00] transition-all duration-300 observe-me scale-pop"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="space-y-3">
                    <div className="text-[#FF7A00] mb-2">{svc.icon}</div>
                    <div>
                      <h6 className="text-sm font-bold leading-tight uppercase tracking-wide">{svc.title}</h6>
                      <p className="text-[11px] font-semibold text-[#FF7A00] mt-1">{svc.subtitle}</p>
                    </div>
                    <p className="text-[11px] leading-relaxed text-neutral-400">{svc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          LOWER CANVAS
         ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* POSTER TRUST BADGES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-y border-white/5 py-8 observe-me fade-up">
          <div className="flex items-center justify-center space-x-3 text-center sm:text-left">
            <div className="text-[#FF7A00]">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">Reliable<br/>& Secure</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-center sm:text-left">
            <div className="text-[#FF7A00]">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.452.822.822 0 00-.311-.06M9.63 8.41L15.6 14.4" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">Innovative<br/>Solutions</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-center sm:text-left">
            <div className="text-[#FF7A00]">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">On Time<br/>Delivery</span>
          </div>
          <div className="flex items-center justify-center space-x-3 text-center sm:text-left">
            <div className="text-[#FF7A00]">
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h1.5a1.5 1.5 0 001.5-1.5v-6a1.5 1.5 0 00-1.5-1.5h-1.5M21.75 21h-1.5a1.5 1.5 0 01-1.5-1.5v-6a1.5 1.5 0 011.5-1.5h1.5M3.75 12V9A9 9 0 0120.25 9v3M3.75 12H2.25m18 0h1.5" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider">Dedicated<br/>Support</span>
          </div>
        </div>

        {/* POSTER CALLOUT BANNER */}
        <div className="text-center space-y-2 observe-me scale-pop py-8">
          <p className="text-sm font-semibold tracking-widest uppercase text-neutral-400">We don't just write code,</p>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase text-[#FF7A00]" style={{ fontFamily: 'Plus Jakarta Sans' }}>We Build Solutions.</h2>
        </div>

       {/* OUR PROCESS (NEW) */}
        <div id="process" className="space-y-8 pt-4">
          <div className="text-center space-y-2 observe-me fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Our Development Pipeline</h2>
            <p className="text-xs text-neutral-400 max-w-xl mx-auto">From initial wireframes to global deployment, we operate on a structured agile workflow to ensure transparent delivery.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 z-0"></div>
            
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your business bottleneck and defining technical scope.' },
              { step: '02', title: 'Architecture', desc: 'Wireframing, UI/UX mapping, and database schema design.' },
              { step: '03', title: 'Development', desc: 'Agile coding sprints with continuous performance testing.' },
              { step: '04', title: 'Deployment', desc: 'Secure cloud launch and ongoing system maintenance.' }
            ].map((p, i) => (
              <div key={i} className="card-glass p-5 border border-white/5 relative z-10 observe-me scale-pop" style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="text-3xl font-extrabold text-[#FF7A00]/20 absolute top-2 right-4">{p.step}</div>
                <h4 className="text-sm font-bold text-white mb-2 mt-4">{p.title}</h4>
                <p className="text-[11px] text-neutral-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

{/* PRICING SECTION */}
        {/* SERVICES OFFERED */}
        <div id="services-list" className="pt-10 pb-6 observe-me fade-up">
          <div className="flex flex-col items-center text-center mb-6">
             <h2 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Our Services</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {['Business Websites', 'E-Commerce', 'Landing Pages', 'Portfolio Websites', 'Booking Websites', 'Website Redesign', 'Web Maintenance', 'SEO & Speed Optimization'].map((service, i) => (
              <span key={i} className="px-3 py-1 bg-[#13151A] border border-white/10 rounded-full text-[11px] text-neutral-300">
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* PRICING SECTION - WEBSITES */}
        <div id="pricing" className="space-y-6 pt-4">
          <div className="flex flex-col space-y-1 observe-me fade-up text-center">
            <h2 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Website Packages</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 observe-me fade-up">
            
            {/* Basic */}
            <div className="flex flex-col p-6 bg-[#13151A] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-white mb-1">Basic</h3>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-white">R1,000</span>
                <span className="text-[10px] text-neutral-500 ml-1">- R1,200</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Responsive, clean UI (standard components)", "Basic SEO", "Netlify deployment", "1 month basic maintenance (bug fixes/text)"].map((feature, i) => (
                  <li key={i} className="flex items-start text-[11px] text-neutral-300">
                    <span className="text-[#FF7A00] mr-2">▹</span>{feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center w-full py-2.5 rounded text-[10px] font-bold tracking-wider uppercase border border-white/10 text-neutral-300 hover:bg-white/5 transition-colors mt-auto">
                Get Started
              </a>
            </div>

            {/* Starter */}
            <div className="flex flex-col p-6 bg-[#13151A] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-white mb-1">Starter</h3>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-white">R2,500</span>
                <span className="text-[10px] text-neutral-500 ml-1">- R4,500</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["1 premium landing page", "Mobile responsive & fast loading", "Contact form & basic WhatsApp chat", "Basic SEO & Google Search Console", "Google Business Profile", "Free 3 months marketing", "1 month maintenance", "Training and support", "Netlify or custom domain/hosting"].map((feature, i) => (
                  <li key={i} className="flex items-start text-[11px] text-neutral-300">
                    <span className="text-[#FF7A00] mr-2">▹</span>{feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center w-full py-2.5 rounded text-[10px] font-bold tracking-wider uppercase border border-white/10 text-neutral-300 hover:bg-white/5 transition-colors mt-auto">
                Get Started
              </a>
            </div>

            {/* Standard */}
            <div className="flex flex-col p-6 bg-[#1A1D24] border border-[#FF7A00]/50 rounded-xl shadow-lg relative transform md:-translate-y-2">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF7A00] text-[#0A0B0E] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Recommended</div>
              <div className="mb-4">
                <h3 className="text-sm font-bold text-[#FF7A00] mb-1">Standard</h3>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-white">R5,000</span>
                <span className="text-[10px] text-neutral-500 ml-1">- R10,000</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Everything in Starter", "Up to 5 custom pages", "Advanced animations & custom UI", "Advanced SEO & analytics", "Database integration", "Free .co.za domain (1 year)", "Free 3 months marketing", "2 months maintenance"].map((feature, i) => (
                  <li key={i} className="flex items-start text-[11px] text-neutral-200">
                    <span className="text-[#FF7A00] mr-2">▹</span>{feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center w-full py-2.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#FF7A00] text-[#0A0B0E] hover:bg-[#FF7A00]/90 transition-colors mt-auto">
                Book a Discovery Call
              </a>
            </div>

            {/* Premium */}
            <div className="flex flex-col p-6 bg-[#13151A] border border-white/5 rounded-xl hover:border-white/10 transition-colors">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-white mb-1">Premium</h3>
              </div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-white">R12,000</span>
                <span className="text-[10px] text-neutral-500 ml-1">- R20,000</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {["Everything in Standard", "Unlimited pages", "3D clean website design", "CMS & Database integration", "Free .com or .co.za domain", "Free 6 months marketing + 1 mo. Google Ads setup", "3 months maintenance"].map((feature, i) => (
                  <li key={i} className="flex items-start text-[11px] text-neutral-300">
                    <span className="text-[#FF7A00] mr-2">▹</span>{feature}
                  </li>
                ))}
              </ul>
              <a href="#contact" className="block text-center w-full py-2.5 rounded text-[10px] font-bold tracking-wider uppercase border border-white/10 text-neutral-300 hover:bg-white/5 transition-colors mt-auto">
                Get a Custom Quote
              </a>
            </div>
          </div>

         {/* OTHER SERVICES (APP, AI, MAINTENANCE) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 observe-me fade-up">
            
            {/* App Development */}
            <div className="p-6 bg-[#13151A] border border-white/5 rounded-xl flex flex-col hover:border-white/10 transition-colors">
              <h3 className="text-sm font-bold text-white mb-4">App Development</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <div className="text-[11px] font-bold text-white mb-1">MVP / Prototype</div>
                  <div className="text-[10px] text-neutral-400">Includes simple UI, user authentication, and basic database reading/writing.</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white mb-1">Full Application</div>
                  <div className="text-[10px] text-neutral-400">Inventory/booking portals, complex logic, admin dashboards, and Play Store/App Store deployment.</div>
                </div>
              </div>
              <a href="#contact" className="mt-6 block text-center w-full py-2.5 rounded text-[10px] font-bold tracking-wider uppercase border border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-[#0A0B0E] transition-colors">
                Contact for Custom Quote
              </a>
            </div>
            
            {/* AI Automation */}
            <div className="p-6 bg-[#13151A] border border-white/5 rounded-xl flex flex-col hover:border-white/10 transition-colors">
              <h3 className="text-sm font-bold text-white mb-4">AI Automation</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <div className="text-[11px] font-bold text-white mb-1">Workflow Setup</div>
                  <div className="text-[10px] text-neutral-400">Custom API integrations, automated lead responses, and smart WhatsApp bots.</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white mb-1">API Retainer</div>
                  <div className="text-[10px] text-neutral-400">Ongoing maintenance and API cost management for your active automations.</div>
                </div>
              </div>
              <a href="#contact" className="mt-6 block text-center w-full py-2.5 rounded text-[10px] font-bold tracking-wider uppercase border border-[#FF7A00] text-[#FF7A00] hover:bg-[#FF7A00] hover:text-[#0A0B0E] transition-colors">
                Contact for Custom Quote
              </a>
            </div>

            {/* Software & Hardware Maintenance */}
            <div className="p-6 bg-[#13151A] border border-white/5 rounded-xl flex flex-col hover:border-white/10 transition-colors">
              <h3 className="text-sm font-bold text-white mb-4">IT Maintenance</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <div className="text-[11px] font-bold text-white mb-1">Ad-Hoc Support</div>
                  <div className="text-[10px] text-neutral-400">One-off software troubleshooting, hardware diagnostics, and PC repairs.</div>
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white mb-1">Monthly SLA Retainer</div>
                  <div className="text-[10px] text-neutral-400">Dedicated hours of IT support, network troubleshooting, and security updates per month.</div>
                </div>
              </div>
              <a href="#contact" className="mt-6 block text-center w-full py-2.5 rounded text-[10px] font-bold tracking-wider uppercase border border-white/10 text-neutral-300 hover:bg-white/5 transition-colors">
                Contact for Rates
              </a>
            </div>
{/* PRICING DISCLAIMER */}
          <div className="max-w-4xl mx-auto text-center pt-10 space-y-2 border-t border-white/5 mt-8">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-wider">Website Pricing Disclaimer & Variance Notice</h4>
            <p className="text-[9px] text-neutral-400 leading-relaxed mx-auto text-justify">
              The web development packages and price ranges listed above serve as baseline estimations for standard business requirements and do not constitute a final binding financial offer. Website development costs in South Africa vary significantly based on unique business needs, including custom feature requests, the total number of landing pages, third-party software integrations (such as booking engines or real-time CRM syncing), advanced e-commerce logic, and copy asset readiness. Please contact us directly for a comprehensive project assessment and an official, itemised quotation tailored to your exact scope.
            </p>
          </div>
          </div>
          
        </div>
        


        {/* PORTFOLIO (UPDATED WITH SCREENSHOTS) */}
        <div id="portfolio" className="space-y-6">
          <div className="flex items-center justify-between observe-me fade-up">
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>Featured Work</h2>
              <p className="text-[11px] text-neutral-400">Recent high-impact systems we have architected and deployed.</p>
            </div>
            
            {/* Interactive Carousel Buttons */}
            <div className="hidden sm:flex space-x-2 text-xs text-[#94A3B8]">
              <button onClick={() => scrollPortfolio('left')} className="p-1.5 rounded bg-[#1A1D24] hover:text-[#FF7A00] transition-colors focus:outline-none">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" /></svg>
              </button>
              <button onClick={() => scrollPortfolio('right')} className="p-1.5 rounded bg-[#1A1D24] hover:text-[#FF7A00] transition-colors focus:outline-none">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </button>
            </div>
          </div>

          <div 
            ref={portfolioScrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {[
              {
                title: "Unpack AI Platform",
                desc: "A custom split-architecture web application deployed via scalable digital hosting platforms.",
                stack: ["React.js", "Render Cloud", "Supabase"],
                url: "www.unpack-ai.co.za",
                link: "https://www.unpack-ai.co.za",
                img: unpackImg // <-- Connected image
              },
              {
                title: "KM CODES Portfolio",
                desc: "A full-stack web application with a custom CMS for managing and showcasing a growing portfolio of software projects.",
                stack: ["Next.js", "Tailwind CSS", "THREE.JS"],
                url: "kmcodes.netlify.app",
                link: "https://kmcodes.netlify.app/",
                img: kmcodesImg // <-- Connected image
              },
              {
                title: "Voice in Action",
                desc: "A custom web application for a South African NGO, built to manage and track community development projects.",
                stack: ["React.js", "Tailwind CSS", "TypeScript"],
                url: "voice-in-action.netlify.app",
                link: "https://voice-in-action.netlify.app/",
                img: voiceImg // <-- Connected image
              },
              {
                title: "Vuka Mjita",
                desc: "A custom web application for a South African NGO, built to spread awareness about men's mental health.",
                stack: ["React.js", "Tailwind CSS", "TypeScript"],
                url: "vukamjita.netlify.app",
                link: "https://vukamjita.netlify.app/",
                img: vukaImg // <-- Connected image
              }
            ].map((project, i) => (
              <div 
                key={i} 
                className="min-w-[100%] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] snap-center card-glass overflow-hidden border border-white/5 group observe-me fade-up hover:border-[#FF7A00]/50 transition-colors" 
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <a href={project.link} target="_blank" rel="noreferrer" className="block relative cursor-pointer">
                  
                  {/* Image & Overlay Container */}
                  <div className="aspect-video bg-[#13151A] border-b border-white/5 p-4 flex flex-col justify-end relative overflow-hidden transition-colors">
                    
                    {/* The Actual Screenshot */}
                    <img 
                      src={project.img} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
                      loading="lazy"
                    />

                    {/* Dark gradient to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-[#0A0B0E]/40 to-transparent opacity-80"></div>
                    
                    {/* Orange Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7A00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Hover Link Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-[#FF7A00] z-10 drop-shadow-md">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </div>
                    
                    <span className="text-[10px] font-mono text-[#FF7A00] z-10 drop-shadow-lg font-bold">{project.url}</span>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-3">
                    <h4 className="text-sm font-bold group-hover:text-[#FF7A00] transition-colors">{project.title}</h4>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.stack.map(s => (
                        <span key={s} className="px-2 py-1 bg-white/5 rounded text-[9px] font-mono text-neutral-300">{s}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            TECH STACK & QUALIFICATIONS (BADGE SLIDESHOW / MARQUEE)
           ========================================================================= */}
        <div id="stack" className="space-y-8 pt-4">
          <div className="space-y-1 observe-me fade-up">
            <h2 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>Tech Stack & Qualifications</h2>
            <p className="text-[11px] text-neutral-400">The tools we use and the credentials that back our technical expertise.</p>
          </div>

          {/* 1. ANIMATED CONTINUOUS TECH STACK SLIDESHOW */}
          <div className="overflow-hidden w-full relative py-2 border-y border-white/5 observe-me fade-up">
            <div className="animate-marquee space-x-6">
              {/* Duine array twice for infinite seamless loop */}
              {[...stackItems, ...stackItems].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center space-x-3 card-glass px-5 py-3 border border-amber-600/30 rounded-lg hover:border-[#FF7A00] transition-colors min-w-[200px]"
                >
                  <div className="text-[#FF7A00] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">{item.name}</span>
                    <span className="text-[9px] text-[#FF7A00] font-semibold block">{item.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. QUALIFICATIONS & CERTIFICATIONS BADGES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 observe-me fade-up">
            
            <div className="card-glass p-4 border border-amber-600/30 flex items-center space-x-4 hover:border-[#FF7A00] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] flex-shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Diploma in ICT App Dev</h4>
                <p className="text-[10px] text-[#FF7A00] font-semibold mt-0.5">Sol Plaatje University</p>
              </div>
            </div>

            <div className="card-glass p-4 border border-amber-600/30 flex items-center space-x-4 hover:border-[#FF7A00] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] flex-shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">AWS Cloud Practitioner</h4>
                <p className="text-[10px] text-[#FF7A00] font-semibold mt-0.5">Amazon Web Services</p>
              </div>
            </div>

            <div className="card-glass p-4 border border-amber-600/30 flex items-center space-x-4 hover:border-[#FF7A00] transition-colors">
              <div className="w-12 h-12 rounded-lg bg-[#FF7A00]/10 flex items-center justify-center text-[#FF7A00] flex-shrink-0">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cybersecurity Certified</h4>
                <p className="text-[10px] text-[#FF7A00] font-semibold mt-0.5">Industry Qualification</p>
              </div>
            </div>

          </div>
        </div>

{/* FEEDBACK & REVIEWS SECTION */}
        <div id="reviews" className="space-y-6 pt-10 pb-16 observe-me fade-up">
          <div className="flex flex-col items-center text-center space-y-2">
            <h2 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
              We Value Your Feedback
            </h2>
            <p className="text-[11px] text-neutral-400 max-w-md">
              As a growing tech studio, your thoughts mean everything to us. Help us improve and reach more people by sharing your experience!
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <div className="flex flex-col items-center p-8 bg-[#1A1D24] border border-[#FF7A00]/30 rounded-xl hover:border-[#FF7A00] transition-colors shadow-lg shadow-[#FF7A00]/5 max-w-sm w-full text-center">
              
              {/* 5-Star Graphic */}
              <div className="flex space-x-1 text-[#FF7A00] mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <h3 className="text-sm font-bold text-white mb-2">Rate KnT.Dev Studio</h3>
              <p className="text-[10px] text-neutral-400 mb-6 leading-relaxed">
                Loved your new website or digital service? Leave us a quick 5-star review to help other businesses find our digital architecture.
              </p>
              
              <a 
                href="https://g.page/r/CbldNDng9TDVEBM/review" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#FF7A00] text-[#0A0B0E] text-[10px] font-bold uppercase tracking-wider rounded hover:bg-[#FF7A00]/90 transition-colors w-full"
              >
                Rate Us on Google
              </a>
            </div>
          </div>
        </div>



        {/* ABOUT SECTION (Directional Sliding) */}
        <div id="about" className="space-y-12 pt-12">
          <div className="space-y-2 observe-me fade-right">
            <div className="relative pb-2 inline-block">
              <h2 className="text-2xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                About KnT.Dev Studio
              </h2>
              <div className="absolute bottom-0 left-0 h-[2px] w-12 bg-gradient-to-r from-[#FF7A00] to-[#FFA800]" />
            </div>
            <p className="text-xs max-w-xl text-neutral-400">
              Architecting high-impact digital solutions, custom web applications, and resilient tech ecosystems from the ground up.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Slides in from the left */}
            <div className="lg:col-span-7 card-glass p-6 border border-white/5 flex flex-col justify-between space-y-6 observe-me fade-right">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 text-[10px] uppercase font-mono px-2.5 py-1 rounded bg-[#FF7A00]/10 text-[#FF7A00] border border-[#FF7A00]/20">
                  <span>&lt; Our Origin Story /&gt;</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  Founded with a vision to build modern, accessible, and high-performance technology.
                </h3>
                <p className="text-xs leading-relaxed text-neutral-400">
                  KnT.Dev Studio was established by co-founders <strong className="text-white">Kgothatso</strong> and <strong className="text-white">Tshepang</strong> as an evolution of local digital craftsmanship into a full-scale software and development studio. Born from a passion for clean code and problem-solving, KnT.Dev blends local identity with enterprise-level development standards—creating websites, web applications, cloud architectures, and digital tools built to scale.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#0F1115]/80 border border-white/5 space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#FF7A00] font-bold tracking-wider">Mission Statement</span>
                <p className="text-xs font-medium text-white leading-relaxed">
                  "To engineer high-impact, scalable systems and robust software solutions designed to power tomorrow’s tech landscape."
                </p>
              </div>
            </div>

            {/* Slides in from the right */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4 observe-me fade-left" style={{ transitionDelay: '200ms' }}>
              <div className="card-glass p-4 border border-white/5 space-y-1.5 hover:border-[#FF7A00]/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <span className="text-[#FF7A00]">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </span>
                  <h4 className="text-xs font-bold text-white">Performance-Driven Code</h4>
                </div>
                <p className="text-[11px] leading-normal text-neutral-400">
                  We write clean, lightweight, and scalable code optimized for lightning-fast load times.
                </p>
              </div>
              <div className="card-glass p-4 border border-white/5 space-y-1.5 hover:border-[#FF7A00]/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <span className="text-[#FF7A00]">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </span>
                  <h4 className="text-xs font-bold text-white">Security & Resilience</h4>
                </div>
                <p className="text-[11px] leading-normal text-neutral-400">
                  Built-in security best practices, secure database integration, and cloud-native safety protocols.
                </p>
              </div>
              <div className="card-glass p-4 border border-white/5 space-y-1.5 hover:border-[#FF7A00]/30 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <span className="text-[#FF7A00]">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.82 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.496 1.508 1.333 1.508 2.316v.192m4.5 0h-4.5" />
                    </svg>
                  </span>
                  <h4 className="text-xs font-bold text-white">Human-Centric UX</h4>
                </div>
                <p className="text-[11px] leading-normal text-neutral-400">
                  Intuitive design, modern aesthetics, and seamless user journeys mapped for engagement.
                </p>
              </div>
            </div>
          </div>

        </div>

      {/* FAQ SECTION (NEW) */}
        <div id="faq" className="max-w-3xl mx-auto space-y-8 pt-4 observe-me fade-up">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="card-glass border border-white/5 overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="text-sm font-bold text-white">{faq.q}</span>
                  <span className={`text-[#FF7A00] transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </span>
                </button>
                <div 
                  className={`px-6 transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-xs text-neutral-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div> 

        {/* TEAM & CONTACT BLOCK (Opposing Slides) */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">

         

          <div id="team" className="lg:col-span-4 space-y-6 observe-me fade-right">

            <h2 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Plus Jakarta Sans' }}>Team</h2>

            <div className="grid grid-cols-1 gap-4">

              <div className="card-glass p-4 flex items-center space-x-4 border border-white/5">

                <div className="w-14 h-14 bg-[#1A1D24] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">

                  <img src={kmcodes} alt="Kgothatso Mohanoe" className="w-full h-full object-cover" loading="lazy"/>

                </div>

                <div>

                  <h4 className="text-xs font-bold">Kgothatso Mohanoe</h4>

                  <p className="text-[10px]" style={{ color: '#94A3B8' }}>Co-Founder & Lead Dev</p>

                </div>

              </div>

              <div className="card-glass p-4 flex items-center space-x-4 border border-white/5">

                <div className="w-14 h-14 bg-[#1A1D24] rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">

                  <img src={lunar} alt="Tshepang Mabitle" className="w-full h-full object-cover" loading="lazy"/>

                </div>

                <div>

                  <h4 className="text-xs font-bold">Tshepang Mabitle</h4>

                  <p className="text-[10px]" style={{ color: '#94A3B8' }}>Co-Founder & Dev</p>

                </div>

              </div>

            </div>

          </div>

          <div id="contact" className="lg:col-span-8 card-glass p-6 md:p-10 border border-[#FF7A00]/50 observe-me fade-left shadow-[0_0_40px_rgba(255,122,0,0.05)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Primary Focus: WhatsApp */}
              <div className="space-y-6 flex flex-col justify-center">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight uppercase text-white" style={{ fontFamily: 'Plus Jakarta Sans' }}>Start a Project</h2>
                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                    We prioritize direct communication. <strong className="text-[#FF7A00]">We are currently on a call.</strong> Skip the emails and send us your quote requirements directly via WhatsApp for an immediate response.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <a href="https://wa.me/27614075624" target="_blank" rel="noreferrer" className="flex items-center justify-center space-x-3 bg-[#FF7A00] text-white p-4 rounded hover:bg-[#FFA800] transition-colors group w-full shadow-lg">
                    <span className="text-white group-hover:scale-110 transition-transform">
                      <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                    </span>
                    <span className="text-lg font-bold tracking-wider">061 407 5624</span>
                  </a>
                  
                </div>
              </div>

              {/* Secondary Fallback: Minimal Email Form */}
              <div className="space-y-4 pl-0 md:pl-6 md:border-l border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold mb-2">Or Drop a Message</p>
                <form className="space-y-3" onSubmit={handleFormSubmit}>
                  
                  {/* Hidden input required for Netlify to link the React request to the HTML form */}
                  <input type="hidden" name="form-name" value="contact" />

                  <input 
                    type="text" 
                    name="name" 
                    required
                    value={formData.name} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#0A0B0E] border border-white/5 rounded p-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF7A00] transition-colors" 
                    placeholder="Your Name" 
                  />
                  <input 
                    type="email" 
                    name="email" 
                    required
                    value={formData.email} 
                    onChange={handleInputChange} 
                    className="w-full bg-[#0A0B0E] border border-white/5 rounded p-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF7A00] transition-colors" 
                    placeholder="Your Email" 
                  />
                  <textarea 
                    name="message" 
                    required
                    value={formData.message} 
                    onChange={handleInputChange} 
                    rows={3} 
                    className="w-full bg-[#0A0B0E] border border-white/5 rounded p-3 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF7A00] transition-colors resize-none" 
                    placeholder="Project Details" 
                  />
                  
                  <button 
                    type="submit" 
                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                    className={`w-full py-3 rounded text-xs font-bold tracking-wider uppercase transition-colors border ${
                      submitStatus === 'success' 
                        ? 'bg-[#FF7A00]/20 border-[#FF7A00] text-[#FF7A00]' 
                        : submitStatus === 'error'
                        ? 'bg-red-500/20 border-red-500 text-red-500'
                        : 'bg-transparent border-white/10 text-neutral-300 hover:border-[#FF7A00] hover:text-[#FF7A00]'
                    }`}
                  >
                    {submitStatus === 'submitting' ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : submitStatus === 'error' ? 'Error. Try Again' : 'Submit Request'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 pt-16 pb-6 bg-[#0B0C0E] relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 text-xs" style={{ color: '#94A3B8' }}>
          
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="KnT Dev Logo" className="h-9 w-auto object-contain rounded" loading="lazy"/>
            </div>
            <p className="leading-relaxed max-w-sm">
              Code. Automate. Innovate. We build smart, scalable, and reliable tech solutions that power businesses into the future.
            </p>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <div className="relative pb-2">
              <h4 className="text-white font-bold text-sm">Contact Us</h4>
              <div className="absolute bottom-0 left-0 h-[2px] w-8 bg-gradient-to-r from-[#FF7A00] to-[#FFA800]" />
            </div>
            <p className="leading-loose">
              Kimberley CBD / Carletonville<br />
              Gauteng & Northern Cape<br />
              South Africa
            </p>
            <p className="border-b border-white/10 pb-1 inline-block text-white">kt.studio.business@gmail.com</p>
            <p className="pt-1 block font-bold text-white">WhatsApp: 061 407 5624</p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="relative pb-2">
              <h4 className="text-white font-bold text-sm">Links</h4>
              <div className="absolute bottom-0 left-0 h-[2px] w-8 bg-gradient-to-r from-[#FF7A00] to-[#FFA800]" />
            </div>
            <ul className="space-y-2.5">
              <li><a href="#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#team" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="relative pb-2">
              <h4 className="text-white font-bold text-sm">Newsletter</h4>
              <div className="absolute bottom-0 left-0 h-[2px] w-8 bg-gradient-to-r from-[#FF7A00] to-[#FFA800]" />
            </div>
            
            <form className="relative border-b border-white/20 pb-2 flex items-center" onSubmit={(e) => e.preventDefault()}>
              <span className="text-neutral-500 mr-2">✉</span>
              <input 
                type="email" 
                placeholder="Enter your email id" 
                className="bg-transparent text-xs text-white w-full focus:outline-none placeholder-neutral-600"
              />
              <button type="submit" className="text-white hover:text-[#FF7A00] transition-colors ml-2 font-bold">&rarr;</button>
            </form>

            <div className="flex items-center space-x-3 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61592003217551" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd"/></svg>
              </a>
              <a href="https://github.com/KM-CODES23" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd"/></svg>
              </a>
              <a href="https://www.tiktok.com/@k_t5tudio?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-all duration-300">
                <svg className="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor" fillRule="evenodd"><path d="M365.014.667C408.68 0 452.011.333 495.342 0c2.667 51 21 102.999 58.33 138.998 37.332 37 89.997 54 141.328 59.666v134.332c-47.998-1.667-96.33-11.667-139.994-32.333-19-8.667-36.665-19.667-53.998-31-.333 97.332.334 194.665-.666 291.663-2.667 46.666-18 93-44.998 131.332-43.665 64-119.328 105.665-196.992 106.999-47.664 2.666-95.329-10.334-135.994-34.333C55.028 725.658 7.696 652.992.697 574.993c-.667-16.667-1-33.333-.334-49.666 6-63.333 37.332-123.999 85.997-165.332 55.33-47.999 132.66-70.999 204.99-57.332.667 49.333-1.332 98.665-1.332 147.998-33-10.667-71.664-7.667-100.663 12.333-20.999 13.667-36.998 34.666-45.331 58.333-7 17-5 35.666-4.667 53.666 8 54.666 60.664 100.665 116.662 95.665 37.332-.333 72.997-22 92.33-53.666 6.332-11 13.332-22.333 13.665-35.333 3.334-59.666 2-118.998 2.334-178.664.333-134.332-.334-268.33.666-402.328" transform="translate(165 112)"/></svg>
              </a>
              <a href="https://www.instagram.com/_techstudio.exe?igsh=cnlhbHJrd2cwczR1" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center hover:bg-[#FF7A00] hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clipRule="evenodd"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/5 text-center text-[10px]" style={{ color: '#5C6B73' }}>
          <p>KnT.Dev &copy; {new Date().getFullYear()} - All Rights Reserved</p>
        </div>
      </footer>

    </div>
  );
}
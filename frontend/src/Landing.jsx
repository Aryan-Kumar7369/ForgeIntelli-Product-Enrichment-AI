import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ChevronDown,
  Upload,
  Cpu,
  ShieldCheck,
  FileOutput,
  Zap,
  Database,
  BarChart3,
} from 'lucide-react';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import ScrollReveal from './components/ScrollReveal';
import { Link } from 'react-router-dom';

/* ── Counter hook ── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // ease-out-quart
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ── Data ── */
const features = [
  {
    icon: Zap,
    title: 'Instant Extraction',
    desc: 'AI reads PDFs, images, spreadsheets, and web pages — extracting product attributes in seconds, not hours.',
  },
  {
    icon: Database,
    title: 'Structured Output',
    desc: 'Raw chaos becomes clean, validated, commerce-ready JSON with confidence scores and source attribution.',
  },
  {
    icon: BarChart3,
    title: 'Quality Intelligence',
    desc: 'Real-time data quality scoring, conflict detection, and automated enrichment from trusted sources.',
  },
];

const steps = [
  { num: '01', title: 'Upload', desc: 'Drop files, paste URLs, or connect feeds', icon: Upload },
  { num: '02', title: 'Extract', desc: 'AI parses and identifies product data', icon: Cpu },
  { num: '03', title: 'Validate', desc: 'Cross-reference and confidence scoring', icon: ShieldCheck },
  { num: '04', title: 'Export', desc: 'Clean, structured, commerce-ready output', icon: FileOutput },
];

const sectors = [
  'Manufacturing', 'Automotive', 'Aerospace', 'Electronics',
  'Industrial Supply', 'Construction', 'Energy', 'Medical Devices',
  'Chemical', 'Agriculture', 'Defense', 'Telecommunications',
];

function StatBlock({ value, suffix, label }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref}>
      <div className="stat__number">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export default function Landing() {
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: '-100px' });

  return (
    <>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="hero">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
        >
          <h1 className="hero__title">
            Turn Chaos
            <br />
            Into <span>Catalog.</span>
          </h1>
          <p className="hero__subtitle">
            AI-powered product intelligence that transforms scattered industrial
            data into structured, validated, commerce-ready records.
          </p>
          <Link to="/upload" className="hero__cta" style={{ textDecoration: 'none' }}>
            <Zap size={18} />
            Start Forging
          </Link>
        </motion.div>

        <div className="hero__canvas">
          <Hero3D />
        </div>

        <div className="hero__scroll-indicator">
          <ChevronDown size={28} />
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section className="section section--deep">
        <div className="container">
          <ScrollReveal>
            <p className="section__label">Capabilities</p>
            <h2 className="section__title">See What We Built</h2>
            <p className="section__desc">
              Purpose-built tools for industrial product data — not another
              generic AI wrapper.
            </p>
          </ScrollReveal>

          <div className="features__grid">
            {features.map((f, i) => (
              <ScrollReveal key={f.title} delay={i * 0.12}>
                <div className="feature-card">
                  <div className="feature-card__icon">
                    <f.icon size={24} />
                  </div>
                  <h3 className="feature-card__title">{f.title}</h3>
                  <p className="feature-card__desc">{f.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="section section--void">
        <div className="container">
          <ScrollReveal>
            <p className="section__label">Process</p>
            <h2 className="section__title">How It Works</h2>
            <p className="section__desc">
              Four steps from raw industrial data to commerce-ready product records.
            </p>
          </ScrollReveal>

          <div className="steps" ref={stepsRef}>
            <div className="steps__line">
              <div
                className={`steps__line-fill ${stepsInView ? 'steps__line-fill--active' : ''}`}
              />
            </div>
            {steps.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 0.15} className="step">
                <div className="step__number">{s.num}</div>
                <h3 className="step__title">{s.title}</h3>
                <p className="step__desc">{s.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="section section--deep">
        <div className="container">
          <ScrollReveal>
            <p className="section__label">Impact</p>
            <h2 className="section__title">Built for Scale</h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="stats__grid">
              <StatBlock value={50000} suffix="+" label="Products Processed" />
              <StatBlock value={98} suffix="%" label="Extraction Accuracy" />
              <StatBlock value={120} suffix="x" label="Faster Than Manual" />
            </div>
          </ScrollReveal>

          {/* Marquee */}
          <div className="marquee">
            <div className="marquee__track">
              {[...sectors, ...sectors].map((s, i) => (
                <span key={i} className="marquee__item">
                  <span className="marquee__dot">◆ </span>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="blueprint-grid" />
        <div className="footer__inner">
          <div className="navbar__logo">
            For<span>ge</span>
          </div>
          <ul className="footer__links">
            <li className="footer__link">About</li>
            <li className="footer__link">Blog</li>
            <li className="footer__link">Contact</li>
            <li className="footer__link">Support</li>
          </ul>
          <p className="footer__copy">© 2026 Forge Intelli</p>
        </div>
      </footer>
    </>
  );
}

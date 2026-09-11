import { useState, useRef, useCallback, useEffect } from 'react';
import './ProductShowcase.css';


/**
 * Card data — swap `content` with actual screenshots later.
 * Animation logic is fully separated from content.
 */
const CARDS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    title: 'Project Overview',
    subtitle: 'Trees, health and survival — per project',
    accent: '#4a8f5f',
    content: {
      metrics: [
        { label: 'Total Trees', value: '12,480', delta: '+340' },
        { label: 'Survival Rate', value: '94.1%', delta: '+1.2%' },
        { label: 'Healthy', value: '11,478', delta: '' },
        { label: 'Needs Attention', value: '184', delta: '' },
      ],
      bars: [0.82, 0.65, 0.91, 0.54, 0.78, 0.88, 0.73],
      status: 'Last reviewed 2 days ago',
    },
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Project Registry',
    subtitle: 'Land-based restoration projects',
    accent: '#3b7a54',
    content: {
      projects: [
        { name: 'Palakkad Agroforestry', status: 'Verified', progress: 0.87, country: 'IN' },
        { name: 'Coimbatore Green Belt', status: 'Monitoring', progress: 0.62, country: 'IN' },
        { name: 'Wayanad Buffer Zone', status: 'In Review', progress: 0.44, country: 'IN' },
        { name: 'Nilgiris Carbon Zone', status: 'Verified', progress: 0.94, country: 'IN' },
      ],
    },
  },
  {
    id: 'tasks',
    label: 'Tasks',
    title: 'Field Tasks',
    subtitle: 'Assigned, submitted and reviewed',
    accent: '#2d6b48',
    content: {
      tasks: [
        { name: 'Photograph tree counts at Plot 4', due: 'Today', priority: 'High', done: false },
        { name: 'Upload GPS coordinates — Site B', due: 'Today', priority: 'High', done: true },
        { name: 'Submit health report — Plot 7', due: 'Tomorrow', priority: 'Medium', done: false },
        { name: 'Review officer submission #124', due: 'Fri', priority: 'High', done: false },
        { name: 'Compile monthly impact data', due: 'Next week', priority: 'Low', done: false },
      ],
    },
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    title: 'Monitoring Records',
    subtitle: 'Survival trends built over time',
    accent: '#4e9e6b',
    content: {
      dataPoints: [
        { label: 'Photo Submissions', value: '1,240', unit: 'total' },
        { label: 'Reviews Completed', value: '1,189', unit: 'approved' },
        { label: 'Monitoring Records', value: '847', unit: 'entries' },
        { label: 'Reviewed by Human', value: '100%', unit: '' },
      ],
      signals: [0.3, 0.6, 0.4, 0.9, 0.7, 0.5, 0.8, 0.6, 0.95, 0.75, 0.88, 0.5],
    },
  },
];

/* ── Card content renderers (swap with <img> later) ── */
function DashboardContent({ data }) {
  return (
    <div className="pc-content">
      <div className="pc-metrics-grid">
        {data.metrics.map((m, i) => (
          <div key={i} className="pc-metric">
            <span className="pc-metric-val t-mono">{m.value}</span>
            <span className="pc-metric-lbl t-label">{m.label}</span>
            <span className="pc-metric-delta">{m.delta}</span>
          </div>
        ))}
      </div>
      <div className="pc-chart">
        {data.bars.map((h, i) => (
          <div key={i} className="pc-bar" style={{ '--h': h, '--delay': `${i * 60}ms` }} />
        ))}
      </div>
      <div className="pc-status-row">
        <span className="pc-status-dot" />
        <span className="t-label pc-status-text">{data.status}</span>
      </div>
    </div>
  );
}

function ProjectsContent({ data }) {
  return (
    <div className="pc-content">
      <div className="pc-project-list">
        {data.projects.map((p, i) => (
          <div key={i} className="pc-project-row">
            <div className="pc-project-head">
              <span className="pc-project-flag">{p.country}</span>
              <span className="t-label pc-project-name">{p.name}</span>
              <span className={`pc-project-badge pc-badge--${p.status.toLowerCase().replace(' ', '-')}`}>{p.status}</span>
            </div>
            <div className="pc-project-bar">
              <div className="pc-project-fill" style={{ '--p': p.progress, '--delay': `${i * 80}ms` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TasksContent({ data }) {
  return (
    <div className="pc-content">
      <div className="pc-task-list">
        {data.tasks.map((t, i) => (
          <div key={i} className={`pc-task-row ${t.done ? 'pc-task--done' : ''}`}>
            <span className="pc-task-check">{t.done ? '✓' : ''}</span>
            <span className="t-label pc-task-name">{t.name}</span>
            <span className={`pc-task-priority pc-priority--${t.priority.toLowerCase()}`}>{t.priority}</span>
            <span className="t-mono pc-task-due">{t.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonitoringContent({ data }) {
  return (
    <div className="pc-content">
      <div className="pc-data-points">
        {data.dataPoints.map((d, i) => (
          <div key={i} className="pc-data-point">
            <span className="pc-data-val t-mono">{d.value}</span>
            <span className="pc-data-lbl t-label">{d.label}</span>
            {d.unit && <span className="pc-data-unit t-label">{d.unit}</span>}
          </div>
        ))}
      </div>
      <div className="pc-signal-chart">
        {data.signals.map((v, i) => (
          <div key={i} className="pc-signal-bar" style={{ '--h': v, '--delay': `${i * 40}ms` }} />
        ))}
      </div>
    </div>
  );
}

const CONTENT_RENDERERS = {
  dashboard: DashboardContent,
  projects: ProjectsContent,
  tasks: TasksContent,
  monitoring: MonitoringContent,
};

function mod(n, m) { return ((n % m) + m) % m; }

/* ── Main component ── */
export default function ProductShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const scrollAccumRef = useRef(0);
  const lastScrollTime = useRef(0);
  const isTransitioning = useRef(false);
  const total = CARDS.length;

  const goTo = useCallback((index) => {
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setActiveIndex(mod(index, total));
    setTimeout(() => { isTransitioning.current = false; }, 550);
  }, [total]);

  /* ── Drag / swipe ── */
  const dragStartX = useRef(null);

  const onPointerDown = useCallback((e) => {
    dragStartX.current = e.clientX;
  }, []);

  const onPointerUp = useCallback((e) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) > 50) {
      if (delta < 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
  }, [activeIndex, goTo]);

  /* ── Wheel — intercept only horizontal intent, never trap vertical ── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Only intercept trackpad horizontal swipe (deltaX clearly dominant)
      if (absX > absY && absX > 8) {
        e.preventDefault();
        scrollAccumRef.current += e.deltaX;
        const now = Date.now();
        if (Math.abs(scrollAccumRef.current) > 80 && now - lastScrollTime.current > 400) {
          lastScrollTime.current = now;
          if (scrollAccumRef.current > 0) goTo(activeIndex + 1);
          else goTo(activeIndex - 1);
          scrollAccumRef.current = 0;
        }
      }
      // Pure vertical → fall through; page scrolls normally (no preventDefault)
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [activeIndex, goTo]);

  return (
    <section className="showcase" id="platform">
      <div className="showcase__inner">

        <div className="showcase__split">

          {/* LEFT — text column */}
          <div className="showcase__text-col">
            <span className="showcase__label t-label">The Platform</span>
            <h2 className="showcase__headline">
              Everyone reads<br />the same record.
            </h2>
            <p className="showcase__subtext">
              Field officers, managers and funding organisations all see the same photos, counts and dates — including who reviewed each submission.
            </p>

            {/* Dot indicators */}
            <div className="showcase__dots" role="group" aria-label="Card navigation">
              {CARDS.map((card, i) => (
                <button
                  key={card.id}
                  className={`showcase__dot${i === activeIndex ? ' showcase__dot--active' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`View ${card.label}`}
                />
              ))}
            </div>

            {/* Active card label */}
            <p className="showcase__active-label t-label">
              {CARDS[activeIndex].label} — {CARDS[activeIndex].subtitle}
            </p>
          </div>

          {/* RIGHT — card stack */}
          <div
            ref={containerRef}
            className="showcase__stack-wrapper"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerLeave={(e) => { if (e.buttons > 0) onPointerUp(e); }}
          >
            <div className="showcase__stack">
              {CARDS.map((card, i) => {
                let rel = mod(i - activeIndex + total, total);
                if (rel > total / 2) rel -= total;

                const isActive = rel === 0;
                const ContentRenderer = CONTENT_RENDERERS[card.id];

                return (
                  <div
                    key={card.id}
                    className={`showcase__card${isActive ? ' showcase__card--active' : ''}`}
                    data-rel={rel}
                    onClick={() => !isActive && goTo(i)}
                    onMouseEnter={() => !isActive && goTo(i)}
                    style={{ visibility: Math.abs(rel) > 2 ? 'hidden' : 'visible' }}
                  >
                    {/* Card chrome */}
                    <div className="showcase__card-chrome">
                      <div className="sc-dots">
                        <span className="sc-dot sc-dot--red" />
                        <span className="sc-dot sc-dot--yellow" />
                        <span className="sc-dot sc-dot--green" />
                      </div>
                      <span className="t-mono sc-url">co-climate.io / {card.id}</span>
                      <span className="t-label sc-label">{card.label}</span>
                    </div>

                    {/* Card header band */}
                    <div className="showcase__card-header" style={{ '--accent': card.accent }}>
                      <div className="sc-accent-bar" />
                      <div className="sc-header-text">
                        <h3 className="sc-title">{card.title}</h3>
                        <p className="sc-subtitle t-label">{card.subtitle}</p>
                      </div>
                    </div>

                    {/* Modular content */}
                    <div className="showcase__card-content">
                      {isActive && <ContentRenderer data={card.content} />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

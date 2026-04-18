import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Star,
  Hand,
  Bone,
  Zap,
  Target,
  Droplet,
  Cpu,
  Layers,
  Activity
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.12
    }
  },
  viewport: { once: true, amount: 0.15 }
};

interface Service {
  title: string;
  description: string;
  shortDescription: string;
  icon: React.ReactNode;
}

interface Specialist {
  name: string;
  description: string;
  role: string;
  image: string;
  largeImage: string;
}

const SERVICES: Service[] = [
  {
    title: 'Аппаратный массаж',
    shortDescription: 'Аппаратный метод моделирования контуров тела с использованием вакуумно-роликовой технологии на французском аппарате Cellu M6 Integral.',
    description: 'Аппаратный метод моделирования контуров тела с использованием вакуумно-роликовой технологии на французском аппарате Cellu M6 Integral. \n\nЭффект от процедуры: уменьшение жировых отложений, выравнивание поверхности кожи, улучшение контуров тела, лимфатический и венозный отток, оксигенация тканей, хорошее самочувствие. Продолжительность: 40-50 мин.',
    icon: <Cpu size={40} strokeWidth={1} />
  },
  {
    title: 'Ручной массаж',
    shortDescription: 'Механическое движение руками в виде различных приемов: давления, вибрации, трения, который проводится на поверхности тела.',
    description: 'Механическое движение руками в виде различных приемов: давления, вибрации, трения, который проводится на поверхности тела с целью достижения терапевтического или эстетического эффекта. \nПродолжительность: 60-90 мин.',
    icon: <Hand size={40} strokeWidth={1} />
  },
  {
    title: 'Остеопатия',
    shortDescription: 'Врач использует свои руки как очень чувствительный инструмент для устранения функциональных нарушений опорно-двигательной системы.',
    description: 'Такой вид терапии, когда врач использует свои руки как очень чувствительный инструмент для устранения функциональных нарушений опорно-двигательной системы и ограничений подвижности тканей.В результате происходит устранение боли и улучшение самочувствия. Исчезает усталость, появляются бодрость и заряд энергии.\nПродолжительность: 40 мин.',
    icon: <Bone size={40} strokeWidth={1} />
  },
  {
    title: 'Миостимуляция',
    shortDescription: 'Воздействие на мышцы с помощью тока низкой частоты. Усиление крово и лимфообращения, улучшение обменных процессов.',
    description: 'Воздействие на мышцы с помощью тока низкой частоты. \n\nЭффект от процедур: усиление крово и лимфообращения, улучшение обменных процессов в тканях, нормализация работы внутренних органов, уменьшение жирового слоя, нормализация мышечного тонуса. \nПродолжительность: 20 мин.',
    icon: <Zap size={40} strokeWidth={1} />
  },
  {
    title: 'Рефлексотерапия',
    shortDescription: 'Древний метод лечения при котором происходит воздействие на определённые точки с помощью медицинских акупунктурных игл.',
    description: 'Это древний метод лечения при котором происходит воздействие на определённой точки, соответствующие тому или иному органу, с помощью медицинских акупунктурных игл.',
    icon: <Target size={40} strokeWidth={1} />
  },
  {
    title: 'Медовый массаж',
    shortDescription: 'Мёд содержит около 30 полезных микроэлементов и витаминов. Улучшает внешний вид кожных покровов, устраняет целлюлит.',
    description: 'Используется с давних времён и является очень полезным для всего организма.\n\nМёд содержит огромное количество (около 30!) полезных для человека микроэлементов и витаминов.\n\nОн обладает противовоспалительным, антибактериальным, общеукрепляющим действием\n\n-Улучшает внешний вид кожных покровов (мёд оказывает эффект пилинга)\n\n-Уменьшает подкожно-жировую клетчатку в проблемных зонах.\n\n-Устраняет целлюлит\n\n-Улучшает лимфоотток и кровообращение , выводит шлаки и токсины\n\nОтлично борется с усталостью\nПродолжительность 60 - 90 мин.',
    icon: <Droplet size={40} strokeWidth={1} />
  },
  {
    title: 'Лимфодренажное пеленание',
    shortDescription: 'Эффективное средство для коррекции тела, направленное на устранение отеков, лечение целлюлита, улучшения тонуса кожи.',
    description: 'Эффективное средство для коррекции тела, направленное на устранение отеков, лечение целлюлита, улучшения тонуса кожи, укрепление стенок сосудов. Рекомендовано тем, у кого есть противопоказания к термопроцедурам.\nПродолжительность: 40 мин',
    icon: <Layers size={40} strokeWidth={1} />
  },
  {
    title: 'Эндокринология',
    shortDescription: 'Эндокринологическая процедура включает методы диагностики и лечения, направленные на выявление и коррекцию нарушений.',
    description: 'Эндокринологическая процедура включает в себя различные методы диагностики и лечения, направленные на выявление и коррекцию нарушений в эндокринной системе, ответственной за выработку гормонов.\nВ результате нормализуется гормональный фон.(Первичный прием очный)\nПродолжительность: 30 мин.',
    icon: <Activity size={40} strokeWidth={1} />
  }
];

const SPECIALISTS: Specialist[] = [
  {
    name: 'Оксана Викторовна Паринская',
    role: 'Основатель "Культура тела"',
    image: 'oks_specialists.jpg',
    largeImage: 'oks_specialists.jpg',
    description: 'Оксана — Окончила Борисоглебское медицинское училище по специальности медицинская сестра широкого профиля в 1993 году\n\n- Специализировалась по направлению медицинский массаж в РУДН г Москвы\n\n- Работала в детских ЛПУ с детьми с ограниченными возможностями: ДЦП, Олигофрения, синдром Дауна\n\n- Закончила МГУУ по специальности психолог\n\n- Прошла обучение Аппаратные методы коррекции лица и тела\n\nСоздатель и вдохновитель студии Культура тела\n\n-в 2022 вступила в Российскую Лигу Массажистов'
  },
  {
    name: 'Мария Орлова',
    role: 'Остеопатия',
    image: 'b.png',
    largeImage: 'b_large.png',
    description: 'Мария Орлова — остеопат и эксперт по мануальным техникам.\n\nБолее 12 лет практики.\nРаботает с глубокими мышечными структурами.\n\nФокус на восстановлении баланса тела и снятии хронического напряжения.'
  },
  {
    name: 'Екатерина Лаврова',
    role: 'Миостимуляция',
    image: 'c.png',
    largeImage: 'c_large.png',
    description: 'Екатерина Лаврова — специалист по миостимуляции и лимфодренажу.\n\nРаботает с профессиональными спортсменами.\n\nАвтор индивидуальных протоколов коррекции фигуры.'
  },
  {
    name: 'Ольга Виноградова',
    role: 'Рефлексотерапия',
    image: 'd.png',
    largeImage: 'd_large.png',
    description: 'Ольга Виноградова — эксперт по рефлексотерапии.\n\nМедицинское образование.\nОпыт более 15 лет.\n\nРаботает с восстановлением энергетического баланса организма.'
  }
];

export default function App() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedService || selectedSpecialist || videoUrl) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedService, selectedSpecialist, videoUrl]);

  return (
    <div className="app">
      <header>
        <div className="max-w-7xl flex justify-between items-center py-6 px-8">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src="logo.png" alt="КУЛЬТУРА ТЕЛА" className="header-logo" referrerPolicy="no-referrer" />
          </div>
          <nav className="nav-links">
            <a href="#bout">О компании</a>
            <a href="#service">Услуги</a>
            <a href="#goats">Специалисты</a>
            <a href="#reviews">Отзывы</a>
            <a href="#contacts">Контакты</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="bout">
        <div className="hero-shapes">
          <div className="animate-rotateSlow" style={{ position: 'absolute', top: '8rem', left: '5rem', width: '18rem', height: '18rem', border: '1px solid var(--neon)', opacity: 0.2 }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', bottom: '5rem', left: '33%', width: '500px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.2, transform: 'rotate(45deg)' }}></div>
          <div className="animate-floatMedium" style={{ position: 'absolute', top: '50%', right: '5rem', width: '24rem', height: '24rem', border: '1px solid var(--neon)', opacity: 0.1, transform: 'rotate(12deg)' }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', bottom: '10rem', right: '25%', width: '16rem', height: '16rem', border: '1px solid var(--neon)', opacity: 0.1, transform: 'rotate(-6deg)' }}></div>
        </div>

        <div className="max-w-7xl grid md:grid-cols-2 gap-12 items-center px-8 hero-content">
          <motion.div className="space-y-10" initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
            <span className="eyebrow-tag">Body Architecture</span>
            <h1>КУЛЬТУРА<br />ТЕЛА</h1>
            <p>Студия коррекции фигуры в Москве</p>
            <div className="hero-actions">
              <button className="btn-primary">Записаться</button>
              <a href="#service" className="hero-secondary-link">Смотреть услуги</a>
            </div>
          </motion.div>

          <motion.div className="hero-side-panel" initial={{ opacity: 0, x: 36 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <div className="hero-side-card hero-side-card--lead">
              <span className="hero-card-kicker">Focus</span>
              <p>Современный подход к телу, восстановлению и эстетике без визуального шума и клишированного “салонного” дизайна.</p>
            </div>
            <div className="hero-stats-grid">
              <div className="hero-side-card">
                <span className="hero-stat-value">15+</span>
                <span className="hero-stat-label">лет практики и авторских протоколов</span>
              </div>
              <div className="hero-side-card">
                <span className="hero-stat-value">8</span>
                <span className="hero-stat-label">направлений работы в одном пространстве</span>
              </div>
              <div className="hero-side-card">
                <span className="hero-stat-value">1:1</span>
                <span className="hero-stat-label">внимание к телу, ощущениям и восстановлению</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="nike-image animate-floatSlow">
          <img src="nike.png" alt="Ника Самофракийская" style={{ width: '100%', objectFit: 'contain' }} referrerPolicy="no-referrer" />
        </div>
      </section>

      <section className="marquee-band" aria-label="Ключевые направления студии">
        <div className="marquee-track">
          <span>КУЛЬТУРА ТЕЛА</span>
          <span>АППАРАТНЫЙ МАССАЖ</span>
          <span>ОСТЕОПАТИЯ</span>
          <span>КОРРЕКЦИЯ ФИГУРЫ</span>
          <span>ВОССТАНОВЛЕНИЕ</span>
          <span>МОСКВА</span>
          <span>КУЛЬТУРА ТЕЛА</span>
          <span>АППАРАТНЫЙ МАССАЖ</span>
          <span>ОСТЕОПАТИЯ</span>
          <span>КОРРЕКЦИЯ ФИГУРЫ</span>
          <span>ВОССТАНОВЛЕНИЕ</span>
          <span>МОСКВА</span>
        </div>
      </section>

      <div className="section-divider"><span></span></div>

      <motion.section className="py-32 px-8" id="service" {...fadeUp}>
        <div className="max-w-7xl">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 200, letterSpacing: '0.4em' }}>НАШИ УСЛУГИ</h2>
              <p style={{ color: 'var(--neon)', fontSize: '1.1rem', marginTop: '1rem', fontWeight: 300, letterSpacing: '0.1em' }}>
                100% успеха— в руках профессионалов
              </p>
            </div>
          </div>
          <motion.div className="services-grid md:grid-cols-3" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.15 }}>
            {SERVICES.map((service, idx) => (
              <motion.div key={idx} className="service-card group" variants={fadeUp}>
                <div className="border-line-container">
                  <div className="border-line border-top"></div>
                  <div className="border-line border-right"></div>
                  <div className="border-line border-bottom"></div>
                  <div className="border-line border-left"></div>
                </div>

                <div className="corner corner-top-left">
                  <div className="corner-line line-h"></div>
                  <div className="corner-line line-v"></div>
                </div>
                <div className="corner corner-bottom-right">
                  <div className="corner-line line-h"></div>
                  <div className="corner-line line-v"></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1.5rem', position: 'relative', zIndex: 10 }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', position: 'relative', color: 'var(--neon)' }}>
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                </div>
                <p>{service.shortDescription}</p>
                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(255, 236, 15, 0.2)', margin: '1.5rem 0' }}></div>
                <button className="btn-more" onClick={() => setSelectedService(service)}>
                  <span>ПОДРОБНЕЕ</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <div className="section-divider section-divider--soft"><span></span></div>

      <motion.section className="py-32 px-8 dcp-section" {...fadeUp}>
        <div className="max-w-7xl dcp-layout">
          <div>
            <span className="eyebrow-tag">Social care</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 200, letterSpacing: '0.4em', color: 'var(--neon)' }}>
              Бесплатные процедуры Для детей с ДЦП
            </h2>
            <div className="dcp-list">
              <div className="dcp-item">Медицинский массаж тела</div>
              <div className="dcp-item">Аппаратный массаж тела</div>
              <div className="dcp-item">Мануальный массаж тела</div>
            </div>
          </div>
          <div className="dcp-stat-card">
            <span className="dcp-stat-value">300+</span>
            <p className="dcp-stat-text">часов персонального внимания, поддержки и восстановительных практик в социальном направлении студии.</p>
          </div>
        </div>
      </motion.section>

      <div className="section-divider"><span></span></div>

      <motion.section className="pt-32 pb-0 px-8 experience-section" {...fadeUp}>
        <div className="max-w-7xl">
          <h2 style={{ fontSize: '2.25rem', fontWeight: 200, letterSpacing: '0.4em' }}>
            Делимся многолетним опытом
          </h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginTop: '2rem', lineHeight: 1.6, maxWidth: '800px' }}>
            Делимся своим многолетним опытом работы на оборудовании Cellu m 6 французской компании LPG Systems и консультируем по массажу VIVATON по системе ЗОЖ Академика А. М. Савелова-Дерябина "Продлите молодость свою".
          </p>

          <div className="experience-highlight">
            <span className="experience-watermark">EXPERTISE</span>
            <div className="chaotic-images" style={{ margin: '0' }}>
              <img src="https://picsum.photos/seed/exp1/300/200" className="chaotic-img" style={{ top: '0', left: '0', width: '250px', transform: 'rotate(-5deg)' }} alt="Experience 1" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/exp2/300/200" className="chaotic-img" style={{ top: '50px', left: '40%', width: '300px', transform: 'rotate(3deg)', zIndex: 2 }} alt="Experience 2" referrerPolicy="no-referrer" />
              <img src="https://picsum.photos/seed/exp3/300/200" className="chaotic-img" style={{ bottom: '0', right: '10%', width: '280px', transform: 'rotate(-2deg)' }} alt="Experience 3" referrerPolicy="no-referrer" />
            </div>
          </div>

          <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 300, marginBottom: '2rem', maxWidth: '600px' }}>
            Консультируем до 3-х человек, в своей студии или с выездом к вам, при наличии оборудования.
          </p>

          <button className="btn-figurative">
            связаться со специалистом
          </button>
        </div>
      </motion.section>

      <div className="section-divider section-divider--soft"><span></span></div>

      <motion.section className="pt-8 pb-32" id="goats" style={{ backgroundColor: '#0a0a0a', position: 'relative', overflow: 'hidden' }} {...fadeUp}>
        <div className="geo-shape" style={{ width: '300px', height: '300px', top: '-100px', right: '-100px', borderRadius: '50%' }}></div>
        <div className="geo-shape" style={{ width: '150px', height: '150px', bottom: '50px', left: '-50px', transform: 'rotate(45deg)' }}></div>

        <div className="max-w-7xl px-8" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Expertise</span>
              <h2 style={{ fontSize: '3rem', fontWeight: 200, letterSpacing: '0.2em', marginTop: '0.5rem' }}>НАШИ СПЕЦИАЛИСТЫ</h2>
            </div>
            <div style={{ textAlign: 'right', color: 'var(--text-gray)', fontSize: '0.875rem', maxWidth: '300px', fontWeight: 200 }}>
              Команда профессионалов, объединенных общей философией заботы о теле.
            </div>
          </div>

          <motion.div className="grid md:grid-cols-4 gap-8" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.15 }}>
            {SPECIALISTS.map((spec, idx) => (
              <motion.div key={idx} className="specialist-premium-card" onClick={() => setSelectedSpecialist(spec)} variants={fadeUp}>
                <div className="spec-number">/ 0{idx + 1}</div>
                <div className="spec-img-wrapper">
                  <img src={spec.image} alt={spec.name} referrerPolicy="no-referrer" />
                </div>
                <div className="spec-role">{spec.role}</div>
                <h3 className="spec-name">{spec.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <div className="section-divider"><span></span></div>

      <section className="py-32 px-8">
        <div className="max-w-7xl">
          <h2 style={{ fontSize: '2.25rem', fontWeight: 200, letterSpacing: '0.4em', marginBottom: '4rem' }}>
            <b>НАМ ДОВЕРЯЮТ</b>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: 'Александра Белова', desc: 'Телеведущая и продюсер. Регулярный гость студии.' },
              { name: 'Дмитрий Орлов', desc: 'Бизнес-спикер. Поддерживает форму вместе с нами.' },
              { name: 'Елизавета Громова', desc: 'Fashion-инфлюенсер. Выбирает профессиональный уход.' },
              { name: 'Ирина Соколова', desc: 'Актриса театра и кино.' },
              { name: 'Виктор Лаврентьев', desc: 'Медиаперсона и телеведущий.' },
              { name: 'Наталья Миронова', desc: 'Lifestyle-блогер.' }
            ].map((trust, idx) => (
              <div key={idx} className="trust-card-premium">
                <div style={{ display: 'flex', gap: '2px', color: '#ffec0f', marginBottom: '1.5rem' }}>
                  {[...Array(6)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p style={{ fontWeight: 600, fontSize: '1.1rem' }}>{trust.name}</p>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.875rem', marginTop: '0.75rem', lineHeight: 1.5 }}>{trust.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-8" style={{ backgroundColor: '#0f0f0f', position: 'relative' }}>
        <div className="max-w-7xl">
          <div style={{ marginBottom: '5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Recognition</span>
            <h2 style={{ fontSize: '3rem', fontWeight: 200, letterSpacing: '0.2em', marginTop: '0.5rem' }}>НАШИ ДОСТИЖЕНИЯ</h2>
          </div>

          <div className="flex flex-col gap-32 mb-32">
            <div className="video-preview-row">
              <div className="space-y-4">
                <span className="bento-tag">YouTube</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#fff' }}>Остеопатия/ проблемы с чем справляется остеопатия</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 200 }}>Подробный разбор методов остеопатии и их влияния на здоровье организма в эфире федерального канала.</p>
                <button className="tv-link" onClick={() => setVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}>Смотреть видео</button>
              </div>
              <div className="video-thumbnail-container" onClick={() => setVideoUrl('https://www.youtube.com/embed/dQw4w9WgXcQ')}>
                <img src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg" alt="YouTube Preview" referrerPolicy="no-referrer" />
                <div className="play-overlay">
                  <div className="play-icon">▶</div>
                </div>
              </div>
            </div>

            <div className="video-preview-row">
              <div className="video-thumbnail-container" onClick={() => setVideoUrl('https://rutube.ru/play/embed/123456')}>
                <img src="https://picsum.photos/seed/rutube/800/450" alt="Rutube Preview" referrerPolicy="no-referrer" />
                <div className="play-overlay">
                  <div className="play-icon">▶</div>
                </div>
              </div>
              <div className="space-y-4 text-right">
                <span className="bento-tag">RuTube</span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 300, color: '#fff' }}>Как избавиться от лишних килограммов, без вреда для здоровья?</h3>
                <p style={{ color: 'var(--text-gray)', fontWeight: 200 }}>Экспертное мнение о безопасном похудении и коррекции фигуры без стресса для организма.</p>
                <button className="tv-link" onClick={() => setVideoUrl('https://rutube.ru/play/embed/123456')}>Смотреть видео</button>
              </div>
            </div>
          </div>

          <div className="achievements-rows">
            <div className="achievement-row achievement-row--two-col">
              <div className="bento-item medium">
                <img src="award2.jpg" className="bento-img" alt="Award 2" referrerPolicy="no-referrer" />
                <div>
                  <span className="bento-tag">Business Forum</span>
                  <p className="bento-text">Призер бизнес форума "Лучшая в своем деле" в номинации "Красота и здоровье".</p>
                </div>
              </div>

              <div className="bento-item medium">
                <div style={{ position: 'relative', height: '200px', marginBottom: '1.5rem' }}>
                  <img src="award3_1.jpg" style={{ position: 'absolute', width: '70%', height: '100%', objectFit: 'cover', borderRadius: '4px', zIndex: 2 }} alt="Award 3.1" referrerPolicy="no-referrer" />
                  <img src="award3_2.jpg" style={{ position: 'absolute', width: '50%', height: '80%', right: 0, bottom: 0, objectFit: 'cover', borderRadius: '4px', zIndex: 1, opacity: 0.5 }} alt="Award 3.2" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <span className="bento-tag">Championship</span>
                  <p className="bento-text">Многократный победитель Международных чемпионатов по массажу.</p>
                </div>
              </div>
            </div>

            <div className="achievement-row achievement-row--center">
              <div className="bento-item large">
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                  <img src="award4.png" className="bento-img" style={{ width: '40%', marginBottom: 0 }} alt="Award 4" referrerPolicy="no-referrer" />
                  <div>
                    <span className="bento-tag">Social Impact</span>
                    <p className="bento-text">Благодарность за вклад в программу: "Вместе мы меняем жизнь к лучшему".</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="achievement-row achievement-row--center">
              <div className="bento-item small">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p className="bento-text" style={{ maxWidth: '60%' }}>Мы в журнале: Moda Topical — журнал для современных женщин.</p>
                  <img src="award5.png" className="bento-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: 0 }} alt="Award 5" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8" id="reviews" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="max-w-7xl">
          <h2 style={{ fontSize: '2.25rem', fontWeight: 200, letterSpacing: '0.4em', marginBottom: '4rem' }}>
            ОТЗЫВЫ НАШИХ КЛИЕНТОВ
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="widget-container-styled">
              <div style={{ width: '100%', height: '600px', overflow: 'hidden', position: 'relative' }}>
                <iframe style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }} src="https://yandex.ru/maps-reviews-widget/59383899868?comments"></iframe>
              </div>
            </div>

            <div className="widget-container-styled">
              <div className="zoon-widget-comments" data-id="6053fbc8d4665c5eda3c5b29" data-locale="ru_RU" data-type="list" data-stars="all" data-style="white" data-host="//zoon.ru/">
                <a href="https://zoon.ru/msk/beauty/studiya_korrektsii_figury_kultura_tela_na_krasnoproletarskoj_ulitse/">Студия коррекции фигуры Культура Тела на Краснопролетарской улице</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="contacts">
        <div className="footer-content">
          <div style={{ letterSpacing: '0.4em' }}>КУЛЬТУРА ТЕЛА</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-gray)' }}>
            <div>Москва</div>
            <div>+7 (000) 000-00-00</div>
            <div>Instagram</div>
          </div>
        </div>
      </footer>

      <div className="map-container">
        <iframe src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=59383899868" style={{ width: '100%', height: '300px', border: 0 }} allowFullScreen></iframe>
      </div>

      <AnimatePresence>
        {selectedService && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedService(null)}>
            <motion.div className="modal-content" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '1.5rem' }}>{selectedService.title}</h3>
              <p style={{ color: '#d1d5db', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{selectedService.description}</p>
            </motion.div>
          </motion.div>
        )}

        {selectedSpecialist && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedSpecialist(null)}>
            <motion.div className="modal-content specialist-modal-content" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div style={{ borderRadius: '1rem', overflow: 'hidden' }}>
                  <img src={selectedSpecialist.largeImage} alt={selectedSpecialist.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--neon)' }}>{selectedSpecialist.name}</h2>
                  <p style={{ color: '#d1d5db', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{selectedSpecialist.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {videoUrl && (
          <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideoUrl(null)}>
            <motion.div className="modal-content video-modal-content" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e) => e.stopPropagation()}>
              <iframe src={videoUrl} className="video-iframe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

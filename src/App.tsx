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
    name: 'Николай Альбертович Мишин',
    role: 'Остеопатия',
    image: 'b.png',
    largeImage: 'b_large.png',
    description: 'Николай Мишин — остеопат и эксперт по мануальным техникам.\n\n-Образование высшее медицинское\n-1981-1987 г. ММСИ имени Семашко по специальности Лечебное дело.\n\n-1987-1988 г. ГКБ77 интернатура по специальности анестезиология реанимация\n\n-1995-1997 г. Институт хирургии имени Вишневского ординатура по специальности хирургия\n\n-2006-2010 г. Высшая Школа Остеопатии во Франции. Присвоена специальность "Остеопат Европы".\n\n-2014 г. Получил специализацию "врач ЛФК и спортивной медицины" при ПП МНЦП.\n\n-2015 г. Подтвердил специализацию "врач остеопат" при ПП Новгородском ГУ имени Ярослава Мудрого.\n\n-Опыт работы с 1987 г. по сей день.'
  },
  {
    name: 'Лариса Сергеевна Агапцева',
    role: 'Массажист',
    image: 'c.png',
    largeImage: 'c_large.png',
    description: 'Лариса Агапцева — массажист с большим опытом работы.\n\n-Закончила медицинское училище при ЦКБ медсестра широкого профиля в 1989году.\n\n-Тибет ( Непал) в 1991году освоила массажные и энергетические практики .\n\n-1992 в Японии изучила массаж ши- а - Цу\n\n-В 1993 году в Школе/Академии Виватон успешно прошла обучение массажу лица и тела по системе Академика Савёлова-Дерябина.\n\n-В настоящее время консультирует по препаратам Виватон и системе Продлите молодость свою.\n\n-Преподает с 1994 года массаж Виватон , экологию человека и систему Академика Савелова- Дерябина "Продлите молодость свою".'
  },
  {
    name: 'Светлана Сергеевна Тюрина',
    role: 'Консультант',
    image: 'd.png',
    largeImage: 'd_large.png',
    description: 'Светлана Тюрина — эксперт в обретании гормонии.\n\n- выпускница Первого Московского государственного медицинского университета им. И. М. Сеченова\n\nСветлана Сергеевна поможет вам разобраться в сложных вопросах гормонального баланса, подобрать индивидуальный план питания и обрести гармонию с собой\nОна постоянно совершенствует свои знания и изучает:\n- Эндокринологию во всех ее аспектах\n- Науку о питании и здоровом образе жизни (нутрициологию и диетологию)\n- Психологию общения, чтобы найти подход к каждому пациентуn\n- Превентивную медицину для сохранения вашего здоровья на долгие годы'
  }
];

export default function App() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<Specialist | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [showLocationModal, setShowLocationModal] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedService || selectedSpecialist || videoUrl || showLocationModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedService, selectedSpecialist, videoUrl, showLocationModal]);

  return (
    <div className="app">
      <header>
        <div className="header-inner">
          <img src="/logo.png" alt="КУЛЬТУРА ТЕЛА" className="header-logo" referrerPolicy="no-referrer" />

          {/* Desktop nav */}
          <nav className="nav-links nav-desktop">
            <a href="#bout">О компании</a>
            <a href="#service">Услуги</a>
            <a href="#goats">Специалисты</a>
            <a href="#reviews">Отзывы</a>
            <a href="#contacts">Контакты</a>
          </nav>

          {/* Burger button — mobile only */}
          <button
            className="burger-btn"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Меню"
          >
            <span className={menuOpen ? 'burger-line burger-line--top open' : 'burger-line burger-line--top'}></span>
            <span className={menuOpen ? 'burger-line burger-line--mid open' : 'burger-line burger-line--mid'}></span>
            <span className={menuOpen ? 'burger-line burger-line--bot open' : 'burger-line burger-line--bot'}></span>
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <nav className="nav-mobile" onClick={() => setMenuOpen(false)}>
            <a href="#bout">О компании</a>
            <a href="#service">Услуги</a>
            <a href="#goats">Специалисты</a>
            <a href="#reviews">Отзывы</a>
            <a href="#contacts">Контакты</a>
          </nav>
        )}
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
              <button className="btn-primary" onClick={() => setShowLocationModal(true)}>Записаться</button>
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
          <span>Сеть студий комплексной коррекции тела</span>
          <span>Эндокринология</span>
          <span>Диетология</span>
          <span>Остеопатия</span>
          <span>Массаж</span>
          <span>LPG</span>
          <span>Тренерство</span>
          <span>Сеть студий комплексной коррекции тела</span>
          <span>Эндокринология</span>
          <span>Диетология</span>
          <span>Остеопатия</span>
          <span>Массаж</span>
          <span>LPG</span>
          <span>Тренерство</span>
        </div>
      </section>

      <div className="section-divider"><span></span></div>

      <motion.section className="py-32 px-8 section-relative" id="service" {...fadeUp}>
        <div className="section-shapes">
          <div className="animate-floatSlow" style={{ position: 'absolute', top: '3rem', right: '6rem', width: '12rem', height: '12rem', border: '1px solid var(--neon)', opacity: 0.08, transform: 'rotate(20deg)' }}></div>
          <div className="animate-rotateSlow" style={{ position: 'absolute', bottom: '4rem', left: '3rem', width: '16rem', height: '16rem', border: '1px solid var(--neon)', opacity: 0.06 }}></div>
          <div className="animate-floatMedium" style={{ position: 'absolute', top: '50%', right: '15%', width: '400px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.06, transform: 'rotate(-20deg)' }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', top: '25%', left: '8%', width: '600px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.05, transform: 'rotate(12deg)' }}></div>
          <div className="animate-floatMedium" style={{ position: 'absolute', bottom: '20%', right: '5%', width: '500px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.05, transform: 'rotate(-35deg)' }}></div>
          <div className="animate-rotateSlow" style={{ position: 'absolute', top: '10%', left: '40%', width: '8rem', height: '8rem', border: '1px solid var(--neon)', opacity: 0.05, transform: 'rotate(45deg)' }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', bottom: '15%', right: '30%', width: '5rem', height: '5rem', border: '1px solid var(--neon)', opacity: 0.07, transform: 'rotate(-15deg)' }}></div>
        </div>
        <div className="max-w-7xl" style={{ position: 'relative', zIndex: 2 }}>
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

      <motion.section className="py-32 px-8 dcp-section section-relative" {...fadeUp}>
        <div className="section-shapes">
          <div className="animate-rotateSlow" style={{ position: 'absolute', top: '2rem', left: '5rem', width: '10rem', height: '10rem', border: '1px solid var(--neon)', opacity: 0.1, transform: 'rotate(8deg)' }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', bottom: '2rem', right: '8rem', width: '18rem', height: '18rem', border: '1px solid var(--neon)', opacity: 0.07, transform: 'rotate(-15deg)' }}></div>
          <div className="animate-floatMedium" style={{ position: 'absolute', top: '30%', left: '40%', width: '300px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.08, transform: 'rotate(35deg)' }}></div>
        </div>
        <div className="max-w-7xl dcp-layout" style={{ position: 'relative', zIndex: 2 }}>
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

      <motion.section className="experience-section section-relative" style={{ paddingTop: '8rem', paddingBottom: '6rem', paddingLeft: '2rem', paddingRight: '2rem' }} {...fadeUp}>
        <div className="section-shapes">
          <div className="animate-floatMedium" style={{ position: 'absolute', top: '5rem', right: '2rem', width: '22rem', height: '22rem', border: '1px solid var(--neon)', opacity: 0.07, transform: 'rotate(-8deg)' }}></div>
          <div className="animate-rotateSlow" style={{ position: 'absolute', bottom: '8rem', right: '30%', width: '8rem', height: '8rem', border: '1px solid var(--neon)', opacity: 0.1 }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', top: '20%', left: '50%', width: '500px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.06, transform: 'rotate(15deg)' }}></div>
        </div>
        <div className="max-w-7xl" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="section-title-experience">
            Делимся многолетним опытом
          </h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', marginTop: '2rem', lineHeight: 1.6, maxWidth: '800px' }}>
            Делимся своим многолетним опытом работы на оборудовании Cellu m 6 французской компании LPG Systems и консультируем по массажу VIVATON по системе ЗОЖ Академика А. М. Савелова-Дерябина "Продлите молодость свою".
          </p>

          <div className="experience-highlight">
            <span className="experience-watermark">EXPERTISE</span>
            <div className="chaotic-images" style={{ margin: '0' }}>
              <img src="stuff1.png" className="chaotic-img" style={{ top: '0', left: '0', width: '250px', transform: 'rotate(-5deg)' }} alt="Experience 1" referrerPolicy="no-referrer" />
              <img src="stuff2.png" className="chaotic-img" style={{ top: '50px', left: '40%', width: '300px', transform: 'rotate(3deg)', zIndex: 2 }} alt="Experience 2" referrerPolicy="no-referrer" />
              <img src="stuff3.png" className="chaotic-img" style={{ bottom: '0', right: '10%', width: '280px', transform: 'rotate(-2deg)' }} alt="Experience 3" referrerPolicy="no-referrer" />
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

      <motion.section className="" id="goats" style={{ backgroundColor: '#0a0a0a', position: 'relative', overflow: 'hidden', paddingTop: '2rem', paddingBottom: '8rem' }} {...fadeUp}>
        <div className="specialists-shapes">
          <div className="animate-rotateSlow" style={{ position: 'absolute', top: '6rem', right: '4rem', width: '20rem', height: '20rem', border: '1px solid var(--neon)', opacity: 0.12 }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', bottom: '8rem', left: '2rem', width: '14rem', height: '14rem', border: '1px solid var(--neon)', opacity: 0.1, transform: 'rotate(18deg)' }}></div>
          <div className="animate-floatMedium" style={{ position: 'absolute', top: '40%', left: '50%', width: '600px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.07, transform: 'rotate(-30deg)' }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', top: '15%', left: '8rem', width: '10rem', height: '10rem', border: '1px solid var(--neon)', opacity: 0.08, transform: 'rotate(-12deg)' }}></div>
          <div className="animate-rotateSlow" style={{ position: 'absolute', bottom: '15%', right: '20%', width: '8rem', height: '8rem', border: '1px solid var(--neon)', opacity: 0.1 }}></div>
        </div>

        <div className="max-w-7xl px-8" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
            <div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Expertise</span>
              <h2 className="section-title-responsive">НАШИ СПЕЦИАЛИСТЫ</h2>
            </div>
            <div style={{ textAlign: 'right', color: 'var(--text-gray)', fontSize: '0.875rem', maxWidth: '300px', fontWeight: 200 }}>
              Команда профессионалов, объединенных общей философией заботы о теле.
            </div>
          </div>

          <motion.div className="specialists-list" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.1 }}>
            {SPECIALISTS.map((spec, idx) => (
              <motion.div key={idx} className="specialist-row" onClick={() => setSelectedSpecialist(spec)} variants={fadeUp}>
                <div className="specialist-row-img">
                  <img src={spec.image} alt={spec.name} referrerPolicy="no-referrer" />
                  <div className="specialist-row-accent"></div>
                </div>
                <div className="specialist-row-body">
                  <div className="specialist-row-meta">
                    <span className="spec-number-inline">/ 0{idx + 1}</span>
                    <span className="spec-role-inline">{spec.role}</span>
                  </div>
                  <h3 className="specialist-row-name">{spec.name}</h3>
                  <p className="specialist-row-desc">{spec.description}</p>
                  <button className="specialist-row-btn">Подробнее <span>→</span></button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <div className="section-divider"><span></span></div>

      <section className="py-32 px-8 section-relative">
        <div className="section-shapes">
          <div className="animate-rotateSlow" style={{ position: 'absolute', top: '4rem', left: '50%', width: '14rem', height: '14rem', border: '1px solid var(--neon)', opacity: 0.07, transform: 'rotate(30deg)' }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', bottom: '3rem', right: '4rem', width: '10rem', height: '10rem', border: '1px solid var(--neon)', opacity: 0.09, transform: 'rotate(-22deg)' }}></div>
          <div className="animate-floatMedium" style={{ position: 'absolute', top: '60%', left: '5%', width: '350px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.07, transform: 'rotate(-12deg)' }}></div>
        </div>
        <div className="max-w-7xl" style={{ position: 'relative', zIndex: 2 }}>          <h2 style={{ fontSize: '2.25rem', fontWeight: 200, letterSpacing: '0.4em', marginBottom: '4rem' }}>
            <b>НАМ ДОВЕРЯЮТ</b>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { name: 'Ирина Миронова', desc: 'Российский режиссёр-клипмейкер, сценарист, продюсер и телеведущая, снявшая более 800 музыкальных клипов и занимавшая пост генерального продюсера телеканала «Муз-ТВ» в 2005–2006 годах.' },
              { name: 'Кристина Юдичева', desc: 'Актриса театра и кино, известная своими ролями в российских сериалах и фильмах.' },
              { name: 'Юлия Day', desc: ' российский дизайнер одежды, создающая яркие сценические образы для звёзд шоу-бизнеса, в том числе для Филиппа Киркорова, Кристины Орбакайте, Светланы Лободы и Полины Гагариной.' },
              { name: 'Кристина Орбакайте', desc: 'советская и российская эстрадная певица и актриса, заслуженная артистка России, исполнительница хитов «Перелётная птица» и «Мой мир», дочь Аллы Пугачёвой.' },
              { name: 'Оксана Фёдорова', desc: 'Российская телеведущая, победительница конкурсов «Мисс Санкт-Петербург» (1999), «Мисс Россия» (2001) и «Мисс Вселенная». Фотомодель, Актриса и Певица.' },
              { name: 'Габриела Да Сильва', desc: ' бразильская певица и телеведущая, почётный гражданин Рио-де-Жанейро, известная в России как ведущая телепрограмм и участница музыкальных проектов.' },
              { name: 'Тина Стойилкович', desc: 'сербская и российская актриса театра и кино, выпускница Театрального института имени Щукина, известная по ролям в сериалах «Оффлайн» и «Москва слезам не верит. Все только начинается»' },
              { name: 'Елена Борщева', desc: ' российская актриса, юмористка и телеведущая, бывшая участница КВН («Сборная Пятигорска») и шоу «Comedy Woman», также выступающая как стендап-комик и певица.' },
              { name: 'Дарья Швыкова', desc: 'российский кастинг-директор и режиссёр-фрилансер, работающая над фильмами и театральными постановками, а также преподающая основы актёрского мастерства и сценической речи.' }
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

      <section className="py-32 px-8 section-relative" style={{ backgroundColor: '#0f0f0f', position: 'relative' }}>
        <div className="section-shapes">
          <div className="animate-floatSlow" style={{ position: 'absolute', top: '6rem', left: '3rem', width: '15rem', height: '15rem', border: '1px solid var(--neon)', opacity: 0.08, transform: 'rotate(12deg)' }}></div>
          <div className="animate-rotateSlow" style={{ position: 'absolute', top: '20%', right: '5rem', width: '20rem', height: '20rem', border: '1px solid var(--neon)', opacity: 0.06 }}></div>
          <div className="animate-floatMedium" style={{ position: 'absolute', bottom: '20%', left: '35%', width: '450px', height: '1px', backgroundColor: 'var(--neon)', opacity: 0.07, transform: 'rotate(-25deg)' }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', bottom: '5rem', left: '60%', width: '9rem', height: '9rem', border: '1px solid var(--neon)', opacity: 0.09, transform: 'rotate(40deg)' }}></div>
        </div>
        <div className="max-w-7xl" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ marginBottom: '5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neon)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Recognition</span>
            <h2 className="section-title-responsive">НАШИ ДОСТИЖЕНИЯ</h2>
          </div>

          <div className="achievements-rows">

            {/* Video cards row */}
            <div className="achievement-row achievement-row--two-col">

              {/* YouTube card */}
              <div className="bento-item medium bento-item--flex">
                <div className="bento-item-top">
                  <span className="bento-tag">YouTube</span>
                  <h3 className="bento-title">Остеопатия/ проблемы с чем справляется остеопатия</h3>
                  <p className="bento-text">Подробный разбор методов остеопатии и их влияния на здоровье организма в эфире федерального канала.</p>
                </div>
                <div className="bento-item-bottom">
                  <div className="video-thumbnail-container" onClick={() => setVideoUrl('https://www.youtube.com/embed=kwezmgdEY3k')}>
                    <img src="https://img.youtube.com/vi/kwezmgdEY3k/maxresdefault.jpg" alt="YouTube Preview" referrerPolicy="no-referrer" />
                    <div className="play-overlay">
                      <div className="play-icon">▶</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RuTube card */}
              <div className="bento-item medium bento-item--flex">
                <div className="bento-item-top">
                  <span className="bento-tag">RuTube</span>
                  <h3 className="bento-title">Как избавиться от лишних килограммов, без вреда для здоровья?</h3>
                  <p className="bento-text">Экспертное мнение о безопасном похудении и коррекции фигуры без стресса для организма.</p>
                </div>
                <div className="bento-item-bottom">
                  <div className="video-thumbnail-container" onClick={() => setVideoUrl('https://rutube.ru/play/embed/749ac3a4b28cfb758f9cdb917ac5b281/')}>
                    <img src="coverrut.png" alt="Rutube Preview" referrerPolicy="no-referrer" />
                    <div className="play-overlay">
                      <div className="play-icon">▶</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Awards row */}
            <div className="achievement-row achievement-row--two-col">
              <div className="bento-item medium bento-item--flex">
                <div className="bento-item-top">
                  <span className="bento-tag">Business Forum</span>
                  <p className="bento-text">Призер бизнес форума "Лучшая в своем деле" в номинации "Красота и здоровье".</p>
                </div>
                <div className="bento-item-bottom">
                  <img src="award2.jpg" className="bento-img" style={{ objectPosition: 'top' }} alt="Award 2" referrerPolicy="no-referrer" />
                </div>
              </div>

              <div className="bento-item medium bento-item--flex">
                <div className="bento-item-top">
                  <span className="bento-tag">Championship</span>
                  <p className="bento-text">Многократный победитель Международных чемпионатов по массажу.</p>
                </div>
                <div className="bento-item-bottom">
                  <div style={{ position: 'relative', height: '260px' }}>
                    <img src="award3_1.jpg" style={{ position: 'absolute', width: '70%', height: '100%', objectFit: 'cover', borderRadius: '4px', zIndex: 2 }} alt="Award 3.1" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="achievement-row achievement-row--center">
              <div className="bento-item medium bento-item--flex" style={{ maxWidth: '420px', width: '100%' }}>
                <div className="bento-item-top">
                  <span className="bento-tag">Social Impact</span>
                  <p className="bento-text">Благодарность за вклад в программу: "Вместе мы меняем жизнь к лучшему".</p>
                </div>
                <div className="bento-item-bottom">
                  <img src="socialimpact.jpg" className="bento-img" alt="Award 4" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

            <div className="achievement-row achievement-row--center">
              <div className="bento-item small bento-item--flex">
                <div className="bento-item-top">
                  <p className="bento-text">Мы в журнале: Moda Topical — журнал для современных женщин.</p>
                </div>
                <div className="bento-item-bottom" style={{ display: 'flex', justifyContent: 'center' }}>
                  <img src="award5.png" className="bento-img" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: 0 }} alt="Award 5" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-32 px-8 section-relative" id="reviews" style={{ backgroundColor: '#0a0a0a' }}>
        <div className="section-shapes">
          <div className="animate-rotateSlow" style={{ position: 'absolute', top: '3rem', right: '10rem', width: '13rem', height: '13rem', border: '1px solid var(--neon)', opacity: 0.08, transform: 'rotate(-18deg)' }}></div>
          <div className="animate-floatSlow" style={{ position: 'absolute', bottom: '4rem', left: '6rem', width: '11rem', height: '11rem', border: '1px solid var(--neon)', opacity: 0.07, transform: 'rotate(25deg)' }}></div>
        </div>
        <div className="max-w-7xl" style={{ position: 'relative', zIndex: 2 }}>
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
              <div style={{ width: '100%', height: '600px', overflow: 'hidden', position: 'relative' }}>
                <iframe style={{ width: '100%', height: '100%', border: 'none', borderRadius: '8px' }} src="https://yandex.ru/maps-reviews-widget/96435565736?comments"></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <motion.div className="map-section-header" {...fadeUp}>
          <span className="eyebrow-tag">Мы на карте</span>
          <h2>Как нас найти</h2>
          <p className="map-section-subtitle">Студия коррекции фигуры в Москве — запишитесь и приходите</p>
        </motion.div>

        <div className="map-grid">
          <motion.div
            className="map-grid-item"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="map-label">
              <span className="map-label-dot"></span>
              Гарибальди
            </div>
            <div className="map-wrapper">
              <iframe
                src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=96435565736"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                title="Студия Гарибальди"
                style={{ display: 'block', border: 'none' }}
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            className="map-grid-item"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="map-label">
              <span className="map-label-dot"></span>
              Шмитовский проезд
            </div>
            <div className="map-wrapper">
              <iframe
                src="https://yandex.ru/map-widget/v1/?z=12&ol=biz&oid=59383899868"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
                title="Студия Шмитовский проезд"
                style={{ display: 'block', border: 'none' }}
              ></iframe>
            </div>
          </motion.div>
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
            <motion.div className="modal-content specialist-modal-content specialist-modal-scrollable" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedSpecialist(null)} aria-label="Закрыть">×</button>
              <div className="grid md:grid-cols-2 gap-10 items-center specialist-modal-inner">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={selectedSpecialist.largeImage} alt={selectedSpecialist.name} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '1rem', overflow: 'hidden' }} referrerPolicy="no-referrer" />
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
      {/* Location Picker Modal */}
      <AnimatePresence>
        {showLocationModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowLocationModal(false)}
          >
            <motion.div
              className="location-modal-card"
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 24 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <h2 className="location-modal-title">Выберите студию</h2>
              <p className="location-modal-subtitle">Запись доступна в двух студиях</p>
              <div className="location-modal-buttons">
                <a
                  href="https://salon-scheduler-beryl.vercel.app/book"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-btn"
                >
                  Гарибальди
                </a>
                <a
                  href="https://n429978.yclients.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-btn"
                >
                  Шмитовский проезд
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

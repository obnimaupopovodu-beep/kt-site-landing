import React, {useMemo, useRef, useState} from 'react';
import {AnimatePresence} from 'motion/react';
import {TrustedModal, type TrustedItem} from './TrustedModal';

const trustedItems: TrustedItem[] = [
  {
    id: 'irina-mironova',
    image: '/fame.jpg',
    title: 'Ирина Миронова',
    subtitle: 'Режиссер, сценарист, продюсер',
    summary: 'Медиапрофессионал с высокой насмотренностью и требовательностью к качеству сервиса.',
    description: 'Ирина Миронова известна как режиссер-клипмейкер, сценарист и продюсер. Для такой аудитории особенно важны точность, деликатность и ощущение выверенного процесса — именно это усиливает доверие к студии как к пространству профессионального сопровождения.',
    linkHref: 'https://ru.wikipedia.org/wiki/%D0%9C%D0%B8%D1%80%D0%BE%D0%BD%D0%BE%D0%B2%D0%B0,_%D0%98%D1%80%D0%B8%D0%BD%D0%B0_%D0%98%D0%BB%D1%8C%D0%B8%D0%BD%D0%B8%D1%87%D0%BD%D0%B0',
    linkLabel: 'Подробнее о персоне',
  },
  {
    id: 'kristina-yudicheva',
    image: '/fame1.png',
    title: 'Кристина Юдичева',
    subtitle: 'Актриса театра и кино',
    summary: 'Публичная профессия, где особенно ценятся внешний тонус, восстановление и аккуратный подход.',
    description: 'Работа в кадре требует устойчивого ресурса, выразительности и хорошего самочувствия. Присутствие актрисы в числе клиентов усиливает social proof для аудитории, чувствительной к эстетике, такту и качеству персонального сервиса.',
    linkHref: 'https://share.google/ca3W3rrStKTZTHN4e',
    linkLabel: 'Смотреть профиль',
  },
  {
    id: 'yulia-day',
    image: '/fame2.jpg',
    title: 'Юлия Day',
    subtitle: 'Дизайнер одежды',
    summary: 'Представитель creative-индустрии, где вкус, форма и общее впечатление имеют особый вес.',
    description: 'Юлия Day работает в модной и сценической эстетике, а значит особенно тонко считывает уровень визуальной культуры бренда. Такой trust-маркер помогает студии выглядеть убедительнее в глазах аудитории, ценящей стиль и премиальное ощущение от сервиса.',
    linkHref: 'https://yuliyaday.ru/',
    linkLabel: 'Перейти на сайт',
  },
  {
    id: 'kristina-orbakaite',
    image: '/fame3.jpg',
    title: 'Кристина Орбакайте',
    subtitle: 'Певица и актриса',
    summary: 'Имя, которое усиливает статусность блока доверия и работает как сильный маркер узнаваемости.',
    description: 'Клиентское доверие со стороны артистов федерального масштаба повышает вес бренда на уровне первого впечатления. Для лендинга это важный social proof: студия ассоциируется не только с процедурой, но и с уровнем среды, которой доверяют публичные люди.',
    linkHref: 'https://ru.wikipedia.org/wiki/%D0%9E%D1%80%D0%B1%D0%B0%D0%BA%D0%B0%D0%B9%D1%82%D0%B5,_%D0%9A%D1%80%D0%B8%D1%81%D1%82%D0%B8%D0%BD%D0%B0_%D0%AD%D0%B4%D0%BC%D1%83%D0%BD%D0%B4%D0%BE%D0%B2%D0%BD%D0%B0',
    linkLabel: 'Подробнее о персоне',
  },
  {
    id: 'oksana-fedorova',
    image: '/fame4.jpg',
    title: 'Оксана Фёдорова',
    subtitle: 'Телеведущая, модель, мисс Вселенная',
    summary: 'Сильный знак доверия со стороны аудитории, связанной с публичностью, красотой и сценой.',
    description: 'Оксана Фёдорова ассоциируется с дисциплиной, визуальной культурой и вниманием к качеству. Для бренда «Культура Тела» это усиливает позиционирование как студии с деликатным, собранным и статусным подходом к телесной эстетике и восстановлению.',
    linkHref: 'https://ru.wikipedia.org/wiki/%D0%A4%D1%91%D0%B4%D0%BE%D1%80%D0%BE%D0%B2%D0%B0,_%D0%9E%D0%BA%D1%81%D0%B0%D0%BD%D0%B0_%D0%93%D0%B5%D0%BD%D0%BD%D0%B0%D0%B4%D1%8C%D0%B5%D0%B2%D0%BD%D0%B0',
    linkLabel: 'Подробнее о персоне',
  },
  {
    id: 'gabriela-da-silva',
    image: '/fame5.jpg',
    title: 'Габриела Да Сильва',
    subtitle: 'Певица и телеведущая',
    summary: 'Международный медиаконтекст добавляет блоку доверия широту и живость.',
    description: 'Габриела Да Сильва работает на пересечении музыки, телевидения и публичного образа. Для лендинга это помогает формировать впечатление о студии как о месте, которому доверяют люди, для которых важны энергия, внешний вид и профессиональная поддержка.',
    linkHref: 'https://ru.wikipedia.org/wiki/%D0%93%D0%B0%D0%B1%D1%80%D0%B8%D1%8D%D0%BB%D0%BB%D0%B0_%D0%B4%D0%B0_%D0%A1%D0%B8%D0%BB%D0%B2%D0%B0',
    linkLabel: 'Подробнее о персоне',
  },
  {
    id: 'tina-stoilkovich',
    image: '/fame6.jpg',
    title: 'Тина Стойилкович',
    subtitle: 'Актриса театра и кино',
    summary: 'Современная молодая аудитория кино и сериалов усиливает актуальность social proof.',
    description: 'Тина Стойилкович помогает секции «Нам доверяют» звучать более современно и актуально. Это важный сигнал для пользователей, которые выбирают не просто процедуру, а пространство с хорошей репутацией и понятной культурой сервиса.',
    linkHref: 'https://ru.wikipedia.org/wiki/%D0%A1%D1%82%D0%BE%D0%B9%D0%B8%D0%BB%D0%BA%D0%BE%D0%B2%D0%B8%D1%87,_%D0%A2%D0%B8%D0%BD%D0%B0',
    linkLabel: 'Смотреть профиль',
  },
  {
    id: 'elena-borscheva',
    image: '/fame7.jpg',
    title: 'Елена Борщева',
    subtitle: 'Актриса, телеведущая, юмористка',
    summary: 'Узнаваемая публичная фигура, которая добавляет секции человечность и высокий уровень доверия.',
    description: 'Елена Борщева хорошо известна широкой аудитории, и её присутствие в блоке trust делает бренд ближе и убедительнее. Такой social proof работает не агрессивно, а нативно: через ощущение, что студии доверяют люди с плотным графиком и высокими требованиями к качеству.',
    linkHref: 'https://www.borsheva.com/',
    linkLabel: 'Подробнее о персоне',
  },
  {
    id: 'darya-shvykova',
    image: '/fame8.jpg',
    title: 'Дарья Швыкова',
    subtitle: 'Кастинг-директор и режиссёр',
    summary: 'Фигура из индустрии кино и театра, для которой сервис, такт и репутация особенно значимы.',
    description: 'Дарья Швыкова работает как кастинг-директор и режиссёр-фрилансер, а также преподаёт актёрское мастерство и сценическую речь. Её присутствие в блоке доверия возвращает важный профессиональный контекст: студии доверяют люди, привыкшие к высокой планке качества и работе с человеческим состоянием.',
    linkHref: 'https://www.kino-teatr.ru/kino/casting/ros/1058102/bio/',
    linkLabel: 'Открыть профиль',
  },
];

export function TrustedBySection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeItem = useMemo(
    () => trustedItems.find((item) => item.id === activeId) ?? null,
    [activeId],
  );

  return (
    <>
      <section className="trusted-section py-32 px-8 section-relative" aria-labelledby="trusted-by-title">
        <div className="trusted-section-inner max-w-7xl">
          <div className="section-heading trusted-section-heading">
            <span className="eyebrow-tag">Trust</span>
            <h2 id="trusted-by-title" className="section-heading-title">НАМ ДОВЕРЯЮТ</h2>
            <p className="section-heading-text section-heading-text--wide">
              Лаконичная витрина доверия: на карточках только важная выжимка, а детали раскрываются по клику в
              модальном окне. Это делает social proof сильнее и чище.
            </p>
          </div>

          <div className="trusted-grid">
            {trustedItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="trusted-card"
                onClick={() => setActiveId(item.id)}
                ref={(node) => {
                  triggerRefs.current[item.id] = node;
                }}
                aria-haspopup="dialog"
                aria-label={`Открыть подробности: ${item.title}`}
              >
                <div className="trusted-card-media">
                  <img src={item.image} alt={item.title} className="trusted-card-image" />
                </div>
                <div className="trusted-card-body">
                  <p className="trusted-card-kicker">{item.subtitle}</p>
                  <h3 className="trusted-card-title">{item.title}</h3>
                  <p className="trusted-card-summary">{item.summary}</p>
                  <span className="trusted-card-link">Открыть историю</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {activeItem ? (
          <TrustedModal
            item={activeItem}
            onClose={() => setActiveId(null)}
            returnFocusRef={{current: triggerRefs.current[activeItem.id]}}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

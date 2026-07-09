const canvas = document.querySelector("#field");
const ctx = canvas.getContext("2d");
const glow = document.querySelector(".cursor-glow");
const seatmapSection = document.querySelector(".seatmap-product");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const siteLanguageSelect = document.querySelector("#site-language");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const siteCopy = {
  ru: {
    nav: ["Услуги", "SeatMap", "Кейсы", "Команда", "Процесс", "Контакт"],
    cta: "Обсудить проект",
    heroLead: "Создаем сильные цифровые продукты для компаний, которым важны скорость, характер и безупречная инженерия.",
    heroPrimary: "Запустить проект",
    heroSecondary: "Смотреть кейсы",
    seatmapKicker: "Flagship product by DISpace Software",
    seatmapTitle: "SeatMap — операционная система современного ресторана",
    seatmapText: "Интеллектуальная Restaurant OS для премиальных ресторанов: бронирования, интерактивная карта зала, CRM гостей, digital menu, заказы, аналитика и операционное управление в одной синхронизированной платформе.",
    beta: "Открыть beta",
    product: "Узнать о продукте",
    proofEyebrow: "Най-добър италиански ресторант на годината",
    proofText: "SeatMap уже работает в Casa di Fratelli — премиальном ресторане, где важны точная посадка гостей, живая карта зала, быстрый контроль бронирований и аккуратный digital guest experience.",
    proofLink: "Открыть сайт ресторана",
    introTitle: "Мы проектируем не страницы. Мы собираем цифровые системы, которые двигают бизнес.",
    introText: "От первого прототипа до production-инфраструктуры: стратегия, UX, разработка, интеграции, аналитика и автоматизация в одной команде.",
    servicesTitle: "Технологии с визуальной силой и чистой архитектурой",
    servicesText: "Берем сложные процессы и превращаем их в быстрые интерфейсы, надежные платформы и автоматизацию, которую команда реально использует.",
    casesTitle: "Кейсы, которые выглядят дорого и работают быстро",
    nextCase: "Стать следующим кейсом",
    teamTitle: "Команда, которая превращает сложность в сильные продукты",
    teamText: "Девять специалистов, которые соединяют продуктовую стратегию, инженерную архитектуру, дизайн и клиентский успех в одну сильную delivery-систему.",
    processTitle: "Четкий процесс без лишнего шума",
    processText: "Работаем короткими циклами, показываем живой прогресс и рано выводим продукт к пользователям.",
    stackText: "Подбираем стек под продукт, а не под моду: быстрый frontend, надежный backend, понятные данные и инфраструктура, которую можно поддерживать.",
    contactTitle: "Расскажите, что нужно построить. Мы превратим идею в продукт.",
    contactText: "Подойдет короткое сообщение: цель, сроки, текущая боль и что должно измениться после запуска.",
    privacyTitle: "Политика конфиденциальности",
    privacyText: "Мы используем персональные данные только для связи по проектам, обработки входящих запросов, улучшения сайта и выполнения законных обязательств. Данные не продаются третьим лицам.",
    privacyLabels: ["Data Controller:", "Registered Address:", "VAT/UIC:", "Contact Email:", "Phone:", "Representative:"],
    cookieTitle: "Cookie-файлы",
    cookieText: "Мы используем необходимые cookie для работы сайта и можем сохранять выбранный язык. Аналитические cookie включаются только после согласия.",
    cookieAccept: "Принять",
    cookieDecline: "Только необходимые",
    formName: "Имя",
    formNamePlaceholder: "Ваше имя",
    formProject: "Проект",
    formProjectPlaceholder: "Опишите задачу",
    submit: "Отправить запрос",
    submitted: "Запрос готов",
    footer: "Цифровые продукты с инженерной глубиной",
    heroEyebrow: "Индивидуальная разработка, AI, веб-платформы",
    introKicker: "Инженерия со вкусом",
    servicesKicker: "Что мы создаём",
    casesKicker: "Избранные результаты",
    teamKicker: "Люди за сильным сигналом",
    processKicker: "Как мы движемся",
    stackKicker: "Современный стек",
    contactKicker: "Начать проект",
    serviceTitles: ["Веб-платформы", "AI-автоматизация", "Мобильные продукты", "Облачная инфраструктура"],
    serviceTexts: [
      "Личные кабинеты, SaaS, маркетплейсы, порталы и операционные панели.",
      "Ассистенты, RAG-системы, обработка документов и умные внутренние процессы.",
      "Быстрые приложения с аккуратным UX, push-сценариями и аналитикой.",
      "Инфраструктура, CI/CD, мониторинг, безопасность и масштабирование.",
    ],
    caseTypes: ["Fintech-платформа", "AI-операции", "Корпоративный дашборд"],
    caseTitles: [
      "Система заявок, скоринга и отчётности для финансовой команды",
      "AI-ассистент для обработки запросов, документов и клиентских сценариев",
      "Командный центр с метриками продаж, склада и операционной нагрузки",
    ],
    processTitles: ["Исследование", "Дизайн системы", "Разработка", "Рост"],
    processTexts: [
      "Находим бизнес-цель, ограничения, данные, риски и быстрый путь к ценности.",
      "Собираем UX, визуальный язык, архитектуру и план релизов.",
      "Разрабатываем продукт, интеграции, админ-панели, аналитику и тестируем критичные сценарии.",
      "Улучшаем метрики, автоматизируем операции и готовим систему к нагрузке.",
    ],
  },
  en: {
    nav: ["Services", "SeatMap", "Work", "Team", "Process", "Contact"],
    cta: "Discuss project",
    heroLead: "We create sharp digital products for companies that value speed, character, and flawless engineering.",
    heroPrimary: "Start a project",
    heroSecondary: "View cases",
    seatmapKicker: "Flagship product by DISpace Software",
    seatmapTitle: "SeatMap — the operating system for the modern restaurant",
    seatmapText: "An intelligent Restaurant OS for premium hospitality: reservations, interactive floor maps, guest CRM, digital menu, orders, analytics, and live operations in one synchronized platform.",
    beta: "Open beta",
    product: "Explore product",
    proofEyebrow: "Best Italian Restaurant of the Year",
    proofText: "SeatMap is already live at Casa di Fratelli, a premium restaurant where precise seating, a live floor map, fast reservation control, and a refined digital guest experience matter every day.",
    proofLink: "Open restaurant website",
    introTitle: "We do not design pages. We build digital systems that move business forward.",
    introText: "From first prototype to production infrastructure: strategy, UX, development, integrations, analytics, and automation in one team.",
    servicesTitle: "Technology with visual power and clean architecture",
    servicesText: "We turn complex operations into fast interfaces, reliable platforms, and automation teams actually use.",
    casesTitle: "Outcomes that look premium and work fast",
    nextCase: "Become the next case",
    teamTitle: "A team that turns complexity into strong products",
    teamText: "Nine specialists connecting product strategy, engineering architecture, design, and customer success into one strong delivery system.",
    processTitle: "A clear process without noise",
    processText: "We work in short cycles, show live progress, and bring products to users early.",
    stackText: "We choose the stack for the product, not for fashion: fast frontend, reliable backend, clear data, and maintainable infrastructure.",
    contactTitle: "Tell us what needs to be built. We will turn the idea into a product.",
    contactText: "A short message is enough: goal, timing, current pain, and what should change after launch.",
    privacyTitle: "Privacy Policy",
    privacyText: "We use personal data only to respond to project inquiries, process incoming requests, improve the website, and meet legal obligations. We do not sell personal data to third parties.",
    privacyLabels: ["Data Controller:", "Registered Address:", "VAT/UIC:", "Contact Email:", "Phone:", "Representative:"],
    cookieTitle: "Cookies",
    cookieText: "We use essential cookies for site functionality and may store your language preference. Analytics cookies are enabled only after consent.",
    cookieAccept: "Accept",
    cookieDecline: "Essential only",
    formName: "Name",
    formNamePlaceholder: "Your name",
    formProject: "Project",
    formProjectPlaceholder: "Describe the task",
    submit: "Send request",
    submitted: "Request ready",
    footer: "Digital products with engineering depth",
    heroEyebrow: "Custom software, AI, web platforms",
    introKicker: "Engineering with taste",
    servicesKicker: "What we build",
    casesKicker: "Selected outcomes",
    teamKicker: "The people behind the signal",
    processKicker: "How we move",
    stackKicker: "Modern stack",
    contactKicker: "Start the signal",
    serviceTitles: ["Web platforms", "AI automation", "Mobile products", "Cloud engineering"],
    serviceTexts: [
      "Client portals, SaaS, marketplaces, operational dashboards, and internal platforms.",
      "Assistants, RAG systems, document processing, and intelligent internal workflows.",
      "Fast applications with polished UX, push scenarios, and analytics.",
      "Infrastructure, CI/CD, monitoring, security, and scaling.",
    ],
    caseTypes: ["Fintech platform", "AI operations", "Enterprise dashboard"],
    caseTitles: [
      "Application, scoring, and reporting system for a finance team",
      "AI assistant for requests, documents, and client scenarios",
      "Command center for sales, warehouse, and operations metrics",
    ],
    processTitles: ["Discovery", "System design", "Development", "Growth"],
    processTexts: [
      "We find the business goal, constraints, data, risks, and the fastest route to value.",
      "We shape UX, visual language, architecture, and the release plan.",
      "We build the product, integrations, admin panels, analytics, and test critical flows.",
      "We improve metrics, automate operations, and prepare the system for load.",
    ],
  },
  bg: {
    nav: ["Услуги", "SeatMap", "Кейсове", "Екип", "Процес", "Контакт"],
    cta: "Обсъди проект",
    heroLead: "Създаваме силни дигитални продукти за компании, които ценят скоростта, характера и безупречното инженерство.",
    heroPrimary: "Стартирай проект",
    heroSecondary: "Виж кейсове",
    seatmapKicker: "Флагмански продукт на DISpace Software",
    seatmapTitle: "SeatMap — операционната система на модерния ресторант",
    seatmapText: "Интелигентна Restaurant OS за премиум ресторанти: резервации, интерактивна карта, CRM за гости, дигитално меню, поръчки, аналитика и оперативно управление в една синхронизирана платформа.",
    beta: "Отвори beta",
    product: "Научи повече",
    proofEyebrow: "Най-добър италиански ресторант на годината",
    proofText: "SeatMap вече работи в Casa di Fratelli — премиум ресторант, където точната подредба на гости, живата карта на залата, бързият контрол на резервациите и изчистеният digital guest experience са ключови.",
    proofLink: "Отвори сайта на ресторанта",
    introTitle: "Ние не проектираме страници. Изграждаме дигитални системи, които движат бизнеса.",
    introText: "От първи прототип до production инфраструктура: стратегия, UX, разработка, интеграции, аналитика и автоматизация в един екип.",
    servicesTitle: "Технологии с визуална сила и чиста архитектура",
    servicesText: "Превръщаме сложните процеси в бързи интерфейси, надеждни платформи и автоматизация, която екипът реално използва.",
    casesTitle: "Кейсове, които изглеждат премиум и работят бързо",
    nextCase: "Стани следващият кейс",
    teamTitle: "Екип, който превръща сложността в силни продукти",
    teamText: "Девет специалисти, които свързват продуктова стратегия, инженерна архитектура, дизайн и клиентски успех в една силна delivery система.",
    processTitle: "Ясен процес без излишен шум",
    processText: "Работим в кратки цикли, показваме жив прогрес и извеждаме продукта до потребителите рано.",
    stackText: "Избираме stack според продукта, не според модата: бърз frontend, надежден backend, ясни данни и инфраструктура за поддръжка.",
    contactTitle: "Разкажете какво трябва да построим. Ще превърнем идеята в продукт.",
    contactText: "Кратко съобщение е достатъчно: цел, срокове, текущ проблем и какво трябва да се промени след старта.",
    privacyTitle: "Политика за поверителност",
    privacyText: "Използваме лични данни само за връзка по проекти, обработка на входящи запитвания, подобряване на сайта и изпълнение на законови задължения. Не продаваме лични данни на трети страни.",
    privacyLabels: ["Data Controller:", "Registered Address:", "VAT/UIC:", "Contact Email:", "Phone:", "Representative:"],
    cookieTitle: "Бисквитки",
    cookieText: "Използваме необходими бисквитки за работата на сайта и може да запазим избрания език. Аналитични бисквитки се включват само след съгласие.",
    cookieAccept: "Приемам",
    cookieDecline: "Само необходимите",
    formName: "Име",
    formNamePlaceholder: "Вашето име",
    formProject: "Проект",
    formProjectPlaceholder: "Опишете задачата",
    submit: "Изпрати заявка",
    submitted: "Заявката е готова",
    footer: "Дигитални продукти с инженерна дълбочина",
    heroEyebrow: "Custom software, AI, web platforms",
    introKicker: "Инженерство с вкус",
    servicesKicker: "Какво изграждаме",
    casesKicker: "Избрани резултати",
    teamKicker: "Хората зад сигнала",
    processKicker: "Как работим",
    stackKicker: "Модерен stack",
    contactKicker: "Стартирай проекта",
    serviceTitles: ["Уеб платформи", "AI автоматизация", "Мобилни продукти", "Cloud engineering"],
    serviceTexts: [
      "Клиентски портали, SaaS, маркетплейси, операционни панели и вътрешни системи.",
      "Асистенти, RAG системи, обработка на документи и умни вътрешни процеси.",
      "Бързи приложения с прецизен UX, push сценарии и аналитика.",
      "Инфраструктура, CI/CD, мониторинг, сигурност и мащабиране.",
    ],
    caseTypes: ["Fintech платформа", "AI операции", "Enterprise dashboard"],
    caseTitles: [
      "Система за заявки, scoring и отчети за финансов екип",
      "AI асистент за заявки, документи и клиентски сценарии",
      "Команден център с метрики за продажби, склад и операции",
    ],
    processTitles: ["Проучване", "Дизайн на системата", "Разработка", "Растеж"],
    processTexts: [
      "Откриваме бизнес целта, ограниченията, данните, рисковете и най-бързия път към стойност.",
      "Създаваме UX, визуален език, архитектура и план за релийзи.",
      "Разработваме продукта, интеграциите, админ панелите, аналитиката и критичните сценарии.",
      "Подобряваме метриките, автоматизираме операциите и подготвяме системата за натоварване.",
    ],
  },
};

let width = 0;
let height = 0;
let points = [];
let pointer = { x: window.innerWidth * 0.62, y: window.innerHeight * 0.42 };
let tick = 0;

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.max(42, Math.floor((width * height) / 18500));
  points = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    r: 1.2 + Math.random() * 2.8,
    hue: index % 4,
  }));
}

function palette(index) {
  return ["203,255,69", "25,216,189", "255,111,97", "20,118,255"][index];
}

function draw() {
  tick += 0.005;
  ctx.clearRect(0, 0, width, height);

  const glowGradient = ctx.createRadialGradient(pointer.x, pointer.y, 10, pointer.x, pointer.y, 360);
  glowGradient.addColorStop(0, "rgba(203,255,69,0.2)");
  glowGradient.addColorStop(0.38, "rgba(25,216,189,0.08)");
  glowGradient.addColorStop(1, "rgba(25,216,189,0)");
  ctx.fillStyle = glowGradient;
  ctx.fillRect(0, 0, width, height);

  points.forEach((point, index) => {
    point.x += point.vx + Math.sin(tick * 2 + index) * 0.04;
    point.y += point.vy + Math.cos(tick * 2 + index) * 0.04;

    if (point.x < -20) point.x = width + 20;
    if (point.x > width + 20) point.x = -20;
    if (point.y < -20) point.y = height + 20;
    if (point.y > height + 20) point.y = -20;

    const dx = pointer.x - point.x;
    const dy = pointer.y - point.y;
    const distance = Math.hypot(dx, dy);

    if (distance < 220) {
      point.x -= dx * 0.0008;
      point.y -= dy * 0.0008;
    }

    for (let next = index + 1; next < points.length; next += 1) {
      const other = points[next];
      const linkDistance = Math.hypot(point.x - other.x, point.y - other.y);
      if (linkDistance < 142) {
        ctx.strokeStyle = `rgba(${palette(point.hue)},${0.16 - linkDistance / 1200})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    }

    ctx.fillStyle = `rgba(${palette(point.hue)},0.78)`;
    ctx.beginPath();
    ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
    ctx.fill();
  });

  if (!prefersReducedMotion) {
    requestAnimationFrame(draw);
  }
}

function movePointer(event) {
  pointer = { x: event.clientX, y: event.clientY };
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}

function tiltCards() {
  document.querySelectorAll(".service-card, .case-card, .team-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-3px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
}

function updateMacbookOpen() {
  if (!seatmapSection) return;

  const rect = seatmapSection.getBoundingClientRect();
  const start = window.innerHeight * 1.08;
  const end = window.innerHeight * 0.18;
  const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
  seatmapSection.style.setProperty("--mac-open", progress.toFixed(3));
}

function setMenuOpen(isOpen) {
  if (!siteHeader || !menuToggle) return;
  siteHeader.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function setupMobileMenu() {
  if (!siteHeader || !menuToggle || !mobileMenu) return;

  menuToggle.addEventListener("click", () => {
    setMenuOpen(!siteHeader.classList.contains("menu-open"));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.addEventListener("resize", () => setMenuOpen(false));
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
}

function setAllText(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index]) element.textContent = values[index];
  });
}

function applySiteLanguage(language) {
  const copy = siteCopy[language] || siteCopy.ru;
  document.documentElement.lang = language;
  window.localStorage.setItem("dispace-language", language);
  window.localStorage.setItem("restaurant-lang", language);

  setAllText(".main-nav a", copy.nav);
  setAllText(".mobile-menu a", copy.nav);
  setText(".hero .eyebrow", copy.heroEyebrow);
  setText(".nav-cta", copy.cta);
  setText(".hero-lead", copy.heroLead);
  setText(".hero-actions .primary", copy.heroPrimary);
  setText(".hero-actions .secondary", copy.heroSecondary);
  setText(".seatmap-copy .section-kicker", copy.seatmapKicker);
  setText("#seatmap-title", copy.seatmapTitle);
  setText(".seatmap-copy > p:not(.section-kicker)", copy.seatmapText);
  setText(".seatmap-actions .gold", copy.beta);
  setText(".seatmap-actions .ghost-dark", copy.product);
  setText(".proof-eyebrow", copy.proofEyebrow);
  setText(".proof-copy", copy.proofText);
  setText(".proof-link", copy.proofLink);
  setText(".intro h2", copy.introTitle);
  setText(".intro .section-kicker", copy.introKicker);
  setText(".intro p", copy.introText);
  setText(".services .section-kicker", copy.servicesKicker);
  setText("#services-title", copy.servicesTitle);
  setText(".services .section-heading > p", copy.servicesText);
  setAllText(".service-card h3", copy.serviceTitles || []);
  setAllText(".service-card p", copy.serviceTexts || []);
  setText(".showcase .section-kicker", copy.casesKicker);
  setText("#work-title", copy.casesTitle);
  setText(".showcase .text-link", copy.nextCase);
  setAllText(".case-card .case-type", copy.caseTypes || []);
  setAllText(".case-card h3", copy.caseTitles || []);
  setText(".team .section-kicker", copy.teamKicker);
  setText("#team-title", copy.teamTitle);
  setText(".team .section-heading > p", copy.teamText);
  setText(".process .section-kicker", copy.processKicker);
  setText("#process-title", copy.processTitle);
  setText(".process .section-heading > p", copy.processText);
  setAllText(".process-step h3", copy.processTitles || []);
  setAllText(".process-step p", copy.processTexts || []);
  setText(".stack-copy .section-kicker", copy.stackKicker);
  setText(".stack-copy p:not(.section-kicker)", copy.stackText);
  setText(".contact-copy .section-kicker", copy.contactKicker);
  setText("#contact-title", copy.contactTitle);
  setText(".contact-copy p:not(.section-kicker)", copy.contactText);
  setText(".contact-form label:nth-child(1) span", copy.formName);
  setText(".contact-form label:nth-child(3) span", copy.formProject);
  setText(".contact-form button", copy.submit);
  setText(".site-footer > div > span:nth-child(2)", copy.footer);
  setText("#privacy-title", copy.privacyTitle);
  setText(".footer-privacy > p", copy.privacyText);
  setAllText(".footer-privacy dt", copy.privacyLabels || []);
  setText(".cookie-consent strong", copy.cookieTitle);
  setText(".cookie-consent p", copy.cookieText);
  setText(".cookie-accept", copy.cookieAccept);
  setText(".cookie-decline", copy.cookieDecline);

  const nameInput = document.querySelector(".contact-form input[name='name']");
  const messageInput = document.querySelector(".contact-form textarea[name='message']");
  if (nameInput) nameInput.placeholder = copy.formNamePlaceholder;
  if (messageInput) messageInput.placeholder = copy.formProjectPlaceholder;
}

function setupSiteLanguage() {
  if (!siteLanguageSelect) return;

  const savedLanguage = window.localStorage.getItem("dispace-language");
  const initialLanguage = siteCopy[savedLanguage] ? savedLanguage : "ru";
  siteLanguageSelect.value = initialLanguage;
  applySiteLanguage(initialLanguage);

  siteLanguageSelect.addEventListener("change", (event) => {
    applySiteLanguage(event.target.value);
  });
}

function setupCookieConsent() {
  const banner = document.querySelector(".cookie-consent");
  if (!banner) return;

  const savedConsent = window.localStorage.getItem("dispace-cookie-consent");
  if (!savedConsent) banner.hidden = false;

  const saveConsent = (value) => {
    window.localStorage.setItem("dispace-cookie-consent", value);
    banner.hidden = true;
  };

  banner.querySelector(".cookie-accept")?.addEventListener("click", () => saveConsent("accepted"));
  banner.querySelector(".cookie-decline")?.addEventListener("click", () => saveConsent("essential"));
}

document.querySelector(".contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector("button");
  const originalText = button.textContent;
  const language = window.localStorage.getItem("dispace-language") || "ru";
  button.textContent = (siteCopy[language] || siteCopy.ru).submitted;
  button.disabled = true;

  window.setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    event.currentTarget.reset();
  }, 1800);
});

window.addEventListener("resize", resize);
window.addEventListener("pointermove", movePointer);
window.addEventListener("scroll", updateMacbookOpen, { passive: true });

resize();
revealOnScroll();
tiltCards();
setupMobileMenu();
setupSiteLanguage();
setupCookieConsent();
updateMacbookOpen();
movePointer({ clientX: pointer.x, clientY: pointer.y });
draw();

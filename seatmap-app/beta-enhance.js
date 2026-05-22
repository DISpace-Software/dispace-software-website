(function () {
  const routes = {
    home: "/",
    reservation: "/reservation",
    menu: "/menu",
    admin: "/admin",
  };

  const languages = {
    bg: "Български",
    en: "English",
    ru: "Русский",
  };
  const commandLabels = {
    bg: {
      product: "Restaurant OS live preview",
      home: "Начало",
      reservation: "Карта резерваций",
      menu: "Цифровое меню",
      admin: "Admin CRM",
      language: "Язык",
    },
    en: {
      product: "Restaurant OS live preview",
      home: "Home",
      reservation: "Reservation map",
      menu: "Digital menu",
      admin: "Admin CRM",
      language: "Language",
    },
    ru: {
      product: "Демо Restaurant OS",
      home: "Главная",
      reservation: "Карта бронирований",
      menu: "Цифровое меню",
      admin: "CRM-админка",
      language: "Язык",
    },
  };
  const ruText = new Map(
    Object.entries({
      "Restaurant OS live preview": "Демо Restaurant OS",
      Home: "Главная",
      "Reservation map": "Карта бронирований",
      "Digital menu": "Цифровое меню",
      "Admin CRM": "CRM-админка",
      Language: "Язык",
      "Admin Login": "Вход в админ-панель",
      "Въведете email и парола за достъп до CRM панела.": "Введите email и пароль, чтобы открыть CRM-панель ресторана.",
      "Парола": "Пароль",
      "Влез": "Войти",
      "Влизане...": "Вход...",
      "Грешен email или парола.": "Неверный email или пароль.",
      "Неуспешен вход. Опитайте отново.": "Не удалось войти. Попробуйте ещё раз.",
      "Бързият вход не е активиран на това устройство.": "Быстрый вход на этом устройстве не активирован.",
      "Бързият вход не е активен. Влезте с парола.": "Быстрый вход недоступен. Войдите по паролю.",
      "Бързият вход беше отказан.": "Быстрый вход был отменён.",
      "Restaurant CRM": "CRM ресторана",
      "Резервации, меню, клиенти, blacklist и маркетинг в една система.": "Бронирования, меню, гости, blacklist и маркетинг в единой системе.",
      "Обнови": "Обновить",
      "Всички резервации": "Все бронирования",
      "Чакащи": "Ожидают",
      "Потвърдени": "Подтверждены",
      Blacklist: "Blacklist",
      "Карта на резервациите": "Карта бронирований",
      "Резервации": "Бронирования",
      "Поръчки": "Заказы",
      "Нова резервация": "Новая бронь",
      "Блокирай зала": "Заблокировать зал",
      "Карта": "Карта",
      "Клиенти": "Гости",
      "Админи": "Администраторы",
      "Админы": "Администраторы",
      "Admins": "Администраторы",
      "Admins and audit": "Администраторы и аудит",
      "Управление на достъпа, бърз вход и история на важните промени.": "Управление доступом, быстрым входом и историей важных изменений.",
      "All reservations": "Все бронирования",
      Pending: "Ожидают",
      Approved: "Подтверждены",
      Today: "Сегодня",
      Tomorrow: "Завтра",
      Week: "Неделя",
      Month: "Месяц",
      Year: "Год",
      "All time": "Всё время",
      "Compact CRM view. Phones show the essentials, then open full details on tap.": "Компактный CRM-вид: на телефоне видно главное, подробности открываются касанием.",
      "Търси име, телефон, имейл, маса...": "Поиск по имени, телефону, email или столу...",
      "Search name, phone, email, table...": "Поиск по имени, телефону, email или столу...",
      "Гост": "Гость",
      Guest: "Гость",
      "Дата": "Дата",
      Date: "Дата",
      "Час": "Время",
      Time: "Время",
      "Маси": "Столы",
      Tables: "Столы",
      "Гости": "Гости",
      Guests: "Гости",
      "Статус": "Статус",
      Status: "Статус",
      "Действия": "Действия",
      Actions: "Действия",
      "Потвърди": "Подтвердить",
      Approve: "Подтвердить",
      "Откажи": "Отменить",
      Cancel: "Отменить",
      "Контакт": "Контакт",
      Contact: "Контакт",
      "Телефон": "Телефон",
      Phone: "Телефон",
      "Имейл": "Email",
      "Рожден ден": "День рождения",
      Birthday: "День рождения",
      "Бележки": "Заметки",
      Notes: "Заметки",
      "Клиент": "Гость",
      Client: "Гость",
      "Вътрешна": "Внутренняя",
      Internal: "Внутреннее",
      "Маркери": "Метки",
      Flags: "Метки",
      "Детайли": "Подробнее",
      Details: "Подробнее",
      "Скрий": "Скрыть",
      Hide: "Скрыть",
      "Смяна на маси": "Смена столов",
      "Change tables": "Смена столов",
      "Запази масите": "Сохранить столы",
      "Save tables": "Сохранить столы",
      "Поръчки от маси": "Заказы со столов",
      "Table orders": "Заказы со столов",
      "Консумация, добавена към масите след маркиране на гост като пристигнал.": "Заказы, привязанные к столам после отметки гостя как прибывшего.",
      "No consumption has been added yet.": "Заказы пока не добавлены.",
      "Още няма добавена консумация.": "Заказы пока не добавлены.",
      "Маса": "Стол",
      Table: "Стол",
      "Общо": "Итого",
      Total: "Итого",
      "Позиции": "Позиции",
      Items: "Позиции",
      "Бележка": "Заметка",
      Note: "Заметка",
      "Добави позиция": "Добавить позицию",
      "Add item": "Добавить позицию",
      "Търси ястие...": "Поиск блюда...",
      "Search dish...": "Поиск блюда...",
      "Видяна": "Просмотрен",
      Seen: "Просмотрен",
      Preparing: "Готовится",
      "Приготвя се": "Готовится",
      Done: "Готово",
      "Готова": "Готово",
      Remove: "Удалить",
      "Премахни": "Удалить",
      "Оперативен изглед за следващите гости. Показват се резервации до 30 минути преди часа.": "Оперативный вид для ближайших гостей. Бронирования появляются за 30 минут до времени визита.",
      "Live host view for the next guests. Reservations appear up to 30 minutes before arrival.": "Оперативный вид для ближайших гостей. Бронирования появляются за 30 минут до времени визита.",
      "Зала / непушачи": "Зал / некурящие",
      "Hall / non-smoking": "Зал / некурящие",
      "Покрита тераса": "Крытая терраса",
      "Covered terrace": "Крытая терраса",
      "Открита тераса": "Открытая терраса",
      "Open terrace": "Открытая терраса",
      "Следваща резервация": "Следующая бронь",
      "Next reservation": "Следующая бронь",
      "Няма резервации до 30 минути в тази зона.": "В этой зоне нет бронирований в ближайшие 30 минут.",
      "No reservations within 30 minutes in this area.": "В этой зоне нет бронирований в ближайшие 30 минут.",
      "Пристигна": "Прибыл",
      Arrived: "Прибыл",
      "Не дойде": "Не пришёл",
      "Премести": "Перенести",
      Move: "Перенести",
      "Освободена": "Освободить",
      Released: "Освободить",
      "Премести резервацията": "Перенести бронь",
      "Move reservation": "Перенести бронь",
      "Най-добри свободни варианти": "Лучшие свободные варианты",
      "Best available options": "Лучшие свободные варианты",
      "Няма свободна подходяща маса за тези гости.": "Нет подходящего свободного стола для этих гостей.",
      "No suitable table is available for these guests.": "Нет подходящего свободного стола для этих гостей.",
      "Запази преместване": "Сохранить перенос",
      "Save move": "Сохранить перенос",
      "Резервации за днес": "Бронирования на сегодня",
      "Today reservations": "Бронирования на сегодня",
      "Отвори резервацията": "Открыть бронь",
      "Open reservation": "Открыть бронь",
      "Обади се": "Позвонить",
      Call: "Позвонить",
      "закъснява": "опаздывает",
      late: "опаздывает",
      "след": "через",
      "сега": "сейчас",
      now: "сейчас",
      "Пристигнал": "Прибыл",
      "Консумация": "Заказы",
      Consumption: "Заказы",
      "Още няма добавена консумация за тази резервация.": "К этой брони пока не добавлены заказы.",
      "No consumption has been added for this reservation yet.": "К этой брони пока не добавлены заказы.",
      "Добави към консумацията": "Добавить к заказам",
      "Add consumption": "Добавить к заказам",
      "Затвори": "Закрыть",
      Close: "Закрыть",
      "Меню CMS": "CMS меню",
      "Списък, редакция и добавяне на ястия. Сайтът взима тези данни автоматично.": "Список, редактирование и добавление блюд. Сайт автоматически использует эти данные.",
      "Списък ястия": "Список блюд",
      "Dish list": "Список блюд",
      "Добави ястие": "Добавить блюдо",
      "Add dish": "Добавить блюдо",
      "Редакция": "Редактирование",
      Edit: "Редактировать",
      "Ново ястие": "Новое блюдо",
      "New dish": "Новое блюдо",
      "Добави ново ястие": "Добавить новое блюдо",
      "Редактирай ястие": "Редактировать блюдо",
      "Име BG": "Название BG",
      "Име EN": "Название EN",
      "Грамаж": "Вес",
      Weight: "Вес",
      "Цена EUR": "Цена EUR",
      "Price EUR": "Цена EUR",
      "Категория": "Категория",
      Category: "Категория",
      "Състав / описание BG": "Состав / описание BG",
      "Ingredients / description EN": "Состав / описание EN",
      "Активно в сайта": "Активно на сайте",
      "Изпрати към абонати": "Отправить подписчикам",
      "Запази промени": "Сохранить изменения",
      "Save changes": "Сохранить изменения",
      "Назад към списъка": "Назад к списку",
      "Back to list": "Назад к списку",
      "Изтрий": "Удалить",
      Delete: "Удалить",
      "Още няма ястия в CMS.": "В CMS пока нет блюд.",
      "No dishes in CMS yet.": "В CMS пока нет блюд.",
      "Карта на ресторанта": "Карта ресторана",
      "Restaurant map": "Карта ресторана",
      "Премествайте масите, добавяйте нови и скривайте неактивни. Сайтът използва тази карта автоматично.": "Перемещайте столы, добавляйте новые и скрывайте неактивные. Сайт автоматически использует эту карту.",
      "Запази картата": "Сохранить карту",
      "Save map": "Сохранить карту",
      "Върни оригиналната": "Вернуть исходную",
      Reset: "Вернуть исходную",
      "Добави маса": "Добавить стол",
      "Add table": "Добавить стол",
      "Зона": "Зона",
      Area: "Зона",
      "Места": "Мест",
      Seats: "Мест",
      "Активна": "Активна",
      Active: "Активна",
      "Масите не трябва да се застъпват.": "Столы не должны пересекаться.",
      "Tables must not overlap.": "Столы не должны пересекаться.",
      "Бързо добавяне": "Быстрое добавление",
      "Quick create": "Быстрое добавление",
      "За телефонни резервации. Email може да остане празен.": "Для бронирований по телефону. Email можно оставить пустым.",
      "For phone bookings. Email can be left empty.": "Для бронирований по телефону. Email можно оставить пустым.",
      "Име на гост": "Имя гостя",
      "Guest name": "Имя гостя",
      "Email по желание": "Email необязательно",
      "Email optional": "Email необязательно",
      "Избери час": "Выберите время",
      "Select time": "Выберите время",
      "Зона за гостите": "Зона для гостей",
      "Guest area": "Зона для гостей",
      "Избери от бутоните или въведи номера ръчно.": "Выберите кнопками или введите номера вручную.",
      "Select using buttons or enter numbers manually.": "Выберите кнопками или введите номера вручную.",
      "Напр. 20, 21, 22": "Например: 20, 21, 22",
      "Example: 20, 21, 22": "Например: 20, 21, 22",
      "Няма свободни маси за този час.": "На это время нет свободных столов.",
      "No available tables for this time.": "На это время нет свободных столов.",
      "Вътрешна бележка": "Внутренняя заметка",
      "Internal note": "Внутренняя заметка",
      "Създай резервация": "Создать бронь",
      "Create reservation": "Создать бронь",
      "Вътрешна бележка за екипа...": "Внутренняя заметка для команды...",
      "Internal note for the team...": "Внутренняя заметка для команды...",
      "Запази бележка": "Сохранить заметку",
      "Save note": "Сохранить заметку",
      "Затваря избраната зона или целия ресторант за ден или диапазон от часове.": "Закрывает выбранную зону или весь ресторан на день либо диапазон времени.",
      "What to block": "Что блокируем",
      "Какво резервираме": "Что блокируем",
      "Цял ресторант": "Весь ресторан",
      "Whole restaurant": "Весь ресторан",
      "От": "С",
      From: "С",
      "До": "До",
      To: "До",
      "Часове": "Время",
      Slots: "Время",
      "Блокираща резервация": "Блокирующая бронь",
      "Blocking reservation": "Блокирующая бронь",
      "Блокирай избраната зона": "Заблокировать выбранную зону",
      "Block selected area": "Заблокировать выбранную зону",
      "Запълни от менюто на сайта": "Заполнить из меню сайта",
      "Seed from site menu": "Заполнить из меню сайта",
      "Избери секция": "Выберите раздел",
      "Choose section": "Выберите раздел",
      "Или създай нова секция по-долу": "Или создайте новый раздел ниже",
      "Or create a new section below": "Или создайте новый раздел ниже",
      "ястия": "блюд",
      dishes: "блюд",
      "Нова секция": "Новый раздел",
      "New section": "Новый раздел",
      "например: Напитки": "например: Напитки",
      "for example: Drinks": "например: Напитки",
      "Добави всички базови ястия": "Добавить все базовые блюда",
      "Add all base dishes": "Добавить все базовые блюда",
      "Отворена секция": "Открытый раздел",
      "Open section": "Открытый раздел",
      items: "позиций",
      "No-show клиенти и проблемни резервации.": "No-show гости и проблемные бронирования.",
      List: "Список",
      "Списък": "Список",
      "Добави ръчно": "Добавить вручную",
      "Add manually": "Добавить вручную",
      "Blacklist е празен.": "Blacklist пуст.",
      "Blacklist is empty.": "Blacklist пуст.",
      Customers: "Гости",
      "Рейтинг по посещения, детайли при отваряне и blacklist в една секция.": "Рейтинг по посещениям, подробности и blacklist в одном разделе.",
      "Нови клиенти": "Новые гости",
      "New customers": "Новые гости",
      "Посещения": "Посещения",
      Visits: "Посещения",
      "Период": "Период",
      Period: "Период",
      "Сортиране": "Сортировка",
      Sort: "Сортировка",
      "Най-чести": "Самые частые",
      "Top visits": "Самые частые",
      "Най-нови": "Новые",
      Newest: "Новые",
      "Последно дошли": "Недавние",
      Recent: "Недавние",
      "Няма клиенти за избрания период.": "За выбранный период гостей нет.",
      "No customers for the selected period.": "За выбранный период гостей нет.",
      "посещения": "посещений",
      visits: "посещений",
      total: "всего",
      "общо": "всего",
      "Последна резервация": "Последняя бронь",
      "Last reservation": "Последняя бронь",
      "Първа резервация": "Первая бронь",
      "First reservation": "Первая бронь",
      "В blacklist": "В blacklist",
      Blacklisted: "В blacklist",
      "Добави в blacklist": "Добавить в blacklist",
      "Add to blacklist": "Добавить в blacklist",
      "Последни резервации": "Последние бронирования",
      "Recent reservations": "Последние бронирования",
      "Нов админ": "Новый администратор",
      "New admin": "Новый администратор",
      "Име": "Имя",
      Name: "Имя",
      Password: "Пароль",
      "Създай админ": "Создать администратора",
      "Create admin": "Создать администратора",
      "Админ профили": "Профили администраторов",
      "Admin users": "Профили администраторов",
      "Последен вход": "Последний вход",
      "Last login": "Последний вход",
      "Added to blacklist.": "Добавлено в blacklist.",
      "Guest marked as arrived.": "Гость отмечен как прибывший.",
      "Reservation released as no-show.": "Бронь освобождена как no-show.",
      "Table released.": "Стол освобождён.",
      "Reservation moved.": "Бронь перенесена.",
      "Admin created.": "Администратор создан.",
      "Quick login is enabled on this device.": "Быстрый вход включён на этом устройстве.",
      "Biometric login was cancelled.": "Биометрический вход отменён.",
    })
  );
  const ruPlaceholderText = new Map(
    Object.entries({
      "Search name, phone, email, table...": "Поиск по имени, телефону, email или столу...",
      "Търси име, телефон, имейл, маса...": "Поиск по имени, телефону, email или столу...",
      "Search dish...": "Поиск блюда...",
      "Търси ястие...": "Поиск блюда...",
      "Internal note for the team...": "Внутренняя заметка для команды...",
      "Вътрешна бележка за екипа...": "Внутренняя заметка для команды...",
      "Example: 20, 21, 22": "Например: 20, 21, 22",
      "Напр. 20, 21, 22": "Например: 20, 21, 22",
      "e.g. 350 g": "например: 350 г",
      "напр. 350 гр": "например: 350 г",
      "for example: Drinks": "например: Напитки",
      "например: Напитки": "например: Напитки",
      "Частно събитие, ремонт, запазен ресторант...": "Частное мероприятие, ремонт, закрытый ресторан...",
      "Private event, maintenance, full venue booking...": "Частное мероприятие, ремонт, закрытый ресторан...",
    })
  );

  function openRoute(route) {
    const path = routes[route] || routes.home;
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveRoute(route);
  }

  function setActiveRoute(route) {
    document.querySelectorAll("[data-seatmap-route]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.seatmapRoute === route);
    });
  }

  function getRouteFromPath() {
    if (window.location.pathname === "/admin") return "admin";
    if (window.location.pathname === "/reservation") return "reservation";
    if (window.location.pathname === "/menu") return "menu";
    return "home";
  }

  function syncLanguage(nextLanguage) {
    window.localStorage.setItem("restaurant-lang", nextLanguage);
    const nativeButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent.trim().toLowerCase() === nextLanguage
    );

    if (nativeButton) {
      nativeButton.click();
      return;
    }

    window.location.reload();
  }

  function currentLanguage() {
    return window.localStorage.getItem("restaurant-lang") || "ru";
  }

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function localizeRussianText(root = document.body) {
    if (currentLanguage() !== "ru" || !root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA", "INPUT"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }

        return normalizeText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      const normalized = normalizeText(node.nodeValue);
      const translated = ruText.get(normalized);
      if (translated && normalized !== translated) {
        node.nodeValue = node.nodeValue.replace(normalized, translated);
        return;
      }

      node.nodeValue = node.nodeValue
        .replace(/\b(\d+)\s+seats\b/gi, "$1 мест")
        .replace(/\b(\d+)\s+people\b/gi, "$1 гостей")
        .replace(/\b(\d+)\s+tables\b/gi, "$1 столов")
        .replace(/\b(\d+)\s+dishes\b/gi, "$1 блюд")
        .replace(/\b(\d+)\s+items\b/gi, "$1 позиций")
        .replace(/\bUP TO\b/g, "ДО")
        .replace(/\bMain Hall\b/g, "Основной зал")
        .replace(/\bSmoking area\b/g, "Зона для курящих");
    });

    document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((field) => {
      const translated = ruPlaceholderText.get(normalizeText(field.getAttribute("placeholder") || ""));
      if (translated) field.setAttribute("placeholder", translated);
    });

    document.querySelectorAll("option").forEach((option) => {
      const translated = ruText.get(normalizeText(option.textContent));
      if (translated) option.textContent = translated;
    });
  }

  function activateNativeRussian() {
    if (currentLanguage() !== "ru") return;

    const ruButtons = Array.from(document.querySelectorAll("button")).filter(
      (button) =>
        button.textContent.trim().toUpperCase() === "RU" &&
        !button.closest(".seatmap-command-bar")
    );

    ruButtons.forEach((button) => {
      if (!button.classList.contains("is-active")) {
        button.click();
      }
    });
  }

  function hideNativeLanguageControls() {
    document.querySelectorAll("div").forEach((element) => {
      const labels = Array.from(element.querySelectorAll(":scope > button")).map((button) =>
        button.textContent.trim()
      );
      if (["BG", "EN", "RU"].every((label) => labels.includes(label))) {
        element.classList.add("seatmap-native-language-hidden");
      }
    });
  }

  function buildCommandBar() {
    if (document.querySelector(".seatmap-command-bar")) return;

    const currentLanguage = window.localStorage.getItem("restaurant-lang") || "ru";
    const labels = commandLabels[currentLanguage] || commandLabels.ru;
    const bar = document.createElement("div");
    bar.className = "seatmap-command-bar";
    bar.innerHTML = `
      <div class="seatmap-command-brand">
        <span class="seatmap-command-dot"></span>
        <div>
          <strong>SeatMap Beta</strong>
          <small>${labels.product}</small>
        </div>
      </div>
      <nav class="seatmap-command-nav" aria-label="SeatMap beta navigation">
        <button type="button" data-seatmap-route="home">${labels.home}</button>
        <button type="button" data-seatmap-route="reservation">${labels.reservation}</button>
        <button type="button" data-seatmap-route="menu">${labels.menu}</button>
        <button type="button" data-seatmap-route="admin">${labels.admin}</button>
      </nav>
      <label class="seatmap-language-select">
        <span>${labels.language}</span>
        <select aria-label="SeatMap language">
          ${Object.entries(languages)
            .map(
              ([code, label]) =>
                `<option value="${code}" ${code === currentLanguage ? "selected" : ""}>${label}</option>`
            )
            .join("")}
        </select>
      </label>
    `;

    bar.querySelectorAll("[data-seatmap-route]").forEach((button) => {
      button.addEventListener("click", () => openRoute(button.dataset.seatmapRoute));
    });

    bar.querySelector("select").addEventListener("change", (event) => {
      syncLanguage(event.target.value);
    });

    document.body.appendChild(bar);
    setActiveRoute(getRouteFromPath());
    activateNativeRussian();
    localizeRussianText();
    hideNativeLanguageControls();

    const observer = new MutationObserver(() => {
      activateNativeRussian();
      localizeRussianText();
      hideNativeLanguageControls();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener("popstate", () => setActiveRoute(getRouteFromPath()));
  window.addEventListener("message", (event) => {
    if (event.data?.type === "seatmap-open-route") {
      openRoute(event.data.route);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildCommandBar);
  } else {
    buildCommandBar();
  }
})();

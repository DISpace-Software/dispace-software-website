(function () {
  const routes = {
    home: "/",
    reservation: "/reservation",
    menu: "/menu",
    admin: "/admin",
  };
  const initialParams = new URLSearchParams(window.location.search);
  const forceTutorial = initialParams.get("tour") === "1";
  const skipTutorial = initialParams.get("tour") === "0";

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

  function routeFromQuery() {
    const route = initialParams.get("route");
    return routes[route] ? route : "";
  }

  function getFieldKey(field) {
    if (!field || field.closest(".seatmap-command-bar")) return "";
    if (field.type === "password" || field.type === "hidden" || field.type === "file") return "";

    const form = field.closest("form");
    if (!form) return "";

    const formIndex = Array.from(document.querySelectorAll("form")).indexOf(form);
    const fieldIndex = Array.from(form.querySelectorAll("input, textarea, select")).indexOf(field);
    const label =
      field.getAttribute("name") ||
      field.getAttribute("aria-label") ||
      field.getAttribute("placeholder") ||
      field.id ||
      field.type ||
      "field";

    return `seatmap:reservation-draft:${getRouteFromPath()}:form-${formIndex}:${label}:${fieldIndex}`;
  }

  function setNativeValue(field, value) {
    const prototype =
      field instanceof HTMLTextAreaElement
        ? HTMLTextAreaElement.prototype
        : field instanceof HTMLSelectElement
          ? HTMLSelectElement.prototype
          : HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(prototype, "value");

    if (descriptor?.set) {
      descriptor.set.call(field, value);
    } else {
      field.value = value;
    }
  }

  function restoreDraftField(field) {
    const key = getFieldKey(field);
    if (!key || field.dataset.seatmapDraftRestored === "true") return;

    const savedValue = window.localStorage.getItem(key);
    if (savedValue === null) return;

    if (field.type === "checkbox" || field.type === "radio") {
      field.checked = savedValue === "true";
    } else {
      setNativeValue(field, savedValue);
    }

    field.dataset.seatmapDraftRestored = "true";
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function saveDraftField(field) {
    const key = getFieldKey(field);
    if (!key) return;

    const value = field.type === "checkbox" || field.type === "radio" ? String(field.checked) : field.value;
    window.localStorage.setItem(key, value);
  }

  function setupReservationDrafts(root = document.body) {
    root.querySelectorAll?.("input, textarea, select").forEach((field) => {
      restoreDraftField(field);

      if (field.dataset.seatmapDraftBound === "true") return;
      field.dataset.seatmapDraftBound = "true";
      field.addEventListener("input", () => saveDraftField(field));
      field.addEventListener("change", () => saveDraftField(field));
    });
  }

  function clearReservationDrafts() {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith("seatmap:reservation-draft:"))
      .forEach((key) => window.localStorage.removeItem(key));
  }

  function ensureReservationGuideModal() {
    let modal = document.querySelector(".seatmap-guide-modal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "seatmap-guide-modal";
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <div class="seatmap-guide-dialog" role="dialog" aria-modal="true" aria-labelledby="seatmap-guide-title">
        <button class="seatmap-guide-close" type="button" aria-label="Закрыть">×</button>
        <p class="seatmap-guide-kicker">Бронь создана</p>
        <h2 id="seatmap-guide-title">Теперь откройте CRM-админку</h2>
        <p>
          Заявка гостя уже попала в демо CRM. Перейдите в админ-панель, найдите новое бронирование
          и обработайте его как администратор ресторана: подтвердите бронь, отметьте прибытие,
          перенесите стол или добавьте внутреннюю заметку для команды.
        </p>
        <div class="seatmap-guide-steps">
          <span>1. Откройте CRM-админку</span>
          <span>2. Проверьте карточку гостя</span>
          <span>3. Подтвердите или измените бронь</span>
        </div>
        <div class="seatmap-guide-actions">
          <button class="seatmap-guide-primary" type="button">Перейти в CRM-админку</button>
          <button class="seatmap-guide-secondary" type="button">Остаться здесь</button>
        </div>
      </div>
    `;

    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeReservationGuide();
    });
    modal.querySelector(".seatmap-guide-close").addEventListener("click", closeReservationGuide);
    modal.querySelector(".seatmap-guide-secondary").addEventListener("click", closeReservationGuide);
    modal.querySelector(".seatmap-guide-primary").addEventListener("click", () => {
      closeReservationGuide();
      openRoute("admin");
    });

    document.body.appendChild(modal);
    return modal;
  }

  function openReservationGuide() {
    const modal = ensureReservationGuideModal();
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    modal.querySelector(".seatmap-guide-primary")?.focus();
  }

  function closeReservationGuide() {
    const modal = document.querySelector(".seatmap-guide-modal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function setFieldValue(field, value) {
    setNativeValue(field, value);
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function looksLikeReservationSubmit(button) {
    if (!button) return false;
    const text = normalizeText(button.textContent || "").toLowerCase();
    return ["reserve", "забронировать", "создать бронь", "създай резервация", "create reservation"].some((word) =>
      text.includes(word)
    );
  }

  function ensureDemoReservationFields(button) {
    if (getRouteFromPath() !== "reservation" || !looksLikeReservationSubmit(button)) return;

    const form = button.closest("form") || document;
    const fields = Array.from(form.querySelectorAll("input, textarea, select"));
    const findField = (patterns) => {
      const normalizedPatterns = patterns.map((pattern) => pattern.toLowerCase());
      return fields.find((field) => {
        const text = normalizeText(
          `${field.name || ""} ${field.id || ""} ${field.type || ""} ${field.placeholder || ""} ${field.getAttribute("aria-label") || ""} ${field.closest("label")?.textContent || ""} ${field.closest("div")?.textContent || ""}`
        ).toLowerCase();
        return normalizedPatterns.some((pattern) => text.includes(pattern));
      });
    };

    const nameField = findField(["guest name", "имя гостя", "име на гост", "name"]);
    const phoneField = findField(["phone", "телефон"]);
    const emailField = findField(["email", "имейл"]);

    if (nameField && !normalizeText(nameField.value || "")) setFieldValue(nameField, "Demo Guest");
    if (phoneField && !normalizeText(phoneField.value || "")) setFieldValue(phoneField, "+359 88 888 8888");
    if (emailField && !normalizeText(emailField.value || "")) setFieldValue(emailField, "guest@seatmap.demo");

    fields
      .filter((field) => field.type === "checkbox")
      .forEach((field) => {
        if (!field.checked) {
          field.checked = true;
          field.dispatchEvent(new Event("input", { bubbles: true }));
          field.dispatchEvent(new Event("change", { bubbles: true }));
        }
      });
  }

  function setupAdminLoginHints() {
    if (getRouteFromPath() !== "admin") return;

    const passwordInput = Array.from(document.querySelectorAll("input")).find(
      (input) => input.type === "password" || input.dataset.seatmapPasswordToggle === "true"
    );
    const emailInput = Array.from(document.querySelectorAll("input")).find((input) => input.type === "email");
    const form = passwordInput?.closest("form");
    if (!form || !emailInput || form.querySelector(".seatmap-credentials-card")) return;

    passwordInput.dataset.seatmapPasswordToggle = "true";
    const demoPassword = "demo";
    const card = document.createElement("div");
    card.className = "seatmap-credentials-card";
    card.innerHTML = `
      <div>
        <p class="seatmap-credentials-kicker">Демо-доступ</p>
        <h2>Креденшелы для входа</h2>
      </div>
      <button class="seatmap-credentials-fill" type="button">Заполнить</button>
      <dl>
        <div>
          <dt>Email</dt>
          <dd>admin@seatmap.local</dd>
        </div>
        <div>
          <dt>Пароль</dt>
          <dd><span data-demo-password>${demoPassword}</span></dd>
        </div>
      </dl>
      <p class="seatmap-credentials-note">Это демо-режим: backend mock принимает любой пароль, но для презентации используйте этот.</p>
    `;

    const submitButton = form.querySelector("button[type='submit']");
    const toggle = document.createElement("button");
    toggle.className = "seatmap-password-eye";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Показать пароль");
    toggle.textContent = "👁";
    toggle.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      toggle.classList.toggle("is-active", isPassword);
      toggle.setAttribute("aria-label", isPassword ? "Скрыть пароль" : "Показать пароль");
    });

    let passwordRow = passwordInput.closest(".seatmap-password-row");
    if (!passwordRow) {
      passwordRow = document.createElement("div");
      passwordRow.className = "seatmap-password-row";
      passwordInput.parentElement.insertBefore(passwordRow, passwordInput);
      passwordRow.appendChild(passwordInput);
    }
    passwordRow.appendChild(toggle);

    card.querySelector(".seatmap-credentials-fill").addEventListener("click", () => {
      setFieldValue(emailInput, "admin@seatmap.local");
      setFieldValue(passwordInput, demoPassword);
      passwordInput.focus();
    });

    if (submitButton) {
      form.insertBefore(card, submitButton);
    } else {
      form.appendChild(card);
    }
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

  function findTextElement(patterns) {
    const normalizedPatterns = patterns.map((pattern) => pattern.toLowerCase());
    const candidates = Array.from(
      document.querySelectorAll("button, a, h1, h2, h3, label, p, span, strong, input, select")
    );

    return candidates.find((element) => {
      const text = normalizeText(
        element.matches("input, select")
          ? element.getAttribute("placeholder") || element.getAttribute("aria-label") || ""
          : element.textContent || ""
      ).toLowerCase();
      return text && normalizedPatterns.some((pattern) => text.includes(pattern));
    });
  }

  function isElement(value) {
    return value instanceof Element;
  }

  function findFormControl(patterns) {
    const normalizedPatterns = patterns.map((pattern) => pattern.toLowerCase());
    const controls = Array.from(document.querySelectorAll("input, select, textarea")).filter(
      (field) => !field.closest(".seatmap-command-bar") && !field.closest(".seatmap-tutorial")
    );

    return controls.find((field) => {
      const label = field.closest("label")?.textContent || "";
      const context = field.closest("div")?.textContent || "";
      const text = normalizeText(
        `${field.getAttribute("name") || ""} ${field.getAttribute("aria-label") || ""} ${field.getAttribute("placeholder") || ""} ${label} ${context}`
      ).toLowerCase();
      return normalizedPatterns.some((pattern) => text.includes(pattern));
    }) || controls[0];
  }

  function findActionableText(patterns) {
    const element = findTextElement(patterns);
    return element?.closest("button, a, label, [role='button'], [tabindex], input, select, textarea") || element;
  }

  function findActionGroup(patterns) {
    const target = findActionableText(patterns);
    if (!target) return null;

    let node = target.parentElement;
    while (node && node !== document.body) {
      const controls = node.querySelectorAll("button, input, select, textarea, a, [role='button']");
      const rect = node.getBoundingClientRect();
      if (controls.length >= 2 && controls.length <= 8 && rect.width > 120 && rect.height < 260) {
        return node;
      }
      node = node.parentElement;
    }

    return target;
  }

  function commonBoundedAncestor(elements, options = {}) {
    const validElements = elements.filter(Boolean);
    if (!validElements.length) return null;

    let node = validElements[0];
    while (node && node !== document.body) {
      const containsAll = validElements.every((element) => node === element || node.contains(element));
      const rect = node.getBoundingClientRect();
      const maxHeight = options.maxHeight || 220;
      const minWidth = options.minWidth || 120;

      if (containsAll && rect.width >= minWidth && rect.height > 0 && rect.height <= maxHeight) {
        return node;
      }

      node = node.parentElement;
    }

    return validElements[0];
  }

  function isRenderableTarget(element, options = {}) {
    if (!isElement(element)) return false;
    if (element.closest(".seatmap-command-bar, .seatmap-tutorial")) return false;
    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    const hasBox = rect.width > 2 &&
      rect.height > 2 &&
      style.visibility !== "hidden" &&
      style.display !== "none";
    if (!hasBox) return false;
    if (!options.withinViewport) return true;
    return rect.bottom > 0 &&
      rect.right > 0 &&
      rect.top < window.innerHeight &&
      rect.left < window.innerWidth;
  }

  function isVisibleTarget(element) {
    return isRenderableTarget(element, { withinViewport: true });
  }

  function makeVirtualTarget(elements, padding = 0, options = {}) {
    const visibleElements = elements.filter(isRenderableTarget);
    if (!visibleElements.length) return null;

    return {
      getBoundingClientRect() {
        const rects = visibleElements.map((element) => element.getBoundingClientRect());
        const left = Math.min(...rects.map((rect) => rect.left)) - padding;
        const top = Math.min(...rects.map((rect) => rect.top)) - padding + (options.yOffset || 0);
        const right = Math.max(...rects.map((rect) => rect.right)) + padding;
        const bottom = Math.max(...rects.map((rect) => rect.bottom)) + padding + (options.yOffset || 0);
        return {
          left,
          top,
          right,
          bottom,
          width: right - left,
          height: bottom - top,
        };
      },
      scrollIntoView(options) {
        visibleElements[0]?.scrollIntoView?.(options);
      },
      contains(node) {
        return visibleElements.some((element) => element === node || element.contains(node));
      },
      closest() {
        return null;
      },
    };
  }

  function findVisibleActionableByText(patterns) {
    const normalizedPatterns = patterns.map((pattern) => normalizeText(pattern).toLowerCase());
    const candidates = Array.from(
      document.querySelectorAll("button, a, label, [role='button'], [tabindex], input, select")
    );

    return candidates.find((element) => {
      if (!isVisibleTarget(element)) return false;
      const rawText = element.matches("input, select")
        ? `${element.value || ""} ${element.getAttribute("placeholder") || ""} ${element.getAttribute("aria-label") || ""}`
        : element.textContent || "";
      const text = normalizeText(rawText).toLowerCase();
      return text && normalizedPatterns.some((pattern) => text === pattern || text.includes(pattern));
    }) || null;
  }

  function findDateChoiceGroup() {
    const today = findVisibleActionableByText(["today", "сегодня"]);
    const tomorrow = findVisibleActionableByText(["tomorrow", "завтра"]);
    const dateField = findFormControl(["date", "дата"]);
    const quickChoice = makeVirtualTarget([dateField, today, tomorrow], 8, { yOffset: -12 }) ||
      makeVirtualTarget([today, tomorrow], 8, { yOffset: -18 }) ||
      commonBoundedAncestor([today, tomorrow], { maxHeight: 150, minWidth: 180 });

    if (quickChoice) return quickChoice;

    if (!dateField) return null;

    let node = dateField.parentElement;
    while (node && node !== document.body) {
      const text = normalizeText(node.textContent || "").toLowerCase();
      const rect = node.getBoundingClientRect();
      const hasDate = ["date", "дата", "today", "tomorrow", "сегодня", "завтра"].some((word) => text.includes(word));
      const hasNextFields = ["time", "время", "guests", "гости"].some((word) => text.includes(word));
      if (hasDate && !hasNextFields && rect.width > 160 && rect.height < 240) return node;
      node = node.parentElement;
    }

    return dateField;
  }

  function getVisibleTableCandidates(scope = document) {
    const tableWords = /(seats?|мест|people|гостей)/i;
    const numberPattern = /\b([1-9]|1\d|2\d|29)\b/;
    const excludedWords = /(visit details|reservation details|детали визита|дата|date|time|время|guests|гости|today|tomorrow|сегодня|завтра|area|зона|up to|до\s+\d)/i;
    const detailsPanelWords = /(visit details|reservation details|детали визита|available tables|доступные столы|capacity|вместимость|table\s+\d|стол\s+\d)/i;
    const candidates = Array.from(scope.querySelectorAll("button, [role='button'], [tabindex], div, span"));

    return candidates.filter((element) => {
      if (!isRenderableTarget(element)) return false;
      const text = normalizeText(element.textContent || "");
      const compact = text.toLowerCase();
      const rect = element.getBoundingClientRect();
      if (rect.width < 26 || rect.height < 20 || rect.width > 190 || rect.height > 150) return false;
      if (!numberPattern.test(text)) return false;
      if (/[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{2,4}/.test(text) || /\d{1,2}:\d{2}/.test(text)) return false;
      if (excludedWords.test(compact) && !tableWords.test(compact)) return false;
      let parent = element.parentElement;
      for (let depth = 0; parent && depth < 4; depth += 1, parent = parent.parentElement) {
        const parentText = normalizeText(parent.textContent || "").toLowerCase();
        const parentRect = parent.getBoundingClientRect();
        if (detailsPanelWords.test(parentText) && parentRect.width < 560) return false;
      }
      return /^([1-9]|1\d|2\d|29)$/.test(text) || tableWords.test(compact);
    });
  }

  function findReservationMapRegion() {
    const cached = findReservationMapRegion.cache;
    if (cached?.element && (!isElement(cached.element) || cached.element.isConnected) && performance.now() - cached.time < 1000) {
      return cached.element;
    }

    const root = document.querySelector("#root") || document.body;
    const tableCandidates = getVisibleTableCandidates(root);
    const compactMap = makeVirtualTarget(tableCandidates, 28);
    if (compactMap) {
      findReservationMapRegion.cache = { element: compactMap, time: performance.now() };
      return compactMap;
    }

    const candidates = Array.from(root.querySelectorAll("section, main > div, div"))
      .map((element) => {
        if (!isVisibleTarget(element)) return false;
        const text = normalizeText(element.textContent || "").toLowerCase();
        const rect = element.getBoundingClientRect();
        if (rect.width < 220 || rect.height < 240) return false;
        const tableNumberCount = (text.match(/\b([1-9]|1\d|2\d|29)\b/g) || []).length;
        const hasMapMarkers = ["entrance", "windows", "wall", "вход", "окна", "стена"].some((word) =>
          text.includes(word)
        );
        const hasTableWords = ["seats", "мест", "table", "стол"].some((word) => text.includes(word));
        const looksLikeVisitDetails = ["visit details", "детали визита", "date", "дата", "time", "время", "guests", "гости"].some((word) =>
          text.includes(word)
        );

        if (tableNumberCount < 6 || !hasTableWords) return false;
        if (looksLikeVisitDetails && !hasMapMarkers) return false;

        const area = rect.width * rect.height;
        const score = tableNumberCount * 12 + (hasMapMarkers ? 80 : 0) - Math.min(area / 90000, 40);
        return { element, score, area };
      })
      .filter(Boolean);

    const element = candidates.sort((a, b) => b.score - a.score || a.area - b.area)[0]?.element || null;
    findReservationMapRegion.cache = { element, time: performance.now() };
    return element;
  }

  function findSuggestedTableTarget() {
    const candidates = getVisibleTableCandidates(document).filter((element) => {
      const text = normalizeText(element.textContent || "");
      return /\b(5|6|8|20|21|24|25|26|27|28|29)\b/.test(text) || /seats|мест|people|гостей/i.test(text);
    });

    return candidates.sort((a, b) => {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      const aPriority = /\b20\b/.test(normalizeText(a.textContent || "")) ? -600 : 0;
      const bPriority = /\b20\b/.test(normalizeText(b.textContent || "")) ? -600 : 0;
      const aCenter = Math.abs(aRect.left + aRect.width / 2 - window.innerWidth / 2) + Math.abs(aRect.top + aRect.height / 2 - window.innerHeight / 2);
      const bCenter = Math.abs(bRect.left + bRect.width / 2 - window.innerWidth / 2) + Math.abs(bRect.top + bRect.height / 2 - window.innerHeight / 2);
      return (aCenter + aPriority) - (bCenter + bPriority);
    })[0] || findReservationMapRegion();
  }

  function tableNumberFromElement(element) {
    const text = normalizeText(element?.textContent || "");
    const match = text.match(/\b([1-9]|1\d|2\d|29)\b/);
    return match ? Number(match[1]) : 0;
  }

  function tableCapacityFromElement(element) {
    const text = normalizeText(element?.textContent || "").toLowerCase();
    const match = text.match(/\b(\d+)\s*(seats?|мест|people|гостей)\b/i);
    if (match) return Number(match[1]);
    const tableNumber = tableNumberFromElement(element);
    if ([5, 6, 8, 9, 10, 11, 24, 25, 28, 29].includes(tableNumber)) return 6;
    return 4;
  }

  function getGuestCount() {
    const guestField = findFormControl(["guests", "гости", "people", "количество"]);
    const numericValue = Number(guestField?.value || "");
    if (Number.isFinite(numericValue) && numericValue > 0) return numericValue;
    const selectedText = normalizeText(guestField?.selectedOptions?.[0]?.textContent || "");
    const selectedNumber = Number(selectedText.match(/\d+/)?.[0] || "");
    return Number.isFinite(selectedNumber) && selectedNumber > 0 ? selectedNumber : 4;
  }

  function expectedTableCount() {
    const guests = getGuestCount();
    const candidates = getVisibleTableCandidates(document)
      .map((element) => tableCapacityFromElement(element))
      .filter(Boolean)
      .sort((a, b) => b - a);

    let capacity = 0;
    let count = 0;
    for (const seats of candidates) {
      capacity += seats;
      count += 1;
      if (capacity >= guests) return Math.max(1, count);
    }

    return Math.max(1, Math.ceil(guests / 6));
  }

  function getRecommendedTableTargets() {
    const guests = getGuestCount();
    const preferredNumbers = guests > 6 ? [24, 25, 26, 27, 28, 29, 20, 21, 22, 23, 5, 6] : [20, 5, 24, 25, 21, 22, 23];
    const candidates = getVisibleTableCandidates(document)
      .map((element) => ({
        element,
        number: tableNumberFromElement(element),
        capacity: tableCapacityFromElement(element),
        rect: element.getBoundingClientRect(),
      }))
      .filter((item) => item.number);

    const sorted = candidates.sort((a, b) => {
      const aPreferred = preferredNumbers.indexOf(a.number);
      const bPreferred = preferredNumbers.indexOf(b.number);
      const aRank = aPreferred === -1 ? 999 : aPreferred;
      const bRank = bPreferred === -1 ? 999 : bPreferred;
      const aCenter = Math.abs(a.rect.left + a.rect.width / 2 - window.innerWidth / 2) + Math.abs(a.rect.top + a.rect.height / 2 - window.innerHeight / 2);
      const bCenter = Math.abs(b.rect.left + b.rect.width / 2 - window.innerWidth / 2) + Math.abs(b.rect.top + b.rect.height / 2 - window.innerHeight / 2);
      return aRank - bRank || b.capacity - a.capacity || aCenter - bCenter;
    });

    let capacity = 0;
    const selected = [];
    for (const item of sorted) {
      if (selected.some((current) => current.number === item.number)) continue;
      selected.push(item);
      capacity += item.capacity;
      if (capacity >= guests) break;
    }

    return selected.map((item) => item.element);
  }

  function findRecommendedTablesTarget() {
    return makeVirtualTarget(getRecommendedTableTargets(), 18) || findSuggestedTableTarget();
  }

  function findConsentGroup() {
    const checkboxes = Array.from(document.querySelectorAll("input[type='checkbox']")).filter(isRenderableTarget);
    return makeVirtualTarget(checkboxes, 12) || checkboxes[0] || findTextElement(["privacy", "marketing", "gdpr", "соглас", "личн"]);
  }

  function findReservationContactForm() {
    const controls = [
      findFormControl(["guest name", "имя гостя", "name", "име"]),
      findFormControl(["phone", "телефон"]),
      findFormControl(["email", "имейл"]),
      findFormControl(["birthday", "рожд"]),
      findConsentGroup(),
    ].filter(Boolean);
    return makeVirtualTarget(controls, 16) || controls[0] || findActionableText(["создать бронь", "create reservation", "reserve"]);
  }

  function getReservationContactState() {
    const nameField = findFormControl(["guest name", "имя гостя", "name", "име"]);
    const phoneField = findFormControl(["phone", "телефон"]);
    const emailField = findFormControl(["email", "имейл"]);
    const birthdayField = findFormControl(["birthday", "рожд"]);
    return {
      nameField,
      phoneField,
      emailField,
      birthdayField,
      filled: {
        name: Boolean(normalizeText(nameField?.value || "")),
        phone: Boolean(normalizeText(phoneField?.value || "")),
        email: Boolean(normalizeText(emailField?.value || "")),
        birthday: Boolean(normalizeText(birthdayField?.value || "")),
      },
    };
  }

  function findLoginArea() {
    return document.querySelector(".seatmap-credentials-card")?.closest("form") ||
      document.querySelector("form") ||
      document.querySelector(".seatmap-credentials-card") ||
      findTextElement(["admin login", "вход", "пароль"]);
  }

  function findAdminPanelTarget(patterns) {
    return findActionGroup(patterns) || findActionableText(patterns) || findTextElement(patterns);
  }

  function findClickedTableElement(node) {
    if (!isElement(node)) return null;
    let current = node;
    while (current && current !== document.body) {
      if (current.closest?.(".seatmap-tutorial, .seatmap-command-bar")) return null;
      if (tableNumberFromElement(current) && getVisibleTableCandidates(document).some((table) => table === current)) {
        return current;
      }
      const matchingDescendant = Array.from(current.querySelectorAll?.("button, [role='button'], [tabindex], div, span") || [])
        .find((element) => tableNumberFromElement(element) && getVisibleTableCandidates(document).some((table) => table === element));
      if (matchingDescendant) return matchingDescendant;
      current = current.parentElement;
    }
    return null;
  }

  function getTutorialSteps() {
    const openDock = () => {
      const bar = document.querySelector(".seatmap-command-bar");
      if (!bar?.classList.contains("is-open")) {
        document.querySelector(".seatmap-dock-toggle")?.click();
      }
    };

    return [
      {
        route: "home",
        selector: ".seatmap-dock-toggle",
        title: "Это панель навигации",
        text: "Нажмите на маленькую кнопку слева. Я подожду, пока откроется меню навигации.",
        side: "right",
        action: "click",
        waiting: "Нажмите на кнопку SeatMap слева",
      },
      {
        route: "reservation",
        selector: "[data-seatmap-route='reservation']",
        title: "Начинаем с карты бронирования",
        text: "Теперь выберите раздел карты бронирований в открывшемся меню.",
        side: "right",
        action: "click",
        waiting: "Нажмите «Карта бронирований»",
        manualRoute: true,
        spotlightPadding: 10,
      },
      {
        route: "reservation",
        find: () => findActionGroup(["hall / non-smoking", "terrace / smoking", "open terrace", "зал / некурящие", "терраса"]),
        title: "Сначала выберите зону",
        text: "Начните как гость ресторана: выберите зал, террасу или другую доступную зону. От зоны зависит список свободных столов.",
        side: "left",
        action: "click",
        waiting: "Нажмите на одну из зон ресторана",
        spotlightPadding: 14,
      },
      {
        route: "reservation",
        find: () => findDateChoiceGroup(),
        title: "Выберите день визита",
        text: "Чаще всего гости выбирают «Сегодня» или «Завтра». Можно нажать быстрый вариант или выбрать конкретную дату в поле.",
        side: "left",
        action: "click-or-change",
        waiting: "Нажмите «Сегодня» / «Завтра» или измените дату",
        spotlightPadding: 18,
      },
      {
        route: "reservation",
        find: () => findFormControl(["time", "время", "час", "12:00"]),
        title: "Теперь выберите время",
        text: "Время влияет на занятость столов и блокировки. SeatMap сразу пересчитывает доступные варианты.",
        side: "left",
        action: "change",
        waiting: "Измените время визита",
        spotlightPadding: 16,
      },
      {
        route: "reservation",
        find: () => findFormControl(["guests", "гости", "people", "количество"]),
        title: "Укажите количество гостей",
        text: "Если гостей больше, чем вмещает один стол, система должна показать подходящие комбинации столов рядом.",
        side: "left",
        action: "change",
        waiting: "Измените количество гостей",
        spotlightPadding: 16,
      },
      {
        route: "reservation",
        find: () =>
          findRecommendedTablesTarget() ||
          findSuggestedTableTarget() ||
          findReservationMapRegion() ||
          document.querySelector("main"),
        title: "Выберите подходящие столы",
        text: "SeatMap подбирает стол или комбинацию столов под количество гостей. Если гостей больше вместимости одного стола, выберите несколько подсвеченных столов рядом.",
        side: "right",
        action: "table-selection",
        waiting: "Выберите нужное количество подсвеченных столов",
        spotlightPadding: 24,
        mode: "map",
      },
      {
        route: "reservation",
        find: () => findReservationContactForm(),
        title: "Заполните данные гостя",
        text: "Теперь заполните контактную форму: имя гостя, телефон, email по желанию и дату рождения, если гость хочет персональные предложения.",
        side: "left",
        action: "contact-form",
        waiting: "Введите минимум имя и телефон гостя",
        spotlightPadding: 16,
      },
      {
        route: "reservation",
        find: () => findConsentGroup(),
        title: "Подтвердите согласия",
        text: "Отметьте согласие на обработку данных. Маркетинговое согласие можно использовать для loyalty и персональных предложений.",
        side: "left",
        action: "click-or-change",
        waiting: "Поставьте нужные галочки согласий",
        spotlightPadding: 16,
      },
      {
        route: "reservation",
        find: () => findActionableText(["reserve", "забронировать", "создать бронь"]),
        title: "Создайте бронь",
        text: "Теперь нажмите кнопку создания брони. Только после этого заявка попадёт в CRM и появится инструкция для администратора.",
        side: "left",
        action: "click",
        waiting: "Нажмите кнопку бронирования",
        spotlightPadding: 14,
      },
      {
        route: "reservation",
        find: () => document.querySelector(".seatmap-guide-dialog") || findActionableText(["перейти в crm", "crm-админку"]),
        title: "Перейдите к обработке брони",
        text: "После создания брони система показывает следующий рабочий шаг: перейти в CRM и обработать заявку как администратор ресторана.",
        side: "left",
        action: "click",
        waiting: "Нажмите «Перейти в CRM-админку»",
        spotlightPadding: 18,
      },
      {
        route: "admin",
        find: () => findLoginArea(),
        title: "Демо-вход уже подсказан",
        text: "Нажмите «Заполнить»: email и пароль подставятся автоматически. Карточка обучения теперь не перекрывает поля, чтобы пароль было удобно проверить глазиком.",
        side: "left",
        action: "click",
        waiting: "Нажмите «Заполнить»",
        spotlightPadding: 22,
        cardSize: "wide",
      },
      {
        route: "admin",
        find: () => findActionableText(["войти", "влез", "login"]),
        title: "Войдите в CRM",
        text: "Нажмите кнопку входа. После авторизации откроется рабочая CRM-панель ресторана.",
        side: "left",
        action: "click",
        waiting: "Нажмите кнопку входа",
        spotlightPadding: 14,
      },
      {
        route: "admin",
        find: () => findAdminPanelTarget(["все бронирования", "ожидают", "подтверждены", "blacklist"]),
        title: "Главный пульт ресторана",
        text: "Верхние метрики показывают загрузку: все брони, ожидающие, подтверждённые и blacklist. Это быстрый статус смены.",
        side: "left",
        action: "next",
        waiting: "Посмотрите на метрики CRM",
        spotlightPadding: 18,
        cardSize: "wide",
      },
      {
        route: "admin",
        find: () => findAdminPanelTarget(["резервации", "новая резервация", "блокировать", "карта", "клиенты"]),
        title: "Разделы CRM",
        text: "Вкладки переключают рабочие зоны: брони, ручное создание, блокировки, карту ресторана, гостей, админов и аудит.",
        side: "left",
        action: "click-or-next",
        waiting: "Откройте любую вкладку или нажмите «Я сделал»",
        spotlightPadding: 14,
        cardSize: "wide",
      },
      {
        route: "admin",
        find: () => findAdminPanelTarget(["подтвердить", "approve", "отменить", "no-show"]),
        title: "Работа с заявкой",
        text: "В списке бронирований администратор подтверждает бронь, отменяет её или отмечает no-show. Это основная операционная очередь.",
        side: "left",
        action: "click-or-next",
        waiting: "Попробуйте действие с бронью или нажмите «Я сделал»",
        spotlightPadding: 16,
        cardSize: "wide",
      },
      {
        route: "admin",
        find: () => findAdminPanelTarget(["смена столов", "запази масите", "сохранить столы", "change tables"]),
        title: "Перенос и комбинации столов",
        text: "В CRM можно менять столы для брони: выбрать другой стол, сохранить комбинацию и освободить место при no-show.",
        side: "left",
        action: "next",
        waiting: "Посмотрите блок смены столов",
        spotlightPadding: 18,
        cardSize: "wide",
      },
      {
        route: "admin",
        find: () => findAdminPanelTarget(["карта ресторана", "restaurant map", "добавить стол", "сохранить карту"]),
        title: "Карта ресторана в админке",
        text: "В разделе карты администратор может передвигать столы, добавлять новые, менять вместимость и сохранять layout для сайта.",
        side: "left",
        action: "click-or-next",
        waiting: "Откройте карту или нажмите «Я сделал»",
        spotlightPadding: 18,
        cardSize: "wide",
      },
      {
        route: "menu",
        selector: "[data-seatmap-route='menu']",
        title: "Меню связано с операционной системой",
        text: "В конце откройте цифровое меню. Оно связано с заказами и операционной системой ресторана.",
        side: "right",
        action: "click",
        before: openDock,
        waiting: "Нажмите «Цифровое меню»",
        manualRoute: true,
        spotlightPadding: 10,
      },
      {
        route: "menu",
        find: () => findAdminPanelTarget(["cms меню", "список блюд", "добавить блюдо", "menu cms", "add dish"]),
        title: "CMS меню",
        text: "Меню управляется как часть Restaurant OS: блюда, категории, цены и активность синхронизируются с гостевым меню и CRM.",
        side: "left",
        action: "next",
        waiting: "Посмотрите структуру меню",
        spotlightPadding: 18,
        cardSize: "wide",
      },
    ];
  }

  function ensureTutorial() {
    if (document.querySelector(".seatmap-tutorial")) return;

    const tutorial = document.createElement("div");
    tutorial.className = "seatmap-tutorial";
    tutorial.setAttribute("aria-hidden", "true");
    tutorial.innerHTML = `
      <div class="seatmap-tutorial-scrim"></div>
      <div class="seatmap-tutorial-spotlight"></div>
      <button class="seatmap-tutorial-hotspot" type="button" aria-label="Выбрать подсвеченную область"></button>
      <div class="seatmap-tutorial-pointer">Выберите здесь</div>
      <div class="seatmap-tutorial-card" role="dialog" aria-live="polite" aria-label="Обучение SeatMap">
        <p class="seatmap-tutorial-kicker">Обучение</p>
        <h2></h2>
        <p class="seatmap-tutorial-copy"></p>
        <div class="seatmap-tutorial-wait"></div>
        <div class="seatmap-tutorial-progress"></div>
        <div class="seatmap-tutorial-actions">
          <button class="seatmap-tutorial-ghost" type="button" data-tour-prev>Назад</button>
          <button class="seatmap-tutorial-skip" type="button" data-tour-skip>Пропустить</button>
          <button class="seatmap-tutorial-next" type="button" data-tour-next>Далее</button>
        </div>
      </div>
      <button class="seatmap-tutorial-launch" type="button">?</button>
    `;

    document.body.appendChild(tutorial);

    let index = 0;
    let renderToken = 0;
    let isAdvancing = false;
    let clickListenerPaused = false;
    let activeTarget = null;
    let activeMapRegion = null;
    let selectedTutorialTables = new Set();
    const steps = getTutorialSteps();
    const spotlight = tutorial.querySelector(".seatmap-tutorial-spotlight");
    const hotspot = tutorial.querySelector(".seatmap-tutorial-hotspot");
    const pointer = tutorial.querySelector(".seatmap-tutorial-pointer");
    const card = tutorial.querySelector(".seatmap-tutorial-card");
    const title = tutorial.querySelector("h2");
    const copy = tutorial.querySelector(".seatmap-tutorial-copy");
    const wait = tutorial.querySelector(".seatmap-tutorial-wait");
    const progress = tutorial.querySelector(".seatmap-tutorial-progress");
    const prev = tutorial.querySelector("[data-tour-prev]");
    const next = tutorial.querySelector("[data-tour-next]");
    const skip = tutorial.querySelector("[data-tour-skip]");
    const launch = tutorial.querySelector(".seatmap-tutorial-launch");

    function close() {
      tutorial.classList.remove("is-open");
      tutorial.setAttribute("aria-hidden", "true");
      window.localStorage.setItem("seatmap:tutorial-seen", "true");
    }

    function advance() {
      if (isAdvancing) return;
      isAdvancing = true;
      index += 1;
      window.setTimeout(() => {
        isAdvancing = false;
        render();
      }, 120);
    }

    function getSpotlightRect(target, padding) {
      const rect = target.getBoundingClientRect();
      const left = Math.max(8, rect.left - padding);
      const top = Math.max(8, rect.top - padding);
      const right = Math.min(window.innerWidth - 8, rect.right + padding);
      const bottom = Math.min(window.innerHeight - 8, rect.bottom + padding);

      return {
        left,
        top,
        width: Math.max(right - left, 76),
        height: Math.max(bottom - top, 58),
        source: rect,
      };
    }

    function positionAround(target, side, padding = 10, options = {}) {
      const spotlightRect = getSpotlightRect(target, padding);
      const rect = spotlightRect.source;
      spotlight.style.width = `${spotlightRect.width}px`;
      spotlight.style.height = `${spotlightRect.height}px`;
      spotlight.style.left = `${spotlightRect.left}px`;
      spotlight.style.top = `${spotlightRect.top}px`;
      hotspot.style.width = `${spotlightRect.width}px`;
      hotspot.style.height = `${spotlightRect.height}px`;
      hotspot.style.left = `${spotlightRect.left}px`;
      hotspot.style.top = `${spotlightRect.top}px`;
      pointer.style.left = `${Math.min(window.innerWidth - 156, Math.max(12, spotlightRect.left + spotlightRect.width / 2 - 70))}px`;
      pointer.style.top = `${Math.max(12, spotlightRect.top - 44)}px`;

      const isMobile = window.matchMedia("(max-width: 700px)").matches;
      const isWide = options.cardSize === "wide";
      const cardWidth = Math.min(isMobile ? 340 : isWide ? 520 : 360, window.innerWidth - 28);
      const preferRight = side !== "left";
      let left = preferRight ? rect.right + 24 : rect.left - cardWidth - 24;
      if (left < 14) left = 14;
      if (left + cardWidth > window.innerWidth - 14) left = window.innerWidth - cardWidth - 14;

      let top = rect.top + rect.height / 2 - 130;
      if (top < 14) top = 14;
      if (top > window.innerHeight - 310) top = Math.max(14, window.innerHeight - 310);

      card.style.width = `${cardWidth}px`;
      if (isMobile) {
        const targetIsLow = rect.top > window.innerHeight * 0.48;
        card.style.left = "12px";
        card.style.right = "12px";
        card.style.top = targetIsLow ? "12px" : "auto";
        card.style.bottom = targetIsLow ? "auto" : "12px";
        card.style.width = "auto";
      } else {
        card.style.right = "auto";
        card.style.bottom = "auto";
        card.style.left = `${left}px`;
        card.style.top = `${top}px`;
      }
      card.classList.toggle("is-wide", isWide);
      card.dataset.side = preferRight ? "right" : "left";
    }

    function targetForStep(step) {
      return step.selector ? document.querySelector(step.selector) : step.find?.();
    }

    function render() {
      const token = ++renderToken;
      const step = steps[index];
      if (!step) {
        close();
        return;
      }

      if (!step.manualRoute && getRouteFromPath() !== step.route) {
        openRoute(step.route);
      }

      tutorial.classList.remove("is-action-done");
      tutorial.classList.toggle("is-map-step", step.mode === "map");
      tutorial.classList.toggle("is-table-step", step.action === "table-selection");
      tutorial.classList.add("is-waiting");
      activeTarget = null;
      activeMapRegion = null;
      if (step.action !== "table-selection") selectedTutorialTables = new Set();
      step.before?.();

      window.setTimeout(() => {
        if (token !== renderToken || !tutorial.classList.contains("is-open")) return;
        activeMapRegion = step.mode === "map" ? findReservationMapRegion() : null;
        let target = step.mode === "map" ? targetForStep(step) || findSuggestedTableTarget() || activeMapRegion : targetForStep(step);
        if (!target) target = document.querySelector("main") || document.body;
        const scrollTarget = activeMapRegion || target;
        scrollTarget.scrollIntoView?.({ behavior: "smooth", block: step.mode === "map" ? "center" : "center", inline: "center" });

        window.setTimeout(() => {
          if (token !== renderToken || !tutorial.classList.contains("is-open")) return;
          target = step.mode === "map" ? targetForStep(step) || target : targetForStep(step) || target;
          activeTarget = target;
          title.textContent = step.title;
          copy.textContent = step.text;
          wait.textContent = step.waiting || "Выполните подсвеченное действие";
          if (step.action === "table-selection") updateTableSelectionWait();
          if (step.action === "contact-form") updateContactFormWait();
          progress.textContent = `${index + 1} / ${steps.length}`;
          prev.disabled = index === 0;
          next.textContent = index === steps.length - 1 ? "Готово" : "Я сделал";
          positionAround(target, step.side, step.spotlightPadding || 10, step);
        }, 260);
      }, 180);
    }

    function open(startIndex = 0) {
      index = startIndex;
      tutorial.classList.add("is-open");
      tutorial.setAttribute("aria-hidden", "false");
      render();
    }

    function ensureEntryChoice() {
      if (document.querySelector(".seatmap-entry-choice")) return;

      const language = currentLanguage();
      const copy = {
        ru: {
          kicker: "SeatMap beta",
          title: "Как хотите попробовать систему?",
          text: "Можно пройти короткое интерактивное обучение по бронированию, CRM и меню или сразу свободно открыть продукт.",
          guide: "Пройти обучение",
          free: "Без обучения",
        },
        en: {
          kicker: "SeatMap beta",
          title: "How would you like to try the system?",
          text: "Take a short guided walkthrough for reservations, CRM and menu, or open the product freely.",
          guide: "Start walkthrough",
          free: "Explore freely",
        },
        bg: {
          kicker: "SeatMap beta",
          title: "Как искате да пробвате системата?",
          text: "Минете кратко интерактивно обучение за резервации, CRM и меню или отворете продукта свободно.",
          guide: "С обучение",
          free: "Без обучение",
        },
      }[language] || {};

      const modal = document.createElement("div");
      modal.className = "seatmap-entry-choice";
      modal.innerHTML = `
        <div class="seatmap-entry-choice-dialog" role="dialog" aria-modal="true" aria-label="${copy.title}">
          <p>${copy.kicker}</p>
          <h1>${copy.title}</h1>
          <span>${copy.text}</span>
          <div>
            <button class="seatmap-entry-guide" type="button">${copy.guide}</button>
            <button class="seatmap-entry-free" type="button">${copy.free}</button>
          </div>
        </div>
      `;

      const closeChoice = () => {
        modal.classList.remove("is-open");
        window.setTimeout(() => modal.remove(), 220);
      };

      modal.querySelector(".seatmap-entry-guide").addEventListener("click", () => {
        window.sessionStorage.setItem("seatmap:entry-choice-seen", "true");
        window.localStorage.removeItem("seatmap:tutorial-seen");
        closeChoice();
        window.setTimeout(() => open(0), 260);
      });

      modal.querySelector(".seatmap-entry-free").addEventListener("click", () => {
        window.sessionStorage.setItem("seatmap:entry-choice-seen", "true");
        window.localStorage.setItem("seatmap:tutorial-seen", "true");
        closeChoice();
      });

      document.body.appendChild(modal);
      window.requestAnimationFrame(() => modal.classList.add("is-open"));
    }

    function actionableTargetFor(target) {
      return target?.closest?.("button, a, label, [role='button'], [tabindex], input, select, textarea") || target;
    }

    function targetContainsNode(target, node) {
      if (!target || !isElement(node)) return false;
      return target === node || Boolean(target.contains?.(node));
    }

    function nodeContainsTarget(node, target) {
      return isElement(node) && isElement(target) && node.contains(target);
    }

    function matchesCurrentAction(event, eventName) {
      if (!tutorial.classList.contains("is-open")) return false;
      if (isAdvancing) return false;
      if (clickListenerPaused) return false;
      if (!isElement(event.target)) return false;

      const step = steps[index];
      if (!step) return false;
      if (eventName === "hotspot") return step.action === "main-click";
      if (event.target.closest(".seatmap-tutorial")) return false;

      const target = activeTarget;
      if (!target && step.action !== "main-click") return false;

      if (step.action === "main-click") {
        const map = activeMapRegion;
        return eventName === "click" && Boolean(event.target.closest("#root, main, button, [role='button']")) &&
          (!map || map === event.target || map.contains(event.target));
      }

      if (step.action === "table-selection") {
        return eventName === "table-selection";
      }

      if (step.action === "next") {
        return false;
      }

      if (step.action === "change") {
        const actionTarget = actionableTargetFor(target);
        return ["input", "change"].includes(eventName) &&
          event.target.matches("input, select, textarea") &&
          (!actionTarget || targetContainsNode(actionTarget, event.target));
      }

      if (step.action === "click-or-change") {
        const actionTarget = actionableTargetFor(target);
        if (["input", "change"].includes(eventName) && event.target.matches("input, select, textarea")) {
          return !actionTarget || targetContainsNode(actionTarget, event.target);
        }
        return eventName === "click" &&
          (!actionTarget || targetContainsNode(actionTarget, event.target) || nodeContainsTarget(event.target, actionTarget));
      }

      if (step.action === "input") {
        const actionTarget = actionableTargetFor(target);
        return eventName === "input" &&
          event.target.matches("input, select, textarea") &&
          (!actionTarget || targetContainsNode(actionTarget, event.target));
      }

      if (step.action === "contact-form") {
        if (!["input", "change"].includes(eventName) || !event.target.matches("input, select, textarea")) return false;
        const state = getReservationContactState();
        updateContactFormWait();
        return state.filled.name && state.filled.phone;
      }

      if (step.action === "click-or-next") {
        const actionTarget = actionableTargetFor(target);
        return eventName === "click" &&
          (!actionTarget || targetContainsNode(actionTarget, event.target) || nodeContainsTarget(event.target, actionTarget));
      }

      if (step.action === "click") {
        const actionTarget = actionableTargetFor(target);
        return eventName === "click" &&
          (!actionTarget || targetContainsNode(actionTarget, event.target) || nodeContainsTarget(event.target, actionTarget));
      }

      return false;
    }

    function isInsideTarget(target, node) {
      if (!target || !isElement(node)) return false;
      return target === node ||
        Boolean(target.contains?.(node)) ||
        (isElement(target) && Boolean(node.contains(target)));
    }

    function interceptMapStepClick(event) {
      if (!tutorial.classList.contains("is-open")) return;
      if (event.target.closest?.(".seatmap-tutorial")) return;
      const step = steps[index];
      if (step?.action === "table-selection") {
        const table = findClickedTableElement(event.target);
        const tableNumber = tableNumberFromElement(table);
        const recommended = getRecommendedTableTargets();
        const clickedRecommended = recommended.some((element) => element === table || element.contains(table) || table?.contains(element));
        if (!tableNumber || (!clickedRecommended && !isInsideTarget(activeMapRegion, event.target))) return;

        selectedTutorialTables.add(tableNumber);
        updateTableSelectionWait();
        if (selectedTutorialTables.size >= expectedTableCount()) {
          window.setTimeout(() => completeCurrentAction(event, "table-selection"), 180);
        }
        return;
      }

      if (step?.action !== "main-click") return;
      if (!isInsideTarget(activeTarget, event.target) && !isInsideTarget(activeMapRegion, event.target)) return;

      event.preventDefault();
      event.stopImmediatePropagation();
      completeCurrentAction(event, "hotspot");
    }

    function updateTableSelectionWait() {
      const expected = expectedTableCount();
      const selected = selectedTutorialTables.size;
      wait.textContent = expected > 1
        ? `Выбрано ${selected} из ${expected}. Для этой компании нужна комбинация столов.`
        : selected > 0
          ? "Стол выбран. Отлично, можно продолжать."
          : "Кликните по подсвеченному столику";
    }

    function updateContactFormWait() {
      const state = getReservationContactState();
      const missing = [];
      if (!state.filled.name) missing.push("имя");
      if (!state.filled.phone) missing.push("телефон");
      wait.textContent = missing.length
        ? `Осталось заполнить: ${missing.join(" и ")}. Email и дата рождения необязательны.`
        : "Контактные данные готовы. Email и день рождения можно оставить пустыми.";
    }

    function completeCurrentAction(event, eventName) {
      if (!matchesCurrentAction(event, eventName)) return;
      clickListenerPaused = true;
      tutorial.classList.remove("is-waiting");
      tutorial.classList.add("is-action-done");
      wait.textContent = "Отлично, действие выполнено";
      window.setTimeout(() => {
        clickListenerPaused = false;
        advance();
      }, 520);
    }

    next.addEventListener("click", advance);
    prev.addEventListener("click", () => {
      index = Math.max(0, index - 1);
      render();
    });
    skip.addEventListener("click", close);
    launch.addEventListener("click", () => open(0));
    hotspot.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      completeCurrentAction(event, "hotspot");
    });
    window.addEventListener("resize", render);
    document.addEventListener("click", interceptMapStepClick, true);
    document.addEventListener("click", (event) => {
      const button = event.target.closest?.("button, a, [role='button']");
      ensureDemoReservationFields(button);
    }, true);
    document.addEventListener("click", (event) => window.setTimeout(() => completeCurrentAction(event, "click"), 0));
    document.addEventListener("input", (event) => completeCurrentAction(event, "input"));
    document.addEventListener("change", (event) => completeCurrentAction(event, "change"));

    if (forceTutorial) {
      window.setTimeout(() => open(0), 900);
    } else if (!skipTutorial && !window.sessionStorage.getItem("seatmap:entry-choice-seen")) {
      window.setTimeout(ensureEntryChoice, 900);
    }
  }

  function buildFrameBlocker() {
    if (window.self === window.top || document.querySelector(".seatmap-frame-blocker")) return;

    const blocker = document.createElement("div");
    blocker.className = "seatmap-frame-blocker";
    blocker.innerHTML = `
      <div>
        <p>Полноэкранный режим</p>
        <h1>SeatMap beta лучше работает в новой вкладке</h1>
        <span>Интерактивная карта, CRM и обучение требуют полного окна браузера.</span>
        <a href="${window.location.href}" target="_blank" rel="noopener">Открыть beta</a>
      </div>
    `;
    document.body.appendChild(blocker);
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
      <button class="seatmap-dock-toggle" type="button" aria-expanded="false" aria-label="Открыть навигацию SeatMap">
        <span class="seatmap-command-dot"></span>
        <div>
          <strong>SeatMap Beta</strong>
          <small>${labels.product}</small>
        </div>
      </button>
      <div class="seatmap-command-panel">
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
      </div>
    `;

    const toggle = bar.querySelector(".seatmap-dock-toggle");
    toggle.addEventListener("click", () => {
      const isOpen = bar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    bar.querySelectorAll("[data-seatmap-route]").forEach((button) => {
      button.addEventListener("click", () => {
        openRoute(button.dataset.seatmapRoute);
        bar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });

    bar.querySelector("select").addEventListener("change", (event) => {
      syncLanguage(event.target.value);
    });

    document.body.appendChild(bar);
    buildFrameBlocker();
    setActiveRoute(getRouteFromPath());
    activateNativeRussian();
    localizeRussianText();
    setupReservationDrafts();
    setupAdminLoginHints();
    hideNativeLanguageControls();
    ensureTutorial();

    const observer = new MutationObserver(() => {
      activateNativeRussian();
      localizeRussianText();
      setupReservationDrafts();
      setupAdminLoginHints();
      hideNativeLanguageControls();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  window.addEventListener("popstate", () => setActiveRoute(getRouteFromPath()));
  window.addEventListener("seatmap:reservation-created", () => {
    clearReservationDrafts();
    window.setTimeout(openReservationGuide, 140);
  });
  window.addEventListener("message", (event) => {
    if (event.data?.type === "seatmap-open-route") {
      openRoute(event.data.route);
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      const initialRoute = routeFromQuery();
      if (initialRoute) openRoute(initialRoute);
      buildCommandBar();
    });
  } else {
    const initialRoute = routeFromQuery();
    if (initialRoute) openRoute(initialRoute);
    buildCommandBar();
  }
})();

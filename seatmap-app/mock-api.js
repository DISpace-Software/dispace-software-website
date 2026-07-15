(function () {
  const originalFetch = window.fetch.bind(window);
  const apiHostPattern = /^(?:https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\]):5183)?\/api/i;

  const storageKey = "seatmap-demo-state-v3";
  const recordTtlMs = 3 * 60 * 60 * 1000;
  const demoAdminUser = { id: 1, name: "Demo Admin", email: "admin@seatmap.local", role: "Owner" };

  function createInitialState() {
    return {
      nextReservationId: 1,
      reservations: [],
      orders: [],
      blacklist: [],
      admins: [
        {
          ...demoAdminUser,
          isActive: true,
        },
      ],
      audit: [
        {
          id: 1,
          action: "Demo started",
          entity: "SeatMap",
          entityId: "beta",
          adminName: "System",
          createdAtUtc: new Date().toISOString(),
        },
      ],
    };
  }

  function normalizeState(savedState) {
    const base = createInitialState();
    const merged = {
      ...base,
      ...(savedState && typeof savedState === "object" ? savedState : {}),
    };
    merged.reservations = Array.isArray(merged.reservations) ? merged.reservations : [];
    merged.orders = Array.isArray(merged.orders) ? merged.orders : [];
    merged.blacklist = Array.isArray(merged.blacklist) ? merged.blacklist : [];
    merged.admins = Array.isArray(merged.admins) && merged.admins.length ? merged.admins : base.admins;
    merged.audit = Array.isArray(merged.audit) && merged.audit.length ? merged.audit : base.audit;

    const maxReservationId = merged.reservations.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
    merged.reservations = merged.reservations.map((reservation) => {
      if (reservation && reservation.status === "Arrived") {
        return {
          ...reservation,
          status: "Approved",
          isArrived: true,
        };
      }
      return reservation;
    });
    merged.nextReservationId = Math.max(Number(merged.nextReservationId) || 1, maxReservationId + 1);
    return merged;
  }

  function getRecordTime(record) {
    const raw =
      record?.createdAtUtc ||
      record?.arrivedAtUtc ||
      record?.updatedAtUtc ||
      record?.reservedDateTimeUtc ||
      record?.reservedAtUtc;
    const value = raw ? Date.parse(raw) : NaN;
    return Number.isFinite(value) ? value : Date.now();
  }

  function purgeExpiredRecords() {
    const cutoff = Date.now() - recordTtlMs;
    const beforeReservations = state.reservations.length;
    const beforeOrders = state.orders.length;
    state.reservations = state.reservations.filter((item) => getRecordTime(item) >= cutoff);
    state.orders = state.orders.filter((item) => getRecordTime(item) >= cutoff);
    if (state.reservations.length !== beforeReservations || state.orders.length !== beforeOrders) {
      persistState();
    }
  }

  function loadState() {
    try {
      return normalizeState(JSON.parse(window.localStorage.getItem(storageKey) || "null"));
    } catch {
      return createInitialState();
    }
  }

  const state = loadState();
  purgeExpiredRecords();

  function persistState() {
    try {
      window.localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...state,
          savedAtUtc: new Date().toISOString(),
        })
      );
    } catch {
      // The demo still works for the current tab if browser storage is unavailable.
    }
  }

  function ensureDemoAdminSession() {
    try {
      window.sessionStorage.setItem("admin-token", "seatmap-demo-token");
      window.sessionStorage.setItem("admin-user", JSON.stringify(demoAdminUser));
    } catch {
      // Ignore private-mode storage failures; the login screen can still be used.
    }
  }

  function openAdminAfterReservation(reservation) {
    ensureDemoAdminSession();
    try {
      window.sessionStorage.setItem("seatmap-last-reservation-id", String(reservation?.id || ""));
      window.sessionStorage.setItem("seatmap-open-admin-after-reservation", "true");
    } catch {
      // The admin panel can still be opened manually if browser storage is unavailable.
    }
  }

  function normalizeReservation(body) {
    const guestName = body.guestName || body.name || body.fullName || body.customerName || "";
    const guestCount = Number(body.guestCount || body.guests || body.partySize || 0);
    const reservedDate = body.reservedDate || body.date || "";
    const reservedTime = body.reservedTime || body.time || "";
    const tableIds = Array.isArray(body.tableIds) ? body.tableIds : body.tableId ? [body.tableId] : [];

    return {
      ...body,
      id: state.nextReservationId++,
      guestName,
      name: guestName,
      phone: body.phone || body.guestPhone || "",
      email: body.email || body.guestEmail || "",
      guestCount,
      guests: guestCount,
      reservedDate,
      date: reservedDate,
      reservedTime,
      time: reservedTime,
      area: body.area || body.areaName || body.areaId || "",
      areaId: body.areaId || body.area || "",
      areaName: body.areaName || body.area || body.areaId || "",
      tableIds,
      tableId: tableIds[0] || body.tableId || null,
      status: body.status || "Pending",
      notes: body.notes || body.comment || "",
      internalNote: body.internalNote || "",
      createdByAdmin: Boolean(body.createdByAdmin),
      createdAtUtc: body.createdAtUtc || new Date().toISOString(),
    };
  }

  const menu = [
    {
      id: 1,
      name: "Burrata con Pomodorini",
      nameBg: "Бурата с чери домати",
      nameRu: "Буррата с томатами черри",
      description: "Creamy burrata, cherry tomatoes, basil oil and aged balsamic.",
      descriptionBg: "Кремообразна бурата, чери домати, босилково олио и балсамико.",
      descriptionRu: "Кремовая буррата, томаты черри, базиликовое масло и бальзамико.",
      category: "Starters",
      price: 28,
      imageUrl: "./menu-items/burrata-con-pomodorini.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 2,
      name: "Vitello Tonnato",
      nameBg: "Витело тонато",
      nameRu: "Вителло тоннато",
      description: "Slow cooked veal, tuna sauce, capers and lemon zest.",
      descriptionBg: "Бавно готвено телешко, сос тонато, каперси и лимон.",
      descriptionRu: "Телятина, соус тоннато, каперсы и лимонная цедра.",
      category: "Starters",
      price: 31,
      imageUrl: "./menu-items/vitello-tonnato.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 2,
    },
    {
      id: 3,
      name: "Carpaccio di Manzo",
      nameBg: "Телешко карпачо",
      nameRu: "Карпаччо из говядины",
      description: "Beef carpaccio, arugula, parmesan and truffle dressing.",
      descriptionBg: "Телешко карпачо, рукола, пармезан и трюфелов дресинг.",
      descriptionRu: "Говяжье карпаччо, руккола, пармезан и трюфельная заправка.",
      category: "Starters",
      price: 32,
      imageUrl: "./menu-items/carpaccio-di-manzo.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 3,
    },
    {
      id: 4,
      name: "Pizza Prosciutto e Funghi",
      nameBg: "Пица Прошуто и фунги",
      nameRu: "Пицца Прошутто и грибы",
      description: "Tomato, mozzarella, prosciutto cotto and mushrooms.",
      descriptionBg: "Доматен сос, моцарела, прошуто кото и гъби.",
      descriptionRu: "Томатный соус, моцарелла, прошутто котто и грибы.",
      category: "Pizza",
      price: 24,
      imageUrl: "./menu-items/pizza-prosciutto-funghi.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 4,
    },
    {
      id: 5,
      name: "Pizza Diavola",
      nameBg: "Пица Диавола",
      nameRu: "Пицца Дьявола",
      description: "Tomato, mozzarella, spicy salami and chili oil.",
      descriptionBg: "Доматен сос, моцарела, пикантен салам и чили олио.",
      descriptionRu: "Томатный соус, моцарелла, острый салями и масло чили.",
      category: "Pizza",
      price: 25,
      imageUrl: "./menu-items/pizza-diavola.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 5,
    },
    {
      id: 6,
      name: "Tagliatelle al Tartufo",
      nameBg: "Талиатели с трюфел",
      nameRu: "Тальятелле с трюфелем",
      description: "Fresh tagliatelle, parmesan cream, black truffle.",
      descriptionBg: "Прясна паста, пармезанов крем и черен трюфел.",
      descriptionRu: "Свежая паста, крем из пармезана и чёрный трюфель.",
      category: "Mains",
      price: 36,
      imageUrl: "./menu-items/tagliatelle-tartufo.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 6,
    },
    {
      id: 7,
      name: "Spaghetti Frutti di Mare",
      nameBg: "Спагети с морски дарове",
      nameRu: "Спагетти с морепродуктами",
      description: "Mussels, shrimp, calamari, cherry tomatoes and parsley.",
      descriptionBg: "Миди, скариди, калмари, чери домати и магданоз.",
      descriptionRu: "Мидии, креветки, кальмар, томаты черри и петрушка.",
      category: "Mains",
      price: 38,
      imageUrl: "./menu-items/spaghetti-frutti-di-mare.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 7,
    },
    {
      id: 8,
      name: "Risotto ai Porcini",
      nameBg: "Ризото с манатарки",
      nameRu: "Ризотто с белыми грибами",
      description: "Carnaroli rice, porcini mushrooms, butter and parmesan.",
      descriptionBg: "Ориз карнароли, манатарки, масло и пармезан.",
      descriptionRu: "Рис карнароли, белые грибы, сливочное масло и пармезан.",
      category: "Mains",
      price: 34,
      imageUrl: "./menu-items/risotto-porcini.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 8,
    },
    {
      id: 9,
      name: "Grilled Sea Bass",
      nameBg: "Лаврак на грил",
      nameRu: "Сибас на гриле",
      description: "Sea bass fillet, grilled vegetables and lemon olive oil.",
      descriptionBg: "Филе лаврак, гриловани зеленчуци и лимонов зехтин.",
      descriptionRu: "Филе сибаса, овощи гриль и лимонное оливковое масло.",
      category: "Mains",
      price: 42,
      imageUrl: "./menu-items/grilled-sea-bass.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 9,
    },
    {
      id: 10,
      name: "Tiramisu Classico",
      nameBg: "Класическо тирамису",
      nameRu: "Классический тирамису",
      description: "Mascarpone cream, espresso, savoiardi and cocoa.",
      descriptionBg: "Маскарпоне крем, еспресо, савоярди и какао.",
      descriptionRu: "Крем маскарпоне, эспрессо, савоярди и какао.",
      category: "Desserts",
      price: 18,
      imageUrl: "./menu-items/tiramisu-classico.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 10,
    },
    {
      id: 11,
      name: "Aperol Spritz",
      nameBg: "Аперол Шприц",
      nameRu: "Апероль Шприц",
      description: "Aperol, prosecco, soda and orange.",
      descriptionBg: "Аперол, просеко, сода и портокал.",
      descriptionRu: "Апероль, просекко, содовая и апельсин.",
      category: "Drinks",
      price: 16,
      imageUrl: "./menu-items/aperol-spritz.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 11,
    },
    {
      id: 12,
      name: "Hugo Spritz",
      nameBg: "Хуго Шприц",
      nameRu: "Хуго Шприц",
      description: "Prosecco, elderflower, mint, lime and soda.",
      descriptionBg: "Просеко, бъз, мента, лайм и сода.",
      descriptionRu: "Просекко, бузина, мята, лайм и содовая.",
      category: "Drinks",
      price: 16,
      imageUrl: "./menu-items/hugo-spritz.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 12,
    },
    {
      id: 13,
      name: "Italian Lemonade",
      nameBg: "Италианска лимонада",
      nameRu: "Итальянский лимонад",
      description: "Fresh lemon, basil, soda and cane sugar.",
      descriptionBg: "Свеж лимон, босилек, сода и тръстикова захар.",
      descriptionRu: "Свежий лимон, базилик, содовая и тростниковый сахар.",
      category: "Drinks",
      price: 10,
      imageUrl: "./menu-items/italian-lemonade.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 13,
    },
    {
      id: 14,
      name: "Espresso Martini",
      nameBg: "Еспресо Мартини",
      nameRu: "Эспрессо Мартини",
      description: "Vodka, espresso, coffee liqueur and vanilla.",
      descriptionBg: "Водка, еспресо, кафе ликьор и ванилия.",
      descriptionRu: "Водка, эспрессо, кофейный ликёр и ваниль.",
      category: "Drinks",
      price: 18,
      imageUrl: "./menu-items/espresso-martini.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 14,
    },
    {
      id: 15,
      name: "Acqua Panna",
      nameBg: "Acqua Panna",
      nameRu: "Acqua Panna",
      description: "Still mineral water.",
      descriptionBg: "Негазирана минерална вода.",
      descriptionRu: "Минеральная вода без газа.",
      category: "Drinks",
      price: 8,
      imageUrl: "./menu-items/acqua-panna.jpg",
      isAvailable: true,
      isActive: true,
      sortOrder: 15,
    },
  ];

  function json(data, init = {}) {
    return Promise.resolve(
      new Response(JSON.stringify(data), {
        status: init.status || 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  }

  async function readBody(options) {
    if (!options || !options.body) return {};
    try {
      return JSON.parse(options.body);
    } catch {
      return {};
    }
  }

  function getPath(input) {
    const raw = typeof input === "string" ? input : input && input.url;
    if (!raw || !apiHostPattern.test(raw)) return null;
    return new URL(raw, window.location.origin).pathname;
  }

  window.fetch = async function mockSeatMapFetch(input, options = {}) {
    const path = getPath(input);
    if (!path) return originalFetch(input, options);

    const method = (options.method || "GET").toUpperCase();
    purgeExpiredRecords();

    if (path === "/api/menu") {
      if (method === "GET") return json(menu);
      if (method === "POST") {
        const menuItem = { id: menu.length + 1, ...(await readBody(options)) };
        menu.push(menuItem);
        return json(menuItem);
      }
    }

    if (path.startsWith("/api/menu/")) {
      return json({ ok: true });
    }

    if (path === "/api/reservations/blocked-slots") return json([]);
    if (path === "/api/table-layouts") return json([]);
    if (path === "/api/table-layouts/reset") return json([]);

    if (path === "/api/reservations") {
      if (method === "GET") return json(state.reservations);
      if (method === "POST") {
        const body = await readBody(options);
        const reservation = normalizeReservation(body);
        state.reservations.unshift(reservation);
        persistState();
        openAdminAfterReservation(reservation);
        window.dispatchEvent(
          new CustomEvent("seatmap:reservation-created", {
            detail: { reservation },
          })
        );
        return json(reservation, { status: 201 });
      }
    }

    const reservationActionMatch = path.match(/^\/api\/reservations\/(\d+)\/(approve|cancel|arrive|no-show|release|note|tables)$/);
    if (reservationActionMatch) {
      const [, idRaw, action] = reservationActionMatch;
      const reservation = state.reservations.find((item) => item.id === Number(idRaw));
      const body = await readBody(options);

      if (reservation) {
        if (action === "approve") reservation.status = "Approved";
        if (action === "cancel") reservation.status = "Cancelled";
        if (action === "arrive") {
          reservation.status = "Approved";
          reservation.isArrived = true;
          reservation.arrivedAtUtc = new Date().toISOString();
        }
        if (action === "no-show") {
          reservation.status = "No-show";
          reservation.isNoShow = true;
        }
        if (action === "release") {
          reservation.status = "Released";
          reservation.isArrived = false;
          reservation.releasedAtUtc = new Date().toISOString();
        }
        if (action === "note") reservation.internalNote = body.internalNote || body.note || reservation.internalNote || "";
        if (action === "tables") {
          reservation.tableIds = Array.isArray(body.tableIds)
            ? body.tableIds
            : body.tableId
              ? [body.tableId]
              : reservation.tableIds;
          reservation.tableId = reservation.tableIds?.[0] || reservation.tableId;
          reservation.date = body.date || reservation.date;
          reservation.time = body.time || reservation.time;
          reservation.guests = Number(body.guests || reservation.guests || 0);
          reservation.areaId = body.areaId || reservation.areaId;
          reservation.areaName = body.areaName || reservation.areaName;
        }
        persistState();
      }

      return json(reservation || { ok: true });
    }

    if (path === "/api/reservations/block") return json({ ok: true });

    if (path === "/api/dining-orders") {
      if (method === "GET") return json(state.orders);
      if (method === "POST") {
        const body = await readBody(options);
        const order = {
          id: state.orders.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1,
          status: "New",
          source: "Digital Menu",
          createdAtUtc: new Date().toISOString(),
          updatedAtUtc: new Date().toISOString(),
          ...body,
        };
        state.orders.unshift(order);
        persistState();
        window.dispatchEvent(new CustomEvent("seatmap:order-created", { detail: { order } }));
        return json(order, { status: 201 });
      }
    }
    const orderActionMatch = path.match(/^\/api\/dining-orders\/(\d+)\/(status|complete|cancel)$/);
    if (orderActionMatch) {
      const [, idRaw, action] = orderActionMatch;
      const order = state.orders.find((item) => item.id === Number(idRaw));
      const body = await readBody(options);
      if (order) {
        order.status = action === "complete" ? "Completed" : action === "cancel" ? "Cancelled" : body.status || order.status;
        order.updatedAtUtc = new Date().toISOString();
        persistState();
      }
      return json(order || { ok: true });
    }
    if (path.startsWith("/api/dining-orders")) return json({ ok: true });

    if (path === "/api/blacklist") {
      if (method === "GET") return json(state.blacklist);
      if (method === "POST") {
        const record = { id: state.blacklist.length + 1, createdAtUtc: new Date().toISOString(), ...(await readBody(options)) };
        state.blacklist.unshift(record);
        persistState();
        return json(record);
      }
    }
    if (path.startsWith("/api/blacklist/")) return json({ ok: true });

    if (path === "/api/admin/login" || path === "/api/admin/device-login") {
      ensureDemoAdminSession();
      return json({
        token: "seatmap-demo-token",
        user: demoAdminUser,
      });
    }
    if (path === "/api/admin/users") return json(state.admins);
    if (path === "/api/admin/audit") return json(state.audit);
    if (path === "/api/admin/devices") return json([]);

    return json({ ok: true });
  };
})();

(function () {
  const originalFetch = window.fetch.bind(window);
  const apiHostPattern = /^(?:https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\]):5183)?\/api/i;

  const storageKey = "seatmap-demo-state-v3";
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
    merged.nextReservationId = Math.max(Number(merged.nextReservationId) || 1, maxReservationId + 1);
    return merged;
  }

  function loadState() {
    try {
      return normalizeState(JSON.parse(window.localStorage.getItem(storageKey) || "null"));
    } catch {
      return createInitialState();
    }
  }

  const state = loadState();

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

  function openAdminAfterReservation() {
    ensureDemoAdminSession();
    window.setTimeout(() => {
      const adminUrl = new URL("./admin/", document.baseURI || window.location.href).href;
      if (window.location.href !== adminUrl) window.location.assign(adminUrl);
    }, 350);
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
      name: "Truffle Burrata",
      nameBg: "Трюфел бурата",
      nameRu: "Буррата с трюфелем",
      description: "Burrata, cherry tomatoes, basil oil, truffle.",
      descriptionBg: "Бурата, чери домати, босилково олио, трюфел.",
      descriptionRu: "Буррата, томаты черри, масло базилика, трюфель.",
      category: "Starters",
      price: 28,
      imageUrl: "./seatmap-terrace-restaurant.png",
      isAvailable: true,
      isActive: true,
      sortOrder: 1,
    },
    {
      id: 2,
      name: "Wagyu Slider",
      nameBg: "Wagyu слайдер",
      nameRu: "Wagyu слайдер",
      description: "Mini brioche, wagyu beef, cheddar, signature sauce.",
      descriptionBg: "Мини бриош, wagyu телешко, чедър, signature сос.",
      descriptionRu: "Мини-бриош, говядина wagyu, чеддер, фирменный соус.",
      category: "Mains",
      price: 34,
      imageUrl: "./seatmap-hero-restaurant.png",
      isAvailable: true,
      isActive: true,
      sortOrder: 2,
    },
    {
      id: 3,
      name: "Golden Tiramisu",
      nameBg: "Златно тирамису",
      nameRu: "Золотой тирамису",
      description: "Classic tiramisu with gold dust and espresso cream.",
      descriptionBg: "Класическо тирамису със златен прах и еспресо крем.",
      descriptionRu: "Классический тирамису с золотой пудрой и эспрессо-кремом.",
      category: "Desserts",
      price: 18,
      imageUrl: "./seatmap-open-terrace.png",
      isAvailable: true,
      isActive: true,
      sortOrder: 3,
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
        window.dispatchEvent(
          new CustomEvent("seatmap:reservation-created", {
            detail: { reservation },
          })
        );
        openAdminAfterReservation();
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
        if (action === "arrive") reservation.status = "Arrived";
        if (action === "no-show") reservation.status = "No-show";
        if (action === "release") reservation.status = "Released";
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

    if (path === "/api/dining-orders") return json(state.orders);
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

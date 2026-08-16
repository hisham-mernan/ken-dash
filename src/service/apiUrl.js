export const apiKey = import.meta.env.VITE_REACT_APP_BASE_URL || "http://localhost:8000";
export const API = {
  list: {
    huts: "/api/products/hut-dropdown/",
    icons: "/api/products/icons/",
  },
  admin: {
    home: {
      cards: "/api/products/admin/analytics/",
      revenue: "/api/products/admin/revenue-chart/",
    },
    feedback: {
      list: "/api/products/feedback-list/",
      delete: "/api/products/feedback/",
    },
    users: {
      list: "/user-list/",
      details: "/user-details/",
      create: "/add-guest/",
      add_admin: "/add-admin/",
      add_supplier: "/add-supplier/",
    },
    hut: {
      list: "/api/products/huts/admin-list/",
      create: "/api/products/huts/",
      update: "/api/products/huts/",
      hut: "/api/products/huts-details-admin/",
      prices: "/api/products/huts/available-dates/",
      details: "/api/products/admin/huts/services-activities/",
    },
    special_items: "/api/products/ken-items/",
    qr: {
      scannar: "/api/products/bookings-qr/",
      logs: "/api/products/qr-logs/",
      all_logs: "/api/products/qrlogs-all/",
    },
    website: {
      about: {
        about: "/api/content/about-us/",
        details: "/api/content/about-us/details/",
      },
      ken_story: "/api/content/story/",
      faq: "/api/content/faq/",
      special_about_us: "/api/content/special-about-us/",
      our_service: "/api/content/our-service/",
      terms_and_conditions: {
        detail: "/api/content/terms-condation/",
        all: "/api/content/terms-condations/",
        overview: {
          main: "/api/content/terms-titles/",
          update: "/api/content/terms-titles/details/",
        },
      },
    },
  },
  orders: {
    list: "/api/products/all-booking/",
    details: "/api/products/admin/bookings-details/",
    refund: "/api/products/admin/refund/",
    refuseCancellation: "/api/products/admin/refuse-cancellation/",
    upcoming: "/api/products/upcoming-admin/",
    latest_order: "/api/products/analytics-recent-order/",
  },
  supplier: {
    home: {
      cards: "/api/products/supplier-analytics/",
    },
    product: {
      list: "/api/products/services/",
    },
  },
  events: {
    list: "/api/products/events/list-dashboard/",
    event_details: "/api/products/events/",
    about: {
      add: "/api/products/events/add-list/",
      update: "/api/products/events/",
    },
    details: "/api/products/events-include/",
    dates: "/api/products/events/available-dates/",
  },
  billing: "",
  support: {
    support: "/support/",

    send: "/support/reply/",
  },
  notification: {
    list: "/notifcation/",
    update: "/read-notifications/",
    count: "/count-notifications/",
  },
};

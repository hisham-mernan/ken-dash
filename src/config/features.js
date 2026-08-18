/**
 * Temporary visibility switches.
 *
 * Events, supplier products/services and Ken special items are hidden from the
 * dashboards for now. Nothing is deleted -- the pages, components and API calls
 * all still exist, and the data is untouched in the database. Flip a flag back
 * to `true` to bring that section back everywhere at once.
 *
 * Existing orders still show whatever events, services or special items were
 * booked against them: hiding the catalogue must not erase what a customer
 * already paid for.
 */
export const SHOW_EVENTS = false;
export const SHOW_PRODUCTS = false;
export const SHOW_SPECIAL_ITEMS = false;

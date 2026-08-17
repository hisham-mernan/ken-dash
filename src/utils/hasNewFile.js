/**
 * Does this form payload contain a newly picked file?
 *
 * Edit forms guard submission on react-hook-form's `isDirty` and silently
 * navigate away when it is false. If a freshly selected image does not flip
 * that flag, the request is never sent at all -- no network call, no error,
 * and the UI still looks successful while the image is quietly discarded.
 *
 * Checking for an actual File is a direct signal that does not depend on how
 * dirty-tracking happens to behave for a given field.
 */

const isFile = (value) =>
  typeof File !== "undefined" && value instanceof File;

const holdsFile = (value) => {
  if (isFile(value)) return true;
  if (Array.isArray(value)) return value.some(holdsFile);
  // The multi-image picker stores { id, image, preview } entries.
  if (value && typeof value === "object") return isFile(value.image);
  return false;
};

export const hasNewFile = (data) =>
  !!data && Object.values(data).some(holdsFile);

export default hasNewFile;

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const saudiPhoneNumberRegex = /^\d{9}$/;

export const passwordPattern = /^.{6,}$/;
export const genericNationalIdPattern = /^[A-Za-z0-9]{8,16}$/;

export const nameValidationPattern = /^[A-Za-z\s.]{2,}$/;

export const cardNumberValidationPattern = /^\d{13,19}$/;

export const cvvValidationPattern = /^\d{3}$/;

export const namePattern = /^[a-zA-Z\u0600-\u06FF\s]{2,}$/;

export const numberPattern = /^\d{1,10}(\.\d{0,2})?$/;

// validate date range for hut
export const validateDateRange = ({ watch, value, idx, setError }) => {
  const fromDate = watch(`available_dates[${idx}].date_from`);
  const toDate = value;

  if (!fromDate) {
    setError(`available_dates[${idx}].date_from`, {
      type: "manual",
      message: "required_field",
    });
    return "set_from_date";
  }

  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    setError(`available_dates[${idx}].date_from`, {
      type: "manual",
      message: "invalid_date",
    });
    return "invalid_date";
  }

  if (to <= from) {
    return "to_date_must_be_after_from";
  }

  const allPrices = watch("available_dates") || [];

  for (let i = 0; i < allPrices.length; i++) {
    if (i === idx) continue;

    const other = allPrices[i];
    const otherFrom = new Date(other.date_from);
    const otherTo = new Date(other.date_to);

    const overlap = from <= otherTo && to >= otherFrom;

    if (overlap) {
      setError(`available_dates[${idx}].date_from`, {
        type: "manual",
        message: "overlapping_date_range",
      });

      return "overlapping_date_range";
    }
  }

  return true;
};

// validate date for event
export const validateEventDateExist = ({ watch, value, idx, setError }) => {
  const eventDates = watch("dates") || [];

  for (let i = 0; i < eventDates.length; i++) {
    if (i === idx) continue;

    const other = eventDates[i];

    if (!other?.date || !value) continue;

    const otherDate = new Date(other.date);
    const currentDate = new Date(value);

    if (isNaN(otherDate.getTime()) || isNaN(currentDate.getTime())) continue;

    const sameDate =
      otherDate.getFullYear() === currentDate.getFullYear() &&
      otherDate.getMonth() === currentDate.getMonth() &&
      otherDate.getDate() === currentDate.getDate();

    if (sameDate) {
      return "event_date_overlap";
    }
  }

  return true;
};

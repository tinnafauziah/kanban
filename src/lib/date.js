export function formatDate(input) {
  const date = new Date(input);
  const day = date.toLocaleString("en-EN", { day: "2-digit" });
  const month = date.toLocaleString("en-EN", { month: "long" });
  const year = date.toLocaleString("en-EN", { year: "numeric" });
  let time = date.toLocaleString("en-EN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  time = time.replace(".", ":").replace(" ", "");

  return `${day} ${month} ${year} ${time}`;
}

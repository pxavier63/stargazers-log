const list = document.querySelector("#starred");
const status = document.querySelector("#starred-status");

if (!list) {
  console.error("Starred repositories list element not found.");
  throw new Error("Missing #starred element");
}

const renderEmptyState = (message) => {
  list.setAttribute("aria-busy", "false");
  list.innerHTML = "";
  const item = document.createElement("li");
  item.textContent = message;
  list.appendChild(item);
};

const renderErrorState = (message) => {
  list.setAttribute("aria-busy", "false");
  list.innerHTML = "";
  const item = document.createElement("li");
  item.textContent = message;
  list.appendChild(item);
  if (status) {
    status.textContent = message;
  }
};

fetch("events.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to load starred repositories: ${response.status}`);
    }

    return response.json();
  })
  .then((events) => {
    list.setAttribute("aria-busy", "false");

    if (!Array.isArray(events)) {
      throw new TypeError("Expected a JSON array of starred repositories.");
    }

    list.innerHTML = "";

    if (events.length === 0) {
      renderEmptyState("No starred repositories have been logged yet.");
      return;
    }

    events.forEach((event) => {
      const item = document.createElement("li");
      item.textContent = `${event.name} — starred ${event.starred}`;
      list.appendChild(item);
    });

    if (status) {
      status.textContent = `${events.length} starred repositories loaded.`;
    }
  })
  .catch((error) => {
    console.error(error);
    renderErrorState("Unable to load starred repositories right now.");
  });
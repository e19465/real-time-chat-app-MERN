function getURL(href) {
  // Create a URL based on the current location and href
  return new URL(href, window.location.href);
}

function isModifiedEvent(event) {
  const eventTarget = event.currentTarget || event.target;
  const target = eventTarget.getAttribute("target");
  return (
    (target && target !== "_self") ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    (event.nativeEvent && event.nativeEvent.button === 1)
  );
}

export function shouldTriggerStartEvent(href, clickEvent = null) {
  const current = window.location;
  const target = getURL(href);

  // Prevent triggering if there are modifications to the event
  if (clickEvent && isModifiedEvent(clickEvent)) return false;

  // Prevent triggering for cross-origin links
  if (current.origin !== target.origin) return false;

  // Prevent triggering if the path and query parameters are the same
  if (current.pathname === target.pathname && current.search === target.search)
    return false;

  return true;
}

export function resetableAbortController(
  resetAbortControllerCallback: (fresh: AbortController) => void,
  onabort: (e: Event) => void
): AbortController {
  const n = new AbortController();
  n.signal.onabort = (e: Event) => {
    const fresh = resetableAbortController(
      resetAbortControllerCallback,
      onabort
    );
    resetAbortControllerCallback(fresh);
    onabort(e);
  };
  return n;
}

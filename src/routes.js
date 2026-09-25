export const routeIds = ['introduction', 'single-qubit-fidelity', 'two-qubit-fidelity', 'transmon'];
export const routeSections = ['learn', 'calculators'];

export function pagePath(base, id, section = id === 'introduction' ? 'learn' : 'calculators') {
  return id === 'home' ? base : `${base}${section}/${id}`;
}

export function resolvePage(base, pathname) {
  const normalized = pathname.replace(/\/$/, '');
  for (const section of routeSections) {
    for (const id of routeIds) {
      if (normalized === pagePath(base, id, section)) return { id, section };
    }
  }
  return null;
}

function getSegmentAfter(pathname: string, segment: string) {
  const parts = pathname.split("/").filter(Boolean)
  const index = parts.indexOf(segment)
  if (index === -1) return undefined
  return parts[index + 1]
}

export function getPatronalId(request: Request, params?: { id?: string }) {
  return params?.id ?? getSegmentAfter(new URL(request.url).pathname, "patronales")
}

export function getAfiliadoId(request: Request, params?: { id?: string }) {
  return params?.id ?? getSegmentAfter(new URL(request.url).pathname, "afiliados")
}

export function getLineaAhorroId(request: Request, params?: { lineaId?: string }) {
  return params?.lineaId ?? getSegmentAfter(new URL(request.url).pathname, "lineas-ahorro")
}

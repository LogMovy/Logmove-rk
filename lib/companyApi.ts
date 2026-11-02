export const EMPRESAS_API_BASE_URL = (process.env.NEXT_PUBLIC_EMPRESAS_API_URL ?? '').replace(
  /\/+$/,
  ''
)

const SESSION_STORAGE_KEY = 'logmovy_company_b2b_session_v1'

export interface CompanySession {
  id: string
  registrationToken: string
}

export interface ApiErrorPayload {
  error?: boolean
  code?: string
  message?: string
  errors?: Record<string, string>
}

export class CompanyApiError extends Error {
  public readonly status: number
  public readonly code: string
  public readonly fieldErrors: Record<string, string>

  constructor(
    message: string,
    status: number,
    code = 'API_ERROR',
    fieldErrors: Record<string, string> = {}
  ) {
    super(message)
    this.name = 'CompanyApiError'
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
  }
}

export function loadCompanySession(): CompanySession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CompanySession>
    if (parsed.id && parsed.registrationToken) {
      return { id: parsed.id, registrationToken: parsed.registrationToken }
    }
    return null
  } catch {
    return null
  }
}

export function saveCompanySession(session: CompanySession): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  } catch {
    // ignore storage errors
  }
}

export function clearCompanySession(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
  } catch {
    // ignore storage errors
  }
}

async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${EMPRESAS_API_BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(init.headers || {}),
      },
    })
  } catch {
    throw new CompanyApiError(
      'Não foi possível conectar à API corporativa B2B. Verifique sua conexão ou tente novamente em instantes.',
      0,
      'NETWORK_ERROR'
    )
  }

  let body: any = null
  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (!response.ok) {
    const errPayload = (body || {}) as ApiErrorPayload
    throw new CompanyApiError(
      errPayload.message || `Erro HTTP ${response.status}`,
      response.status,
      errPayload.code || 'HTTP_ERROR',
      errPayload.errors || {}
    )
  }

  return body as T
}

export interface CompanyStep1Payload {
  nomeFantasia: string
  cnpj: string
  razaoSocial?: string
  cidadeUf: string
  segmento: string
}

export interface CompanyStep1Response {
  id: string
  registrationToken?: string
  status: string
  currentStep: number
  message: string
}

export interface CompanyStep2Payload {
  responsavel: string
  cargo: string
  whatsapp: string
  email: string
}

export interface CompanyStep3Payload {
  volumeDiario: string
  modalidade: string
  turnosPico: string[]
  observacoes?: string
}

export interface CompanySummaryResponse {
  id: string
  status: string
  protocol: string | null
  currentStep: number
  company: {
    nomeFantasia: string
    razaoSocial: string | null
    cnpj: string
    cidade: string
    uf: string
    cidadeUf: string
    segmento: string
  }
  contact: {
    responsavel: string
    cargo: string
    whatsapp: string
    email: string
  } | null
  logistics: {
    volumeDiario: string
    modalidade: string
    turnosPico: string[]
    observacoes: string | null
  } | null
  consent: {
    accepted: boolean
    currentVersion: string
  }
}

export interface AcceptContactResponse {
  id: string
  protocol: string
  status: string
  acceptedAt: string
  consentVersion: string
  message: string
}

/**
 * Bloco 01 - Cria rascunho ou atualiza caso já exista sessão corporativa ativa
 */
export async function submitCompanyStep1(
  payload: CompanyStep1Payload,
  existingSession: CompanySession | null
): Promise<CompanySession> {
  if (existingSession) {
    try {
      await requestJson<CompanyStep1Response>(`/api/v1/companies/${existingSession.id}/step-1`, {
        method: 'POST',
        headers: {
          'X-Registration-Token': existingSession.registrationToken,
        },
        body: JSON.stringify(payload),
      })
      return existingSession
    } catch (err) {
      if (err instanceof CompanyApiError && (err.status === 404 || err.status === 401)) {
        clearCompanySession()
      } else {
        throw err
      }
    }
  }

  const created = await requestJson<CompanyStep1Response>('/api/v1/companies/step-1', {
    method: 'POST',
    headers: {
      'Idempotency-Key': `b2b-step1-${payload.cnpj.replace(/\D/g, '')}-${Date.now()}`,
    },
    body: JSON.stringify(payload),
  })

  const session: CompanySession = {
    id: created.id,
    registrationToken: created.registrationToken || '',
  }
  saveCompanySession(session)
  return session
}

/**
 * Bloco 02 - Salva responsável pela operação
 */
export async function submitCompanyStep2(
  session: CompanySession,
  payload: CompanyStep2Payload
): Promise<void> {
  await requestJson(`/api/v1/companies/${session.id}/step-2`, {
    method: 'POST',
    headers: {
      'X-Registration-Token': session.registrationToken,
    },
    body: JSON.stringify(payload),
  })
}

/**
 * Bloco 03 - Salva perfil logístico e turnos de pico
 */
export async function submitCompanyStep3(
  session: CompanySession,
  payload: CompanyStep3Payload
): Promise<void> {
  await requestJson(`/api/v1/companies/${session.id}/step-3`, {
    method: 'POST',
    headers: {
      'X-Registration-Token': session.registrationToken,
    },
    body: JSON.stringify(payload),
  })
}

/**
 * Revisão (GET) - Obtém o resumo confirmado pela API
 */
export async function fetchCompanySummary(
  session: CompanySession
): Promise<CompanySummaryResponse> {
  return requestJson<CompanySummaryResponse>(`/api/v1/companies/${session.id}`, {
    method: 'GET',
    headers: {
      'X-Registration-Token': session.registrationToken,
    },
  })
}

/**
 * Consentimento LGPD Final (POST) - Efetiva a solicitação e retorna o protocolo B2B-XXXXXX
 */
export async function submitCompanyAcceptContact(
  session: CompanySession,
  aceiteContato: boolean,
  consentVersion = '1.0'
): Promise<AcceptContactResponse> {
  return requestJson<AcceptContactResponse>(
    `/api/v1/companies/${session.id}/accept-contact`,
    {
      method: 'POST',
      headers: {
        'X-Registration-Token': session.registrationToken,
      },
      body: JSON.stringify({ aceiteContato, consentVersion }),
    }
  )
}


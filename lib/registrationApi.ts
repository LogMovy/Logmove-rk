export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, '') || 'https://logmovy.kodyvera.com/CadastroMotoboys'

const SESSION_STORAGE_KEY = 'logmovy_registration_session_v1'

export interface RegistrationSession {
  id: string
  registrationToken: string
}

export interface ApiErrorPayload {
  error?: boolean
  code?: string
  message?: string
  errors?: Record<string, string>
}

export class RegistrationApiError extends Error {
  public readonly status: number
  public readonly code: string
  public readonly fieldErrors: Record<string, string>

  constructor(message: string, status: number, code = 'API_ERROR', fieldErrors: Record<string, string> = {}) {
    super(message)
    this.name = 'RegistrationApiError'
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
  }
}

export function loadRegistrationSession(): RegistrationSession | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<RegistrationSession>
    if (parsed.id && parsed.registrationToken) {
      return { id: parsed.id, registrationToken: parsed.registrationToken }
    }
    return null
  } catch {
    return null
  }
}

export function saveRegistrationSession(session: RegistrationSession): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  } catch {
    // ignore storage errors
  }
}

export function clearRegistrationSession(): void {
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
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(init.headers || {}),
      },
    })
  } catch {
    throw new RegistrationApiError(
      `Não foi possível conectar ao servidor da LogMovy (${API_BASE_URL}). Verifique sua conexão e tente novamente.`,
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
    throw new RegistrationApiError(
      errPayload.message || `Erro HTTP ${response.status}`,
      response.status,
      errPayload.code || 'HTTP_ERROR',
      errPayload.errors || {}
    )
  }

  return body as T
}

export interface Step1Payload {
  name: string
  cpf: string
  birthDate: string
  email: string
  phone: string
  password: string
  plate: string
  mei?: string
  cnh?: string
}

export interface Step1Response {
  id: string
  registrationToken?: string
  status: string
  currentStep: number
  message: string
}

export interface Step2Payload {
  bank: string
  agency: string
  account: string
  accountType: string
  holderCpf: string
  pixType: string
  pixKey: string
}

export interface Step3Payload {
  days: string[]
}

export interface RegistrationSummaryResponse {
  id: string
  status: string
  protocol: string | null
  currentStep: number
  profile: {
    name: string
    cpf: string
    cpfMasked: string
    birthDate: string
    email: string
    phone: string
    plate: string
    mei: string | null
    cnh: string | null
  }
  banking: {
    bank: string
    bankCode: string
    agency: string
    account: string
    accountMasked: string
    accountType: string
    holderCpf: string
    pixType: string
    pixKey: string
    pixKeyMasked: string
  } | null
  schedule: {
    days: string[]
    totalDays: number
  }
  terms: {
    accepted: boolean
    currentVersion: string
  }
}

export interface AcceptTermsResponse {
  id: string
  protocol: string
  status: string
  acceptedAt: string
  termsVersion: string
  message: string
}

/**
 * Etapa 01 - Cria novo rascunho ou atualiza caso já exista sessão ativa
 */
export async function submitStep1(
  payload: Step1Payload,
  existingSession: RegistrationSession | null
): Promise<RegistrationSession> {
  if (existingSession) {
    try {
      await requestJson<Step1Response>(`/api/v1/registrations/${existingSession.id}/step-1`, {
        method: 'POST',
        headers: {
          'X-Registration-Token': existingSession.registrationToken,
        },
        body: JSON.stringify(payload),
      })
      return existingSession
    } catch (err) {
      // Se o rascunho antigo expirou ou não existe mais no banco (404/401), cria um novo
      if (err instanceof RegistrationApiError && (err.status === 404 || err.status === 401)) {
        clearRegistrationSession()
      } else {
        throw err
      }
    }
  }

  const created = await requestJson<Step1Response>('/api/v1/registrations/step-1', {
    method: 'POST',
    headers: {
      'Idempotency-Key': `step1-${payload.cpf.replace(/\D/g, '')}-${Date.now()}`,
    },
    body: JSON.stringify(payload),
  })

  const session: RegistrationSession = {
    id: created.id,
    registrationToken: created.registrationToken || '',
  }
  saveRegistrationSession(session)
  return session
}

/**
 * Etapa 02 - Salva dados bancários e PIX
 */
export async function submitStep2(
  session: RegistrationSession,
  payload: Step2Payload
): Promise<void> {
  await requestJson(`/api/v1/registrations/${session.id}/step-2`, {
    method: 'POST',
    headers: {
      'X-Registration-Token': session.registrationToken,
    },
    body: JSON.stringify(payload),
  })
}

/**
 * Etapa 03 - Salva disponibilidade semanal
 */
export async function submitStep3(
  session: RegistrationSession,
  payload: Step3Payload
): Promise<void> {
  await requestJson(`/api/v1/registrations/${session.id}/step-3`, {
    method: 'POST',
    headers: {
      'X-Registration-Token': session.registrationToken,
    },
    body: JSON.stringify(payload),
  })
}

/**
 * Etapa 04 (GET) - Busca o resumo confirmado pela API para a tela de revisão
 */
export async function fetchRegistrationSummary(
  session: RegistrationSession
): Promise<RegistrationSummaryResponse> {
  return requestJson<RegistrationSummaryResponse>(`/api/v1/registrations/${session.id}`, {
    method: 'GET',
    headers: {
      'X-Registration-Token': session.registrationToken,
    },
  })
}

/**
 * Etapa 04 (POST) - Aceite final dos termos de uso e geração do protocolo
 */
export async function submitAcceptTerms(
  session: RegistrationSession,
  acceptedTerms: boolean,
  termsVersion = '1.1'
): Promise<AcceptTermsResponse> {
  const res = await requestJson<AcceptTermsResponse>(
    `/api/v1/registrations/${session.id}/accept-terms`,
    {
      method: 'POST',
      headers: {
        'X-Registration-Token': session.registrationToken,
      },
      body: JSON.stringify({ acceptedTerms, termsVersion }),
    }
  )
  clearRegistrationSession()
  return res
}


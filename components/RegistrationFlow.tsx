'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ShieldCheck } from 'lucide-react'

const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo']

const initialData = {
  name: '', cpf: '', birthDate: '', email: '', phone: '', password: '', mei: '', plate: '', cnh: '',
  bank: '', agency: '', account: '', accountType: '', holderCpf: '', pixType: '', pixKey: '', days: [] as string[], acceptedTerms: false,
}

type RegistrationData = typeof initialData
type TextField = Exclude<keyof RegistrationData, 'days' | 'acceptedTerms'>

function Field({ label, name, type = 'text', required = true, value, onChange, placeholder }: {
  label: string; name: TextField; type?: string; required?: boolean; value: string;
  onChange: (name: TextField, value: string) => void; placeholder?: string
}) {
  return <label className="registration-field"><span>{label}{required && <b> *</b>}{!required && <small> (opcional)</small>}</span><input name={name} type={type} required={required} value={value} onChange={e => onChange(name, e.target.value)} placeholder={placeholder} autoComplete={name === 'password' ? 'new-password' : undefined} /></label>
}

export default function RegistrationFlow() {
  const [step, setStep] = useState(0)
  const [data, setData] = useState<RegistrationData>(initialData)
  const [submitted, setSubmitted] = useState(false)
  const [daysError, setDaysError] = useState(false)

  const update = (name: TextField, value: string) => setData(current => ({ ...current, [name]: value }))
  const toggleDay = (day: string) => {
    setDaysError(false)
    setData(current => ({ ...current, days: current.days.includes(day) ? current.days.filter(item => item !== day) : [...current.days, day] }))
  }
  const next = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (step === 2 && data.days.length === 0) {
      setDaysError(true)
      return
    }
    if (step < 3) setStep(current => current + 1)
    else setSubmitted(true)
  }

  return <section className="registration-section section-pad">
    <div className="registration-shell">
      <div className="registration-intro">
        <span className="registration-eyebrow"><span /> CADASTRO DE PARCEIRO</span>
        <h2>Seu próximo passo<br /><em>começa por aqui.</em></h2>
        <p>Preencha seus dados em poucos minutos e escolha quando quer estar na rua.</p>
        <div className="registration-assurance"><ShieldCheck size={17} /> Seus dados são usados para análise do cadastro.</div>
      </div>

      <div className="registration-card">
        {submitted ? <div className="registration-success" role="status"><span><CheckCircle2 size={34} /></span><h3>Cadastro preenchido!</h3><p>Suas informações foram registradas nesta sessão. Para receber cadastros, conecte este formulário ao serviço de backend da LogMovy.</p><button type="button" onClick={() => { setData(initialData); setStep(0); setSubmitted(false) }}>Preencher outro cadastro</button></div> : <>
          <div className="registration-progress-head"><div><span>ETAPA {String(step + 1).padStart(2, '0')} DE 04</span><h3>{['Dados pessoais', 'Dados bancários e PIX', 'Dias disponíveis', 'Termos de uso'][step]}</h3></div><span className="registration-step-icon">0{step + 1}</span></div>
          <div className="registration-progress" aria-label={`Etapa ${step + 1} de 4`}>{[0, 1, 2, 3].map(index => <span key={index} className={index <= step ? 'active' : ''} />)}</div>
          <form onSubmit={next}>
            {step === 0 && <div className="registration-fields">
              <Field label="Nome completo" name="name" value={data.name} onChange={update} placeholder="Como está no seu documento" />
              <Field label="CPF" name="cpf" value={data.cpf} onChange={update} placeholder="000.000.000-00" />
              <Field label="Data de nascimento" name="birthDate" type="date" value={data.birthDate} onChange={update} />
              <Field label="E-mail" name="email" type="email" value={data.email} onChange={update} placeholder="voce@email.com" />
              <Field label="Celular / WhatsApp" name="phone" type="tel" value={data.phone} onChange={update} placeholder="(00) 00000-0000" />
              <Field label="Senha" name="password" type="password" value={data.password} onChange={update} placeholder="Mínimo de 8 caracteres" />
              <Field label="MEI" name="mei" required={false} value={data.mei} onChange={update} placeholder="CNPJ (se tiver)" />
              <Field label="Placa da moto" name="plate" value={data.plate} onChange={update} placeholder="ABC1D23" />
              <Field label="CNH" name="cnh" required={false} value={data.cnh} onChange={update} placeholder="Número do registro (opcional)" />
            </div>}
            {step === 1 && <div className="registration-fields">
              <Field label="Banco" name="bank" value={data.bank} onChange={update} placeholder="Nome ou código do banco" />
              <Field label="Agência" name="agency" value={data.agency} onChange={update} />
              <Field label="Conta com dígito" name="account" value={data.account} onChange={update} />
              <label className="registration-field"><span>Tipo de conta <b>*</b></span><select required value={data.accountType} onChange={e => update('accountType', e.target.value)}><option value="">Selecione</option><option>Conta corrente</option><option>Conta poupança</option><option>Conta pagamento</option></select></label>
              <Field label="CPF do titular" name="holderCpf" value={data.holderCpf} onChange={update} placeholder="000.000.000-00" />
              <label className="registration-field"><span>Tipo da chave PIX <b>*</b></span><select required value={data.pixType} onChange={e => update('pixType', e.target.value)}><option value="">Selecione</option><option>CPF</option><option>CNPJ</option><option>E-mail</option><option>Celular</option><option>Chave aleatória</option></select></label>
              <Field label="Chave PIX" name="pixKey" value={data.pixKey} onChange={update} placeholder="Informe sua chave PIX" />
              <p className="registration-inline-note">A chave PIX e os dados bancários são obrigatórios para os repasses.</p>
            </div>}
            {step === 2 && <div className="registration-days"><p>Selecione os dias da semana em que tem interesse em trabalhar. Você poderá ajustar sua disponibilidade depois.</p><div className="registration-day-grid">{days.map(day => <label key={day} className={`registration-day ${data.days.includes(day) ? 'selected' : ''}`}><input type="checkbox" checked={data.days.includes(day)} onChange={() => toggleDay(day)} /><span className="day-check"><Check size={14} /></span>{day}</label>)}</div><small className={daysError ? 'registration-error' : ''}>{daysError ? 'Selecione ao menos um dia para continuar.' : 'Selecione pelo menos um dia para continuar.'}</small></div>}
            {step === 3 && <div className="registration-terms"><div className="terms-scroll"><h4>Termos de uso — cadastro de parceiro</h4><p>Ao prosseguir, você solicita seu cadastro como profissional parceiro da LogMovy. As informações fornecidas poderão ser usadas para identificar você, analisar seu perfil e validar os dados e documentos informados.</p><p>O envio deste cadastro não garante aprovação, oferta de serviços, volume mínimo de corridas ou renda. A disponibilidade de oportunidades depende da demanda e da região.</p><p>Você define sua disponibilidade e decide se aceita cada oportunidade apresentada, observando as condições informadas antes de confirmar o serviço. Benefícios e serviços de terceiros, quando oferecidos, são opcionais e sujeitos a condições próprias.</p><p>Você declara que os dados informados são verdadeiros e que tem autorização para utilizar a conta bancária e a chave PIX cadastradas. Mantenha sua senha em sigilo e comunique qualquer uso não autorizado.</p><p>Seus dados serão tratados para gestão do cadastro, validação e operação dos repasses, conforme a legislação aplicável e o aviso de privacidade da LogMovy. Você poderá solicitar informações sobre seus dados pelos canais de atendimento da plataforma.</p><p>Estes termos descrevem as condições gerais do cadastro. As condições específicas de cada serviço serão apresentadas antes da sua aceitação.</p></div><label className="registration-consent"><input type="checkbox" required checked={data.acceptedTerms} onChange={e => setData(current => ({ ...current, acceptedTerms: e.target.checked }))} /><span>Li e aceito os termos de uso acima. <b>*</b></span></label></div>}
            <div className="registration-actions">{step > 0 && <button type="button" className="registration-back" onClick={() => setStep(current => current - 1)}><ArrowLeft size={16} /> Voltar</button>}<button type="submit" className="registration-next">{step === 3 ? 'Finalizar cadastro' : 'Continuar'} {step === 3 ? <Check size={17} /> : <ArrowRight size={17} />}</button></div>
          </form>
          <p className="registration-required">* Campos obrigatórios</p>
        </>}
      </div>
    </div>
  </section>
}

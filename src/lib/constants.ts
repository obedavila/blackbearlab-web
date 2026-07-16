export const WHATSAPP_NUMBER = '50433860106'

export const WHATSAPP_DEFAULT_MESSAGE =
  'Hola, quiero información sobre los servicios de BlackbearLab'

export function buildWhatsAppLink(message: string = WHATSAPP_DEFAULT_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const SECTION_IDS = {
  servicios: 'servicios',
  dentalcore: 'dentalcore',
  servicioTecnico: 'servicio-tecnico',
  nosotros: 'nosotros',
  contacto: 'contacto',
} as const

export const prefix = (pref: string, value: string) => `${pref} ${value}`
export const toVoid = (value: string | undefined) => value || 'void'
export const toNothing = (value: string | undefined) => value || ''
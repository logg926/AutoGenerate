/*
 * action types
 */

export const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
export const CHANGE_PARA = 'CHANGE_PARA'
export const EXPORT = 'EXPORT'
export const CHANGE_VIEW = 'CHANGE_VIEW'

/*
 * other constants
 */

 
export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action creators
 */

export function addTodo(text) {
  return { type: UPLOAD_PHOTO, text }
}

export function toggleTodo(index) {
  return { type: CHANGE_PARA, index }
}

export function setVisibilityFilter(filter) {
  return { type: EXPORT, filter }
}
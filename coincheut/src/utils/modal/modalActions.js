import * as c from "./modalConstants"


const modalActive = (sym) => ({
  type: c.MODAL_ACTIVATION,
  isActive: sym
});

export const modalActivation = (sym) => {
  return dispatch => {
      dispatch(modalActive(sym))
  }
}

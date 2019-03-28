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

const storeValueModal = (val) => ({
  type: c.STORE_VALUE,
  val: val
});

export const storeValue = (val) => {
  return dispatch => {
      dispatch(storeValueModal(val))
  }
}

const storeTypeModal = (t) => ({
  type: c.STORE_TYPE,
  t: t
});

export const storeType = (t) => {
  return dispatch => {
      dispatch(storeTypeModal(t))
  }
}

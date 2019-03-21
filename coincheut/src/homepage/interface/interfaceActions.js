import * as constants from "./interfaceConstants"
import * as apiUtils from "../../utils/apiUtils"

export const fetchListCards = () => {
  return apiUtils.callJSONAPI(constants.API_URL_LIST_CARDS, constants.API_KEY_LIST_CARDS, "GET")
}

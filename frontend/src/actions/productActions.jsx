import {
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FETCHED,
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_FETCHED,
  PRODUCT_LIST_REQUEST,
} from '../constants/productConstants.jsx'
import axios from 'axios'
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/products')
    dispatch({ type: PRODUCT_LIST_FETCHED, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const listproductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_FETCHED, payload: data })
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

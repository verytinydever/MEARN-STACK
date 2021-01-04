import {
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FETCHED,
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_FETCHED,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_ERROR,
  PRODUCT_DELETE_FETCHED,
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

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    await axios.delete(`/api/products/${id}`, config)
    dispatch({ type: PRODUCT_DELETE_FETCHED, success: true })
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

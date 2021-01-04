import {
  PRODUCT_DELETE_ERROR,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FETCHED,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DETAILS_FETCHED,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_LIST_ERROR,
  PRODUCT_LIST_FETCHED,
  PRODUCT_LIST_REQUEST,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, ...state }
    case PRODUCT_LIST_FETCHED:
      return { loading: false, products: action.payload }
    case PRODUCT_LIST_ERROR:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: {} }
    case PRODUCT_DETAILS_FETCHED:
      return { loading: false, product: action.payload }
    case PRODUCT_DETAILS_ERROR:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const deleteproductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true }
    case PRODUCT_DELETE_FETCHED:
      return { loading: false, success: true }
    case PRODUCT_DELETE_ERROR:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

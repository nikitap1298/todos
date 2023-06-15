import { createSlice } from "@reduxjs/toolkit"
import { localStorageUserInfoKey, localStorageVerifiedKey } from "../../constants/constants"

const userName = JSON.parse(localStorage.getItem(localStorageUserInfoKey) as string)
const verified = JSON.parse(localStorage.getItem(localStorageVerifiedKey) as string)

let name = "name"
let isAuthenticated = false

if (userName !== null && userName.userLogin !== undefined) {
  name = userName.userLogin
}

if (verified !== null && (verified === true || verified === false)) {
  isAuthenticated = verified
}

const initialState = {
  state: {
    isFetching: false,
  },
  user: {
    name: name,
    isAuthenticated: isAuthenticated,
  },
}

const userSlice = createSlice({
  name: name,
  initialState,
  reducers: {
    setIsFetching: (state) => {
      state.state.isFetching = true
    },
  },
})

export const { setIsFetching } = userSlice.actions

export default userSlice.reducer

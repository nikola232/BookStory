import {RegisterForm} from "@/types/login.types";
import {BaseDTO, loginDTO} from "@/types/dtos.types";
import APIService from "@/services/API.service";

export const loginService = () => {
  return {
    login: async (email: string, password: string) => {
      const body = {
        email,
        password
      }
      const data: loginDTO = await APIService.makePostCall(
        'login',
        false,
        body,
      )
      console.log('data', data)
      if(data.status) {
        return {
          ...data
        }
      }
      return data
    },
    signup: async (registerForm: RegisterForm) => {
      const data: BaseDTO = await APIService.makePostCall(
        'signup',
        false,
        registerForm
      )
      return data
    },
    changePassword: async (username: string, oldPassword: string, newPassword: string, token: string) => {
      const body = {
        username,
        oldPassword,
        newPassword
      }

      const headers = {
        'Authorization': `Bearer ${token}`
      }

      const data: BaseDTO = await APIService.makePostCall(
        'changePassword',
        true,
        body,
        headers
      )
      return data.status
    },
    forgotPassword: async (email: string) => {
      const body = {
        email
      }

      const data: BaseDTO = await APIService.makePostCall(
        'forgotPassword',
        false,
        body
      )
      return data
    },
    forgotPasswordVerificationCode: async (email: string, verificationCode: any) => {
      const body = {
        email,
        verificationCode
      }

      const data: BaseDTO = await APIService.makePostCall(
        'forgotPasswordVerificationCode',
        false,
        body
      )

      return data
    },
    createNewPassword: async (email: string, verificationCode: any, password: string, confirmPassword: string) => {
      const body = {
        email,
        verificationCode,
        password,
        confirmPassword
      }

      const data: BaseDTO = await APIService.makePostCall(
        'createNewPassword',
        false,
        body
      )

      return data
    },
  }
}

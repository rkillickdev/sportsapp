import { getAccessToken } from "../actions";
import { axiosReq } from "@/app/services/axiosDefaults";
import { useRouter } from "next/navigation";

export interface RegisterUserInput {
  email: string
  password1: string
  password2: string
}

export async function registerUser(
  payload: RegisterUserInput
) {
  try {
    const { data } = await axiosReq.post(
      '/api/auth/register/',
      payload,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
    console.log('SUCCESS :-D');
    console.log(data);
    return data

  } catch (err) {
    console.log(err);
  }
}
'use client';

import { useFormik } from "formik";
import schema from "./schema";
import { registerUser } from "@/app/lib/service/auth";
import type { RegisterUserInput } from "@/app/lib/service/auth";
import { handleLogin } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import useSignupModal from "@/app/hooks/useSignupModal";
import { useState } from "react";

const RegisterForm: React.FC = (): JSX.Element => {
  const router = useRouter();
  const signupModal = useSignupModal();
  const [accountCreated, setAccountCreated] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password1: '',
      password2: '',
    },
    validationSchema: schema,
    onSubmit: async (values: RegisterUserInput) => {
      const response = await registerUser(values)
      console.log (response)
      if (response.access) {
        handleLogin(response.user.pk, response.access, response.refresh);
        setAccountCreated(true)
        signupModal.close();

        router.push('/')
      } else {
          console.log('There was an error');
      }
    }
  });
  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
        <label className="form-control w-full mb-4" htmlFor="email">
          <span className="label">
            <span className="label-text">Email</span>
          </span>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            className="input input-bordered input-secondary w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="email"
          />
          {formik.errors.email && formik.touched.email && (
            <span className="label">
              <span className="label-text-alt text-error">
                {formik.errors.email}
              </span>
            </span>
          )}
        </label>
        <label className="form-control w-full mb-4" htmlFor="password1">
          <span className="label">
            <span className="label-text">Password</span>
            <span className="label-text text-gray-400 text-xs">
              Min 8 characters, 1 number
            </span>
          </span>
          <input
            type="password"
            id="password1"
            name="password1"
            placeholder="********"
            className="input input-bordered w-full input-secondary "
            value={formik.values.password1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="new-password"
          />
          {formik.errors.password1 && formik.touched.password1 && (
            <span className="label">
              <span className="label-text-alt text-error">
                {formik.errors.password1}
              </span>
            </span>
          )}
        </label>
        <label className="form-control w-full mb-4" htmlFor="password2">
          <span className="label">
            <span className="label-text">Confirm password</span>
          </span>
          <input
            type="password"
            id="password2"
            name="password2"
            placeholder="********"
            className="input input-bordered w-full input-secondary"
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          />
          {formik.errors.password2 &&
            formik.touched.password2 && (
              <span className="label">
                <span className="label-text-alt text-error">
                  {formik.errors.password2}
                </span>
              </span>
            )}
        </label>

        <button
          type="submit"
          className="btn w-40 bg-black text-white border-black mt-4"
          disabled={formik.isSubmitting || accountCreated}
        >
          Register →
        </button>
      </form>
  )
}

export default RegisterForm
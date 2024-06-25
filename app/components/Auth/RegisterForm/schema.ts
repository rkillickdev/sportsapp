import * as Yup from 'yup'

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Enter an email address')
    .email('Enter a valid email address'),
  password1: Yup.string()
    .required('Enter a password')
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be at most 100 characters')
    .matches(/\d/, 'Password must contain at least one number'),
  password2: Yup.string().oneOf(
    [Yup.ref('password1'), ''],
    'Passwords must match'
  ),
})

export default schema
import * as Yup from 'yup'

const schema = Yup.object().shape({
  streetAndNumber: Yup.string()
    .required('Enter 1st line of the address'),
  place: Yup.string(),
  region: Yup.string(),
  postcode: Yup.string()
    .required('Enter a postcode'),
  country: Yup.string()
    .required('Enter a country'),
  latitude: Yup.string(),
  longitude: Yup.string(),
})

export default schema
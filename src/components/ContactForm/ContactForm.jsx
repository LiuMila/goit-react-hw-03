import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import shortid from 'shortid';
import { Input, Label, FormContainer, Button } from './ContactForm.style';

const Form = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(
          /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
          "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        )
        .required('Required'),
      number: Yup.string()
        .matches(
          /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
          'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
        )
        .required('Required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  const nameInputId = shortid.generate();
  const telInputId = shortid.generate();

  return (
    <FormContainer onSubmit={formik.handleSubmit}>
      <Label htmlFor={nameInputId}>Name
        <Input
          type="text"
          name="name"
          id={nameInputId}
          {...formik.getFieldProps('name')}
          isError={formik.touched.name && formik.errors.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
      </Label>
      <Label htmlFor={telInputId}>Number
        <Input
          type="tel"
          name="number"
          id={telInputId}
          {...formik.getFieldProps('number')}
          isError={formik.touched.number && formik.errors.number}
        />
        {formik.touched.number && formik.errors.number ? (
          <div>{formik.errors.number}</div>
        ) : null}
      </Label>
      <Button type="submit">Add contact</Button>
    </FormContainer>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;

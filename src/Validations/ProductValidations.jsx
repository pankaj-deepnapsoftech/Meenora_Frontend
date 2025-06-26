import * as Yup from 'yup';

 export const productValidationSchema = Yup.object({
    name: Yup.string()
        .required('Product name is required')
        .min(2, 'Name must be at least 2 characters'),

    description: Yup.string()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters'),

    price: Yup.number()
        .typeError('Price must be a number')
        .required('Price is required')
        .positive('Price must be greater than zero'),

    category: Yup.string()
        .required('Category is required'),
});

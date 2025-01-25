export const validationRules = {
  name: [
    {
      required: true,
      message: 'Name is required!',
    },
    {
      min: 3,
      message: 'Name must be at least 3 characters long!',
    },
    {
      pattern: /^[A-Za-z\s]+$/,
      message: 'Name must contain only letters and spaces!',
    },
  ],
  email: [
    {
      required: true,
      message: 'Email is required!',
    },
    {
      type: 'email',
      message: 'Please enter a valid email address!',
    },
  ],
  password: [
    {
      required: true,
      message: 'Password is required!',
    },
    {
      min: 8,
      message: 'Password must be at least 8 characters long!',
    },
    {
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
      message: 'Password must contain letters and numbers!',
    },
  ],
  title: [
    {
      required: true,
      message: 'Title is required!',
    },
    {
      min: 5,
      message: 'Title must be at least 5 characters long!',
    },
    {
      max: 100,
      message: 'Title must be less than 100 characters!',
    },
  ],
  description: [
    {
      required: true,
      message: 'Description is required!',
    },
    {
      min: 10,
      message: 'Description must be at least 10 characters long!',
    },
    {
      max: 500,
      message: 'Description must be less than 500 characters!',
    },
  ],
  required: (field: string) => [
    {
      required: true,
      message: `${field} is required!`,
    },
  ],
};
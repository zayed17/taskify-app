export const validationRules = {
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
    required: (field: string) => [
      {
        required: true,
        message: `${field} is required!`,
      },
    ],
  };
  
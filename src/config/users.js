export default [
    {
        "id": "firstname",
        "label": "Firstname",
        type: 'text',
        schemaType: String
    },
    {
        "id": "lastname",
        "label": "Lastname",
        type: 'text',
        schemaType: String
    },
    {
        "id": "password",
        "label": "Password",
        type: 'password',
        schemaType: String,
        hidden: true
    },
    {
        "id": "confirmPassword",
        "label": "Confirm Password",
        type: 'password',
        schemaType: String,
        hidden: true
    },
    {
        "id": "email",
        "label": "Email",
        type: 'email',
        schemaType: String
    },
    {
        "id": "phone",
        "label": "Phone",
        type: 'text',
        schemaType: String
    },
    {
        "id": "isAdmin",
        "label": "Assign Admin Privileges",
        type: 'checkbox',
        schemaType: Boolean,
        hidden: true
    },
]

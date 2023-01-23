interface FormInputProps {
    buttonText?: string
    name: string
    isRequired?: boolean
    variant?: "phone" | "default"
    style?: string
    placeholder?:string
}

export type {
    FormInputProps
}
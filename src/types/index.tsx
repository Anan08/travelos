import React, { ReactNode } from "react"

export interface packageProps {
    id: string,
    destination: string,
    desc: string, 
    prices: number
}
    
export interface formProps {
    children: ReactNode,
    action: (formData: FormData) => void;
    className?: string;
    onSubmit?: () => void;
}
    
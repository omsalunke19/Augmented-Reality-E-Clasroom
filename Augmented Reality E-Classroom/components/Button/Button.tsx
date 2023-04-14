interface IButtonProps {
    children: string | React.ReactNode
    onClick?: () => void
    hidden?: boolean
    className?: string
}

const Button = ({ children, onClick, hidden, className }: IButtonProps) => {
    return (
        <button
            hidden={hidden}
            type='button'
            title={"btn"}
            onClick={onClick}
            className={`${className} min-w-[20px] h-10 px-5 font-open_sans text-white text-base font-semibold bg-brand rounded-md hover:bg-white hover:text-brand hover:border-2 hover:border-brand`}
        >
            {children}
        </button>
    )
}

export default Button
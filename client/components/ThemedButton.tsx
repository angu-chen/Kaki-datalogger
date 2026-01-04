export default function ThemedBtn({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className="r">
      {children}
    </button>
  )
}

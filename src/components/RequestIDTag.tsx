interface Props {
  id: string
  className?: string
}

export default function RequestIDTag({ id, className = '' }: Props) {
  return (
    <span
      className={`font-mono text-[12px] text-text-muted tracking-tight ${className}`}
    >
      {id}
    </span>
  )
}

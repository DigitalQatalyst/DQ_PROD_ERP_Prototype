type TileColor = 'navy' | 'green' | 'brown' | 'red' | 'blue'

interface Props {
  label: string
  value: string
  color: TileColor
}

const bgByColor: Record<TileColor, string> = {
  navy: '#030F35',
  green: '#15803D',
  brown: '#B45309',
  red: '#991B1B',
  blue: '#1D4ED8',
}

export default function SummaryTile({ label, value, color }: Props) {
  return (
    <div
      className="rounded-card shadow-sm px-6 py-5 flex flex-col items-center justify-center text-center min-h-[112px]"
      style={{ background: bgByColor[color] }}
    >
      <p className="text-[13px] font-semibold text-white leading-snug mb-3">
        {label}
      </p>
      <p
        className="text-[28px] font-bold text-white tabular-nums leading-none font-mono"
        style={{ fontFeatureSettings: "'tnum' on, 'lnum' on" }}
      >
        {value}
      </p>
    </div>
  )
}

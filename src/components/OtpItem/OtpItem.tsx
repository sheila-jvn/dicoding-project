
type OtpItemProps = {
  email: string
  otp: string
  timer: number
}

export function OtpItem({ email, otp, timer }: OtpItemProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-[10px] border border-[#3f3f46] p-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-normal text-[#a1a1aa]">{email}</p>
        <p className="text-2xl font-semibold">{otp}</p>
      </div>
      <p className="text-2xl font-normal">{timer}s</p>
    </div>
  )
}


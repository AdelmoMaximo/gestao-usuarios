interface UserAvatarProps {
  initials: string
}

export function UserAvatar({ initials }: UserAvatarProps) {
  return (
    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
      {initials}
    </div>
  )
}


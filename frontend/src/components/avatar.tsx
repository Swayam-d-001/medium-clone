interface NameAvatarProps {
    name?: any;
    w?: number;
    h?: number;
  }
  
  export const NameAvatar = ({ name }: NameAvatarProps) => {
    return (
      <div
        className="flex items-center justify-center w-7 h-7 overflow-hidden bg-slate-600 rounded-full "
         // Properly placed inline styles
      >
        <span className="font-medium text-center text-white w-full">{name.charAt(0)}</span>
      </div>
    );
  };
  

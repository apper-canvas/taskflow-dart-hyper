const NotificationBadge = ({ count }) => {
  if (!count || count === 0) return null;

  return (
    <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
      {count > 99 ? '99+' : count}
    </div>
  );
};

export default NotificationBadge;
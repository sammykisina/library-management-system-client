import type { FC } from "react";
import type { Toast } from "react-hot-toast";

interface NotifyProps {
  t: Toast;
  title: string;
  notificationWrapperStyles: string;
}

const Notify: FC<NotifyProps> = ({ t, title, notificationWrapperStyles }) => {
  return (
    <section
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } ${notificationWrapperStyles}`}
    >
      <span className="text-sm">{title}</span>
    </section>
  );
};

export default Notify;

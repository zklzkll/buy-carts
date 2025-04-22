import Image from "next/image";

const closeIcon = "/assets/close.png";

interface DrawerTitleProps {
  onClose: () => void;
}

const DrawerTitle: React.FC<DrawerTitleProps> = ({ onClose }) => {
  return (
    <div className="drawer-title">
      <span className="drawer-title-text">购物车</span>
      <Image src={closeIcon} alt="Close" width={28} height={28} className="drawer-close-icon" onClick={onClose} />
    </div>
  )
}

export default DrawerTitle
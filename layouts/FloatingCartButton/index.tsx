
import Image from "next/image";
import "./index.css";

const cartIcon = "/assets/cart.png";

interface FloatingCartButtonProps {
  cartItemCount: number;
  open: () => void;
}

const FloatingCartButton: React.FC<FloatingCartButtonProps> = (props) => {
  const { cartItemCount, open } = props
  return (
    <div className='floating-cart-button' onClick={open}>
      <div className='cart-container'>
        <Image src={cartIcon} alt="Cart" width={30} height={30} className='cart-icon' />
        {cartItemCount > 0 && (
          <div className='cart-count'>
            {cartItemCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingCartButton;
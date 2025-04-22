import { useEffect } from "react";
import { Drawer } from "antd";
import CartButton from "../FloatingCartButton";
import useDrawer from "./useDrawer";
import DrawerTitle from "./components/Title";
import DrawerContent from "./components/Content";
import "./index.css";

const CartDrawer: React.FC = (props) => {
  const { isOpen, actions, activeTab, total, cartItems, tabItems, selectedItems, onChangeTabs } = useDrawer();

  useEffect(() => {
    if (isOpen) {
      actions.query()
    }
  }, [isOpen]);

  const btnAttr = {
    cartItemCount: total,
    open: actions.open,
  };

  const contentAttrs = {
    activeTab,
    cartItems,
    selectedItems,
    tabItems,
    onChangeTabs,
    handleRemove: actions.remove,
    handleSelectItem: actions.select,
    handleSelectAll: actions.selectAll,
  }

  return (
    <>
      <CartButton {...btnAttr} />
      <Drawer
        width={514}
        title={false}
        open={isOpen}
        closable={false}
        style={{ display: "flex", flexDirection: "column", flex: "1 1 0%" }}
        onClose={actions.close}
        classNames={{
          body: "my-drawer",
        }}
        destroyOnClose
      >
        <DrawerTitle onClose={actions.close} />
        <DrawerContent {...contentAttrs} />
      </Drawer>
    </>
  );
};

export default CartDrawer;

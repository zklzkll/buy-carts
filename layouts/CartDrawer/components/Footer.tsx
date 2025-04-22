import { CartItem } from "@/api";
import { useCustomContext } from "@/layouts/CustomContext";
import { useMemo } from "react";
import { CartItems } from "./Content";


interface DrawerFooterProps {
  handleSelectAll: () => void;
  cartItems: CartItems[];
  selectedItems: Set<number>;
}

const DrawerFooter: React.FC<DrawerFooterProps> = ({
  handleSelectAll,
  cartItems,// 当前业务线购物车
  selectedItems = new Set(), // 已选项
}) => {

  const { activeTab } = useCustomContext();


  // 获取当前 tab 已选中的金额总和
  // 构建 Map，以 MediaIdType[activeTab] 为键，CartItem 为值
  const selectedItemsMap = useMemo(() => {
    const map = new Map<number, CartItem>();
    cartItems.forEach((item) => {
      if (selectedItems.has(item.id)) {
        map.set(item.id, item);
      }
    });
    return map;
  }, [cartItems, selectedItems]);

  // 获取当前 tab 已选中的金额总和
  const getTotalPrice = () => {
    return Array.from(selectedItemsMap.values()).reduce((total, item) => {
      return total + item.price;
    }, 0);
  };

  const handlePay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const ids = Array.from(selectedItemsMap.values()).map(item => item.id); // 获取所有选中的 CartItem
    const result = {
      line: activeTab,
      ids,
      total: getTotalPrice(),
    }
    console.log("选中的商品信息：", result); // 打印
  }

  return (
    <>
      <hr
        aria-orientation="horizontal"
        className="dioa-divider__root border-0 border-solid border-b w-full h-[0px] border-current text-[#F0F0F0]"
      />
      <div className="flex flex-col relative px-[40px] py-[28px]">
        <div className="flex justify-between items-center text-[14px]/[42px]">
          <label className="flex items-center">
            <input
              className="cursor-pointer"
              type="checkbox"
              checked={selectedItems.size ? selectedItems.size === cartItems.length : false}
              onChange={handleSelectAll}
            />
            <span className="data-disabled:text-neutral-50 data-disabled:cursor-not-allowed ml-[8px]">
              全选
            </span>
          </label>
          <div className="flex items-center">
            <div className="flex space-x-1 text-neutral-60">
              <span>已选</span>
              <span>{selectedItems.size}</span>
              <span>件</span>
            </div>
            <div className="flex space-x-1 items-center">
              <span className="font-medium">总计：</span>
              <div className="flex space-x-1 items-baseline text-red-500">
                <span className="text-[28px]">{getTotalPrice()}</span>
                <span className="text-[14px]">元</span>
              </div>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-[16px] px-[40px] h-[60px] bg-black text-white rounded-full"
          onClick={handlePay}
        >
          立即购买
        </button>
      </div>
    </>
  );
};

export default DrawerFooter;

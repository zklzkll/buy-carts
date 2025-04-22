import { useMemo, useState } from "react";
import { MediaIdType, MediaType, useCustomContext } from "../CustomContext";
import { BuyerCartFoto, BuyerCartMusic, BuyerCartVideo, FotosBoughtType, LicType, MusicsBoughtType, VideosBoughtType } from "@/api";
import { fetchData } from "@/utils/request";

const initials = { isOpen: false };

const checkBought = (licType: LicType, boughtType?: LicType) => {
  if (!licType || !boughtType) return false;
  if (licType === boughtType) return true;
  if (boughtType === LicType.LPPLUS) {
    return licType === LicType.LP
  }
  return false;
}
const useDrawer = () => {
  const context = useCustomContext();
  const { activeTab, carts, onChangeTabs, onChangeCarts } = context || {};
  const [store, setStore] = useState({ ...initials });
  const [selectedItems, setSelectedItems] = useState<Record<string, Set<number>>>({});

  // 获取购物车数据
  const fetchCartData = async () => {

    const videos = await fetchData<BuyerCartVideo[]>("/api/getBuyerCartVideos")
    const fotos = await fetchData<BuyerCartFoto[]>("/api/getBuyerCartFotos")
    const musics = await fetchData<BuyerCartMusic[]>("/api/getBuyerCartMusics")

    if (videos?.length) {
      const params = new URLSearchParams();
      videos.forEach(({ vid }) => params.append('vids', vid.toString()));
      const resBought = await fetchData<VideosBoughtType[]>(`/api/getVideosBoughtType?${params.toString()}`);
      videos.forEach((item) => {
        const bought: VideosBoughtType | undefined = resBought.find(({ vid }) => vid === item.vid);
        const isBought = checkBought(item.licType, bought?.licTypes)
        item.bought = isBought;
      });
    }

    if (fotos?.length) {
      const params = new URLSearchParams();
      fotos.forEach(({ fid }) => params.append('fids', fid.toString()));
      const resBought = await fetchData<FotosBoughtType[]>(`/api/getFotosBoughtType?${params.toString()}`);
      fotos.forEach((item) => {
        const bought: FotosBoughtType | undefined = resBought.find(({ fid }) => fid === item.fid);
        const isBought = checkBought(item.licType, bought?.licTypes)
        item.bought = isBought;
      });
    }

    if (musics?.length) {
      const params = new URLSearchParams();
      musics.forEach(({ mid }) => params.append('mids', mid.toString()));
      const resBought = await fetchData<MusicsBoughtType[]>(`/api/getFotosBoughtType?${params.toString()}`);
      musics.forEach((item) => {
        const bought: MusicsBoughtType | undefined = resBought.find(({ mid }) => mid === item.mid);
        const isBought = checkBought(item.licType, bought?.licTypes)
        item.bought = isBought;
      });
    }

    onChangeCarts({ videos, fotos, musics })
  }

  // 当前业务线购物数据
  const cartItems = useMemo(() => {
    const result = carts?.[activeTab]?.map(item => {
      const { price, licType } = item
      let actualPrice = price
      if (licType === 'LP') {
        actualPrice = price * 4
      }
      if (licType === 'LPPLUS') {
        actualPrice = price * 10
      }
      return { ...item, price: actualPrice, id: item[MediaIdType[activeTab]] }
    })
    return result || []
  }, [activeTab, carts])
  const open = () => {
    setStore({ ...store, isOpen: true })
  }
  const close = () => {
    setStore({ ...store, isOpen: false })
    setSelectedItems({})
    onChangeTabs(MediaType.Video)
  }

  const handleSelectItem = (id: number) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev[activeTab] || []);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return { ...prev, [activeTab]: newSet };
    });
  };


  const handleSelectAll = () => {
    setSelectedItems((prev) => {
      const currentTabItems = cartItems.filter(o => o.auditStatus !== 'FAIL').map((item: any) => item.id as number);
      const newSet = new Set<number>(currentTabItems);
      // 如果当前 tab 的所有 item 已经被选中，则取消选中
      if (prev[activeTab] && prev[activeTab].size === currentTabItems.length) {
        return { ...prev, [activeTab]: new Set<number>() };
      }

      // 否则选中所有 item
      return { ...prev, [activeTab]: newSet };
    });
  };

  const handleRemove = (id: number) => {
    // 移除逻辑
    const newCartItems = cartItems.filter((item: any) => item.id !== id);
    onChangeCarts({
      ...carts,
      [activeTab]: newCartItems
    })
  };

  const actions = {
    open,
    close,
    query: fetchCartData,
    select: handleSelectItem,
    selectAll: handleSelectAll,
    remove: handleRemove,
  };

  return {
    actions,

    cartItems,
    selectedItems,
    ...store,
    ...context
  };
};

export default useDrawer;
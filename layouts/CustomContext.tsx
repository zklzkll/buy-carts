// components/CustomContext.tsx
import { LicType } from '@/api';
import React, { createContext, useContext, useMemo, useState } from 'react';

export enum MediaType {
  Video = "videos",
  Image = "fotos",
  Music = "musics",
}

export const LicTypeEnum = {
  [LicType.NP]: '个人授权',
  [LicType.LP]: '企业授权',
  [LicType.LPPLUS]: '企业PLUS授权'
} as any

export interface CartData {
  [MediaType.Video]: any[];
  [MediaType.Image]: any[];
  [MediaType.Music]: any[];
};

export interface TabItem {
  key: string;
  label: string;
  count: number;
}


export const MediaIdType = {
  [MediaType.Video]: "vid",
  [MediaType.Image]: "fid",
  [MediaType.Music]: "mid",
} as any

// 定义上下文类型
interface CustomProvider {
  activeTab: MediaType;
  carts: CartData;
  total: number;
  tabItems: TabItem[];
  onChangeCarts: (data: CartData) => void;
  onChangeTabs: (key: MediaType) => void;
}

// 创建上下文
const CustomContext = createContext<CustomProvider | undefined>(undefined);

// 提供者组件
export const CustomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<MediaType>(MediaType.Video);

  const [carts, setCarts] = useState<CartData>({
    [MediaType.Video]: [],
    [MediaType.Image]: [],
    [MediaType.Music]: []
  });

  const total = useMemo(() => {
    return carts.videos.length + carts.fotos.length + carts.musics.length;
  }, [carts]);

  const tabItems = useMemo(() => {
    return [
      { key: MediaType.Video, label: "视频", count: carts.videos.length },
      { key: MediaType.Image, label: "图片", count: carts.fotos.length },
      { key: MediaType.Music, label: "音乐", count: carts.musics.length },
    ];
  }, [carts]);

  const onChangeCarts = (data: CartData) => {
    setCarts(data)
  }

  const onChangeTabs = (key: MediaType) => {
    setActiveTab(key)
  }

  return (
    <CustomContext.Provider value={{ activeTab, carts, total, tabItems, onChangeTabs, onChangeCarts }}>
      {children}
    </CustomContext.Provider>
  );
};

// 自定义钩子来使用上下文
export const useCustomContext = () => {
  const context = useContext(CustomContext);
  if (!context) {
    throw new Error('useLayouthook must be used within a CustomProvider');
  }
  return context;
};
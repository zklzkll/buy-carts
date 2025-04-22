import { BuyerCartFoto, BuyerCartMusic, BuyerCartVideo, FotosBoughtType, MusicsBoughtType, VideosBoughtType } from "@/api";

const closeIcon = "/assets/test.png";

// 模拟数据（实际项目中应从数据库或其他数据源获取）
export const mockBuyerCartFotos: BuyerCartFoto[] = [
  {
    auditStatus: 'FAIL',
    coverImage: closeIcon,
    price: 50,
    softwareType: '图片素材',
    title: '风景图片1',
    licType: 'NP',
    fid: 1,
  },
  {
    auditStatus: 'SUCCESS',
    coverImage: closeIcon,
    price: 80,
    softwareType: 'AI模板',
    title: 'AI设计模板1',
    licType: 'LP',
    fid: 2,
  },
  // 更多模拟数据...
];


// 模拟数据（实际项目中应从数据库或其他数据源获取）
export const mockBuyerCartMusics: BuyerCartMusic[] = [
  {
    auditStatus: 'SUCCESS',
    coverImage: closeIcon,
    price: 20,
    title: '音乐1',
    licType: 'NP',
    mid: 14,
  },
  {
    auditStatus: 'SUCCESS',
    coverImage: closeIcon,
    price: 40,
    title: '音乐2',
    licType: 'LP',
    mid: 53,
  },
  // 更多模拟数据...
];


// 模拟数据（实际项目中应从数据库或其他数据源获取）
export const mockBuyerCartVideos: BuyerCartVideo[] = [
  {
    auditStatus: 'SUCCESS',
    coverImage: closeIcon,
    price: 30,
    softwareType: '视频素材',
    title: '2023拜年EDIUS系列-模板可编辑修2023拜年EDIUS系列-模板可编辑修',
    licType: 'NP',
    vid: 889,
  },
  {
    auditStatus: 'SUCCESS',
    coverImage: closeIcon,
    price: 130,
    softwareType: 'C4D模板',
    title: '2023拜年EDIUS系列-模板可编辑修',
    licType: 'LPPLUS',
    vid: 991,
  },
  // 更多模拟数据...
];

// 模拟数据（实际项目中应从数据库或其他数据源获取）
export const mockFotosBoughtType: FotosBoughtType[] = [
  {
    licTypes: 'NP',
    fid: 1,
  },
  // 更多模拟数据...
];

// 模拟数据（实际项目中应从数据库或其他数据源获取）
export const mockVideosBoughtType: VideosBoughtType[] = [
  {
    licTypes: 'LP',
    vid: 889,
  },
  {
    licTypes: 'LPPLUS',
    vid: 991,
  },
  // 更多模拟数据...
];

// 模拟数据（实际项目中应从数据库或其他数据源获取）
export const mockMusicsBoughtType: MusicsBoughtType[] = [];
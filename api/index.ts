
export enum LicType {
  NP = 'NP',
  LP = 'LP',
  LPPLUS = 'LPPLUS'
}
export interface CartItem {
  auditStatus: 'SUCCESS' | 'FAIL'; // 审核状态;
  coverImage: string;
  price: number;
  title: string;
  licType: LicType; // 授权类型
  bought?: boolean;
}

// BuyerCartFoto.ts
export interface BuyerCartFoto extends CartItem {
  softwareType: '图片素材' | 'AI模板' | 'PSD模板'; // 类型
  fid: number; // 素材唯一id
}


// BuyerCartMusic.ts
export interface BuyerCartMusic extends CartItem {
  mid: number; // 素材唯一id
}

// BuyerCartVideo.ts
export interface BuyerCartVideo extends CartItem {
  softwareType: '视频素材' | 'AE模板' | 'C4D模板'; // 类型
  vid: number; // 素材唯一id
}

export interface LicTypes {
  licTypes: LicType;// 历史购买授权类型
}

// FotosBoughtType.ts
export interface FotosBoughtType extends LicTypes {
  fid: number; // 素材唯一id
}

// VideosBoughtType.ts
export interface VideosBoughtType extends LicTypes {
  vid: number; // 素材唯一id
}

// MusicsBoughtType.ts
export interface MusicsBoughtType extends LicTypes {
  mid: number; // 素材唯一id
}

// GetFotosBoughtTypeResponse.ts
export interface GetFotosBoughtTypeResponse {
  data?: {
    data: FotosBoughtType[];
  };
}

// GetMusicsBoughtTypeResponse.ts
export interface GetMusicsBoughtTypeResponse {
  data?: {
    data: MusicsBoughtType[];
  };
}

// GetVideosBoughtTypeResponse.ts
export interface GetVideosBoughtTypeResponse {
  data?: {
    data: VideosBoughtType[];
  };
}

// GetBuyerCartMusicsResponse.ts
export interface GetBuyerCartMusicsResponse {
  data?: {
    data: BuyerCartMusic[];
  };
}

// GetBuyerCartVideosResponse.ts
export interface GetBuyerCartVideosResponse {
  data?: {
    data: BuyerCartVideo[];
  };
}

// GetBuyerCartFotosResponse.ts
export interface GetBuyerCartFotosResponse {
  data?: {
    data: BuyerCartFoto[];
  };
}


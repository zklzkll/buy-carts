import type { NextApiRequest, NextApiResponse } from 'next';
import { GetBuyerCartVideosResponse } from '@/api';
import { mockBuyerCartVideos } from '@/mock';


const getBuyerCartVideos = (req: NextApiRequest, res: NextApiResponse<GetBuyerCartVideosResponse>) => {
  try {
    // 返回模拟数据
    const response: GetBuyerCartVideosResponse = {
      data: {
        data: mockBuyerCartVideos,
      },
    };

    // 日志记录
    console.log('Successfully fetched buyer cart musics:', response);

    return res.status(200).json(response);
  } catch (error) {
    // 错误处理
    console.error('Failed to fetch buyer cart musics:', error);
  }
};

export default getBuyerCartVideos;
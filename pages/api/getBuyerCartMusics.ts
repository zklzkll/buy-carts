import type { NextApiRequest, NextApiResponse } from 'next';
import { GetBuyerCartMusicsResponse } from '@/api';
import { mockBuyerCartMusics } from '@/mock';

const getBuyerCartMusics = (req: NextApiRequest, res: NextApiResponse<GetBuyerCartMusicsResponse>) => {
  try {
    // 返回模拟数据
    const response: GetBuyerCartMusicsResponse = {
      data: {
        data: mockBuyerCartMusics,
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

export default getBuyerCartMusics;
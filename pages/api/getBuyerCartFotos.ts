import type { NextApiRequest, NextApiResponse } from 'next';
import { GetBuyerCartFotosResponse } from '@/api';
import { mockBuyerCartFotos } from '@/mock';


const getBuyerCartFotos = (req: NextApiRequest, res: NextApiResponse<GetBuyerCartFotosResponse>) => {
  try {
    // 返回模拟数据
    const response: GetBuyerCartFotosResponse = {
      data: {
        data: mockBuyerCartFotos,
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

export default getBuyerCartFotos;
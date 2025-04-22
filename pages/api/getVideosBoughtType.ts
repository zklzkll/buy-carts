import type { NextApiRequest, NextApiResponse } from 'next';
import { GetVideosBoughtTypeResponse } from '@/api';
import { mockVideosBoughtType } from '@/mock';


const getFotosBoughtType = (req: NextApiRequest, res: NextApiResponse<GetVideosBoughtTypeResponse>) => {
  try {
    // 返回模拟数据
    const response: GetVideosBoughtTypeResponse = {
      data: {
        data: mockVideosBoughtType,
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

export default getFotosBoughtType;
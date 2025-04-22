import { Checkbox, List, Space, Typography } from "antd";
import CustomTabs from "@/components/CustomTabs";
import { CartItem } from "@/api";
import { LicTypeEnum, MediaType, TabItem } from "@/layouts/CustomContext";
import Image from "next/image";
import DrawerFooter from "./Footer";

export interface CartItems extends CartItem {
  id: number;
}

interface DrawerContentProps {
  activeTab: MediaType;
  cartItems: CartItems[];
  tabItems: TabItem[];
  selectedItems: Record<string, Set<number>>;
  onChangeTabs: (tab: MediaType) => void;
  handleSelectItem: (id: number) => void;
  handleSelectAll: () => void;
  handleRemove: (id: number) => void;
}

const { Text } = Typography;

const DrawerContent: React.FC<DrawerContentProps> = (props) => {
  const {
    activeTab,
    tabItems,
    cartItems,
    selectedItems,
    onChangeTabs,
    handleSelectItem,
    handleSelectAll,
    handleRemove,
  } = props

  const onSelect = (record: any) => {
    if (record.auditStatus === 'FAIL') return
    handleSelectItem(record.id)
  }

  const handleTabChange = (key: string) => {
    onChangeTabs(key as MediaType);
  };

  const tabLabels = tabItems.map((item) => ({
    label: `${item.label} ${item.count}`,
    key: item.key,
  }));

  const tabsAttrs = {
    activeTab,
    tabLabels,
    handleTabChange
  }

  return (
    <CustomTabs {...tabsAttrs}>
      {/* 这里放置每个tab对应的content */}
      <div className="h-full w-full flex flex-col items-center flex-1 overflow-auto xs:px-6 pb-0 px-0">
        <form className="flex flex-col h-full w-full">
          <div className="flex-1 flex flex-col w-full overflow-auto pt-[20px] px-[20px]">
            {cartItems.length > 0 ? (
              <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item: any) => (
                  <List.Item className="list-item rounded-lg cursor-pointer" onClick={() => onSelect(item)}>
                    <Space direction='horizontal' className="item-space" size={16}>
                      <Checkbox
                        disabled={item.auditStatus === 'FAIL'}
                        checked={selectedItems[activeTab]?.has(item.id) || false}
                      />
                      <List.Item.Meta
                        avatar={
                          <>
                            <div className="avatar">
                              <Image src={item.coverImage} alt="coverImage" style={{ width: 'auto', height: '68px' }} width={68} height={68} />
                              {item.auditStatus === 'FAIL' && (
                                <div className="takedown">
                                  已下架
                                </div>
                              )}
                            </div>
                            {item.bought && (
                              <Text className="bought">
                                您已购买过此素材
                                <Image
                                  aria-hidden
                                  src="/right.svg"
                                  alt="Right icon"
                                  width={6}
                                  height={6}
                                /></Text>
                            )}
                          </>
                        }
                        title={<Text className="truncate block" style={{ fontSize: 16,fontWeight: 500 }}>{item.title}</Text>}
                        description={
                          <>
                            <Text>ID: {item.id}</Text>
                            {item.softwareType && <><Text type='secondary' style={{ margin: "0 12px" }}>|</Text>
                              <Text>类型: {item.softwareType}</Text></>}
                          </>
                        }
                      />
                    </Space>

                    <div className="w-full mt-[12px] flex justify-between">
                      <span className="pl-[34px]">
                        <span className="remove" onClick={() => handleRemove(item.id)}>移除</span>
                      </span>
                      <span>
                        <span className="mr-[16px]">
                          {LicTypeEnum[item.licType] && <Text>{LicTypeEnum[item.licType]}</Text>}
                        </span>
                        <span className="font-medium text-[20px]">
                          {item.price}
                        </span>
                        元
                      </span>
                    </div>
                  </List.Item>
                )}
              />
            ) : (
              <div className="flex items-center justify-center flex-col py-30 space-y-3 w-full">
                <div className="leading-none text-[0px]">
                  <Image
                    aria-hidden
                    src="/search.svg"
                    alt="Search icon"
                    width={80}
                    height={80}
                  />
                </div>
                <p className="text-lg font-medium">暂无数据</p>
              </div>
            )}
          </div>
          <DrawerFooter handleSelectAll={handleSelectAll} cartItems={cartItems} selectedItems={selectedItems[activeTab]} />
        </form>
      </div>
    </CustomTabs>
  )
}

export default DrawerContent
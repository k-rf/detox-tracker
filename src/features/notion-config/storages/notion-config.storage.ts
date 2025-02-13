import { useCallback, useEffect, useState } from "react";
import { storage } from "wxt/storage";

interface NotionConfigDataModelV1 {
  apiToken: string;
  pageId: string;
}

export const notionConfigStorage = storage.defineItem<NotionConfigDataModelV1>(
  "local:notionConfig",
  {
    version: 1,
    init: () => ({ apiToken: "", pageId: "" }),
    fallback: { apiToken: "", pageId: "" },
  },
);

export const useNotionConfigStorage = () => {
  const [notionConfig, setNotionConfig] = useState<NotionConfigDataModelV1>({
    apiToken: "",
    pageId: "",
  });

  useEffect(() => {
    notionConfigStorage.getValue().then((notionConfig) => {
      setNotionConfig(notionConfig);
    });
  }, []);

  useEffect(() => {
    const unwatch = notionConfigStorage.watch((next) => {
      setNotionConfig(next);
    });

    return () => unwatch();
  });

  const save = useCallback((data: NotionConfigDataModelV1) => {
    notionConfigStorage.setValue(data);
  }, []);

  return { notionConfig, save };
};

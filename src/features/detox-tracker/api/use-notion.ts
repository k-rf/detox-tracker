import { Client } from "@notionhq/client";
import { useCallback, useMemo } from "react";

import { useNotionConfigStorage } from "~/features/notion-config/storages/notion-config.storage";

export const useNotion = () => {
  const { notionConfig } = useNotionConfigStorage();

  const notion = useMemo(() => new Client({ auth: notionConfig.apiToken }), [notionConfig]);

  const createPage = useCallback(
    ({
      trackingTarget,
      previousVisitTime,
      latestVisitTime,
    }: { trackingTarget: string; previousVisitTime: Date; latestVisitTime: Date }) => {
      notion.pages.create({
        parent: { type: "database_id", database_id: notionConfig.pageId },
        properties: {
          "名前": {
            type: "title",
            title: [{ type: "text", text: { content: trackingTarget } }],
          },
          "デトックス期間": {
            type: "date",
            date: {
              start: previousVisitTime.toISOString(),
              end: latestVisitTime.toISOString(),
              time_zone: "UTC",
            },
          },
        },
      });
    },
    [notion, notionConfig],
  );

  return { createPage };
};

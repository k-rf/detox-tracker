import { SaveIcon } from "lucide-react";

import { vars } from "~/assets/css/theme.css";
import { Field } from "~/components/ui/field";
import { IconButton } from "~/components/ui/icon-button";
import { Box } from "~/components/ui/layout/box";
import { Stack } from "~/components/ui/layout/stack";

import { fieldStyle } from "./index.css";
import { useNotionConfigStorage } from "./storages/notion-config.storage";

export const NotionConfigFeature = () => {
  const { notionConfig, save } = useNotionConfigStorage();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);

        save({
          apiToken: formData.get("notion-api-token") as string,
          pageId: formData.get("notion-page-id") as string,
        });
      }}
    >
      <Stack direction="column" gap={vars.spacing.sm}>
        <Box className={fieldStyle}>
          <label htmlFor="notion-api-token">API Token</label>
          <Field name="notion-api-token" defaultValue={notionConfig.apiToken} />
        </Box>
        <Box className={fieldStyle}>
          <label htmlFor="notion-page-id">Page ID</label>
          <Field name="notion-page-id" defaultValue={notionConfig.pageId} />
        </Box>
        <Box justifyContent="end">
          <IconButton size="sm" type="submit">
            <SaveIcon />
          </IconButton>
        </Box>
      </Stack>
    </form>
  );
};

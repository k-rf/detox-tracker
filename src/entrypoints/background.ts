import { browser } from "wxt/browser/chrome";
import { defineBackground } from "wxt/sandbox";

export default defineBackground(() => {
  browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch(() => {
    console.warn("Failed to set chrome panel behavior");
  });
});

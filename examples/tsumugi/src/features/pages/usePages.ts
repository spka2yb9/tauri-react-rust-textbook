import { useCallback, useEffect, useState } from "react";

import * as ipc from "../../lib/ipc";
import { toastError } from "../../lib/toast";
import type { PageSummary } from "../../lib/types";

/** ページ一覧（ツリーの元データ）と、それを更新する操作。 */
export function usePages() {
  const [pages, setPages] = useState<PageSummary[]>([]);

  const reload = useCallback(async () => {
    try {
      setPages(await ipc.listPages());
    } catch (e) {
      toastError(e);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  // 各操作は「Rust に頼む → 一覧を取り直す」の単純な形にそろえる
  const run = async <T,>(op: () => Promise<T>): Promise<T | undefined> => {
    try {
      const r = await op();
      await reload();
      return r;
    } catch (e) {
      toastError(e);
      return undefined;
    }
  };

  return {
    pages,
    reload,
    create: (parentId: string | null, title = "無題") => run(() => ipc.createPage(parentId, title)),
    rename: (id: string, title: string) => run(() => ipc.renamePage(id, title)),
    setIcon: (id: string, icon: string | null) => run(() => ipc.setPageIcon(id, icon)),
    move: (id: string, parentId: string | null, position: number) =>
      run(() => ipc.movePage(id, parentId, position)),
    remove: (id: string) => run(() => ipc.deletePage(id)),
  };
}

export type PagesApi = ReturnType<typeof usePages>;

export const childrenOf = (pages: PageSummary[], parentId: string | null) =>
  pages.filter((p) => p.parent_id === parentId).sort((a, b) => a.position - b.position);
